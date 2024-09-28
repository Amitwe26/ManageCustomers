import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CustomerFields, User } from '../types/userType';
import { Customer } from '../types/customers';
import CustomersListHeaderUi from '../components/CustomersListHeaderUi/CustomersListHeaderUi';
import ChangeForm from '../components/GenericFormUi/GenericFormUi';
import { getCustomersUser } from '../utils/firebase';
import { useQuery } from 'react-query';
import { useAppContext } from '../context/AppContext';

const CustomersList = () => {
  const { user } = useAppContext();
  const {
    data: customers,
    isLoading,
    error,
    refetch: refechCustomersData,
  } = useQuery<Customer<CustomerFields>[]>(['customers', user?.id], () =>
    getCustomersUser(user?.id ?? ''),
  );
  const [filterList, setFilterList] = useState<
    Customer<CustomerFields>[] | undefined
  >([]);
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false);
  if (error) return <div>Error: {error?.toString()}</div>;
  return (
    <>
      <Container>
        <div>
          <p>{user?.email}</p>
          <p>{user?.typeOfUser}</p>
        </div>
        <CustomersListHeaderUi
          customers={customers}
          setAddCustomerOpen={setAddCustomerOpen}
          setFilterList={setFilterList}
        />
        {user?.profession && addCustomerOpen ? (
          <ChangeForm user={user} setAddCustomerOpen={setAddCustomerOpen} />
        ) : null}
        {!isLoading && customers ? (
          (filterList?.length ? filterList : customers).map(
            (customer: Customer<CustomerFields>) => (
              <CustomerContainer
                key={customer.id}
                to={`/customers/customer/${customer.id}`}
                state={{ customer }}
              >
                <CustomerDetails>
                  <DetailItem>
                    <CustomerName>{customer.name}</CustomerName>
                  </DetailItem>
                  <DetailItem>
                    <CustomerName>{customer.phone}</CustomerName>
                  </DetailItem>
                  <DetailItem>
                    <DetailValue>{customer.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailValue>{customer.type}</DetailValue>
                  </DetailItem>
                </CustomerDetails>
              </CustomerContainer>
            ),
          )
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 15px 36px 0;
`;

const CustomerContainer = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  text-decoration: none;
  color: black;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const CustomerName = styled.h2`
  font-size: 18px;
  color: rgba(62, 62, 62, 0.85);
  margin: 0;
`;

const CustomerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
`;

const DetailValue = styled.span`
  color: gray;
`;

export default CustomersList;
