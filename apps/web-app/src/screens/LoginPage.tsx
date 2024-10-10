import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm/LoginForm';
import { getFormFields } from '../utils/firebase';
import {
  FormField,
  LoginFormFields,
  SignUpFormFields,
} from '../types/loginTypes';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<'login' | 'signup'>('login');
  const [loginFields, setLoginFields] = useState<FormField<LoginFormFields>[]>(
    [],
  );
  const [signupFields, setSignupFields] = useState<
    FormField<SignUpFormFields>[]
  >([]);
  const isLoginForm = activeTab === 'login';

  useEffect(() => {
    const fetchFields = async () => {
      const formFields = await getFormFields(activeTab);
      if (isLoginForm && formFields) {
        setLoginFields(formFields as FormField<LoginFormFields>[]);
      } else {
        setSignupFields(formFields as FormField<SignUpFormFields>[]);
      }
    };

    fetchFields();
  }, [activeTab, isLoginForm]);

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
        <LoginForm
          fields={isLoginForm ? loginFields : signupFields}
          isLoginForm={isLoginForm}
        />
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
  max-height: 400px;
  align-content: center;
  box-shadow: 0 4px 7px rgba(128, 0, 128, 0.1);
  background-color: white;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TabButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(175, 148, 232, 0.76)' : '#ddd'};
  color: white;
  border: none;
  padding: 6px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 50%;

  &:hover {
    ${({ $isActive }) =>
      `background-color: ${!$isActive} ? 'rgba(149, 141, 159, 0.76)' : '#ddd'`};
    opacity: 0.8;
  }
`;
