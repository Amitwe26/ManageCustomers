import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as authUser,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const CreateNewUser = async ({ email, password }: UserType) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

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
  onAuthStateChanged(auth, callback);
};
