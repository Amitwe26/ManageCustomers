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
import { db, getUserProfession } from '../../utils/firebase';
import { useAppContext } from '../../context/AppContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import AnimatedTabs from '../AnimationTabsUi/AnimatedTabs';

const CustomerDetails = () => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { customer } = location.state as { customer: Customer<CustomerFields> };
  const [customerInfo, setCustomerInfo] =
    React.useState<Customer<CustomerFields>>(customer);
  const [professionFields, setProfessionFields] =
    React.useState<Profession | null>(null);

  const [isHeaderShown, setIsHeaderShown] = React.useState(true);
  React.useEffect(() => {
    const fetchProfessionFields = async () => {
      if (user?.profession) {
        const professionList = await getUserProfession(); // Assuming this fetches the profession list from the database
        const profession = professionList.find(
          (prof: Profession) => prof.professionName === user.profession,
        );
        setProfessionFields(profession || null);
      }
    };

    fetchProfessionFields();
  }, [user?.profession]);

  React.useEffect(() => {
    if (user) {
      const customerRef = doc(db, 'users', user.id, 'customers', customer?.id);
      const unsubscribe = onSnapshot(customerRef, (doc) => {
        if (doc.exists()) {
          setCustomerInfo({
            id: doc.id,
            ...doc.data(),
          } as Customer<CustomerFields>);
        } else {
          console.log('No such document!');
        }
      });

      return () => unsubscribe();
    }
  }, [user, customer.id]);

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
          customer={customerInfo}
          profession={professionFields}
          isHeaderShown={isHeaderShown}
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
      <CustomerHeaderUi customer={customerInfo} isHeaderShown={isHeaderShown} />
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
