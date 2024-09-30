import { Customer, FitnessMenu, InputField } from './customers';

export type CustomerFields = FitnessFields | DigitalFields;

export type FitnessFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  weight: number;
  height: number;
  professionData: FitnessMenu[];
};

export type DigitalFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  professionData?: { website: string; marketingBudget: string };
};

export type User = {
  id: string;
  email: string;
  password: string;
  profession: string;
  typeOfUser: string;
  customers: Customer<CustomerFields>[];
};

export interface Profession {
  id: string;
  professionName: string;
  fields: InputField[];
}
