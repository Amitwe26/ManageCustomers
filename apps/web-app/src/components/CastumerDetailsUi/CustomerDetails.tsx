import React, { HTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomerHeaderUi from '../CustomerHeaderInfoUi/customerHeaderUi';
import {
  Customer,
  CustomerTabs,
  TabComponents,
} from '../../types/customersTypes';
import SummaryConversation from '../SummaryConversationUi/SummaryConversation';
import { CustomerFields, Profession } from '../../types/userTypes';
import CustomerInfoUi from '../CustomerInfoUi/CustomerInfoUi';
import StrategyPageListUi from '../StrategyTabsUi/StrategyPageListUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import { db, getUserProfession } from '../../utils/firebase';
import { useAppContext } from '../../context/AppContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

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
  const [activeTab, setActiveTab] = React.useState<CustomerTabs>(
    CustomerTabs.SUMMARY,
  );
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
  const CustomerTabsComponents: TabComponents = {
    [CustomerTabs.SUMMARY]: SummaryConversation,
    [CustomerTabs.STRATEGY]: () => (
      <StrategyPageListUi customer={customerInfo} />
    ),
    [CustomerTabs.INFO]: () => (
      <CustomerInfoUi customer={customerInfo} profession={professionFields} />
    ),
  };
  const ActiveTabComponent = CustomerTabsComponents[activeTab];

  return (
    <CustomerContainer>
      <BackButton label={t('buttons.goBack')} onClick={() => navigate(-1)} />
      <ButtonUi
        label={t(isHeaderShown ? 'buttons.close' : 'buttons.open')}
        onClick={() => setIsHeaderShown((prevState) => !prevState)}
      />
      {isHeaderShown && <CustomerHeaderUi customer={customerInfo} />}
      <TabContainer>
        {Object.keys(CustomerTabsComponents).map((tabKey) => (
          <TabButton
            key={tabKey}
            onClick={() => setActiveTab(tabKey as CustomerTabs)}
            $isActive={activeTab === tabKey}
          >
            {t(`customerDetails.tabs.${tabKey}`)}
          </TabButton>
        ))}
      </TabContainer>
      <TabContent>
        <ActiveTabComponent />
      </TabContent>
    </CustomerContainer>
  );
};

export default CustomerDetails;

const CustomerContainer = styled.div`
  padding: 0 15px;
`;

const BackButton = styled(ButtonUi)`
  background: ${({ theme }) => theme.colors.button.delete};
  margin: ${({ theme }) => theme.spacing.s}px;

  &:hover {
    background: ${({ theme }) => theme.colors.button.delete};
    opacity: 0.7;
  }
`;

const TabContainer = styled.div<HTMLAttributes<HTMLDivElement>>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.gray};
  display: flex;
  margin: 0 20px 20px 15px;
`;

const TabButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.button.light : '#ddd'};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.button.light};
    opacity: 0.5;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;
