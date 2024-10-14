import React from 'react';
import { Path, useFieldArray, useForm } from 'react-hook-form';
import InputUi from '../InputUi/InputUi';
import { PlanningType } from '../../types/customersTypes';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import ButtonUi from '../ButtonUi/ButtonUi';
import { useTranslation } from 'react-i18next';
import { updatePlanning } from '../../service/planningService';

const GenericStrategyFormUi = ({
  initialData,
  onCloseEditing,
  fetchData,
}: {
  initialData: PlanningType;
  onCloseEditing: () => void;
  fetchData: VoidFunction;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const { id: customerId } = useParams<{ id: string }>();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    defaultValues: initialData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options', // Name of the dynamic field array
  });
  const onSubmit = async (data: any) => {
    if (data && user && customerId) {
      try {
        await updatePlanning(user.id, customerId, data.id, data);
        fetchData();
        onCloseEditing();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <StrategyContainer>
          <HeaderButtons>
            <SaveButton
              type="submit"
              label={t('buttons.save')}
              onClick={() => {}}
            />
            <CloseButton
              type="button"
              onClick={onCloseEditing}
              label={t('buttons.close')}
              variant="delete"
            />
          </HeaderButtons>
          <InputUi
            label="Title"
            name="title"
            type="text"
            register={register}
            errors={errors}
          />
          <InputUi
            label="Planning Date"
            name="planningDate"
            type="date"
            register={register}
            errors={errors}
          />
          <label>Planning Notes</label>
          <TextAreaStyled
            placeholder="Planning Notes"
            {...register('planningNotes')}
          />
        </StrategyContainer>
        <TemplateOptions>
          {fields.map((meal, index) => {
            return (
              <OptionContainer key={index}>
                <HeaderOptions>
                  <h3>Option {index + 1}</h3>
                  {index !== 0 && (
                    <DeleteButton
                      type="button"
                      onClick={() => remove(index)}
                      label={'x'}
                    />
                  )}
                </HeaderOptions>
                <InputUi
                  label="Option Name"
                  name={`options.${index}.optionName` as Path<PlanningType>}
                  type="text"
                  register={register}
                  errors={errors}
                />
                <label>Ingredients</label>
                <TextAreaStyled
                  placeholder="Ingredients"
                  {...register(`options.${index}.ingredients`)}
                />
                <label>Notes</label>
                <TextAreaStyled
                  placeholder="Notes"
                  {...register(`options.${index}.notes`)}
                />
                <TimeContainer>
                  <label>From:</label>
                  <InputUi
                    label="start Date"
                    name={`options.${index}.startTime` as Path<PlanningType>}
                    type="time"
                    register={register}
                    errors={errors}
                  />
                  <label>To:</label>
                  <InputUi
                    label="start Date"
                    name={`options.${index}.endTime` as Path<PlanningType>}
                    type="time"
                    register={register}
                    errors={errors}
                  />
                </TimeContainer>
              </OptionContainer>
            );
          })}
          <AddButton
            type="button"
            onClick={() =>
              append({
                optionName: '',
                ingredients: '',
                notes: '',
                startTime: '',
                endTime: '',
              })
            }
            label={'+'}
          />
        </TemplateOptions>
      </Container>
    </StyledForm>
  );
};

export default GenericStrategyFormUi;

const StyledForm = styled.form`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 7px ${(props) => props.theme.spacing.m - 1}px;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  background-color: #faf2f2;
  padding: 10px;
  border-radius: 10px;
`;

const StrategyContainer = styled.div`
  width: 50%;
`;

const HeaderButtons = styled.div`
  width: 50%;
  position: sticky;
  top: 0;
  left: 0;
`;

const TemplateOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const OptionContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.s}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor.white};
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
`;

const HeaderOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextAreaStyled = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  min-height: 48px;
  max-height: 78px;
  resize: vertical;
  font-family: 'Apple Braille';

  &:focus {
    outline: none;
    border-color: #1a4098;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CloseButton = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.delete};
  margin-bottom: ${({ theme }) => theme.spacing.m}px;
`;

const SaveButton = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.light};
  margin: 0 0 ${({ theme }) => theme.spacing.m}px
    ${({ theme }) => theme.spacing.m}px;
`;

const AddButton = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.light};
  opacity: 0.5;
  margin-inline-start: ${({ theme }) => theme.spacing.l}px;
  font-size: 30px;
  align-self: center;
  max-width: 20%;
`;

const DeleteButton = styled(ButtonUi)`
  background-color: ${({ theme }) => theme.colors.button.delete};
  height: 30px;
  align-self: center;
`;
