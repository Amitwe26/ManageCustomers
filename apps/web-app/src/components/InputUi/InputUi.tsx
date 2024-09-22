import React from 'react';
import styled from 'styled-components';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Customer, CustomerFormKeys } from '../../types/customers';

interface InputUiProps {
  label: string;
  name: CustomerFormKeys;
  type: 'number' | 'text';
  required?: boolean;
  setValue: UseFormSetValue<Customer>;
  register: UseFormRegister<Customer>;
  error: FieldErrors;
}

const InputUi = ({
  label,
  name,
  type,
  required = true,
  register,
  error,
}: InputUiProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput
        {...register(name, { required })}
        type={type}
        placeholder={label}
        required={required}
      />
      {error[name] && <ErrorText>This field is required</ErrorText>}
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
