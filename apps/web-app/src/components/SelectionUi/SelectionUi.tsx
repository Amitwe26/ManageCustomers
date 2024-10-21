import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Option = {
  key: string;
  label: string;
  value?: string | number;
};

interface SelectionUiProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options?: Option[];
  register: UseFormRegister<T>;
  errors?: { [key: string]: any };
  required?: boolean;
}

const SelectionUi = <T extends FieldValues>({
  label,
  name,
  options,
  register,
  required,
  errors,
}: SelectionUiProps<T>) => {
  const { t } = useTranslation();
  return (
    <Container>
      <SelectionStyled id={name} required={required} {...register(name)}>
        {options?.map((option) => (
          <option key={option.key} value={option.value ?? option.key}>
            {t(`selectionInputs.${option.key}`)}
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
  align-self: start;
  width: 50%;
`;

const SelectionStyled = styled.select`
  padding: 9px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;
