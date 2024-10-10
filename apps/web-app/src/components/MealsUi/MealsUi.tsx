import React from 'react';
import styled from 'styled-components';
import { Meal, PlanningType } from '../../types/customersTypes';
import { useTranslation } from 'react-i18next';

const MealsUi = ({ strategyList }: { strategyList?: PlanningType[] }) => {
  const { t } = useTranslation();
  const [isMealsOpen, setIsMealsOpen] = React.useState(false);

  return (
    <div>
      {strategyList?.map((item, index) => (
        <div key={index}>
          <MenuContainer>
            <Title>{item.title}</Title>
            <p>{item.planningNotes}</p>
            <p>{item.planningDate}</p>
            <button onClick={() => setIsMealsOpen((prev) => !prev)}>
              {isMealsOpen
                ? t(`dietitian.meals.buttons.closeMeals`)
                : t(`dietitian.meals.buttons.openMeals`)}
            </button>
          </MenuContainer>
          <Container>
            {isMealsOpen &&
              item?.options?.map((meal: Meal, index) => {
                return (
                  <MealContainer key={index}>
                    <h4>{meal.optionName}</h4>
                    <p>
                      <h3> {t(`dietitian.meals.ingredients`)}:</h3>
                      {meal.ingredients}
                    </p>
                    <p>
                      <h4>{t(`dietitian.meals.notes`)}</h4> {meal.notes}
                    </p>
                    <p>
                      <h4>
                        {t(`dietitian.meals.time`)}: {meal.startTime}-{' '}
                        {meal.endTime}
                      </h4>
                    </p>
                  </MealContainer>
                );
              })}
          </Container>
        </div>
      ))}
    </div>
  );
};

export default MealsUi;

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
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32%, 25%));
`;

const MealContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 0 5px;
`;
