import React from 'react';
import styled from 'styled-components';
import { EventInput } from '@fullcalendar/core';
import { formatDate } from '@fullcalendar/core';
import { useTranslation } from 'react-i18next';

const EventSidebar: React.FC<{
  currentEvents: EventInput[];
  setWeekendsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  weekendsVisible?: boolean;
}> = ({ currentEvents }) => {
  const { t } = useTranslation();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(today.getDate() + 7);

  const upcomingWeekEvents = currentEvents
    .filter((event) => {
      const startDate = new Date(event.start as string | Date);
      return (
        !isNaN(startDate.getTime()) &&
        startDate >= today &&
        startDate <= oneWeekFromToday
      );
    })
    .sort(
      (a, b) =>
        new Date(a.start as string | Date).getTime() -
        new Date(b.start as string | Date).getTime(),
    );

  return (
    <SidebarContainer>
      <Header>
        {upcomingWeekEvents.length} {t('customerDetails.events.eventsForWeek')}
      </Header>
      <EventList>
        {upcomingWeekEvents.map((event: EventInput) => (
          <EventItem key={event.id} $eventType={event.type}>
            <DateText>
              {formatDate(event.start!, {
                locale: 'he',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              :
            </DateText>
            <i>{event.title}</i>
          </EventItem>
        ))}
      </EventList>
    </SidebarContainer>
  );
};

export default EventSidebar;

const SidebarContainer = styled.div`
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li<{ $eventType: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 1rem;

  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-inline-end: 10px;
    background-color: ${({ $eventType }) =>
      $eventType === 'task' ? '#f11e5d' : '#1e90ff'};
  }
`;

const DateText = styled.b`
  margin-inline-end: 10px;
`;
