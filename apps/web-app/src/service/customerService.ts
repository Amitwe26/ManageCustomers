import { Customer, CustomerHistory } from '../types/customersTypes';
import { CustomerFields } from '../types/userTypes';
import {
  AuthFormDocument,
  FormField,
  LoginFormFields,
  SignUpFormFields,
} from '../types/loginTypes';
import {
  addDocument,
  deleteDocument,
  getCollection,
  getDocumentById,
  getDocuments,
  updateDocument,
} from '../utils/firestoreUtils';

export const getCustomersUser: (
  id: string,
) => Promise<Customer<CustomerFields>[]> = async (id: string) =>
  getCollection(`users/${id}/customers`);

export const getCustomerById = async (
  userId: string,
  customerId: string,
): Promise<Customer<CustomerFields> | undefined> => {
  try {
    const customerDocPath = `users/${userId}/customers`;
    const customer = await getDocumentById<Customer<CustomerFields>>(
      customerDocPath,
      customerId,
    );

    if (customer) {
      return customer;
    } else {
      console.error('Customer does not exist');
    }
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    throw error;
  }
};

export const getHistoryUser: (
  userId: string,
  customerId: string,
) => Promise<Customer<CustomerFields> | null> = async (userId, customerId) => {
  try {
    const customerDocument = await getDocumentById<Customer<CustomerFields>>(
      `users/${userId}/customers`,
      customerId,
    );
    if (customerDocument) {
      return customerDocument;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting customer history: ', error);
    throw error;
  }
};

export const updateCustomer = async (
  userId: string,
  data: Customer<CustomerFields>,
  customerId?: string,
) => {
  try {
    const customerColPath = `users/${userId}/customers`;

    if (customerId) {
      const customerDoc = await getDocumentById<Customer<CustomerFields>>(
        customerColPath,
        customerId,
      );

      if (customerDoc) {
        await updateDocument(customerColPath, customerId, data);
      } else {
        throw new Error('Customer does not exist');
      }
    } else {
      if (!data.history || data.history.length === 0) {
        const initialHistory = {
          date: new Date().toISOString(),
          summery: 'New text for summery',
          timestamp: new Date().toISOString(),
        };
        data.history = [initialHistory];
      }
      data = {
        ...data,
        type: 'user',
        date: new Date().toLocaleString(),
      };
      const docRef = await addDocument(customerColPath, data);
      await updateDocument(customerColPath, docRef.id, { id: docRef.id });
    }
  } catch (error) {
    console.error('Error saving customer data:', error);
  }
};

export const addCustomerHistory = async (
  userId: string,
  customerId: string,
  newHistory: CustomerHistory,
) => {
  try {
    const customerDocPath = `users/${userId}/customers`;
    const customerDoc = await getDocumentById<{ history: CustomerHistory[] }>(
      customerDocPath,
      customerId,
    );
    if (customerDoc) {
      const updatedHistory = [...(customerDoc.history || []), newHistory];
      await updateDocument(customerDocPath, customerId, {
        history: updatedHistory,
      });
    } else {
      console.error('Customer does not exist!');
    }
  } catch (error) {
    console.error('Error updating customer history: ', error);
  }
};

export const getFormFields = async (
  formType: 'login' | 'signup',
): Promise<FormField<LoginFormFields>[] | FormField<SignUpFormFields>[]> => {
  try {
    const formDocs = await getDocuments<AuthFormDocument>('authentication');
    const formDoc = formDocs ? formDocs[0] : undefined;

    if (formDoc) {
      return formType === 'login' ? formDoc.login : formDoc.signup;
    } else {
      console.log('No such form document!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching form fields:', error);
    return [];
  }
};

export const deleteCustomer = async (
  userId: string,
  customerId: string,
): Promise<void> => {
  try {
    const customerDocPath = `users/${userId}/customers`;
    await deleteDocument(customerDocPath, customerId); // Utilize your delete utility
    console.log(`Customer with ID ${customerId} has been deleted.`);
  } catch (error) {
    console.error('Error deleting customer: ', error);
    throw new Error('Could not delete customer.');
  }
};
