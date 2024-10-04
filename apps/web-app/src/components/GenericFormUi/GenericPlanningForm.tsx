import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { InputField, PlanningType } from '../../types/customers';
import { Path, useFieldArray, useForm } from 'react-hook-form';
import InputUi from '../InputUi/InputUi';
import styled from 'styled-components';
import { setNewPlanning } from '../../utils/firebase';
import ButtonUi from '../ButtonUi/ButtonUi';

const GenericPlanningForm = ({
  fields,
  setAddCustomerOpen,
  customerId,
  refetchCustomersData,
}: {
  customerId: string;
  fields: InputField[];
  setAddCustomerOpen: (open: boolean) => void;
  refetchCustomersData: () => void;
}) => {
  const { user } = useAppContext();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PlanningType>();
  const {
    fields: optionsFields,
    append,
    remove,
  } = useFieldArray({
    control, // control is needed to manage field arrays
    name: 'options', // This corresponds to the options array in PlanningType
  });

  const onSubmit = async (data: PlanningType) => {
    if (user?.id) {
      await setNewPlanning(user.id, customerId, data);
      refetchCustomersData();
      setAddCustomerOpen(false);
      reset();
    }
  };
  const renderFields = (headerInputs: InputField[]) => {
    return headerInputs?.map((field, index) => {
      return (
        <InputContainer key={field.key + index}>
          <InputUi<PlanningType>
            label={field.label}
            name={field.key as Path<PlanningType>}
            type={field.type}
            field={field}
            register={register}
            errors={errors}
          />
        </InputContainer>
      );
    });
  };

  const optionFields = fields.filter(
    (field) =>
      field.key !== 'title' &&
      field.key !== 'planningDate' &&
      field.key !== 'planningNotes',
  );
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        {renderFields(
          fields.filter((field) =>
            ['title', 'planningDate', 'planningNotes'].includes(field.key),
          ),
        )}
      </HeaderContainer>

      <div>
        <h3>Options</h3>
        {optionsFields.map((option, index) => (
          <div key={option.id}>
            <h4>Option {index + 1}</h4>
            {optionFields.map((field) => (
              <InputContainer key={field.key}>
                <InputUi
                  label={field.label}
                  name={`options.${index}.${field.key}` as Path<PlanningType>}
                  type={field.type}
                  register={register}
                  errors={errors}
                />
              </InputContainer>
            ))}
            <RemovePlanning
              label="Remove Option"
              variant="secondary"
              onClick={() => remove(index)} // Remove option dynamically
            />
          </div>
        ))}

        <AddOption
          label="Add Option"
          variant="primary"
          onClick={() => {
            append(
              optionFields.reduce((acc, field) => {
                acc[field.key] = ''; // Initialize each field with an empty string
                return acc;
              }, {} as any),
            );
          }}
        />
      </div>

      <ButtonUi
        type="submit"
        variant="primary"
        label="Add Planning"
        onClick={() => {}}
      />
    </FormContainer>
  );
};

export default GenericPlanningForm;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RemovePlanning = styled(ButtonUi)`
  margin-bottom: 20px;
`;

const AddOption = styled(ButtonUi)`
  margin-bottom: 20px;
`;
