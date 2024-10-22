import React, { useState } from 'react';
import { Customer } from '../../types/customersTypes';
import { CustomerFields, Profession } from '../../types/userTypes';
import { Path, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import SelectionUi from '../SelectionUi/SelectionUi';
import { useTranslation } from 'react-i18next';
import ContainerUi from '../ContainerUi/ContainerUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import InputUi from '../InputUi/InputUi';

const CustomerInfoUi = ({
  customer,
  profession,
  isHeaderShown,
  onUpdateCustomer,
}: {
  customer?: Customer<CustomerFields>;
  profession: Profession | null;
  isHeaderShown: boolean;
  onUpdateCustomer: (updatedCustomer: Customer<CustomerFields>) => void;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const arraySelectionKeys = ['status', 'paymentType', 'gender'];
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer<CustomerFields>>({
    defaultValues: customer ?? {},
  });

  const handleEditToggle = () => {
    if (isEditMode) {
      handleSubmit(onSubmit)();
      setIsEditMode(!isEditMode);
    } else setIsEditMode(!isEditMode);
  };

  const onSubmit = async (data: Customer<CustomerFields>) => {
    try {
      if (user?.id) {
        onUpdateCustomer(data);
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
        customer?.[inputField.key as keyof Customer<CustomerFields>] || '';

      return isEditMode ? (
        <InputContainer key={inputField.key}>
          <LabelStyled htmlFor={inputField.key}>
            {t(`customerProfile.${inputField.key}`)}
          </LabelStyled>
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
            <InputUi
              label={inputField.label}
              name={inputField.key as Path<Customer<CustomerFields>>}
              type={inputField.type}
              register={register}
              errors={errors}
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
          {`${t(`customerProfile.${inputField.key}`)}: ${arraySelectionKeys.find((key) => inputField.key === key) ? t(`selectionInputs.${value}`) : (value?.toString() ?? 'N/A')}`}
        </Label>
      );
    });
  };

  if (!customer) {
    return <p>{t('loadingText')}</p>;
  }

  return (
    <ContainerUi isHeaderVisible={isHeaderShown}>
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
