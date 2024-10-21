import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { InputField, PlanningType } from '../../types/customersTypes';
import { Path, useFieldArray, useForm } from 'react-hook-form';
import InputUi from '../InputUi/InputUi';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { useTranslation } from 'react-i18next';
import { addNewPlanning } from '../../service/planningService';

const GenericPlanningForm = ({
  fields,
  setAddPlanningIsOpen,
  customerId,
  refetchCustomersData,
}: {
  customerId: string;
  fields: InputField[];
  setAddPlanningIsOpen: (key: boolean) => void;
  refetchCustomersData: VoidFunction;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const basePathTranslation = 'customerDetails.strategy';
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PlanningType>();
  const {
    fields: optionsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'options',
  });

  const [titles, setTitles] = useState(
    optionsFields.map(
      (_, index) => `${t('customerDetails.strategy.option')} ${index + 1}`,
    ),
  );

  const onSubmit = async (data: PlanningType) => {
    if (user?.id) {
      await addNewPlanning(user.id, customerId, data);
      refetchCustomersData();
      setAddPlanningIsOpen(false);
      reset();
    }
  };
  const renderFields = (headerInputs: InputField[]) => {
    return headerInputs?.map((field, index) => (
      <InputContainer key={field.key + index}>
        <InputUi<PlanningType>
          label={t(`${basePathTranslation}.strategyInputs.${field.key}`)}
          name={field.key as Path<PlanningType>}
          type={field.type}
          field={field}
          register={register}
          errors={errors}
        />
      </InputContainer>
    ));
  };

  const handleTitleChange = (value: string, index: number) => {
    const updatedTitles = [...titles];
    updatedTitles[index] =
      `${t('customerDetails.strategy.option')} ${index + 1}: ${value}`;
    setTitles(updatedTitles);
  };

  const optionFields = fields.filter(
    (field) =>
      field.key !== 'title' &&
      field.key !== 'planningDate' &&
      field.key !== 'planningNotes',
  );
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <ButtonsContainer>
        <CloseButton
          label={t('customerDetails.strategy.closeStrategy')}
          onClick={() => setAddPlanningIsOpen(false)}
          variant="delete"
        />
        <SaveButton
          type="submit"
          variant="primary"
          label={t('customerDetails.strategy.saveStrategy')}
          onClick={() => {}}
        />
      </ButtonsContainer>
      <HeaderContainer>
        {renderFields(
          fields?.filter((field) =>
            ['title', 'planningDate', 'planningNotes'].includes(field.key),
          ),
        )}
      </HeaderContainer>

      <div>
        {optionsFields?.map((option, index) => (
          <div key={option.id}>
            <h4>{titles[index]}</h4>
            {optionFields?.map((field) => (
              <InputContainer key={field.key}>
                {field.type === 'textarea' ? (
                  <TextAreaStyled
                    id={field.key}
                    placeholder={field.label}
                    {...register(field.key as Path<PlanningType>)}
                  />
                ) : (
                  <InputUi
                    label={t(
                      `${basePathTranslation}.strategyInputs.${field.key}`,
                    )}
                    name={`options.${index}.${field.key}` as Path<PlanningType>}
                    type={field.type}
                    required={field.required}
                    register={register}
                    errors={errors}
                    onChange={(e) => {
                      if (field.key === 'optionName') {
                        handleTitleChange(e.target.value, index);
                      }
                    }}
                  />
                )}
              </InputContainer>
            ))}
            <RemovePlanning
              label={t('customerDetails.strategy.removeOption')}
              variant="delete"
              onClick={() => remove(index)} // Remove option dynamically
            />
          </div>
        ))}

        <AddOption
          label={t('customerDetails.strategy.addOption')}
          variant="primary"
          onClick={() => {
            append(
              optionFields.reduce((acc, field) => {
                acc[field.key] = '';
                return acc;
              }, {} as any),
            );
          }}
        />
      </div>
    </FormContainer>
  );
};

export default GenericPlanningForm;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const CloseButton = styled(ButtonUi)`
  margin-inline-end: 5px;
  margin-block-end: 10px;
`;

const SaveButton = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.primary};
  margin-block-end: 10px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RemovePlanning = styled(ButtonUi)`
  margin-bottom: 20px;
`;

const AddOption = styled(ButtonUi)`
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
  resize: horizontal;
  &:focus {
    outline: none;
    border-color: #1a4098;
  }
`;
