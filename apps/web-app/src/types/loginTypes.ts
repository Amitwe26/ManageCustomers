interface BaseFormFields {
  email: string;
  password: string;
}

export interface FormField<T> {
  key: keyof T;
  type: 'text' | 'number' | 'email' | 'textarea' | 'password';
  label: string;
}

export type LoginFormFields = BaseFormFields;

export type SignUpFormFields = BaseFormFields & {
  confirmPassword: string;
  phone: string;
  name: string;
  profession: string;
};

export interface AuthFormDocument {
  id: string;
  login: FormField<LoginFormFields>[];
  signup: FormField<SignUpFormFields>[];
}
