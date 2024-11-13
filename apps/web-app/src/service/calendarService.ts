import {
  addDocument,
  updateDocument,
  getDocumentById,
  deleteDocument,
  getCollection,
} from '../utils/firestoreUtils';
import { EventCalendar } from '../types/calendarTypes';

export const getUserEvents = async (
  userId: string,
  customerId?: string,
): Promise<EventCalendar[]> => {
  try {
    if (userId) {
      const collectionPath = `users/${userId}/events`;
      const filters = customerId ? { customerId } : undefined;
      return await getCollection<EventCalendar>(collectionPath, filters);
    }
    return [];
  } catch (error) {
    console.error('Error fetching user events:', error);
    return [];
  }
};

export const createEvent = async (userId: string, event: EventCalendar) => {
  try {
    const eventData = {
      ...event,
      createdBy: userId,
      customerId: event.customerId,
    };

    const collectionPath = `users/${userId}/events`;
    const docRef = await addDocument<EventCalendar>(collectionPath, eventData);
    await updateDocument(collectionPath, docRef.id, { id: docRef.id });
    console.log('Successfully created event:', docRef.id);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export const updateEvent = async (
  userId: string,
  eventId: string,
  updatedEventData: EventCalendar,
) => {
  try {
    const collectionPath = `users/${userId}/events`;

    const existingEvent = await getDocumentById<EventCalendar>(
      collectionPath,
      eventId,
    );
    if (!existingEvent) {
      return console.error(`Event with ID ${eventId} not found`);
    }

    const existingCustomerId = existingEvent.customerId;
    const newCustomerId = updatedEventData.customerId;

    if (existingCustomerId !== newCustomerId) {
      await deleteDocument(collectionPath, eventId);
      await createEvent(userId, updatedEventData);
      console.log('Event reassigned to new customer:', newCustomerId);
    } else {
      await updateDocument(collectionPath, eventId, updatedEventData);
      console.log('Event successfully updated:', eventId);
    }
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

export const deleteEvent = async (userId: string, eventId: string) => {
  try {
    const collectionPath = `users/${userId}/events`;
    await deleteDocument(collectionPath, eventId);
    console.log('Event successfully deleted:', eventId);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};
