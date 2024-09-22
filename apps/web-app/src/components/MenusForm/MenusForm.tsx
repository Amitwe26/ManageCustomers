import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Customer, FitnessMenu, Meal } from '../../types/customers';
// import { FitnessMenu, Customer } from '../../utils/getCustomersList';

interface MenusFormProps {
  customer: Customer;
  onAddMenu: (newMenu: FitnessMenu) => void;
}

const MenusForm = ({ customer, onAddMenu }: MenusFormProps) => {
  const { register, handleSubmit, reset } = useForm<FitnessMenu>();
  const [meals, setMeals] = useState<FitnessMenu['meals']>([]);

  const addMeal = () => {
    setMeals((prev: FitnessMenu['meals']) => [
      ...prev,
      {
        nameMeal: '',
        ingredients: '',
        notes: '',
        startTime: '',
        endTime: '',
      },
    ]);
  };

  const onSubmit: SubmitHandler<FitnessMenu> = (data) => {
    onAddMenu({ ...data, meals });
    reset();
    setMeals([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Fitness Menu for {customer.name}</h2>
      <label>
        Name:
        <input {...register('title')} required />
      </label>

      <label>
        Date:
        <input type="date" {...register('date')} required />
      </label>

      <label>
        Notes:
        <textarea {...register('notes')} />
      </label>

      <h3>Meals:</h3>
      {meals.map((meal: Meal, index) => (
        <div key={index}>
          <label>
            Meal Name:
            <input
              value={meal.nameMeal}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index].nameMeal = e.target.value;
                setMeals(newMeals);
              }}
              required
            />
          </label>

          <label>
            Ingredients:
            <input
              value={meal.ingredients}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index].ingredients = e.target.value;
                setMeals(newMeals);
              }}
              required
            />
          </label>

          <label>
            Notes:
            <textarea
              value={meal.notes}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index].notes = e.target.value;
                setMeals(newMeals);
              }}
            />
          </label>

          <label>
            Start Time:
            <input
              type="time"
              value={meal.startTime}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index].startTime = e.target.value;
                setMeals(newMeals);
              }}
            />
          </label>

          <label>
            End Time:
            <input
              type="time"
              value={meal.endTime}
              onChange={(e) => {
                const newMeals = [...meals];
                newMeals[index].endTime = e.target.value;
                setMeals(newMeals);
              }}
            />
          </label>
        </div>
      ))}

      <button type="button" onClick={addMeal}>
        Add Meal
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MenusForm;
