import React from 'react';
import { setNewCustomer } from '../../utils/firebase';
import styled from 'styled-components';
import InputUi from '../InputUi/InputUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField } from '../../types/customers';
import { CustomerFields, User } from '../../types/userType';
import { Path, useForm } from 'react-hook-form';
import { useAppContext } from '../../context/AppContext';
import SelectionUi from '../SelectionUi/SelectionUi';

export const GenericCustomerFormUi = ({
  fields,
  setAddCustomerOpen,
  refetchCustomersData,
}: {
  fields: InputField[];
  setAddCustomerOpen: (open: boolean) => void;
  refetchCustomersData: () => void;
}) => {
  const { user } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer<CustomerFields>>();

  const renderFields = () => {
    return fields.map((field) => {
      if (field.type === 'textarea') {
        return (
          <InputContainer key={field.key}>
            <TextAreaStyled
              id={field.key}
              {...register(field.key as Path<Customer<CustomerFields>>)}
            />
          </InputContainer>
        );
      }

      if (field.type === 'selection') {
        return (
          <SelectionUi<Customer<CustomerFields>>
            key={field.key}
            label={field.label}
            name={field.key as Path<Customer<CustomerFields>>} // Ensuring type safety with Path
            options={field?.options ?? undefined}
            register={register}
            errors={errors}
          />
        );
      }

      return (
        <InputContainer key={field.key}>
          <InputUi<Customer<CustomerFields>>
            label={field.label}
            name={field.key as Path<Customer<CustomerFields>>} // Ensuring type safety with Path
            field={field}
            type={field.type}
            register={register}
            errors={errors}
          />
        </InputContainer>
      );
    });
  };

  const onSubmit = async (data: Customer<CustomerFields>) => {
    if (user?.id) {
      await setNewCustomer(user.id, data);
      refetchCustomersData();
      setAddCustomerOpen(false);
      reset();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <CloseButton onClick={() => setAddCustomerOpen(false)}>
          Close
        </CloseButton>
      </FormHeader>
      <InputsWrapper>{renderFields()}</InputsWrapper>
      <ButtonUi
        type="submit"
        variant={'secondary'}
        label="Add Customer"
        onClick={() => {}}
      />
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const TextAreaStyled = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  min-height: 38px;
  max-height: 78px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #1a4098;
  }
`;
const FormHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
`;

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  gap: 20px;
  margin-bottom: 20px;
`;
