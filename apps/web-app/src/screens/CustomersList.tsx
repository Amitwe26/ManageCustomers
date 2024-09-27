import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CustomerFields, User } from '../types/userType';
import { Customer } from '../types/customers';
import CustomersListHeaderUi from '../components/CustomersListHeaderUi/CustomersListHeaderUi';
import ChangeForm from '../components/GenericFormUi/GenericFormUi';
import { getCustomersUser } from '../utils/firebase';
import { useAppContext } from '../context/AppContext';

interface CustomersListProps {
  data: {
    customers: Customer<CustomerFields>[];
    userInfo?: User;
  };
}
const CustomersList = ({ data }: CustomersListProps) => {
  const { isLoading } = useAppContext();
  const [customers, setCustomers] = useState<Customer<CustomerFields>[] | null>(
    data.customers,
  );
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false);
  const getList = async () => {
    if (data?.userInfo) {
      const list = await getCustomersUser(data?.userInfo?.id);
      setCustomers(list);
    }
  };
  useEffect(() => {
    setCustomers(data.customers);
  }, [data.customers]);

  return (
    <Container>
      <CustomersListHeaderUi
        customers={customers}
        setAddCustomerOpen={setAddCustomerOpen}
        setCustomers={setCustomers}
      />
      {data.userInfo?.profession && addCustomerOpen ? (
        <ChangeForm user={data.userInfo} getList={getList} />
      ) : null}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        customers?.map((customer) => (
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
                <DetailLabel>Age:</DetailLabel>
                <DetailValue>{customer.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailValue>{customer.type}</DetailValue>
              </DetailItem>
            </CustomerDetails>
          </CustomerContainer>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 15px 36px 0;
`;

const CustomerContainer = styled(Link)`
  display: flex;
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

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const DetailValue = styled.span`
  color: gray;
`;

export default CustomersList;
