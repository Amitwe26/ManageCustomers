import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CustomerFields } from '../types/userTypes';
import { Customer } from '../types/customersTypes';
import CustomersListHeaderUi from '../components/CustomersListHeaderUi/CustomersListHeaderUi';
import { getCustomersUser } from '../service/customerService';
import { useQuery } from 'react-query';
import { useAppContext } from '../context/AppContext';
import AddCustomerForm from '../components/AddCustomerFormUi/AddCustomerForm';
import CustomerListCardUi from '../components/CustomerListCardUi/CustomerListCardUi';
import { useTranslation } from 'react-i18next';

const CustomersList = () => {
  const { user } = useAppContext();
  const { t } = useTranslation();
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

  useEffect(() => {
    window.scrollTo(0, -10);
  }, []);

  if (error) return <div>Error: {error?.toString()}</div>;

  return (
    <Container>
      <CustomersListHeaderUi
        customers={customers}
        setAddCustomerOpen={setAddCustomerOpen}
        setFilterList={setFilterList}
      />
      {user?.profession && addCustomerOpen ? (
        <AddCustomerForm
          setAddCustomerOpen={setAddCustomerOpen}
          refetchCustomersData={() => refechCustomersData()}
        />
      ) : null}
      {!isLoading && customers ? (
        <CustomerListCardUi renderList={renderList()} />
      ) : (
        <p>{t('loadingText')}</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 15px 36px 0;
`;

export default CustomersList;
