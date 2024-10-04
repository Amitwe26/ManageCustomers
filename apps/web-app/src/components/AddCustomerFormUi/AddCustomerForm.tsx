import React from 'react';
import { GenericCustomerFormUi } from '../GenericFormUi/GenericCustomerFormUi';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { getUserProfession } from '../../utils/firebase';
import { InputField } from '../../types/customers';

const AddCustomerForm = ({
  setAddCustomerOpen,
  refechCustomersData,
}: {
  setAddCustomerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refechCustomersData: VoidFunction;
}) => {
  const { user } = useAppContext();
  const [fields, setFields] = useState<InputField[]>([]);
  useEffect(() => {
    const fetchFields = async () => {
      const data = await getUserProfession();
      const res = data.find((elem) => elem.professionName === user?.profession);
      if (res) setFields(res.customerInputProfession);
    };

    fetchFields();
  }, []);

  return (
    <GenericCustomerFormUi
      fields={fields}
      setAddCustomerOpen={() => setAddCustomerOpen(false)}
      refetchCustomersData={refechCustomersData}
    />
  );
};
export default AddCustomerForm;
