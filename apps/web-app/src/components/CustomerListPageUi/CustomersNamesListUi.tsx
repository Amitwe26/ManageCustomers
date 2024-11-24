import React from 'react';
import ButtonUi from '../ButtonUi/ButtonUi';
import CustomerDetails from '../CastumerDetailsUi/CustomerDetails';
import styled from 'styled-components';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';

interface CustomerListProps {
  customers: Customer<CustomerFields>[];
  activeCustomer?: Customer<CustomerFields>;
  setActiveCustomer: React.Dispatch<
    React.SetStateAction<Customer<CustomerFields> | undefined>
  >;
  refetchCustomersData: VoidFunction;
}

const CustomersNamesListUi = ({
  customers,
  activeCustomer,
  setActiveCustomer,
  refetchCustomersData,
}: CustomerListProps) => {
  return (
    <Main>
      <CustomersNameList>
        {customers.map((customer, index) => (
          <NameButton
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
  );
};

export default CustomersNamesListUi;

const Main = styled.div`
  width: 100%;
  display: flex;
`;

const CustomersNameList = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.base};
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  padding: 0 4px;
  gap: 5px;
  width: 10%;
  box-shadow: 0 14px 10px 2px rgba(0, 0, 0, 0.1);
`;

const NameButton = styled(ButtonUi)`
  border: none;
  border-radius: 3px;
`;
