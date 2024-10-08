import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CustomerFields } from '../types/userType';
import { Customer } from '../types/customers';
import CustomersListHeaderUi from '../components/CustomersListHeaderUi/CustomersListHeaderUi';
import { getCustomersUser } from '../utils/firebase';
import { useQuery } from 'react-query';
import { useAppContext } from '../context/AppContext';
import AddCustomerForm from '../components/AddCustomerFormUi/AddCustomerForm';
import CustomerListCardUi from '../components/CustomerListCardUi/CustomerListCardUi';

const CustomersList = () => {
  const { user } = useAppContext();
  const [filterList, setFilterList] = useState<
    Customer<CustomerFields>[] | undefined
  >([]);
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false);

  const {
    data: customers,
    isLoading,
    error,
    refetch: refechCustomersData,
  } = useQuery<Customer<CustomerFields>[]>(['customers', user?.id], () =>
    getCustomersUser(user?.id ?? ''),
  );
  const renderList = useCallback(() => {
    return filterList?.length ? filterList : customers;
  }, [filterList, customers]);

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
          <AddCustomerForm
            setAddCustomerOpen={setAddCustomerOpen}
            refechCustomersData={() => refechCustomersData()}
          />
        ) : null}
        {!isLoading && customers ? (
          <CustomerListCardUi renderList={renderList()} />
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

export default CustomersList;
