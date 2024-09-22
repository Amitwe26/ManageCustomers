import React from 'react';
import styled from 'styled-components';

interface InputSelectionProps {
  label: string;
  name: string;
  options: string[];
  register: any;
}

const InputSelection = ({
  label,
  name,
  options,
  register,
}: InputSelectionProps) => {
  return (
    <SelectionContainer>
      <Label>{label}</Label>
      <Select {...register(name)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </SelectionContainer>
  );
};

export default InputSelection;

// Styled Components
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #1a4098;
  }
`;
