import { Customer } from '../../types/customers';
import { DietitianFields } from '../../types/userType';
import React from 'react';
import {
  calculateBMI,
  calculateCarbohydrateIntake,
  calculateProteinIntake,
  calculateRMR,
  determineWeightChange,
} from '../../utils/dietitianCalculate';
import styled from 'styled-components';

interface CustomerComponentProps {
  customer: Customer<DietitianFields>;
}
const CalculateInfo = ({ customer }: CustomerComponentProps) => {
  const bmi = calculateBMI(+customer.startWeight, +customer.height); // Using startWeight
  const rmr = calculateRMR(
    +customer.startWeight,
    +customer.height,
    +customer.age,
    customer.gender,
  );
  const determine = determineWeightChange(
    +customer.startWeight,
    +customer.endWeight,
  );
  const Protein = calculateProteinIntake(+customer.startWeight);
  const carbohydrate = calculateCarbohydrateIntake(
    +customer.startWeight,
    +customer.height,
    +customer.age,
    customer.gender,
    +customer.activityLevel,
  );

  return (
    <InfoContainer>
      <div>BMI: {bmi.toFixed(2)}</div>
      <div>RMR: {rmr.toFixed(2)}</div>
      <div>Determine: {determine}!</div>
      <div>Protein: {Protein} gr</div>
      <div>carbohydrate: {carbohydrate.toFixed(1)} gr</div>
    </InfoContainer>
  );
};

export default CalculateInfo;

const InfoContainer = styled.div`
  padding: 10px;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;
