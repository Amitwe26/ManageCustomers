import React from 'react';
import styled from 'styled-components';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { InputField } from '../../types/customers';

interface InputUiProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // Ensure `name` matches one of the form data keys
  type: 'text' | 'number' | 'email' | 'textarea' | 'password';
  required?: boolean;
  register: UseFormRegister<T>; // `register` should match the form data type
  errors: FieldErrors<T>; // Errors should match the form data type
  field: InputField;
}

const InputUi = <T extends FieldValues>(props: InputUiProps<T>) => {
  const { label, name, type, required = true, register, errors } = props;
  return (
    <InputContainer>
      <StyledInput
        // {/*{...props}*/}
        type={type}
        {...register(name)}
        placeholder={label}
        required={required}
      />
      {errors[name] && <ErrorText>This field is required</ErrorText>}
    </InputContainer>
  );
};
export default InputUi;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1a4098;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
