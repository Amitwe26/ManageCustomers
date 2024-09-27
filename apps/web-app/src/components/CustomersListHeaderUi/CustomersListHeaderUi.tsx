import React from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer } from '../../types/customers';
import { CustomerFields } from '../../types/userType';

interface CustomersListHeaderUiProps {
  customers: Customer<CustomerFields>[] | null;
  setAddCustomerOpen: (open: boolean) => void;
  setCustomers: React.Dispatch<
    React.SetStateAction<Customer<CustomerFields>[] | null>
  >;
}
const CustomersListHeaderUi = ({
  customers,
  setAddCustomerOpen,
  setCustomers,
}: CustomersListHeaderUiProps) => {
  return (
    <Header>
      <TitleContainer>
        <h2>Customers </h2>
        <p> {customers?.length}</p>
      </TitleContainer>
      <FilterContainer>
        <ButtonStyled
          onClick={() => setAddCustomerOpen(true)}
          label={'+'}
          variant="secondary"
        />
        <input placeholder={'Filter'} />
      </FilterContainer>
    </Header>
  );
};

export default CustomersListHeaderUi;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
`;

const FilterContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const ButtonStyled = styled(ButtonUi)<{ variant: string }>`
  border-radius: 50px;
`;
