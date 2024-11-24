import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/dateUtils';
import ContainerUi from '../ContainerUi/ContainerUi';

const CustomerListCardUi = ({
  renderList,
  setActiveCustomer,
}: {
  renderList?: Customer<CustomerFields>[];
  setActiveCustomer: (customer: Customer<CustomerFields>) => void;
}) => {
  const { t } = useTranslation();
  const headers = [
    'name',
    'date',
    'phone',
    'price',
    'paymentType',
    'status',
    'email',
  ];
  const statusArray = ['think', 'work', 'oneTime', 'stop'];
  const renderFilteredList = (
    customers: Customer<CustomerFields>[],
    statusKey: string,
  ) => {
    return customers
      .filter((customer) =>
        statusKey ? customer.status === statusKey : customer,
      )
      .map((customer) => {
        const isThinking = customer.status === 'think';
        return (
          <CustomerContainer
            key={customer.id}
            $isThinking={isThinking}
            $isStop={customer.status === 'stop'}
          >
            <CustomerDetails>
              <DetailItem onClick={() => setActiveCustomer(customer)}>
                <DetailValue $isClick>{customer.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{formatDate(customer.date)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.phone}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.price}₪</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>
                  {t(`selectionInputs.${customer.paymentType}`)}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue
                  $color={
                    customer.status === 'stop' ? '#ef6a79' : 'rgb(143,143,143)'
                  }
                >
                  {t(`selectionInputs.${customer.status}`)}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.email}</DetailValue>
              </DetailItem>
            </CustomerDetails>
          </CustomerContainer>
        );
      });
  };

  return (
    <>
      <Container>
        <ListHeader>
          {headers.map((header, index) => (
            <HeaderItem key={index}>
              {t(`customersListPage.headerCustomerList.${header}`)}
            </HeaderItem>
          ))}
        </ListHeader>
        {renderList ? (
          <ContainerUi isHeaderVisible={false}>
            {statusArray.map((key, index) => {
              return (
                <ListContainer key={index}>
                  {renderFilteredList(renderList, key)}
                </ListContainer>
              );
            })}
          </ContainerUi>
        ) : (
          <span>Dont have customers list :(</span>
        )}
      </Container>
    </>
  );
};

export default CustomerListCardUi;

const Container = styled.div`
  padding: 15px 5px 0;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 15%);
  padding: 15px;
  background-color: rgba(209, 209, 209, 0.76);
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ListContainer = styled.div`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CustomerContainer = styled.div<{
  $isThinking: boolean;
  $isStop: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(7, 15%);
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px 0;
  background-color: #ffffff;
  text-decoration: none;
  color: black;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  ${({ $isStop }) => $isStop && 'opacity: .5'};
`;

const CustomerDetails = styled.div`
  display: contents;
`;

const DetailItem = styled.div`
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  box-sizing: border-box;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
`;

const DetailValue = styled.span<{ $color?: string; $isClick?: boolean }>`
  ${({ $color }) => $color && `color:${$color}`};
  ${({ $isClick }) => $isClick && `cursor: pointer`};
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  padding: 5px 2px;
`;
