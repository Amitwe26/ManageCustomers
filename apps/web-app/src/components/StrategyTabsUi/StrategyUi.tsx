import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField, PlanningType } from '../../types/customers';
import { CustomerFields } from '../../types/userType';
import { useAppContext } from '../../context/AppContext';
import { getPlanningList, getUserProfession } from '../../utils/firebase';
import GenericPlanningForm from '../GenericFormUi/GenericPlanningForm';
import MealsUi from '../MealsUi/MealsUi';

const StrategyUi = ({ customer }: { customer: Customer<CustomerFields> }) => {
  const { user } = useAppContext();
  const [addMenuIsOpen, setAddMenuIsOpen] = React.useState(false);
  const [fields, setFields] = useState<InputField[]>([]);

  const [strategyList, setStrategyList] = React.useState<PlanningType[]>();
  useEffect(() => {
    const fetchFields = async () => {
      if (user) {
        const data = await getUserProfession();
        const planningList = await getPlanningList(user.id, customer.id);
        setStrategyList(planningList);
        const res = data.find(
          (elem) => elem.professionName === user?.profession,
        );
        if (res) setFields(res.taskPlanningInputList);
      }
    };

    fetchFields();
  }, []);

  return (
    <div>
      <MenusHeaderContainer>
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
