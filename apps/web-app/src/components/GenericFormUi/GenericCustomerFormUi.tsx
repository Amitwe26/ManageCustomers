import React from 'react';
import { updateCustomer } from '../../service/customerService';
import styled from 'styled-components';
import InputUi from '../InputUi/InputUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';
import { Path, useForm } from 'react-hook-form';
import { useAppContext } from '../../context/AppContext';
import SelectionUi from '../SelectionUi/SelectionUi';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer<CustomerFields>>();

  const renderFields = (isFirstInput?: boolean) => {
    const specificKeys = ['name', 'email', 'phone']; // The specific fields to render in the first form

    const firstFormFields = fields.filter((field) =>
      specificKeys.includes(field.key),
    );
    const secondFormFields = fields.filter(
      (field) => !specificKeys.includes(field.key),
    );

    return (isFirstInput ? firstFormFields : secondFormFields).map(
      (field, index) => {
        if (field.type === 'textarea') {
          return (
            <InputContainer key={field.key}>
              <TextAreaStyled
                id={field.key}
                placeholder={field.label}
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
              required={field?.required}
              register={register}
              errors={errors}
            />
          );
        }

        return (
          <InputContainer key={field.key}>
            <StyledInput
              fullWidth={specificKeys?.includes(field.key) ?? false}
              label={field.label}
              name={field.key as Path<Customer<CustomerFields>>}
              field={field}
              type={field.type}
              required={field?.required}
              register={register}
              errors={errors}
            />
          </InputContainer>
        );
      },
    );
  };

  const onSubmit = async (data: Customer<CustomerFields>) => {
    if (user?.id) {
      await updateCustomer(user.id, data);
      refetchCustomersData();
      setAddCustomerOpen(false);
      reset();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <CloseButton onClick={() => setAddCustomerOpen(false)}>
          {t('buttons.cancel')}
        </CloseButton>
      </FormHeader>
      <InputsWrapper $isFirstInputs={true}>{renderFields(true)}</InputsWrapper>
      <InputsWrapper>{renderFields()}</InputsWrapper>
      <ButtonUi
        type="submit"
        variant={'secondary'}
        label={t('buttons.add')}
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

const StyledInput = styled(InputUi<Customer<CustomerFields>>)<{
  fullWidth: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '50%')};
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
  resize: horizontal;
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

const InputsWrapper = styled.div<{ $isFirstInputs?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isFirstInputs }) =>
    $isFirstInputs ? '2fr 2fr 2fr' : '.5fr .5fr .5fr'};
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 15px;
`;
