import { ContactTess } from '@/components/dashboard/contactTess';
import { useAppContext } from '@/context/ContextProvider';

interface Props {}
const Action: React.FC<Props> = (props) => {
  const { state } = useAppContext();
  const hoses = state.data.assignedUnits[
    state.data.selectedUnitId!
  ].hoses.filter((hose) => state.data.selectedHoses.includes(hose.id));

  function saveMessage(formData: {
    comment: string;
    name: string;
    mail: string;
    phone: string;
    selectedIds: string[];
  }) {
    console.log('saveMessage', formData);
  }
  return (
    <ContactTess
      title={'Contact TESS Team'}
      subTitle={'Message details'}
      hoses={hoses}
      onSave={saveMessage}
      onAdd={function (arg0: any): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default Action;
