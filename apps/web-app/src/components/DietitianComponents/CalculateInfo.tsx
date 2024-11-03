import { Customer } from '../../types/customersTypes';
import { DietitianFields } from '../../types/userTypes';
import React from 'react';
import {
  calculateBMI,
  calculateCarbohydrateIntake,
  calculateProteinIntake,
  calculateRMR,
  determineWeightChange,
} from '../../utils/dietitianCalculate';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface CustomerComponentProps {
  customer: Customer<DietitianFields>;
}
const CalculateInfo = ({ customer }: CustomerComponentProps) => {
  const { t } = useTranslation();
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
      <div>
        <BoldText>{t('customerDetails.strategy.bmi')}:</BoldText>{' '}
        {bmi.toFixed(2)}
      </div>
      <div>
        <BoldText>{t('customerDetails.strategy.rmr')}:</BoldText>{' '}
        {rmr.toFixed(2)}
      </div>
      <div>
        <BoldText>{t('customerDetails.strategy.determine')}: </BoldText>
        {t(`customerDetails.strategy.${determine}`)}
      </div>
      <div>
        <BoldText>{t('customerDetails.strategy.protein')}: </BoldText>
        {Protein.toFixed(2)}
        {t('customerDetails.strategy.gr')}
      </div>
      <div>
        <BoldText>{t('customerDetails.strategy.carbohydrate')}: </BoldText>
        {carbohydrate.toFixed(1)} {t('customerDetails.strategy.gr')}
      </div>
    </InfoContainer>
  );
};

export default CalculateInfo;

const InfoContainer = styled.div`
  padding: 10px;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.backgroundColor.softRed};
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

const BoldText = styled.b``;
