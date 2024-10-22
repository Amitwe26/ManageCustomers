import React from 'react';
import { InputField, PlanningType } from '../../types/customersTypes';
import PlanningUi from '../PlanningUi/PlanningUi';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const PlanningListUi = ({
  strategyList,
  fetchData,
  handleDeletePlanning,
  fields,
}: {
  strategyList?: PlanningType[];
  fetchData: VoidFunction;
  handleDeletePlanning: (id: string) => Promise<void>;
  fields: InputField[];
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      {strategyList?.length ? (
        strategyList?.map((item, index) => (
          <PlanningUi
            item={item}
            key={index}
            fetchData={fetchData}
            handleDeletePlanning={handleDeletePlanning}
            fields={fields}
          />
        ))
      ) : (
        <EmptyPlanningList>
          <EmptyPlanningListText>
            {t('emptyPlanningList')}
          </EmptyPlanningListText>
        </EmptyPlanningList>
      )}
    </Container>
  );
};

export default PlanningListUi;

const Container = styled.div`
  padding-bottom: 20px;
`;

const EmptyPlanningList = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.white};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 15px 0;
  text-align: center;
`;

const EmptyPlanningListText = styled.span`
  font-size: 18px;
`;
