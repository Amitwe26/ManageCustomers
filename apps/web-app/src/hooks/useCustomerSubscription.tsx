// import { useEffect } from 'react';
// import { useQueryClient, useQuery } from 'react-query';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db, getCustomersUser } from '../service/customerService';
//
// const useCustomerSubscription = (userId: string) => {
//   const queryClient = useQueryClient();
//
//   useEffect(() => {
//     const customersColRef = collection(db, 'users', userId, 'customers');
//     console.log('render');
//     const unsubscribe = onSnapshot(customersColRef, (snapshot) => {
//       const customers = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//
//       queryClient.setQueryData(['customers', userId], customers);
//     });
//
//     return () => unsubscribe();
//   }, [userId, queryClient]);
// };
//
// export const useCustomers = (userId: string) => {
//   useCustomerSubscription(userId); // Automatically subscribe to changes
//   return useQuery(['customers', userId], async () => getCustomersUser(userId));
// };
