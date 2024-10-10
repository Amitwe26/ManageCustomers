interface BaseFormFields {
  email: string;
  password: string;
}

export interface FormField<T> {
  key: keyof T;
  type: 'text' | 'number' | 'email' | 'password' | 'selection';
  label: string;
  options?: { label: string; value: string | number }[];
  required?: boolean;
}

export type LoginFormFields = BaseFormFields;

export type SignUpFormFields = BaseFormFields & {
  confirmPassword: string;
  phone: string;
  name: string;
  profession: 'digital' | 'dietitian';
};

export interface AuthFormDocument {
  id: string;
  login: FormField<LoginFormFields>[];
  signup: FormField<SignUpFormFields>[];
}
