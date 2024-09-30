import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as authUser,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { Customer, CustomerHistory } from '../types/customers';
import { CustomerFields, Profession, User } from '../types/userType';
import { SignUpFormFields } from '../components/LoginForm/SignUpForm';

const firebaseConfig = {
  apiKey: 'AIzaSyDA6zaJH9ZLBMXZB13Y_GBh8mwjMy7NUws',
  authDomain: 'managecustomers-89a9a.firebaseapp.com',
  projectId: 'managecustomers-89a9a',
  storageBucket: 'managecustomers-89a9a.appspot.com',
  messagingSenderId: '216413397238',
  appId: '1:216413397238:web:6f701dd86795f5c3e00cd7',
  measurementId: 'G-5RSZM19HTT',
};

interface UserType {
  email: string;
  password: string;
}

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const loginUser = async ({ email, password }: UserType) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const observeAuthState = (
  callback: (user: authUser | null) => Promise<void> | void,
) => {
  onAuthStateChanged(auth, callback); // Pass in the callback to handle auth state changes
};

export const getUserInfo = async (): Promise<User[]> => {
  return await getCollection<User>('users');
};

export const getUserProfession: () => Promise<Profession[]> = () =>
  getCollection('professions');

export const getCustomersUser: (
  id: string,
) => Promise<Customer<CustomerFields>[]> = async (id: string) => {
  const customersCol = collection(db, 'users', id, 'customers');
  const snapshot = await getDocs(customersCol);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Customer<CustomerFields>[];
};

export const getHistoryUser: (
  userId: string,
  customerId: string,
) => Promise<Customer<CustomerFields> | null> = async (userId, customerId) => {
  try {
    const customerDocRef = doc(db, 'users', userId, 'customers', customerId);
    const snapshot = await getDoc(customerDocRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        id: snapshot.id, // Get the document ID
        ...data,
      } as Customer<CustomerFields>;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting customer history: ', error);
    throw error;
  }
};
export const getCollection = async <T>(
  collectionName: string,
): Promise<T[]> => {
  const userInfo = collection(db, collectionName);
  const snapshot = await getDocs(userInfo);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

export const getCollectionWithId = async (
  collectionName: string,
  id?: string,
  subCollection?: string,
): Promise<any> => {
  if (!id) {
    throw new Error('A valid ID must be provided to fetch fields.');
  }
  const docRef = doc(db, collectionName, id);

  if (subCollection) {
    const subCollectionRef = collection(docRef, subCollection);
    const subCollectionSnapshot = await getDocs(subCollectionRef);
    return subCollectionSnapshot.docs.map((doc) => ({
      id: doc.id, // Use doc.id for subcollection documents
      ...doc.data(),
    }));
  }
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  } else {
    throw new Error('Document does not exist.');
  }
};

export const setNewUser = async (data: SignUpFormFields, userId: string) => {
  const newUser: User = {
    id: userId,
    email: data.email,
    password: data.password,
    profession: data.profession,
    typeOfUser: 'manager', // Example value for user type
    customers: [], // Empty customers for now
  };

  await setDoc(doc(db, 'users', userId), newUser);
  return await getCollectionWithId('users', userId);
};

export const setNewCustomer = async (
  userId: string,
  data: Customer<CustomerFields>,
) => {
  try {
    const customersColRef = collection(db, 'users', userId, 'customers');

    if (!data.history || data.history.length === 0) {
      const initialHistory = {
        date: new Date().toISOString(), // Current date
        summery: 'New text for summery', // Empty summary
        timestamp: new Date().toISOString(),
      };
      data.history = [initialHistory];
    }
    data.type = 'user';
    const docRef = await addDoc(customersColRef, data);
    data.id = docRef.id;
    await setDoc(docRef, { id: docRef.id }, { merge: true });

    console.log('Customer data added successfully with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding customer data:', error);
  }
};

export const addCustomerHistory = async (
  userId: string,
  customerId: string,
  newHistory: CustomerHistory,
) => {
  try {
    const customerDocRef = doc(db, 'users', userId, 'customers', customerId);
    const customerDoc = await getDoc(customerDocRef);
    if (customerDoc.exists()) {
      const customerData = customerDoc.data();
      console.log({ customerData });
      const updatedHistory = [...(customerData.history || []), newHistory];

      await updateDoc(customerDocRef, { history: updatedHistory });

      console.log('Customer history updated successfully!');
    } else {
      console.error('Customer does not exist!');
    }
  } catch (error) {
    console.error('Error updating customer history: ', error);
  }
};
