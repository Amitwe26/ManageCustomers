import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface TextareaUiProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegisterReturn;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
}

const TextareaUi: React.FC<TextareaUiProps> = ({
  register,
  placeholder = '',
  rows = 4,
  maxLength,
  disabled = false,
  required = false,
  ...rest
}) => {
  return (
    <StyledTextarea
      {...register} // register still binds the input with react-hook-form
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      disabled={disabled}
      required={required}
      {...rest} // Spread any additional props
    />
  );
};

export default TextareaUi;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
  &:disabled {
    background-color: #f0f0f0;
  }
  &:required {
    border-color: red;
  }
`;
