import React, { useState } from 'react';
import { Customer } from '../../types/customersTypes';
import { CustomerFields, Profession } from '../../types/userTypes';
import { Path, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { saveCustomer } from '../../utils/firebase';
import { useAppContext } from '../../context/AppContext';
import SelectionUi from '../SelectionUi/SelectionUi';
import { useTranslation } from 'react-i18next';
import ContainerUi from '../ContainerUi/ContainerUi';
import ButtonUi from '../ButtonUi/ButtonUi';

const CustomerInfoUi = ({
  customer,
  profession,
  isHeaderShown,
}: {
  customer: Customer<CustomerFields>;
  profession: Profession | null;
  isHeaderShown: boolean;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Customer<CustomerFields>>({
    defaultValues: customer,
  });

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
              required={Boolean(inputField?.required)}
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
    <ContainerUi headerHeight={isHeaderShown ? 4.8 : 2}>
      <FlexContainer>
        <EditButton
          onClick={handleEditToggle}
          label={isEditMode ? t('buttons.save') : t('buttons.edit')}
          variant="softOrange"
        />

        <ContainerInfo>{renderFields()}</ContainerInfo>
      </FlexContainer>
    </ContainerUi>
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

const EditButton = styled(ButtonUi)`
  width: 70px;
  margin-bottom: 20px;
  padding: 5px 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
`;
