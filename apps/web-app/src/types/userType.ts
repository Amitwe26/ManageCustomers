import { Customer, InputField } from './customers';

export type CustomerFields = DietitianFields | DigitalFields;

export type DietitianFields = {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
  height: number;
  startWeight: number;
  endWeight: number;
  startDate: number;
  endDate: number;
  activityLevel: string;
  notes: string;
  // professionData: DietitianMenu[];
};

export type DigitalFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cardNumber: number;
  months: number;
  years: number;
  facebookUrl: string;
  instagram: string;
  website: string;
  marketingBudget: string;
  // professionData: DigitalMenu[];
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  profession: 'digital' | 'dietitian';
  typeOfUser: string;
  customers: Customer<CustomerFields>[];
};

export interface Profession {
  id: string;
  professionName: string;
  customerInputProfession: InputField[];
  taskPlanningInputList: InputField[];
}
