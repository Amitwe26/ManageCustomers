import {
  addDocument,
  getCollection,
  updateDocument,
} from '../utils/firestoreUtils';
import { EventCalendar } from '../types/calendarTypes';

export const getUserEvents = async (
  userId: string,
  customerId?: string,
): Promise<EventCalendar[]> => {
  try {
    const collectionPath = customerId
      ? `users/${userId}/customers/${customerId}/events`
      : `users/${userId}/events`;
    const col = await getCollection<EventCalendar>(collectionPath);
    console.log(col);
    return col;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const createEvent = async (
  userId: string,
  event: EventCalendar,
  customerId?: string,
) => {
  try {
    const eventData = {
      ...event,
      createdBy: userId,
      customerId: customerId ?? '',
    };
    const collectionPath = `users/${userId}/events`;
    const docRef = await addDocument<EventCalendar>(collectionPath, eventData);
    await updateDocument(collectionPath, docRef.id, { id: docRef.id });
    console.log('successfully created event');

    if (customerId) {
      const collectionPath = `users/${userId}/customers/${customerId}/events`;
      const docCustomerRef = await addDocument<EventCalendar>(
        collectionPath,
        eventData,
      );
      await updateDocument(collectionPath, docCustomerRef.id, {
        id: docCustomerRef.id,
        idForUpdate: docRef.id,
      });
      console.log('successfully created event in customer');
    }
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export const updateEvent = async (
  userId: string,
  eventId: string,
  eventData: Partial<EventCalendar>,
  customerId?: string,
) => {
  try {
    const collectionPath = `users/${userId}/events`;
    console.log(collectionPath, eventId, eventData, customerId);
    await updateDocument<EventCalendar>(collectionPath, eventId, eventData);
    console.log('Event successfully updated');
    if (customerId) {
      const customerCollectionPath = `users/${userId}/customers/${customerId}/events`;
      const col: EventCalendar[] = await getCollection(customerCollectionPath);
      const find = col.find((event) => event.idForUpdate === eventId);
      if (find?.idForUpdate === eventId) {
        await updateDocument<EventCalendar>(customerCollectionPath, find.id, {
          ...eventData,
          id: find.id,
        });
        console.log('Event successfully updated customer:', customerId);
      }
    }
  } catch (error) {
    console.error('Error updating event:', error);
  }
};
