import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
  EventDropArg,
} from '@fullcalendar/core';
import styled from 'styled-components';
import TaskPopup from '../components/TaskPopupUi/TaskPopup';
import ContainerUi from '../components/ContainerUi/ContainerUi';
import heLocale from '@fullcalendar/core/locales/he';
import { Customer } from '../types/customersTypes';
import { CustomerFields } from '../types/userTypes';
import { getCustomersUser } from '../service/customerService';
import { useQuery } from 'react-query';
import { useAppContext } from '../context/AppContext';
import { EventCalendar } from '../types/calendarTypes';
import { formatDateForInput, formatTime } from '../utils/dateUtils';
import {
  createEvent,
  deleteEvent,
  getUserEvents,
  updateEvent,
} from '../service/calendarService';
import CalendarHeaderUi from '../components/EventsCalendarList/CalendarHeaderUi';

const FullCalendarApp: React.FC = () => {
  const { user } = useAppContext();
  const calendarRef = useRef<FullCalendar>(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskData, setTaskData] = useState<EventCalendar | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventApi | null>(null);

  const {
    data: events,
    isLoading,
    refetch: refechEventsData,
  } = useQuery<EventInput[]>(['eventsCalendar', user?.id], () =>
    getUserEvents(user?.id ?? ''),
  );

  const { data: customers } = useQuery<Customer<CustomerFields>[]>(
    ['customers', user?.id],
    () => getCustomersUser(user?.id ?? ''),
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (selectInfo.view.type === 'dayGridMonth') {
      selectInfo.view.calendar.changeView('timeGridDay', selectInfo.start);
    } else {
      setTaskData({
        id: '',
        title: '',
        description: '',
        type: 'task',
        date: formatDateForInput(selectInfo.startStr),
        start: formatTime(new Date(selectInfo.startStr)),
        end: formatTime(new Date(selectInfo.endStr)),
        allDay: selectInfo.allDay,
        customerId: '',
        createdBy: user!.id,
        status: 'scheduled',
      });
      setModalOpen(true);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo) {
      setEventToDelete(clickInfo.event);
      setTaskData({
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        description: clickInfo.event.extendedProps.description,
        type: clickInfo.event.extendedProps.type,
        date: formatDateForInput(clickInfo.event.startStr),
        start: formatTime(new Date(clickInfo.event.startStr)),
        end: formatTime(new Date(clickInfo.event.endStr)),
        allDay: clickInfo.event.allDay,
        customerId: clickInfo.event.extendedProps.customerId,
        createdBy: user!.id,
        status: 'scheduled',
      });
      setModalOpen(true);
    }
  };

  const handleSubmit = async (data: EventCalendar) => {
    if (data) {
      await handleSaveEvent(data);
    }
  };

  const handleSaveEvent = async (data: EventCalendar) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    const { title, description, type, date, start, end, customerId, allDay } =
      data;

    const eventStart = new Date(`${date}T${start}`);
    const eventEnd = allDay ? null : new Date(`${date}T${end}`);

    if (eventToDelete) {
      eventToDelete.setProp('title', title);
      eventToDelete.setExtendedProp('description', description);
      eventToDelete.setExtendedProp('type', type);
      eventToDelete.setExtendedProp('customerId', customerId);
      eventToDelete.setAllDay(allDay);
      eventToDelete.setStart(eventStart);
      eventToDelete.setEnd(eventEnd);
      await updateEvent(data.createdBy, eventToDelete.id, {
        ...data,
        customerId: data.customerId ?? '',
        start: eventStart.toISOString(),
        end: eventEnd?.toISOString() ?? '',
      });
    } else {
      calendarApi.addEvent({
        title,
        date: eventStart,
        start: eventStart,
        end: eventEnd ?? undefined,
        allDay,
        extendedProps: {
          description,
          type,
          customerId: customerId ?? '',
        },
      });
      await createEvent(data.createdBy, {
        ...data,
        customerId: customerId ?? '',
        date: eventStart.toISOString(),
        start: eventStart?.toISOString(),
        end: eventEnd?.toISOString() ?? '',
      });
    }

    closeModal();
    refechEventsData();
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      eventToDelete.remove();
      await deleteEvent(
        eventToDelete.extendedProps.createdBy,
        eventToDelete.id,
      );
      closeModal();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskData(null);
    setEventToDelete(null);
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    const { event } = dropInfo;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      description: event.extendedProps.description,
      type: event.extendedProps.type,
      date: event.start,
      status: event.extendedProps.status,
      createdBy: event.extendedProps.createdBy,
      customerId: event.extendedProps.customerId,
    };
    await updateEvent(updatedEvent.createdBy, event.id, {
      ...updatedEvent,
      customerId: updatedEvent.customerId ?? '',
      date: updatedEvent.start?.toISOString() ?? '',
      start: updatedEvent.start?.toISOString() ?? '',
      end: updatedEvent.end?.toISOString() ?? '',
    });
    refechEventsData();
  };

  return (
    <>
      <Container>
        <div>
          {isModalOpen && (
            <TaskPopup
              initialData={taskData}
              onSubmit={handleSubmit}
              onClose={closeModal}
              onDelete={handleDeleteEvent}
              customers={customers}
            />
          )}
          {!isLoading && (
            <>
              <CalendarHeaderUi
                calendarRef={calendarRef}
                current={calendarRef.current}
              />
              <ContainerUi isHeaderVisible={false}>
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    right: '',
                    center: 'title',
                    left: '',
                  }}
                  initialView="timeGridWeek"
                  editable
                  weekNumbers
                  stickyHeaderDates
                  selectable
                  selectMirror
                  dayMaxEvents
                  locale="he"
                  locales={[heLocale]}
                  direction="rtl"
                  firstDay={0}
                  hiddenDays={weekendsVisible ? [] : [5, 6]}
                  events={events}
                  slotMinTime="05:00:00"
                  slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                  }}
                  height="auto"
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  eventContent={renderEventContent}
                  eventDrop={handleEventDrop}
                  eventColor="transparent"
                  navLinks
                  nowIndicator
                />
              </ContainerUi>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default FullCalendarApp;

const renderEventContent = (eventContent: EventContentArg) => {
  const { extendedProps, start, title } = eventContent.event ?? {};
  const isFutureEvent = start ? start > new Date() : undefined;
  const eventColor = extendedProps.type === 'task' ? '#f11e5d' : '#1e90ff';

  return (
    <EventContent
      style={{
        backgroundColor: eventColor,
        opacity: isFutureEvent ? 1 : 0.4,
        color: 'rgba(249, 251, 253)',
      }}
    >
      <Tooltip className="tooltip">{title}</Tooltip>
      <EventTitle>{title}</EventTitle>
      <EventTime>{eventContent.timeText}</EventTime>
    </EventContent>
  );
};

const Container = styled.div``;
const EventContent = styled.div`
  ${({ theme }) => theme.utils.flexDirectionRtl(theme)};
  display: flex;
  padding: 2px 4px;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  justify-content: space-between;
  &:hover {
    opacity: 0.7;
  }
  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`;

const EventTitle = styled.span`
  max-width: 45%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const EventTime = styled.span``;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 12px;
  opacity: 0;
  margin-bottom: 5px;
`;
