import React, { useState, useEffect } from 'react';
import {
  getCollectionWithId,
  getUserProfession,
  setNewCustomer,
} from '../../utils/firebase';
import styled from 'styled-components';
import InputUi from '../InputUi/InputUi';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer, InputField } from '../../types/customers';
import { CustomerFields, FitnessFields, User } from '../../types/userType';
import { useForm } from 'react-hook-form';

export const GenericFormUi: React.FC<{
  professionId: string;
  user?: User;
  getList: () => Promise<void>;
}> = ({ professionId, user, getList }) => {
  const [fields, setFields] = useState<InputField[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer<CustomerFields>>();

  useEffect(() => {
    const fetchFields = async () => {
      const data = await getUserProfession();
      const res = data.find((elem) => elem.professionName === user?.profession);
      const res2 = await getCollectionWithId('professions', res?.id, 'fields');
      setFields(res2);
    };

    fetchFields();
  }, [professionId]);

  const renderFields = () => {
    return fields?.map((field) => {
      if (field.type === 'textarea') {
        return (
          <InputContainer key={field.key}>
            <InputUi
              label={field.label}
              name={field.key}
              type={field.type}
              field={field}
              register={register}
              errors={errors}
            />
          </InputContainer>
        );
      }

      return (
        <InputContainer key={field.key}>
          <InputUi
            label={field.label}
            name={field.key}
            field={field}
            type={field.type}
            register={register}
            errors={errors}
          />
        </InputContainer>
      );
    });
  };

  const onSubmit = async (data: Customer<CustomerFields>) => {
    if (user?.id) {
      await setNewCustomer(user?.id, data);
      await getList();
      reset();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputsWrapper>{renderFields()}</InputsWrapper>
      <ButtonUi
        type="submit"
        variant={'secondary'}
        label="Add Customer"
        onClick={() => {}}
      />
    </FormContainer>
  );
};

// Example usage in a parent component
const ChangeForm = ({
  user,
  getList,
}: {
  user?: User;
  getList: () => Promise<void>;
}) => {
  const [selectedProfessionId, setSelectedProfessionId] =
    useState<string>('fitness');

  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfessionId(e.target.value);
  };

  return (
    <GenericFormUi
      professionId={selectedProfessionId}
      user={user}
      getList={getList}
    />
  );
};

export default ChangeForm;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
`;

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  gap: 20px;
  margin-bottom: 20px;
`;
