import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/dateUtils';

const CustomerListCardUi = ({
  renderList,
}: {
  renderList?: Customer<CustomerFields>[];
}) => {
  const { t } = useTranslation();
  const headers = [
    'date',
    'name',
    'phone',
    'price',
    'paymentType',
    'status',
    'email',
  ];
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
            to={`/customers/customer/${customer.id}`}
            state={{ customer }}
            $isThinking={isThinking}
            $isStop={customer.status === 'stop'}
          >
            <CustomerDetails>
              <DetailItem>
                <DetailValue>{formatDate(customer.date)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.name}</DetailValue>
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
                  $backgroundColor={
                    customer.status === 'stop'
                      ? '#ef6a79'
                      : 'rgba(221, 221, 221, 0.7)'
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
          {headers.map((header) => (
            <HeaderItem key={header}>
              {t(`customersListPage.headerCustomerList.${header}`)}
            </HeaderItem>
          ))}
        </ListHeader>
        {renderList ? (
          renderFilteredList(renderList, '')
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

const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CustomerContainer = styled(Link)<{
  $isThinking: boolean;
  $isStop: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(7, 15%);
  border-radius: 10px;
  padding: 10px 15px;
  margin: 10px 0;
  background-color: #ffffff;
  text-decoration: none;
  color: black;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  ${({ $isStop }) => $isStop && 'opacity: .5'};
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
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
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  //&:last-child {
  //  background-color: #dd5151;
  //  //text-align: left;
  //}
`;
const DetailValue = styled.span<{ $backgroundColor?: string }>`
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  padding: 5px 2px;
  ${({ $backgroundColor }) =>
    $backgroundColor && `background-color:${$backgroundColor}`};
`;
