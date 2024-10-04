import React, { HTMLAttributes } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CustomerHeaderUi from '../CustomerHeaderInfoUi/customerHeaderUi';
import { Customer, CustomerTabs, TabComponents } from '../../types/customers';
import SummaryConversation from '../SummaryConversationUi/SummaryConversation';
import { CustomerFields } from '../../types/userType';
import CustomerInfoUi from '../CustomerInfoUi/CustomerInfoUi';
import StrategyUi from '../StrategyTabsUi/StrategyUi';

const CustomerDetails = () => {
  const location = useLocation();
  const { customer } = location.state as { customer: Customer<CustomerFields> };
  const [activeTab, setActiveTab] = React.useState<CustomerTabs>(
    CustomerTabs.SUMMARY,
  );
  if (!customer) {
    return <h1>Customer not found</h1>;
  }
  const CustomerTabsComponents: TabComponents = {
    [CustomerTabs.SUMMARY]: SummaryConversation,
    [CustomerTabs.STRATEGY]: () => <StrategyUi customer={customer} />,
    [CustomerTabs.INFO]: () => <CustomerInfoUi customer={customer} />,
  };
  const ActiveTabComponent = CustomerTabsComponents[activeTab];

  return (
    <CustomerContainer>
      <CustomerHeaderUi customer={customer} />
      <TabContainer>
        {Object.keys(CustomerTabsComponents).map((tabKey) => (
          <TabButton
            key={tabKey}
            onClick={() => setActiveTab(tabKey as CustomerTabs)}
            $isActive={activeTab === tabKey}
          >
            {tabKey.replace(/([A-Z])/g, ' $1').trim()}{' '}
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

const TabContainer = styled.div<HTMLAttributes<HTMLDivElement>>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBlue};
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
