import React from 'react';
import styled from 'styled-components';
import CustomerHeaderUi from '../CustomerHeaderInfoUi/customerHeaderUi';
import { Customer } from '../../types/customersTypes';
import SummaryConversation from '../SummaryConversationUi/SummaryConversation';
import { CustomerFields, Profession } from '../../types/userTypes';
import CustomerInfoUi from '../CustomerInfoUi/CustomerInfoUi';
import StrategyPageListUi from '../StrategyTabsUi/StrategyPageListUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import AnimatedTabs from '../AnimationTabsUi/AnimatedTabs';
import { getUserProfession } from '../../service/userService';
import { useQuery } from 'react-query';
import { getCustomerById } from '../../service/customerService';
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import CustomerEventsUi from '../CustomerEventsUi/CustomerEventsUi';

const CustomerDetails = ({
  customerId,
  refetchCustomersData,
}: {
  customerId?: string;
  refetchCustomersData: VoidFunction;
}) => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const [professionFields, setProfessionFields] =
    React.useState<Profession | null>(null);
  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
  const { data: customer, refetch: refetchCustomerData } = useQuery(
    ['customer', customerId],
    () => getCustomerById(user!.id, customerId ?? ''),
    {
      enabled: !!customerId,
    },
  );
  const { mutate: updateCustomer } = useUpdateCustomer();

  const handleUpdateCustomer = (updatedData: Customer<CustomerFields>) => {
    if (user && customer) {
      updateCustomer(
        {
          userId: user.id,
          customerId: customerId ?? '',
          updatedData,
        },
        {
          onSuccess: () => {
            refetchCustomerData();
            refetchCustomersData();
          },
        },
      );
    }
  };

  React.useEffect(() => {
    const fetchProfessionFields = async () => {
      if (user?.profession) {
        const professionList = await getUserProfession();
        const profession = professionList.find(
          (prof: Profession) => prof.professionName === user.profession,
        );
        setProfessionFields(profession || null);
      }
    };

    fetchProfessionFields();
  }, [user?.profession]);

  const customerTabs = React.useMemo(
    () => [
      {
        label: 'summary',
        component: () => (
          <SummaryConversation
            isHeaderShown={isHeaderShown}
            customer={customer}
          />
        ),
      },
      {
        label: 'strategy',
        component: () => (
          <StrategyPageListUi
            isHeaderShown={isHeaderShown}
            customer={customer}
          />
        ),
      },
      {
        label: 'events',
        component: () => (
          <CustomerEventsUi
            userId={user?.id}
            customerId={customerId ?? ''}
            isHeaderShown={isHeaderShown}
          />
        ),
      },
      {
        label: 'info',
        component: () => (
          <CustomerInfoUi
            customer={customer}
            profession={professionFields}
            isHeaderShown={isHeaderShown}
            onUpdateCustomer={handleUpdateCustomer}
            refetchCustomersData={refetchCustomersData}
          />
        ),
      },
    ],
    [isHeaderShown, customer, professionFields, handleUpdateCustomer],
  );

  return (
    <CustomerContainer>
      <ButtonUi
        label={t(isHeaderShown ? 'buttons.close' : 'buttons.open')}
        onClick={() => setIsHeaderShown((prevState) => !prevState)}
        isTransparent={isHeaderShown}
      />
      <CustomerHeaderUi customer={customer} isHeaderShown={isHeaderShown} />
      <AnimatedTabs tabs={customerTabs} initialTabIndex={0} />
    </CustomerContainer>
  );
};

export default CustomerDetails;

const CustomerContainer = styled.div`
  padding: 0 15px;
  width: 100%;
`;
