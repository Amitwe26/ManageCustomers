// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Customer, FitnessMenu, Meal } from '../../types/customers';
// import styled from 'styled-components';
// import ButtonUi from '../ButtonUi/ButtonUi';
// // import { FitnessMenu, Customer } from '../../utils/getCustomersList';
//
// interface MenusFormProps {
//   customer: Customer<FitnessMenu>;
//   onAddMenu: (newMenu: FitnessMenu) => void;
//   onClose: () => void;
// }
//
// const MenusForm = ({ customer, onAddMenu, onClose }: MenusFormProps) => {
//   const { register, handleSubmit, reset } = useForm<FitnessMenu>();
//   const [meals, setMeals] = useState<FitnessMenu['meals']>([]);
//
//   const addMeal = () => {
//     setMeals((prev: FitnessMenu['meals']) => [
//       ...prev,
//       {
//         nameMeal: '',
//         ingredients: '',
//         notes: '',
//         startTime: '',
//         endTime: '',
//       },
//     ]);
//   };
//
//   const onSubmit: SubmitHandler<FitnessMenu> = (data) => {
//     onAddMenu({ ...data, meals });
//     reset();
//     setMeals([]);
//   };
//
//   return (
//     <FormContainer onSubmit={handleSubmit(onSubmit)}>
//       <FormHeader>
//         Add Fitness Menu for {customer.name}
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </FormHeader>
//       <InputsWrapper>
//         <Label>
//           Name:
//           <Input {...register('title')} required />
//         </Label>
//
//         <Label>
//           Date:
//           <Input type="date" {...register('date')} required />
//         </Label>
//
//         <Label>
//           Notes:
//           <TextArea {...register('notes')} />
//         </Label>
//       </InputsWrapper>
//       {meals.map((meal: Meal, index) => (
//         <MealContainer key={index}>
//           <Label>
//             Meal Name:
//             <Input
//               value={meal.nameMeal}
//               onChange={(e) => {
//                 const newMeals = [...meals];
//                 newMeals[index].nameMeal = e.target.value;
//                 setMeals(newMeals);
//               }}
//               required
//             />
//           </Label>
//
//           <Label>
//             Ingredients:
//             <Input
//               value={meal.ingredients}
//               onChange={(e) => {
//                 const newMeals = [...meals];
//                 newMeals[index].ingredients = e.target.value;
//                 setMeals(newMeals);
//               }}
//               required
//             />
//           </Label>
//
//           <Label>
//             Start Time:
//             <input
//               type="time"
//               value={meal.startTime}
//               onChange={(e) => {
//                 const newMeals = [...meals];
//                 newMeals[index].startTime = e.target.value;
//                 setMeals(newMeals);
//               }}
//             />
//           </Label>
//
//           <Label>
//             End Time:
//             <input
//               type="time"
//               value={meal.endTime}
//               onChange={(e) => {
//                 const newMeals = [...meals];
//                 newMeals[index].endTime = e.target.value;
//                 setMeals(newMeals);
//               }}
//             />
//           </Label>
//
//           <Label>
//             Notes:
//             <TextArea
//               value={meal.notes}
//               placeholder={'You can write everything'}
//               onChange={(e) => {
//                 const newMeals = [...meals];
//                 newMeals[index].notes = e.target.value;
//                 setMeals(newMeals);
//               }}
//             />
//           </Label>
//         </MealContainer>
//       ))}
//       <ButtonsContainer>
//         <ButtonUi
//           type="button"
//           variant={'secondary'}
//           label={'Add Meal'}
//           onClick={addMeal}
//         />
//
//         <ButtonUi
//           type="submit"
//           variant={'secondary'}
//           label={'Submit'}
//           onClick={() => {}}
//         />
//       </ButtonsContainer>
//     </FormContainer>
//   );
// };
//
// export default MenusForm;
//
// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   padding: 20px;
//   border-radius: 12px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// `;
//
// const FormHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;
//
// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 18px;
//   cursor: pointer;
//   color: #666;
// `;
//
// const InputsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 33% 33%;
//   gap: 20px;
//   margin-bottom: 20px;
// `;
//
// const Label = styled.label`
//   font-size: 17px;
//   margin-bottom: 5px;
//   color: #333;
// `;
//
// const ButtonsContainer = styled.div`
//   width: 20%;
//   align-self: center;
//   display: flex;
//   justify-content: space-between;
//   height: 100px;
//   flex-direction: column;
// `;
//
// const Input = styled.input`
//   width: 200px;
//   height: 20px;
//   border-radius: 10px;
//   margin: 0 5px 0;
// `;
//
// const MealContainer = styled.div`
//   display: grid;
//   grid-template-columns: 25% 25% 25% 25%;
//   align-items: center;
//   gap: 20px;
//   margin-bottom: 20px;
//   padding: 20px 0;
//   border-top: 0.6px solid ${({ theme }) => theme.colors.gray};
// `;
//
// const TextArea = styled.textarea`
//   width: 400px;
//   height: 50px;
//   border-radius: 20px;
//   padding: 10px;
// `;
