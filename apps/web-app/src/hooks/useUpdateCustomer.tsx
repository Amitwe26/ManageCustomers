import { useMutation } from 'react-query';
import { CustomerFields } from '../types/userTypes';
import { updateCustomer } from '../service/customerService';
import { Customer } from '../types/customersTypes';

export const useUpdateCustomer = () => {
  return useMutation(
    ({
      userId,
      customerId,
      updatedData,
    }: {
      userId: string;
      updatedData: Customer<CustomerFields>;
      customerId: string;
    }) => updateCustomer(userId, updatedData, customerId),
  );
};
