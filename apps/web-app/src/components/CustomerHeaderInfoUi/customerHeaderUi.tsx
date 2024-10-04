import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customers';
import { CustomerFields } from '../../types/userType';

const CustomerHeaderUi = ({
  customer,
}: {
  customer: Customer<CustomerFields>;
}) => {
  const rednerInfo = () => {
    const labelsToRender = [
      'name',
      'email',
      'phone',
      'activityLevel',
      'age',
      'gender',
      'startDate',
      'endDate',
    ];
    return (
      <>
        {Object.entries(customer)
          .filter(([name]) => labelsToRender.includes(name))
          .sort(
            ([nameA], [nameB]) =>
              labelsToRender.indexOf(nameA) - labelsToRender.indexOf(nameB),
          )
          .map(([name, value]) => (
            <Label key={customer.id + name}>{`${name}: ${value}`}</Label>
          ))}
      </>
    );
  };

  return (
    <>
      <Container>
        <Title>{customer.name}</Title>
        <FlexContainer>
          <InfoContainer>{rednerInfo()}</InfoContainer>
        </FlexContainer>
      </Container>
    </>
  );
};

export default CustomerHeaderUi;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  //place-items: center;
  margin: 20px 0 15px;
  border-radius: 15px;
  border: 1px solid rgba(221, 221, 221, 0.4);
`;
const FlexContainer = styled.div`
  display: flex;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  flex-direction: column;
  width: 80%;
  height: 10vh;
  padding: 0 10px 8px;
  justify-content: space-around;
  border-right: 1px solid rgba(221, 221, 221, 0.7);
`;

const Title = styled.label`
  font-size: 28px;
  margin: 10px 8px;
`;

const Label = styled.label`
  font-size: 15px;
`;
