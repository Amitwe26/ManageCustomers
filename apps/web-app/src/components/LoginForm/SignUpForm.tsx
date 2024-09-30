import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, loginUser, setNewUser } from '../../utils/firebase'; // Assuming Firebase is set up correctly
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputUi from '../InputUi/InputUi';
import { useAppContext } from '../../context/AppContext'; // Reuse InputUi component

export interface SignUpFormFields {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  name: string;
  profession: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormFields>();
  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    const { email, password, phone, name, profession } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const createdUser = await setNewUser(data, user.uid);
      if (createdUser) {
        const userLogin = await loginUser(data);
        if (userLogin) navigate('/customers');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const password = watch('password', ''); // Watch password field for validation

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        label="Name"
        name="name"
        type="text"
        required
        register={register}
        errors={errors}
        field={{
          key: 'name',
          label: 'Enter your name',
          type: 'text',
          id: '1',
        }}
      />

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
          id: '2',
        }}
      />

      <StyledInput
        label="Phone"
        name="phone"
        type="text"
        required
        register={register}
        errors={errors}
        field={{
          key: 'phone',
          label: 'Enter your phone number',
          type: 'text',
          id: '3',
        }}
      />

      <StyledInput
        label="Password"
        name="password"
        type="password"
        required
        register={register}
        errors={errors}
        field={{
          key: 'password',
          label: 'Enter your password',
          type: 'password',
          id: '4',
        }}
      />

      <StyledInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        required
        register={register}
        errors={errors}
        field={{
          key: 'confirmPassword',
          label: 'Confirm your password',
          type: 'password',
          id: '5',
        }}
        // validate={(value: string) =>
        //   value === password || 'Passwords do not match'
        // }
      />

      <StyledInput
        label="Profession"
        name="profession"
        type="text"
        required
        register={register}
        errors={errors}
        field={{
          key: 'profession',
          label: 'Enter your profession',
          type: 'text',
          id: '6',
        }}
      />
      <button type="submit">Sign Up</button>
    </StyledForm>
  );
};

export default SignUpForm;

const StyledForm = styled.form`
  display: flex;
  margin-top: 30px;
  height: auto;
  flex-direction: column;
  place-items: center;
`;

const StyledInput = styled(InputUi<SignUpFormFields>)`
  margin-bottom: 10px;
`;
