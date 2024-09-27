import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CustomerHeaderUi from '../CustomerHeaderInfoUi/customerHeaderUi';
// import MenusForm from '../MenusForm/MenusForm';
import MealsUi from '../MealsUi/MealsUi';
import { Customer, FitnessMenu } from '../../types/customers';
import SummaryConversation from '../SummaryConversationUi/SummaryConversation';
import ButtonUi from '../ButtonUi/ButtonUi';
import { CustomerFields } from '../../types/userType';

const CustomerDetails = () => {
  const location = useLocation();
  const { customer } = location.state as { customer: Customer<CustomerFields> };
  const [addMenuIsOpen, setAddMenuIsOpen] = React.useState(false);
  const [fitnessMenus, setFitnessMenus] = React.useState<
    Customer<CustomerFields>['history'] | undefined
  >(customer?.history);
  const [activeTab, setActiveTab] = React.useState<'summary' | 'fitnessMenus'>(
    'summary',
  );
  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  // const handleAddMenu = (newMenu: FitnessMenu) => {
  //   setFitnessMenus((prev) => [...(prev ?? []), newMenu]);
  // };
  return (
    <CustomerContainer>
      <CustomerHeaderUi customer={customer} />
      <TabContainer>
        <TabButton
          onClick={() => setActiveTab('summary')}
          $isActive={activeTab === 'summary'}
        >
          Summary Conversation
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('fitnessMenus')}
          $isActive={activeTab === 'fitnessMenus'}
        >
          Fitness Menus
        </TabButton>
      </TabContainer>
      <TabContent>
        {activeTab === 'summary' ? (
          <SummaryConversation />
        ) : (
          <div>
            <MenusHeaderContainer>
              <ButtonUi
                type="button"
                onClick={() => setAddMenuIsOpen(true)}
                label={'Add Fitness Menu'}
                variant={'secondary'}
              />
            </MenusHeaderContainer>
            {/*{addMenuIsOpen && (*/}
            {/*  <MenusForm*/}
            {/*    customer={customer}*/}
            {/*    onAddMenu={handleAddMenu}*/}
            {/*    onClose={() => setAddMenuIsOpen(false)}*/}
            {/*  />*/}
            {/*)}*/}
            {/*<MealsUi fitnessMenus={fitnessMenus} />*/}
          </div>
        )}
      </TabContent>
    </CustomerContainer>
  );
};

export default CustomerDetails;

const CustomerContainer = styled.div`
  padding: 0 15px;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBlue};
  display: flex;
  //width: 98%;
  margin: 0 20px 20px 15px;
  //margin-bottom: 20px;
`;

const TabButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(96,169,239, 0.9)' : '#ddd'};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  //margin-right: 10px;
  //border-radius: 5px;

  &:hover {
    background-color: #1e90ff;
    opacity: 0.8;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const MenusHeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
