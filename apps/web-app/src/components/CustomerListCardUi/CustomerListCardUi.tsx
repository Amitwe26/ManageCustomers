import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomerListCardUi = ({
  renderList,
}: {
  renderList?: Customer<CustomerFields>[];
}) => {
  const { t } = useTranslation();
  const headers = [
    'date',
    'name',
    'status',
    'phone',
    'price',
    'paymentType',
    'email',
  ];

  return (
    <Container>
      <ListHeader>
        {headers.map((header) => (
          <HeaderItem key={header}>
            {t(`customersListPage.headerCustomerList.${header}`)}
          </HeaderItem>
        ))}
      </ListHeader>
      {renderList ? (
        renderList?.map((customer: Customer<CustomerFields>) => (
          <CustomerContainer
            key={customer.id}
            to={`/customers/customer/${customer.id}`}
            state={{ customer }}
          >
            <CustomerDetails>
              <DetailItem>
                <DetailValue>
                  {new Date(customer.date).toLocaleDateString()}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.status}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.phone}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.price} $</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.paymentType}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.email}</DetailValue>
              </DetailItem>
            </CustomerDetails>
          </CustomerContainer>
        ))
      ) : (
        <span>Dont have customers list :(</span>
      )}
    </Container>
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

const CustomerContainer = styled(Link)`
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
  &:hover {
    transform: translateY(-5px);
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

  &:last-child {
    //text-align: left;
  }
`;
const DetailValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #495057;
`;
