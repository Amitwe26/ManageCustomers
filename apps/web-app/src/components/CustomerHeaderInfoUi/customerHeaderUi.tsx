import React from 'react';
import styled from 'styled-components';
import { Customer } from '../../types/customers';

const CustomerHeaderUi = ({ customer }: { customer: Customer }) => {
  return (
    <>
      <Container>
        <Title>{customer.name}</Title>
        <FlexContainer>
          <InfoContainer>
            <Label>Age: {customer.age}</Label>
            <Label>Gender: {customer.gender}</Label>
            <Label>Height: {customer.height} cm</Label>
            <Label>Weight: {customer.weight} kg</Label>
          </InfoContainer>
          <InfoContainer>
            <Label>{customer?.summaryConversation?.[0].description}</Label>
          </InfoContainer>
          <InfoContainer>
            <Label>{customer?.summaryConversation?.[0].date}</Label>
            <Label>{customer?.summaryConversation?.[0].timestamp}</Label>
          </InfoContainer>
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
  display: flex;
  flex-direction: column;
  width: 20%;
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
