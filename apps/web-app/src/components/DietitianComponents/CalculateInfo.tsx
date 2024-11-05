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
      <InfoTextContainer>
        <BoldText>{t('customerDetails.strategy.bmi')}</BoldText>{' '}
        <Info> {bmi.toFixed(2)}</Info>
      </InfoTextContainer>
      <InfoTextContainer>
        <BoldText>{t('customerDetails.strategy.rmr')}</BoldText>{' '}
        <Info>{rmr.toFixed(2)}</Info>
      </InfoTextContainer>
      <InfoTextContainer>
        <BoldText>{t('customerDetails.strategy.determine')} </BoldText>
        <Info>{t(`customerDetails.strategy.${determine}`)}</Info>
      </InfoTextContainer>
      <InfoTextContainer>
        <BoldText>{t('customerDetails.strategy.protein')} </BoldText>
        <Info>
          {Protein.toFixed(2)} {t('customerDetails.strategy.gr')}
        </Info>
      </InfoTextContainer>
      <InfoTextContainer>
        <BoldText>{t('customerDetails.strategy.carbohydrate')} </BoldText>
        <Info>
          {carbohydrate.toFixed(1)} {t('customerDetails.strategy.gr')}
        </Info>
      </InfoTextContainer>
    </InfoContainer>
  );
};

export default CalculateInfo;

const InfoContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.backgroundColor.softRed};
  padding: 10px;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  align-items: center;
`;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.colors.text.gray};
`;

const BoldText = styled.b``;
