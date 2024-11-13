import React from 'react';
import styled from 'styled-components';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { InputField, InputFieldType } from '../../types/customersTypes';
import { LoginFormFields } from '../../types/loginTypes';

interface InputUiProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: InputFieldType;
  required?: boolean;
  register: UseFormRegister<T>;
  error?: string;
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
    error,
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
      {error && <ErrorText className="error-massage">{error}</ErrorText>}
    </InputContainer>
  );
};
export default InputUi;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.text.gray};
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
