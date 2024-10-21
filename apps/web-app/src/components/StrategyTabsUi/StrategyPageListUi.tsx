import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField } from '../../types/customersTypes';
import { CustomerFields, DietitianFields } from '../../types/userTypes';
import { useAppContext } from '../../context/AppContext';
import GenericPlanningForm from '../GenericFormUi/GenericPlanningForm';
import MealsUi from '../MealsUi/MealsUi';
import CalculateInfo from '../DietitianComponents/CalculateInfo';
import { useTranslation } from 'react-i18next';
import ContainerUi from '../ContainerUi/ContainerUi';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  deletePlanning,
  getPlanningsForCustomer,
} from '../../service/planningService';
import { getUserProfession } from '../../service/userService';

const StrategyPageListUi = ({ isHeaderShown }: { isHeaderShown: boolean }) => {
  const { user } = useAppContext();
  const location = useLocation();
  const { customer } = location.state as {
    customer: Customer<CustomerFields>;
  };
  const { t } = useTranslation();
  const [addPlanningIsOpen, setAddPlanningIsOpen] = React.useState(false);
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
        return await getPlanningsForCustomer(user.id, customer.id);
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
    <>
      {user?.profession === 'dietitian' && (
        <CalculateInfo customer={customer as Customer<DietitianFields>} />
      )}
      <ContainerUi isHeaderVisible={isHeaderShown}>
        <MenusHeaderContainer>
          <ButtonUi
            type="button"
            onClick={() => setAddPlanningIsOpen(true)}
            label={t('customerDetails.strategy.buildStrategy')}
            variant={'primary'}
          />
        </MenusHeaderContainer>
        {addPlanningIsOpen && (
          <GenericPlanningForm
            customerId={customer.id}
            fields={fields}
            setAddPlanningIsOpen={(key) => setAddPlanningIsOpen(key)}
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
          <h1>{t('loadingText')}</h1>
        )}
      </ContainerUi>
    </>
  );
};

export default StrategyPageListUi;

const MenusHeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
