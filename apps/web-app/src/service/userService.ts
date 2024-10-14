import { SignUpFormFields } from '../types/loginTypes';
import {
  getCollection,
  getDocumentById,
  setDocument,
} from '../utils/firestoreUtils';
import { Profession, User } from '../types/userTypes';

export const setNewUser = async (data: SignUpFormFields, userId: string) => {
  const newUser: User = {
    id: userId,
    name: data.name,
    email: data.email,
    password: data.password,
    profession: data.profession,
    typeOfUser: 'manager',
    customers: [],
  };

  await setDocument<User>('users', userId, newUser);
  return await getDocumentById<User>('users', userId);
};

export const getUserInfo = async (userId: string): Promise<User | null> => {
  return await getDocumentById<User>('users', userId);
};

export const getUserProfession: () => Promise<Profession[]> = () =>
  getCollection('professions');
