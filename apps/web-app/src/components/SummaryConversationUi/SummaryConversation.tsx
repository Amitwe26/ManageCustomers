import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Customer, CustomerHistory } from '../../types/customersTypes';
import ButtonUi from '../ButtonUi/ButtonUi';
import { CustomerFields } from '../../types/userTypes';
import {
  addCustomerHistory,
  getHistoryUser,
} from '../../service/customerService';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import ContainerUi from '../ContainerUi/ContainerUi';

const SummaryConversation = ({ isHeaderShown }: { isHeaderShown: boolean }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAppContext();
  const { customer } = location.state as {
    customer: Customer<CustomerFields>;
  };

  const [summaryConversation, setSummaryConversation] = useState<
    CustomerHistory[]
  >(customer?.history ?? []);
  const [newDescription, setNewDescription] = useState('');

  const handleAddSummary = async () => {
    const newSummary = {
      date: new Date().toISOString(),
      summery: newDescription,
      timestamp: new Date().toISOString(),
    };

    if (user) {
      await addCustomerHistory(user.id, customer.id, newSummary);
      const res = await getHistoryUser(user?.id, customer.id);
      if (res?.history) setSummaryConversation(res.history ?? []);
    }
    setNewDescription('');
  };

  return (
    <CustomerContainer>
      <TextBoxContainer>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder={t('customerDetails.summery.textareaText')}
        />
        <ButtonUi
          label={t('buttons.add')}
          variant="softOrange"
          onClick={handleAddSummary}
        />
      </TextBoxContainer>

      <ContainerUi
        isHeaderVisible={isHeaderShown}
        extraHeight={isHeaderShown ? 50 : 30}
      >
        {summaryConversation
          ?.map((conversation, index) => (
            <SummaryItem key={index}>
              <SummaryHeader>
                <p>{new Date(conversation?.date).toLocaleDateString()}</p>
                <p>{new Date(conversation?.timestamp).toLocaleTimeString()}</p>
              </SummaryHeader>
              <SummaryDescription>{conversation.summery}</SummaryDescription>
            </SummaryItem>
          ))
          .reverse()}
      </ContainerUi>
    </CustomerContainer>
  );
};

export default SummaryConversation;

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

const SummaryItem = styled.div`
  background-color: #f4f5f7;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  border-left: 5px solid ${({ theme }) => theme.colors.button.light};
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  color: #7a7a7a;
`;

const SummaryDescription = styled.pre`
  margin: 0;
  font-size: 16px;
  color: #333;
`;
