import React from 'react';
import styled from 'styled-components';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { InputField, InputFieldType } from '../../types/customersTypes';

interface InputUiProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: InputFieldType;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field?: InputField;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputUi = <T extends FieldValues>(props: InputUiProps<T>) => {
  const {
    label,
    name,
    required = true,
    className,
    type,
    register,
    errors,
    onChange,
  } = props;

  return (
    <InputContainer className={className}>
      <StyledInput
        type={type}
        {...register(name)}
        placeholder={label}
        required={required}
        onChange={onChange}
      />
      {errors[name] && (
        <ErrorText className="error-massage">This field is required</ErrorText>
      )}
    </InputContainer>
  );
};
export default InputUi;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
