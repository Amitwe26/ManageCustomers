import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../service/loginService';

export const getCollection = async <T>(
  collectionPath: string,
): Promise<T[]> => {
  const collectionRef = collection(db, collectionPath);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
};

export const getDocumentById = async <T>(
  collectionPath: string,
  docId: string,
): Promise<T | null> => {
  const docRef = doc(db, collectionPath, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
};

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  // db: Firestore,
  collectionName: string,
  data: T,
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef;
  } catch (error) {
    console.error(
      `Error adding document to collection ${collectionName}:`,
      error,
    );
    throw error;
  }
};

export const updateDocument = async <T>(
  collectionPath: string,
  docId: string,
  data: Partial<T>,
): Promise<void> => {
  const docRef = doc(db, collectionPath, docId);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (
  collectionPath: string,
  docId: string,
): Promise<void> => {
  const docRef = doc(db, collectionPath, docId);
  await deleteDoc(docRef);
};

export const setDocument = async <T>(
  collectionPath: string,
  docId: string,
  data: Partial<T>,
  merge = true,
): Promise<void> => {
  const docRef = doc(db, collectionPath, docId);
  await setDoc(docRef, data, { merge });
};

export const getDocuments = async <T>(collectionPath: string): Promise<T[]> => {
  const collectionRef = collection(db, collectionPath);
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
};
