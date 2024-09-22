export interface Customer {
  id: string;
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitnessMenus?: FitnessMenu[];
  summaryConversation?: SummaryConversationType[];
}

export type SummaryConversationType = {
  date: string;
  description: string;
  timestamp: string;
};

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

export type CustomerFormKeys =
  | 'name'
  | 'age'
  | 'gender'
  | 'height'
  | 'weight'
  | 'fitnessMenus'
  | `fitnessMenus.${number}.title`
  | `fitnessMenus.${number}.date`
  | `fitnessMenus.${number}.notes`;
