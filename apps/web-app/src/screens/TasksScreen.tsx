import React from 'react';
import { getUserEvents } from '../service/calendarService';
import { useQuery } from 'react-query';
import { EventInput } from '@fullcalendar/core';
import { useAppContext } from '../context/AppContext';
import EventSidebar from '../components/EventsCalendarList/EventSidebar';

const TasksScreen = () => {
  const { user } = useAppContext();

  const { data: events, isLoading } = useQuery<EventInput[]>(
    ['eventsCalendar', user?.id],
    () => getUserEvents(user?.id ?? ''),
  );
  return <>{!isLoading && events && <EventSidebar currentEvents={events} />}</>;
};

export default TasksScreen;
