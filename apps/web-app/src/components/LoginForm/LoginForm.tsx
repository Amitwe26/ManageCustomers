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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields | SignUpFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields | SignUpFormFields> = async (
    data,
  ) => {
    if (data) {
      setIsLoading(true);
      try {
        if (isLoginForm) {
          const user = await loginUser(data);
          if (user) {
            const getUser = await getUserInfo(user.uid);
            if (getUser) navigate('/customers');
          } else {
            console.log('No user logged in');
          }
        } else {
          const userCredential = await CreateNewUser(data);
          const user = userCredential.user;
          const createdUser = await setNewUser(
            data as SignUpFormFields,
            user.uid,
          );
          if (createdUser) {
            const userLogin = await loginUser(data);
            if (userLogin) navigate('/customers');
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error signing up:', error);
      }
    }
  };
  console.log(fields);
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
              errors={errors}
            />
          ))
        : fields?.map((field, index) => {
            if (field?.type === 'selection') {
              return (
                <SelectionStyled
                  key={index}
                  label={t(`loginPage.${field.key}`)}
                  name={field.key}
                  pathTranslation="loginPage"
                  register={register}
                  options={field?.options}
                />
              );
            }
            return (
              <StyledInput
                key={index}
                label={t(`loginPage.${field.key}`)}
                name={field.key as keyof SignUpFormFields}
                type={field.type}
                required
                register={register}
                errors={errors}
              />
            );
          })}
      <button type="submit">
        {isLoginForm ? t('loginPage.login') : t('loginPage.signup')}
      </button>
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

  //margin-right: 10px;
`;
