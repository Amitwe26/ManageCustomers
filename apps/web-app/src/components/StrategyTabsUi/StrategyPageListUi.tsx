import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField } from '../../types/customersTypes';
import { CustomerFields, DietitianFields } from '../../types/userTypes';
import { useAppContext } from '../../context/AppContext';
import {
  deletePlanning,
  getPlanningList,
  getUserProfession,
} from '../../utils/firebase';
import GenericPlanningForm from '../GenericFormUi/GenericPlanningForm';
import MealsUi from '../MealsUi/MealsUi';
import CalculateInfo from '../DietitianComponents/CalculateInfo';
import { useTranslation } from 'react-i18next';
import ContainerUi from '../ContainerUi/ContainerUi';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

const StrategyPageListUi = ({ isHeaderShown }: { isHeaderShown: boolean }) => {
  const { user } = useAppContext();
  const location = useLocation();
  const { customer } = location.state as {
    customer: Customer<CustomerFields>;
  };
  const { t } = useTranslation();
  const [addMenuIsOpen, setAddMenuIsOpen] = React.useState(false);
  const [fields, setFields] = useState<InputField[]>([]);

  const { data: professionList } = useQuery(
    ['profession', user?.id],
    async () => {
      const data = await getUserProfession();
      return data;
    },
    { enabled: !!user },
  );

  const {
    data: strategyList,
    refetch: refetchStrategyList,
    isLoading: isLoadingPlanning,
  } = useQuery(
    ['planningList', user?.id, customer?.id],
    async () => {
      if (user && customer?.id) {
        return await getPlanningList(user.id, customer.id);
      }
      return [];
    },
    { enabled: !!user && !!customer?.id, staleTime: 60000, cacheTime: 300000 },
  );
  React.useEffect(() => {
    if (professionList && user?.profession) {
      const professionData = professionList.find(
        (prof) => prof.professionName === user.profession,
      );
      if (professionData) {
        setFields(professionData.taskPlanningInputList);
      }
    }
  }, [professionList, user?.profession]);

  const handleDeletePlanning = async (id: string) => {
    if (user && customer.id && id) {
      try {
        await deletePlanning(user.id, customer.id, id);
        await refetchStrategyList();
      } catch (error) {
        console.error('Error deleting planning:', error);
      }
    }
  };

  return (
    <ContainerUi headerHeight={isHeaderShown ? 4.25 : 1.8}>
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
          setAddCustomerOpen={(key) => setAddMenuIsOpen(key)}
          refetchCustomersData={refetchStrategyList}
        />
      )}
      {!isLoadingPlanning ? (
        <MealsUi
          strategyList={strategyList}
          fetchData={refetchStrategyList}
          handleDeletePlanning={handleDeletePlanning}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </ContainerUi>
  );
};

export default StrategyPageListUi;

const MenusHeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
