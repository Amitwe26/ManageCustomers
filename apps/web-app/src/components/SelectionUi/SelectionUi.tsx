import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type Option = {
  label: string;
  value: string | number;
};

interface SelectionUiProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options?: Option[];
  register: UseFormRegister<T>;
  errors?: { [key: string]: any };
}

const SelectionUi = <T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
}: SelectionUiProps<T>) => {
  console.log({ name, options, label });
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <SelectionStyled id={name} {...register(name)}>
        {/*<option value={`${options[0]}`}>{options[0].label}</option>*/}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectionStyled>
      {errors && errors[name] && (
        <span className="error-message">{errors[name]?.message}</span>
      )}
    </Container>
  );
};

export default SelectionUi;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectionStyled = styled.select``;
