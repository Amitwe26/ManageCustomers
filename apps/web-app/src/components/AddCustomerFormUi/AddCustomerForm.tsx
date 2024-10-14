import React from 'react';
import { GenericCustomerFormUi } from '../GenericFormUi/GenericCustomerFormUi';
import { useAppContext } from '../../context/AppContext';
import { InputField } from '../../types/customersTypes';
import { useQuery } from 'react-query';
import { getUserProfession } from '../../service/userService';

const AddCustomerForm = ({
  setAddCustomerOpen,
  refetchCustomersData,
}: {
  setAddCustomerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchCustomersData: VoidFunction;
}) => {
  const { user } = useAppContext();

  const { data, isLoading, isError } = useQuery(
    ['userProfession', user?.id],
    async () => await getUserProfession(),
    { staleTime: 600000 },
  );

  const fields: InputField[] = React.useMemo(() => {
    if (!data) return [];
    const professionData = data.find(
      (elem) => elem.professionName === user?.profession,
    );
    return professionData ? professionData.customerInputProfession : [];
  }, [data, user?.profession]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching professions</div>;

  return (
    <GenericCustomerFormUi
      fields={fields}
      setAddCustomerOpen={() => setAddCustomerOpen(false)}
      refetchCustomersData={refetchCustomersData}
    />
  );
};

export default AddCustomerForm;
