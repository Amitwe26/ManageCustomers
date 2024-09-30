import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm/LoginForm';
import SignUpForm from '../components/LoginForm/SignUpForm';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('login');

  return (
    <Main>
      <Container>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab('login')}
            $isActive={activeTab === 'login'}
          >
            Login
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('signup')}
            $isActive={activeTab === 'signup'}
          >
            Sign up
          </TabButton>
        </TabContainer>
        {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
      </Container>
    </Main>
  );
};

export default LoginPage;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
  width: 100%;
  height: 100vh;
  border: 1px solid;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  max-height: 400px;
  align-content: center;
  box-shadow: 1px 2px 2px 2px #d6d3d3;
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
