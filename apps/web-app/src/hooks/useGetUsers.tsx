import { useQuery, useQueryClient } from 'react-query';
import { User } from '../types/userType';
import { getUserInfo } from '../utils/firebase';

const useGetUsers = () => {
  const queryClient = useQueryClient();
  const query = useQuery<User[]>('users', getUserInfo);
  return { ...query, queryClient };
};
export default useGetUsers;
