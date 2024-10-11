import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField, PlanningType } from '../../types/customersTypes';
import { CustomerFields, DietitianFields } from '../../types/userTypes';
import { useAppContext } from '../../context/AppContext';
import { getPlanningList, getUserProfession } from '../../utils/firebase';
import GenericPlanningForm from '../GenericFormUi/GenericPlanningForm';
import MealsUi from '../MealsUi/MealsUi';
import CalculateInfo from '../DietitianComponents/CalculateInfo';
import { useTranslation } from 'react-i18next';

const StrategyPageListUi = ({
  customer,
}: {
  customer: Customer<CustomerFields>;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const [addMenuIsOpen, setAddMenuIsOpen] = React.useState(false);
  const [fields, setFields] = useState<InputField[]>([]);

  const [strategyList, setStrategyList] = React.useState<PlanningType[]>();
  const fetchData = useCallback(async () => {
    if (user) {
      const [data, planningList] = await Promise.all([
        getUserProfession(),
        getPlanningList(user.id, customer.id),
      ]);
      setStrategyList(planningList);

      const professionData = data.find(
        (elem) => elem.professionName === user?.profession,
      );
      if (professionData) {
        setFields(professionData.taskPlanningInputList);
      }
    }
  }, [user, customer.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ScrollContainer>
      <MenusHeaderContainer>
        {user?.profession === 'dietitian' && (
          <CalculateInfo customer={customer as Customer<DietitianFields>} />
        )}

        <ButtonUi
          type="button"
          onClick={() => setAddMenuIsOpen(true)}
          label={t('customerDetails.strategy.buildStrategy')}
          variant={'primary'}
        />
      </MenusHeaderContainer>
      {addMenuIsOpen && (
        <GenericPlanningForm
          customerId={customer.id}
          fields={fields}
          setAddCustomerOpen={() => setAddMenuIsOpen(true)}
          refetchCustomersData={() => {}}
        />
      )}
      <MealsUi strategyList={strategyList} fetchData={fetchData} />
    </ScrollContainer>
  );
};

export default StrategyPageListUi;

const ScrollContainer = styled.div`
  overflow-y: scroll;
  height: 700px;
`;

const MenusHeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
