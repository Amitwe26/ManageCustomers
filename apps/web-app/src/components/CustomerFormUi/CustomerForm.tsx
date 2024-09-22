import React from 'react';
import InputUi from '../InputUi/InputUi';
import { useForm } from 'react-hook-form';
import InputSelection from '../InputSelectionUi/InputSelection';
import ButtonUi from '../ButtonUi/ButtonUi';
import styled from 'styled-components';
import { Customer } from '../../types/customers';

const CustomerForm: React.FC<{
  onAddCustomer: (customer: Customer) => void;
  setAddCustomerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onAddCustomer, setAddCustomerOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Customer>();

  const onSubmit = (data: Customer) => {
    onAddCustomer(data);
    reset();
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <h2>New Customer</h2>
        <CloseButton onClick={() => setAddCustomerOpen(false)}>
          Close
        </CloseButton>
      </FormHeader>
      <InputsWrapper>
        <InputUi
          label="Name"
          name="name"
          type="text"
          setValue={setValue}
          register={register}
          error={errors}
        />
        <InputUi
          label="Age"
          name="age"
          type="number"
          setValue={setValue}
          register={register}
          error={errors}
        />
        <InputUi
          label="Height (cm)"
          name="height"
          type="number"
          setValue={setValue}
          register={register}
          error={errors}
        />
        <InputUi
          label="Weight (kg)"
          name="weight"
          type="number"
          setValue={setValue}
          register={register}
          error={errors}
        />
        <InputSelection
          label="Gender"
          name="gender"
          options={['Male', 'Female', 'Other']}
          register={register}
        />
      </InputsWrapper>

      <ButtonUi
        type="submit"
        variant={'secondary'}
        label="Add Customer"
        onClick={() => {}}
      />
    </FormContainer>
  );
};

export default CustomerForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

// Assuming ButtonUi is already styled nicely, no further modifications required there.
