import { useTranslation } from 'react-i18next';

export const useStrategyTranslation = () => {
  const { t } = useTranslation();
  const basePath = 'customerDetails.strategy';
  const strategyInputs = `${basePath}.strategyInputs`;

  const strategyTranslation = (key: string) => t(`${basePath}.${key}`);
  const getStrategyInputsTranslation = (key: string) =>
    t(`${strategyInputs}.${key}`);

  return {
    strategyTranslation,
    getStrategyInputsTranslation,
  };
};
