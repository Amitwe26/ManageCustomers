import React from 'react';
import { PlanningType } from '../../types/customersTypes';
import PlanningUi from '../PlanningUi/PlanningUi';
import styled from 'styled-components';

const MealsUi = ({
  strategyList,
  fetchData,
}: {
  strategyList?: PlanningType[];
  fetchData: () => Promise<void>;
}) => {
  return (
    <ScrollContainer
      height={strategyList?.length ? strategyList.length * 590 : undefined}
    >
      {strategyList?.map((item, index) => (
        <PlanningUi item={item} key={index} fetchData={fetchData} />
      ))}
    </ScrollContainer>
  );
};

export default MealsUi;

const ScrollContainer = styled.div<{ height?: number }>`
  height: ${({ height }) => (height ? `${height}px` : '500px')};
  overflow-y: scroll;
`;
