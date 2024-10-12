import React from 'react';
import GenericStrategyFormUi from '../GenericFormUi/GenericStrategyFormUi';
import { Meal, PlanningType } from '../../types/customersTypes';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ButtonUi from '../ButtonUi/ButtonUi';

type FormValues = {
  [key: string]: {
    ingredients: string;
    notes: string;
  };
};

const PlanningUi = ({
  item,
  fetchData,
  handleDeletePlanning,
}: {
  item: PlanningType;
  fetchData: VoidFunction;
  handleDeletePlanning: (id: string) => Promise<void>;
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isMealsOpen, setIsMealsOpen] = React.useState(false);
  const { control } = useForm<FormValues>();
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <ScrollContainer>
      <MenuContainer>
        <Title>{item.title}</Title>
        <label>{item.planningNotes}</label>
        <label>{item.planningDate}</label>
        <ButtonUi
          type="button"
          variant="softOrange"
          onClick={handleEdit}
          label={t('buttons.edit')}
          disabled={isEditing}
        />
        <ButtonUi
          onClick={() => setIsMealsOpen((prev) => !prev)}
          label={
            isMealsOpen
              ? t(`dietitian.meals.buttons.closeMeals`)
              : t(`dietitian.meals.buttons.openMeals`)
          }
          variant={isMealsOpen ? 'light' : 'primary'}
        />

        <ButtonUi
          type="button"
          variant="delete"
          onClick={() => handleDeletePlanning(item.id)}
          label={t('buttons.delete')}
        />
      </MenuContainer>
      {isEditing ? (
        <GenericStrategyFormUi
          initialData={item}
          onCloseEditing={handleEdit}
          fetchData={fetchData}
        />
      ) : (
        <Container>
          {isMealsOpen &&
            item?.options?.map((meal: Meal, index) => {
              return (
                <MealContainer key={index}>
                  <h3>{meal.optionName}</h3>
                  <div>
                    <h4>{t(`dietitian.meals.ingredients`)}</h4>
                    {isEditing ? (
                      <Controller
                        name={`meal-${index}.ingredients`}
                        control={control}
                        defaultValue={meal.ingredients}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            placeholder={t('dietitian.meals.ingredients')}
                          />
                        )}
                      />
                    ) : (
                      <StyledPre>{meal.ingredients}</StyledPre>
                    )}
                  </div>
                  <div>
                    <h4>{t(`dietitian.meals.notes`)}</h4>
                    {isEditing ? (
                      <Controller
                        name={`meal-${index}.notes`}
                        control={control}
                        defaultValue={meal.notes}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            placeholder={t('dietitian.meals.notes')}
                          />
                        )}
                      />
                    ) : (
                      <StyledPre>{meal.notes}</StyledPre>
                    )}
                  </div>
                  <div>
                    <h4>
                      {t(`dietitian.meals.time`)}: {meal.startTime} -{' '}
                      {meal.endTime}
                    </h4>
                  </div>
                </MealContainer>
              );
            })}
        </Container>
      )}
    </ScrollContainer>
  );
};

export default PlanningUi;

const ScrollContainer = styled.div`
  padding: 0 0 0 ${({ theme }) => theme.spacing.s}px;
  overflow-y: scroll;
`;

const MenuContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.m}px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.3fr 0.45fr 0.3fr;
  gap: 6px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 6px 15px;
`;

const Title = styled.h1`
  font-size: 16px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  justify-content: space-around;
`;

const MealContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 0 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const StyledPre = styled.pre`
  background-color: rgba(251, 246, 246, 0.32);
  padding: 10px;
  white-space: pre-wrap; /* This preserves newlines and spaces */
  word-wrap: break-word; /* Break long words onto the next line */
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Apple Braille';
  margin-top: 10px;
`;
