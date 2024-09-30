import InputUi from '../InputUi/InputUi';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUserInfo, loginUser } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '../../types/userType';

export interface LoginFormFields {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    if (data) {
      const user = await loginUser(data);
      if (user) {
        const getUser = await getUserInfo().then((users) =>
          users.find((userInfo: User) => userInfo?.email === data?.email),
        );
        if (getUser) navigate('/customers');
      } else {
        console.log('No user logged in');
      }
    }
  };

  return (
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
  );
};
export default LoginForm;

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
