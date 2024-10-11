import React, { useState } from 'react';
import GenericStrategyFormUi from '../GenericFormUi/GenericStrategyFormUi';
import { Meal, PlanningType } from '../../types/customersTypes';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormValues = {
  [key: string]: {
    ingredients: string;
    notes: string;
  };
};

const PlanningUi = ({
  item,
  key,
  fetchData,
}: {
  item: PlanningType;
  key: number;
  fetchData: () => Promise<void>;
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isMealsOpen, setIsMealsOpen] = React.useState(false);
  const { control, handleSubmit } = useForm<FormValues>();
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <ScrollContainer>
      <div key={key}>
        <MenuContainer>
          <Title>{item.title}</Title>
          <p>{item.planningNotes}</p>
          <p>{item.planningDate}</p>
          {!isEditing && (
            <button type="button" onClick={handleEdit}>
              {t('buttons.edit')}
            </button>
          )}
          <button onClick={() => setIsMealsOpen((prev) => !prev)}>
            {isMealsOpen
              ? t(`dietitian.meals.buttons.closeMeals`)
              : t(`dietitian.meals.buttons.openMeals`)}
          </button>
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

                    {/* Time */}
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
      </div>
    </ScrollContainer>
  );
};

export default PlanningUi;

const ScrollContainer = styled.div`
  overflow-y: scroll;
`;

const MenuContainer = styled.div`
  display: flex;
  border: 1px solid #f3f3f3;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
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
