import InputUi from '../InputUi/InputUi';
import React from 'react';
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FormField,
  LoginFormFields,
  SignUpFormFields,
} from '../../types/loginTypes';
import SelectionUi from '../SelectionUi/SelectionUi';
import { useTranslation } from 'react-i18next';
import { getUserInfo, setNewUser } from '../../service/userService';
import { CreateNewUser, loginUser } from '../../service/loginService';
import ButtonUi from '../ButtonUi/ButtonUi';
import { loginSchema, signupSchema } from '../../utils/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = ({
  fields,
  isLoginForm,
}: {
  fields?: FormField<LoginFormFields>[] | FormField<SignUpFormFields>[];
  isLoginForm: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormFields | SignUpFormFields>({
    resolver: yupResolver(isLoginForm ? loginSchema : signupSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields | SignUpFormFields> = async (
    data,
  ) => {
    setIsLoading(true);
    try {
      if (isLoginForm) {
        const user = await loginUser(data);
        const getUser = await getUserInfo(user.uid);
        if (getUser) navigate('/customers');
      } else {
        const userCredential = await CreateNewUser(data);
        const createdUser = await setNewUser(
          data as SignUpFormFields,
          userCredential.user.uid,
        );
        if (createdUser) navigate('/customers');
      }
    } catch (error) {
      const errorMessage = handleAuthError(error);
      console.error('Error:', errorMessage);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/user-not-found':
        return 'User not found. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An error occurred. Please try again later.';
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {isLoginForm
        ? fields?.map((field, index) => (
            <StyledInput
              key={index}
              label={t(`loginPage.${field.key}`)}
              name={field.key as keyof LoginFormFields}
              type={field.type}
              required
              register={register}
              onBlur={() => trigger(field.key)}
              onChange={(e) =>
                setValue(field.key, e.target.value, { shouldValidate: true })
              }
              error={errors[field.key as keyof LoginFormFields]?.message}
            />
          ))
        : fields?.map((field, index) => {
            if (field?.type === 'selection') {
              return (
                <>
                  <SelectionStyled
                    key={index}
                    label={t(`loginPage.${field.key}`)}
                    name={field.key}
                    pathTranslation="loginPage"
                    register={register}
                    options={field?.options}
                  />
                  {errors[field.key as keyof LoginFormFields] && (
                    <ErrorText>
                      {errors[field.key as keyof LoginFormFields]?.message}
                    </ErrorText>
                  )}
                </>
              );
            }
            return (
              <>
                <StyledInput
                  key={index}
                  label={t(`loginPage.${field.key}`)}
                  name={field.key as keyof SignUpFormFields}
                  type={field.type}
                  required
                  register={register}
                  onBlur={() => trigger(field.key)}
                  onChange={(e) =>
                    setValue(field.key, e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  error={errors[field.key as keyof LoginFormFields]?.message}
                />
              </>
            );
          })}
      <ButtonUi
        variant="primary"
        onClick={() => {}}
        disabled={Object.keys(errors).length !== 0}
        label={isLoginForm ? t('loginPage.login') : t('loginPage.signup')}
        type="submit"
      />
      {authError && <ErrorText>{authError}</ErrorText>}
      {isLoading && <p>{t('loadingText')}</p>}
    </StyledForm>
  );
};
export default LoginForm;

const StyledForm = styled.form`
  display: flex;
  margin-top: 30px;
  height: 200px;
  width: 50%;
  align-self: center;
  flex-direction: column;
  place-items: center;
`;

const StyledInput = styled(InputUi<LoginFormFields | SignUpFormFields>)`
  margin-bottom: 10px;
  width: 100%;
`;

const SelectionStyled = styled(SelectionUi)<{
  register?: UseFormRegister<LoginFormFields | SignUpFormFields>;
}>`
  align-self: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875em;
  margin-top: 0.25em;
`;
