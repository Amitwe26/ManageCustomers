import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm/LoginForm';
import { getFormFields } from '../service/customerService';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<'login' | 'signup'>('login');

  const { data, isLoading } = useQuery(['loginInputs', activeTab], () =>
    getFormFields(activeTab),
  );
  const isLoginForm = activeTab === 'login';

  return (
    <Main>
      <Container>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab('login')}
            $isActive={isLoginForm}
          >
            {t('loginPage.login')}
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('signup')}
            $isActive={!isLoginForm}
          >
            {t('loginPage.signup')}
          </TabButton>
        </TabContainer>
        <LoginForm fields={data} isLoginForm={isLoginForm} />
      </Container>
    </Main>
  );
};

export default LoginPage;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
  height: 100vh;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border-radius: 10px;
  max-height: 400px;
  align-content: center;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
  background-color: white;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const TabButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(175, 148, 232, 0.76)' : '#ddd'};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 49%;

  &:hover {
    ${({ $isActive }) =>
      `background-color: ${!$isActive} ? 'rgba(149, 141, 159, 0.76)' : '#ddd'`};
    opacity: 0.8;
  }
`;
