import React from 'react';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer } from '../../types/customers';
import { CustomerFields } from '../../types/userType';

interface CustomersListHeaderUiProps {
  customers?: Customer<CustomerFields>[];
  setAddCustomerOpen: (open: boolean) => void;
  setFilterList: React.Dispatch<
    React.SetStateAction<Customer<CustomerFields>[] | undefined>
  >;
}
const CustomersListHeaderUi = ({
  customers,
  setAddCustomerOpen,
  setFilterList,
}: CustomersListHeaderUiProps) => {
  const onChange = (value: any) => {
    const newList = customers?.filter((customer) =>
      customer.name.toLowerCase().includes(value.target.value.toLowerCase()),
    );
    setFilterList(newList);
  };

  return (
    <Header>
      <TitleContainer>
        <h2>Customers </h2>
        <span> {customers?.length}</span>
      </TitleContainer>
      <FilterContainer>
        <input placeholder={'Filter'} onChange={onChange} />
        <ButtonStyled
          onClick={() => setAddCustomerOpen(true)}
          label={'+'}
          variant="secondary"
        />
      </FilterContainer>
    </Header>
  );
};

export default CustomersListHeaderUi;
const Header = styled.header`
  display: flex;
  align-items: center;
  width: 40%;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const ButtonStyled = styled(ButtonUi)<{ variant: string }>`
  border-radius: 50px;
`;
