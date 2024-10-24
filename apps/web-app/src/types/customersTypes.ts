import React from 'react';

export type PlanningType = BasePlanning<Meal>;

export type BasePlanning<T> = {
  id: string;
  title: string;
  planningDate: string;
  planningNotes: string;
  options: T[];
};

export type Meal = {
  optionName: string;
  ingredients: string;
  notes: string;
  startTime: string;
  endTime: string;
};

export type InputField = {
  id: string;
  label: string;
  type: InputFieldType;
  key: string;
  options?: { key: string; label: string; value?: string | number }[];
  required?: boolean;
};

export type InputFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'textarea'
  | 'password'
  | 'date'
  | 'time'
  | 'selection';

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
  phone: number;
  email: string;
  type: string;
  date: string;
  status: 'think' | 'stop' | 'work' | 'oneTime';
  tasks: string[];
  price: number;
  paymentType: string;
  history?: CustomerHistory[];
  planningList: PlanningType[];
} & T;

export interface CustomerHistory {
  date: string;
  summery: string;
  timestamp: string;
}

export enum CustomerTabs {
  SUMMARY = 'summary',
  STRATEGY = 'strategy',
  INFO = 'info',
}

export type TabComponents = {
  [key in CustomerTabs]: React.FC;
};
