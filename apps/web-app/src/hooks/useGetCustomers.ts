import { useQueryClient } from 'react-query';
import { User } from '../types/userTypes';

export const useGetCustomers = (userId: string) => {
  const queryClient = useQueryClient();
  const users = queryClient.getQueryData<User[]>('users');
  const activeUser = users?.find(
    (userInfo: { id: any }) => userInfo?.id === userId,
  );
  if (activeUser) {
    return activeUser;
  }
};
export default useGetCustomers;
