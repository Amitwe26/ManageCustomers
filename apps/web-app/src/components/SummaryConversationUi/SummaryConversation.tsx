import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CustomerHeaderUi from '../CustomerHeaderInfoUi/customerHeaderUi';
import MenusForm from '../MenusForm/MenusForm';
import MealsUi from '../MealsUi/MealsUi';
import {
  Customer,
  FitnessMenu,
  SummaryConversationType,
} from '../../types/customers';
import ButtonUi from '../ButtonUi/ButtonUi';

const CustomerDetails = () => {
  const location = useLocation();
  const { customer } = location.state as { customer: Customer };
  const [addMenuIsOpen, setAddMenuIsOpen] = useState(false);
  const [fitnessMenus, setFitnessMenus] = useState<FitnessMenu[] | undefined>(
    customer?.fitnessMenus ?? []
  );
  const [summaryConversation, setSummaryConversation] = useState<
    SummaryConversationType[]
  >(customer?.summaryConversation ?? []);
  const [newDescription, setNewDescription] = useState('');

  if (!customer) {
    return <h1>Customer not found</h1>;
  }

  const handleAddMenu = (newMenu: FitnessMenu) => {
    setFitnessMenus((prev) => [...(prev ?? []), newMenu]);
  };

  const handleAddSummary = () => {
    const newSummary = {
      date: new Date().toLocaleDateString(),
      description: newDescription,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSummaryConversation((prev) => [...prev, newSummary]);
    setNewDescription(''); // Clear the input box after submission
  };

  return (
    <CustomerContainer>
      <TextBoxContainer>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add new summary conversation here..."
        />
        <ButtonUi
          label="Submit"
          variant={'secondary'}
          onClick={handleAddSummary}
        />
      </TextBoxContainer>

      <SummaryList>
        {summaryConversation.map((conversation, index) => (
          <SummaryItem key={index}>
            <SummaryHeader>
              <span>{conversation.date}</span>
              <span>{conversation.timestamp}</span>
            </SummaryHeader>
            <SummaryDescription>{conversation.description}</SummaryDescription>
          </SummaryItem>
        ))}
      </SummaryList>
    </CustomerContainer>
  );
};

export default CustomerDetails;

const CustomerContainer = styled.div`
  padding: 0 15px;
`;

const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    width: 98%;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: none;
    margin-bottom: 10px;
  }
`;

const SummaryList = styled.div`
  margin-top: 20px;
`;

const SummaryItem = styled.div`
  background-color: #f4f5f7;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  border-left: 5px solid #1e90ff;
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  color: #7a7a7a;
`;

const SummaryDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const MenusHeaderContainer = styled.div`
  width: 100%;
`;
