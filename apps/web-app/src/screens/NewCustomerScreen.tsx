import React from 'react';
import { useAppContext } from '../context/AppContext';
import AddCustomerForm from '../components/AddCustomerFormUi/AddCustomerForm';

const NewCustomerScreen = () => {
  const { user } = useAppContext();

  return <div>{user?.profession ? <AddCustomerForm /> : null}</div>;
};

export default NewCustomerScreen;
