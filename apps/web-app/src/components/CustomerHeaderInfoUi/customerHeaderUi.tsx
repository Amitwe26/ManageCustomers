import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';

const CustomerHeaderUi = ({
  customer,
}: {
  customer: Customer<CustomerFields>;
}) => {
  const renderPrimaryInfo = () => {
    return (
      <TopHeader>
        <PrimaryLabel>{customer.name}</PrimaryLabel>
        <Label>{customer.email}</Label>
        <Label>{customer.phone}</Label>
      </TopHeader>
    );
  };

  const renderSecondaryInfo = () => {
    const labelsToRender = [
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
            <Label key={customer.id + name}>{value.toString()}</Label>
          ))}
      </>
    );
  };

  return (
    <Container>
      <PrimaryInfoContainer>{renderPrimaryInfo()}</PrimaryInfoContainer>
      <FlexContainer>
        <InfoContainer>{renderSecondaryInfo()}</InfoContainer>
      </FlexContainer>
    </Container>
  );
};

export default CustomerHeaderUi;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 20px 0 15px;
  border-radius: 15px;
  border: 1px solid rgba(221, 221, 221, 0.4);
`;

const FlexContainer = styled.div`
  display: grid;
`;

const InfoContainer = styled.div`
  display: grid;
  width: 80%;
  padding: 10px;
  justify-content: space-around;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

const PrimaryInfoContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(221, 221, 221, 0.7);
`;

const TopHeader = styled.div`
  display: grid;
  grid-template-columns: 200px;
`;
const PrimaryLabel = styled.label`
  font-size: 28px;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-size: 15px;
`;
