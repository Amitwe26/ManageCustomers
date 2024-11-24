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
import InputUi from '../components/InputUi/InputUi';
import CustomersNamesListUi from '../components/CustomerListPageUi/CustomersNamesListUi';

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
  const [filterList, setFilterList] = useState<string>('');
  const [activeTab, setActiveTab] = useState('customersList');
  const [activeCustomer, setActiveCustomer] = useState<
    Customer<CustomerFields> | undefined
  >(customers?.[0]);

  const renderList = useCallback(() => {
    if (!customers) return [];
    const newList = customers.filter((customer) =>
      customer.name.includes(filterList),
    );

    return filterList && newList.length ? newList : customers;
  }, [filterList, customers]);

  useEffect(() => {
    window.scrollTo(0, -10);
  }, []);

  if (error) return <div>Error: {error?.toString()}</div>;

  return (
    <Container>
      <NavBarOptions>
        <InputContainer>
          <FilterInput
            type={'text'}
            name={''}
            label={t('customersListPage.titles.filterInput')}
            onChange={(e) => setFilterList(e.target.value)}
          />
        </InputContainer>
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
        <CustomersNamesListUi
          customers={renderList()}
          activeCustomer={activeCustomer}
          setActiveCustomer={setActiveCustomer}
          refetchCustomersData={refetchCustomersData}
        />
      )}
      {!isLoading && customers && activeTab === 'listDetails' && (
        <CustomerListCardUi
          renderList={renderList()}
          setActiveCustomer={(customer) => {
            setActiveTab('customersList');
            setActiveCustomer(customer);
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  height: 90vh;
`;
const InputContainer = styled.div`
  height: 45px;
`;

const FilterInput = styled(InputUi)`
  //width: 100%;
  //display: flex;
  //height: 15px;
`;

const NavBarOptions = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  padding-top: 4px;
  gap: 4px;
  display: flex;
  z-index: 3;
  flex-direction: column;
  box-shadow: 0 14px 10px 2px rgba(0, 0, 0, 0.1);
`;

export default CustomersList;
