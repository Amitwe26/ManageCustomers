import React, { useState } from 'react';
import { Customer } from '../../types/customers';
import { CustomerFields, Profession } from '../../types/userType';
import { Path, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { saveCustomer } from '../../utils/firebase';
import { useAppContext } from '../../context/AppContext';
import SelectionUi from '../SelectionUi/SelectionUi';

const CustomerInfoUi = ({
  customer,
  profession,
}: {
  customer: Customer<CustomerFields>;
  profession: Profession | null;
}) => {
  const { user } = useAppContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Customer<CustomerFields>>({
    defaultValues: customer,
  });
  console.log(!Object.keys(errors).length, isDirty);
  const handleEditToggle = () => {
    if (isEditMode && isDirty) {
      handleSubmit(onSubmit)();
      setIsEditMode(!isEditMode);
    }
    if (!isDirty) setIsEditMode(!isEditMode);
  };

  const onSubmit = async (data: Customer<CustomerFields>) => {
    try {
      if (user?.id) {
        await saveCustomer(user.id, data, customer.id);
        setIsEditMode(false);
        reset(data);
      }
    } catch (error) {
      console.error('Error saving customer data:', error);
    }
  };
  console.log(errors);
  const renderFields = () => {
    if (!profession) return <p>Loading profession data...</p>;

    return profession.customerInputProfession.map((inputField) => {
      const value =
        customer[inputField.key as keyof Customer<CustomerFields>] || '';

      return isEditMode ? (
        <InputContainer key={inputField.key}>
          <LabelStyled htmlFor={inputField.key}>{inputField.label}</LabelStyled>
          {inputField.type === 'selection' && inputField.options ? (
            <SelectionUi
              label={inputField.label}
              name={inputField.key as Path<Customer<CustomerFields>>}
              options={inputField.options}
              register={register}
              errors={errors}
            />
          ) : (
            <InputStyled
              type={inputField.type}
              id={inputField.key}
              {...register(inputField.key as keyof Customer<CustomerFields>, {
                required: `${inputField.label} is required`,
              })}
              defaultValue={value?.toString()}
            />
          )}
          {errors[inputField.key as keyof Customer<CustomerFields>] && (
            <ErrorText>
              {
                errors[inputField.key as keyof Customer<CustomerFields>]
                  ?.message
              }
            </ErrorText>
          )}
        </InputContainer>
      ) : (
        <Label key={inputField.key}>
          {`${inputField.label}: ${value?.toString() || 'N/A'}`}
        </Label>
      );
    });
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <FlexContainer>
      <EditButton onClick={handleEditToggle}>
        {isEditMode ? 'Save' : 'Edit'}
      </EditButton>
      <ContainerInfo>{renderFields()}</ContainerInfo>
    </FlexContainer>
  );
};

export default CustomerInfoUi;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ContainerInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const InputStyled = styled.input`
  padding: 10px;
  gap: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.span`
  padding: 10px;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const LabelStyled = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

const EditButton = styled.button`
  width: 70px;
  margin-bottom: 20px;
  padding: 5px 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
