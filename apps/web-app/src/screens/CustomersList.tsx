import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CustomerFields } from '../types/userTypes';
import { Customer } from '../types/customersTypes';
import { getCustomersUser } from '../service/customerService';
import { useQuery } from 'react-query';
import { useAppContext } from '../context/AppContext';
import CustomerListCardUi from '../components/CustomerListCardUi/CustomerListCardUi';
import { useTranslation } from 'react-i18next';
import ButtonUi from '../components/ButtonUi/ButtonUi';
import CustomerDetails from '../components/CastumerDetailsUi/CustomerDetails';
import InputUi from '../components/InputUi/InputUi';

const CustomersList = () => {
  const { user } = useAppContext();
  const {
    data: customers,
    isLoading,
    error,
    refetch: refetchCustomersData,
  } = useQuery<Customer<CustomerFields>[]>(['customers', user?.id], () =>
    getCustomersUser(user?.id ?? ''),
  );
  const { t } = useTranslation();
  const [filterList, setFilterList] = useState<
    Customer<CustomerFields>[] | undefined
  >([]);
  const [activeTab, setActiveTab] = useState('customersList');
  const [activeCustomer, setActiveCustomer] = useState(customers?.[0]);

  const renderList = useCallback(() => {
    return filterList?.length ? filterList : customers;
  }, [filterList, customers]);

  useEffect(() => {
    window.scrollTo(0, -10);
  }, []);

  if (error) return <div>Error: {error?.toString()}</div>;

  return (
    <Container>
      <NavBarOptions>
        <InputUi type={'text'} name={''} label={''} />
        <ButtonUi
          label={t('customersListPage.titles.customersList')}
          onClick={() => setActiveTab('customersList')}
          isTransparent={Boolean(activeTab !== 'customersList')}
        />
        <ButtonUi
          label={t('customersListPage.titles.listDetails')}
          onClick={() => setActiveTab('listDetails')}
          isTransparent={Boolean(activeTab !== 'listDetails')}
        />
      </NavBarOptions>

      {!isLoading && customers && activeTab === 'customersList' && (
        <Main>
          <CustomersNameList>
            {customers.map((customer, index) => (
              <ButtonUi
                key={index}
                onClick={() => setActiveCustomer(customer)}
                label={customer?.name}
                isTransparent={Boolean(activeCustomer?.id !== customer.id)}
              />
            ))}
          </CustomersNameList>
          <CustomerDetails
            customerId={activeCustomer?.id ?? customers[0]?.id}
            refetchCustomersData={() => {
              refetchCustomersData();
              setActiveCustomer(customers[0]);
            }}
          />
        </Main>
      )}
      {!isLoading && customers && activeTab === 'listDetails' && (
        <CustomerListCardUi renderList={renderList()} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  height: 90vh;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
`;

const CustomersNameList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  margin-top: 4px;
  padding: 0 4px;
  gap: 5px;
  width: 10%;
  box-shadow: 0 14px 10px 2px rgba(0, 0, 0, 0.1);
`;

const NavBarOptions = styled.div`
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  gap: 4px;
  display: flex;
  z-index: 3;
  flex-direction: column;
  box-shadow: 0 14px 10px 2px rgba(0, 0, 0, 0.1);
`;

export default CustomersList;
