import { ContactTess } from '@/components/dashboard/contactTess';
import { useAppContext } from '@/context/ContextProvider';
import { useLocalSearchParams } from 'expo-router';

interface Props {}
const Action: React.FC<Props> = (props) => {
  const { state, dispatch } = useAppContext();
  const hoses = state.data.assignedUnits[
    state.data.selectedUnitId!
  ].hoses.filter((hose) => state.data.selectedHoses.includes(hose.id));
  return (
    <ContactTess
      title={'RFQ'}
      subTitle={'Order hoses - RFQ'}
      hoses={hoses}
      isRfq
      onSave={function (arg0: any): void {
        throw new Error('Function not implemented.');
      }}
      onAdd={function (arg0: any): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default Action;
