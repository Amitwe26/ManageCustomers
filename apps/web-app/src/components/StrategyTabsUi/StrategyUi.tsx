import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField, PlanningType } from '../../types/customers';
import { CustomerFields, DietitianFields } from '../../types/userType';
import { useAppContext } from '../../context/AppContext';
import { getPlanningList, getUserProfession } from '../../utils/firebase';
import GenericPlanningForm from '../GenericFormUi/GenericPlanningForm';
import MealsUi from '../MealsUi/MealsUi';
import CalculateInfo from '../DietitianComponents/CalculateInfo';

const StrategyUi = ({ customer }: { customer: Customer<CustomerFields> }) => {
  const { user } = useAppContext();
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
    <div>
      <MenusHeaderContainer>
        {user?.profession === 'dietitian' && (
          <CalculateInfo customer={customer as Customer<DietitianFields>} />
        )}

        <ButtonUi
          type="button"
          onClick={() => setAddMenuIsOpen(true)}
          label={'Add new strategy'}
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
      <MealsUi strategyList={strategyList} />
    </div>
  );
};

export default StrategyUi;
const MenusHeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
