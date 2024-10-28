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
  formatDate,
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
  getUserEvents,
  updateEvent,
} from '../service/calendarService';

const FullCalendarApp: React.FC = () => {
  const { user } = useAppContext();
  const calendarRef = useRef<FullCalendar>(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
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

  const handleSubmit = (data: EventCalendar) => {
    if (data) {
      handleSaveEvent(data);
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
      await updateEvent(
        data.createdBy,
        eventToDelete.id,
        {
          ...data,
          customerId: data.customerId ?? '',
          start: eventStart.toISOString(),
          end: eventEnd?.toISOString() ?? '',
        },
        data?.customerId,
      );
    } else {
      calendarApi.addEvent({
        // id,
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
      await createEvent(
        data.createdBy,
        {
          ...data,
          customerId: customerId ?? '',
          date: new Date(eventStart).toISOString(),
          start: new Date(eventStart)?.toISOString(),
          end: eventEnd?.toISOString() ?? '',
        },
        data?.customerId,
      );
    }

    closeModal();
    refechEventsData();
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      eventToDelete.remove();
      closeModal();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskData(null);
    setEventToDelete(null);
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const handleEventDrop = async (dropInfo: any) => {
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
      status: event.status,
      createdBy: event.extendedProps.createdBy,
      customerId: event.extendedProps.customerId,
    };

    await updateEvent(
      dropInfo.createdBy,
      event.id,
      updatedEvent,
      updatedEvent.customerId,
    );
    refechEventsData();
  };

  return (
    <ContainerUi isHeaderVisible={false}>
      <Sidebar
        currentEvents={currentEvents}
        setWeekendsVisible={setWeekendsVisible}
        weekendsVisible={weekendsVisible}
      />
      <div className="demo-app-main">
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
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              right: 'prev,next today',
              center: 'title',
              left: 'timeGridDay,timeGridWeek,dayGridMonth',
            }}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            locale="he"
            locales={[heLocale]}
            direction="rtl"
            firstDay={0}
            hiddenDays={weekendsVisible ? [] : [5, 6]}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            eventContent={renderEventContent}
            eventDrop={handleEventDrop}
          />
        )}
      </div>
    </ContainerUi>
  );
};

export default FullCalendarApp;
const Sidebar: React.FC<{
  currentEvents: EventApi[];
  setWeekendsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  weekendsVisible: boolean;
}> = ({ currentEvents, setWeekendsVisible, weekendsVisible }) => {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={() => setWeekendsVisible(!weekendsVisible)}
          />
          toggle weekends
        </label>
      </div>
    </div>
  );
};

const renderEventContent = (eventContent: EventContentArg) => {
  const { type } = eventContent.event.extendedProps;
  const eventColor = type === 'meeting' ? 'blue' : 'red';
  return (
    <EventContent
      style={{
        backgroundColor: eventColor,
        color: 'white',
      }}
    >
      <Tooltip className="tooltip">{eventContent.event.title}</Tooltip>
      <EventTitle>{eventContent.event.title}</EventTitle>
      <EventTime>{eventContent.timeText}</EventTime>
    </EventContent>
  );
};

const renderSidebarEvent = (event: EventApi) => (
  <li key={event.id}>
    <b>
      {formatDate(event.start!, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })}
    </b>
    <i>{event.title}</i>
  </li>
);

const EventContent = styled.div`
  ${({ theme }) => theme.utils.flexDirectionRtl(theme)};
  display: flex;
  padding: 2px 4px;
  height: 100%;
  width: 100%;
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
