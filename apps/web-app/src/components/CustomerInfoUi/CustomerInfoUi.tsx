import React from 'react';
import { Customer } from '../../types/customers';
import { CustomerFields } from '../../types/userType';
import styled from 'styled-components';

const CustomerInfoUi = ({
  customer,
}: {
  customer: Customer<CustomerFields>;
}) => {
  return (
    <FlexContainer>
      {Object.entries(customer).map(([name, value]) => {
        if (name === 'id' || name === 'history') return;
        return <Label key={customer.id + name}>{`${name}: ${value}`}</Label>;
      })}
    </FlexContainer>
  );
};

export default CustomerInfoUi;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
