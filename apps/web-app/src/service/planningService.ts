import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firestoreUtils';
import { PlanningType } from '../types/customersTypes';

export const getPlanningsForCustomer = async (
  userId: string,
  customerId: string,
): Promise<PlanningType[]> => {
  return await getCollection<PlanningType>(
    `users/${userId}/customers/${customerId}/plannings`,
  );
};

export const addNewPlanning = async (
  userId: string,
  customerId: string,
  data: PlanningType,
) => {
  const collectionPath = `users/${userId}/customers/${customerId}/plannings`;
  return await addDocument<PlanningType>(collectionPath, data);
};

export const updatePlanning = async (
  userId: string,
  customerId: string,
  planningId: string,
  data: Partial<PlanningType>,
) => {
  const collectionPath = `users/${userId}/customers/${customerId}/plannings`;
  await updateDocument(collectionPath, planningId, data);
};

export const deletePlanning = async (
  userId: string,
  customerId: string,
  planningId: string,
) => {
  const collectionPath = `users/${userId}/customers/${customerId}/plannings`;
  await deleteDocument(collectionPath, planningId);
};
