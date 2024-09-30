import { CustomerFields } from './userType';

export type CustomerKeys = NestedKeys<Customer<CustomerFields>>;

export type FitnessMenu = {
  title: string;
  date: string;
  notes: string;
  meals: Meal[];
};

export type Meal = {
  nameMeal: string;
  ingredients: string;
  notes: string;
  startTime: string;
  endTime: string;
};

export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'textarea' | 'password';
  key: string;
}

type CustomerData<T> = {
  [K in keyof T]: string | number;
};
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Array<infer U>
          ? `${K}` | `${K}.${number}` | `${K}.${number}.${NestedKeys<U>}`
          : T[K] extends object
            ? `${K}` | `${K}.${NestedKeys<T[K]>}` // Recursive for nested objects
            : `${K}`
        : string; // Instead of `never`, fallback to `string`
    }[keyof T]
  : string;

export type Customer<T> = {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  history?: {
    date: string;
    summery: string;
    timestamp: string;
  }[];
} & T;

export interface CustomerHistory {
  date: string;
  summery: string;
  timestamp: string;
}
