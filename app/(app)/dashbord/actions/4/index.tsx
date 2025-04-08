import { ContactTess } from '@/components/dashboard/contactTess';
import { useAppContext } from '@/context/ContextProvider';
import { useLocalSearchParams } from 'expo-router';

interface Props {}
const Action: React.FC<Props> = (props) => {
  const { state } = useAppContext();
  const hoses = state.data.assignedUnits[
    state.data.selectedUnitId!
  ].hoses.filter((hose) => state.data.selectedHoses.includes(hose.id));

  function saveScrapReport(formData: {
    comment: string;
    name: string;
    mail: string;
    phone: string;
    selectedIds: string[];
  }) {
    console.log('saveScrap', formData);
  }
  return (
    <ContactTess
      title={'Scrap hoses'}
      subTitle={'Scrap report'}
      hoses={hoses}
      onSave={saveScrapReport}
      onAdd={function (arg0: any): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default Action;
