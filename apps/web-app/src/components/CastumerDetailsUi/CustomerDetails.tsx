import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const CustomerDetails = () => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    customer: { id },
  } = location.state as { customer: Customer<CustomerFields> };

  const {
    data: customer,
    // isLoading: customerLoading,
    // error: customerError,
    refetch: refetchCustomerData,
  } = useQuery(['customer', id], () => getCustomerById(user!.id, id), {
    enabled: !!id, // Only fetch if customerId exists
  });
  const { mutate: updateCustomer } = useUpdateCustomer();

  const handleUpdateCustomer = (updatedData: Customer<CustomerFields>) => {
    if (user && customer) {
      updateCustomer(
        {
          userId: user.id,
          customerId: customer.id,
          updatedData,
        },
        {
          onSuccess: () => {
            refetchCustomerData();
          },
        },
      );
    }
  };
  const [professionFields, setProfessionFields] =
    React.useState<Profession | null>(null);

  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
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

  if (!customer) {
    return <h1>Customer not found</h1>;
  }
  const customerTabs = [
    {
      label: 'summary',
      component: () => <SummaryConversation isHeaderShown={isHeaderShown} />,
    },
    {
      label: 'strategy',
      component: () => <StrategyPageListUi isHeaderShown={isHeaderShown} />,
    },
    {
      label: 'info',
      component: () => (
        <CustomerInfoUi
          customer={customer}
          profession={professionFields}
          isHeaderShown={isHeaderShown}
          onUpdateCustomer={handleUpdateCustomer}
        />
      ),
    },
  ];

  return (
    <CustomerContainer>
      <BackButton
        label={t('buttons.goBack')}
        onClick={() => navigate(-1)}
        variant="delete"
      />
      <ButtonUi
        label={t(isHeaderShown ? 'buttons.close' : 'buttons.open')}
        onClick={() => setIsHeaderShown((prevState) => !prevState)}
      />
      <CustomerHeaderUi customer={customer} isHeaderShown={isHeaderShown} />
      <AnimatedTabs tabs={customerTabs} initialTabIndex={0} />
    </CustomerContainer>
  );
};

export default CustomerDetails;

const CustomerContainer = styled.div`
  padding: 0 15px;
`;

const BackButton = styled(ButtonUi)`
  // background: ${({ theme }) => theme.colors.button.delete};
  margin: ${({ theme }) => theme.spacing.s}px;

  &:hover {
    background: ${({ theme }) => theme.colors.button.delete};
    opacity: 0.7;
  }
`;
