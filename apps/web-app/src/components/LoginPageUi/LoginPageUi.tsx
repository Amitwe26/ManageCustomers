import { useForm, SubmitHandler } from 'react-hook-form';
import InputUi from '../InputUi/InputUi';
import React from 'react';
import { getUserInfo, loginUser, observeAuthState } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface LoginFormFields {
  email: string;
  password: string;
}

const LoginPageUi: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();
  const handleLogin = async (data: LoginFormFields) => {
    try {
      const user = await loginUser(data);
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    if (data) {
      await handleLogin(data);
      observeAuthState(async (user) => {
        if (user) {
          const getUser = await getUserInfo().then((res) => {
            return res.find(
              (userInfo: { id: any }) => userInfo?.id === user?.uid,
            );
          });
          if (getUser) navigate('/customers');
        } else {
          console.log('No user logged in');
        }
      });
    }
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Email"
          name="email"
          type="email"
          required
          register={register}
          errors={errors}
          field={{
            key: 'email',
            label: 'Enter your email',
            type: 'email',
            id: '1',
          }}
        />
        <StyledInput
          label="Password"
          name="password"
          type="text"
          required
          register={register}
          errors={errors}
          field={{
            key: 'password',
            label: 'Enter your password',
            type: 'text',
            id: '2',
          }}
        />
        <button type="submit">Login</button>
      </StyledForm>
    </Container>
  );
};

export default LoginPageUi;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-content: center;
`;
const StyledForm = styled.form`
  display: flex;
  margin-top: 30px;
  height: 200px;
  flex-direction: column;
  place-items: center;
`;

const StyledInput = styled(InputUi<LoginFormFields>)`
  margin-bottom: 10px;
`;
