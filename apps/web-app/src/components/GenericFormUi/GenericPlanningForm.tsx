import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { InputField, PlanningType } from '../../types/customersTypes';
import { Path, useFieldArray, useForm } from 'react-hook-form';
import InputUi from '../InputUi/InputUi';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { useTranslation } from 'react-i18next';
import { addNewPlanning, updatePlanning } from '../../service/planningService';
import TextareaUi from '../TextAreaUi/TextAreaUi';
import { useParams } from 'react-router-dom';

const GenericPlanningForm = ({
  fields,
  setAddPlanningIsOpen,
  fetchData,
  initialData,
}: {
  fields: InputField[];
  setAddPlanningIsOpen: (key: boolean) => void;
  fetchData: VoidFunction;
  initialData?: PlanningType;
}) => {
  const { user } = useAppContext();
  const { id: customerId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const basePathTranslation = 'customerDetails.strategy';
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PlanningType>({
    defaultValues: initialData ?? {
      title: '',
      planningDate: '',
      planningNotes: '',
      options: [
        {
          optionName: '',
          ingredients: '',
          notes: '',
          startTime: '',
          endTime: '',
        },
      ],
    },
  });
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
    if (user?.id && customerId) {
      if (initialData) await updatePlanning(user.id, customerId, data.id, data);
      else await addNewPlanning(user.id, customerId, data);
      fetchData();
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
      <GridOptions>
        {optionsFields?.map((option, index) => (
          <OptionsContainer key={option.id}>
            <RemovePlanning
              label={t('customerDetails.strategy.removeOption')}
              variant="delete"
              disabled={index === 0}
              onClick={() => remove(index)} // Remove option dynamically
            />
            <h4>{titles[index]}</h4>
            {optionFields?.map((field) => (
              <InputContainer key={field.key}>
                {field.type === 'textarea' ? (
                  <TextareaUi
                    placeholder={t(
                      `${basePathTranslation}.strategyInputs.${field.key}`,
                    )}
                    defaultValue={initialData?.options.toString()}
                    register={register(
                      `options.${index}.${field.key}` as Path<PlanningType>,
                    )}
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
          </OptionsContainer>
        ))}
        <>
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
        </>
      </GridOptions>
    </FormContainer>
  );
};

export default GenericPlanningForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #faf8e8;
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
  width: 40%;
  gap: 10px;
`;

const GridOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  padding-bottom: 20px;
  justify-content: space-around;
`;

const OptionsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 20px 5px 0;
  //width: 30%;
`;

const RemovePlanning = styled(ButtonUi)``;

const AddOption = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.light};
  opacity: 0.5;
  margin-inline-start: ${({ theme }) => theme.spacing.l}px;
  font-size: 16px;
  align-self: center;
  max-width: 20%;
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
