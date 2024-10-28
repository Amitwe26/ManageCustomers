export type EventCalendar = {
  id: string;
  title: string;
  description: string;
  date: string;
  start: string;
  end: string;
  allDay: boolean;
  type: 'task' | 'meeting';
  createdBy: string;
  customerId?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  idForUpdate?: string;
};
