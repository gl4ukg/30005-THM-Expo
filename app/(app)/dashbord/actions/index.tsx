import { ContactForm } from '@/components/forms/ContactForm';
import { useAppContext } from '@/context/ContextProvider';
import {
  isMultiSelection,
  isSingleSelection,
  MultiSelectionActionsType,
} from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Alert } from 'react-native';

interface Props {}
const Action: React.FC<Props> = (props) => {
  let { action, allowScan } = useLocalSearchParams<{
    action: MultiSelectionActionsType;
    allowScan: 'true' | 'false';
  }>();

  const { state } = useAppContext();
  let hoses: HoseData[] = [];
  if (isMultiSelection(state.data.selection)) {
    hoses = state.data.selection.ids
      .map((id) => state.data.hoses.find((hose) => hose.id === id))
      .filter((hose) => hose !== undefined) as HoseData[];
  } else if (isSingleSelection(state.data.selection)) {
    const id = state.data.selection.id;
    hoses = [state.data.hoses.find((hose) => hose.id === id)!];
  }
  function save(formData: {
    comment: string;
    name: string;
    mail: string;
    phone: string;
    rfq: string | null;
    selectedIds: string[];
  }) {
    Alert.alert(
      'Save',
      `
      
      Comment: ${formData.comment} 
      
      Name: ${formData.name} 
      
      Mail: ${formData.mail} Phone: ${formData.phone} RFQ: ${formData.rfq}

      Selected ids: ${formData.selectedIds.join(',')}
      `,
    );
  }
  let pageData = {
    title: '',
    subTitle: '',
  };
  if (action === 'CONTACT') {
    pageData = {
      title: 'Contact TESS Team',
      subTitle: 'Message details',
    };
  } else if (action === 'RFQ') {
    pageData = {
      title: 'Order hoses - RFQ',
      subTitle: 'RFQ',
    };
  } else if (action === 'SCRAP') {
    pageData = {
      title: 'Scrap hoses',
      subTitle: 'Scrap report',
    };
  } else {
    console.error('Unknown action');
    pageData = {
      title: '',
      subTitle: '',
    };
  }
  return (
    <ContactForm
      contactType={action}
      hoses={hoses}
      allowScanToAdd={allowScan === 'true'}
      onSave={save}
    />
  );
};

export default Action;
