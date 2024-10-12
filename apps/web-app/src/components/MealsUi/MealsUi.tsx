import React from 'react';
import { PlanningType } from '../../types/customersTypes';
import PlanningUi from '../PlanningUi/PlanningUi';
import styled from 'styled-components';

const MealsUi = ({
  strategyList,
  fetchData,
  handleDeletePlanning,
}: {
  strategyList?: PlanningType[];
  fetchData: VoidFunction;
  handleDeletePlanning: (id: string) => Promise<void>;
}) => {
  return (
    <Container>
      {strategyList?.map((item, index) => (
        <PlanningUi
          item={item}
          key={index}
          fetchData={fetchData}
          handleDeletePlanning={handleDeletePlanning}
        />
      ))}
    </Container>
  );
};

export default MealsUi;

const Container = styled.div`
  padding-bottom: 20px;
`;
