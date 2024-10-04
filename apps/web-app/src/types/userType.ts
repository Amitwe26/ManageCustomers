import { Customer, InputField } from './customers';

export type CustomerFields = DietitianFields | DigitalFields;

export type DietitianFields = {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  age: number;
  height: number;
  startWeight: number;
  endWeight: number;
  startDate: number;
  endDate: number;
  activityLabel: string;
  notes: string;
  // professionData: DietitianMenu[];
};

export type DigitalFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  marketingBudget: string;
  // professionData: DigitalMenu[];
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  profession: string;
  typeOfUser: string;
  customers: Customer<CustomerFields>[];
};

export interface Profession {
  id: string;
  professionName: string;
  customerInputProfession: InputField[];
  taskPlanningInputList: InputField[];
}
