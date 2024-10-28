import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ButtonUi from '../ButtonUi/ButtonUi';
import { Customer } from '../../types/customersTypes';
import { CustomerFields } from '../../types/userTypes';
import { EventCalendar } from '../../types/calendarTypes';
import { formatDateForInput } from '../../utils/dateUtils';

const TaskPopup: React.FC<{
  initialData: EventCalendar | null;
  onSubmit: (data: EventCalendar) => void;
  onClose: () => void;
  onDelete: () => void;
  customers?: Customer<CustomerFields>[];
}> = ({ initialData, onSubmit, onClose, onDelete, customers }) => {
  const [isEditable, setIsEditable] = useState(!initialData);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(
    initialData?.customerId || undefined,
  );

  const { register, handleSubmit, watch, setValue } = useForm<EventCalendar>({
    defaultValues: initialData || {
      title: '',
      description: '',
      date: '',
      start: '',
      end: '',
      allDay: false,
      type: 'task',
      customerId: '',
    },
  });

  const isAllDay = watch('allDay');
  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCustomer(event.target.value);
  };

  const handleFormSubmit = (data: EventCalendar) => {
    onSubmit({ ...data, allDay: isAllDay, customerId: selectedCustomer });
    onClose();
  };

  const formFields = [
    { label: 'Title', type: 'text', name: 'title', placeholder: 'Task Title' },
    {
      label: 'Description',
      type: 'textarea',
      name: 'description',
      placeholder: 'Task Description',
    },
    { label: 'Date', type: 'date', name: 'date' },
  ];

  return (
    <BackgroundWhite>
      <PopupWrapper>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormTitle>{initialData ? 'Edit Event' : 'Add New Task'}</FormTitle>

          {formFields.map(({ label, type, name, placeholder }, index) => (
            <div key={index}>
              <label>{label}</label>
              {type === 'textarea' ? (
                <Textarea
                  {...register(name as keyof EventCalendar)}
                  placeholder={placeholder}
                />
              ) : (
                <Input
                  type={type}
                  {...register(name as keyof EventCalendar)}
                  placeholder={
                    label === 'date'
                      ? formatDateForInput(placeholder ?? '')
                      : placeholder
                  }
                />
              )}
            </div>
          ))}

          <CheckBoxsContainer>
            <label>
              <input
                type="checkbox"
                {...register('allDay')}
                onChange={(e) => setValue('allDay', e.target.checked)}
              />
              All Day
            </label>
            <label>
              <input type="radio" value="task" {...register('type')} />
              Task
            </label>
            <label>
              <input type="radio" value="meeting" {...register('type')} />
              Meeting
            </label>
          </CheckBoxsContainer>

          {!isAllDay && (
            <>
              <div>
                <label>Start Time</label>
                <Input type="time" {...register('start')} />
              </div>
              <div>
                <label>End Time</label>
                <Input type="time" {...register('end')} />
              </div>
            </>
          )}

          <ButtonWrapper>
            <select
              onChange={handleCustomerChange}
              value={selectedCustomer || ''}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <Button type="submit">{initialData ? 'Save' : 'Add'}</Button>
            {initialData?.title && (
              <ButtonUi
                variant="delete"
                label="Delete Task"
                type="button"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              />
            )}
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </ButtonWrapper>
        </form>
      </PopupWrapper>
    </BackgroundWhite>
  );
};

const BackgroundWhite = styled.div`
  background-color: rgba(255, 255, 255, 0.78);
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

const CheckBoxsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  justify-content: space-around;
  margin: 15px 0;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Textarea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  resize: none;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background-color: #3f51b5;
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #283593;
  }
  &:focus {
    outline: none;
  }
`;

export default TaskPopup;
