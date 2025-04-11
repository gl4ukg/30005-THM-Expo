import { ContactForm } from '@/components/forms/contactForm';
import { useAppContext } from '@/context/ContextProvider';
import { Hose, isMultiSelection, isSingleSelection } from '@/context/state';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Alert } from 'react-native';

interface Props {}
const Action: React.FC<Props> = (props) => {
  let { action } = useLocalSearchParams();
  const { state } = useAppContext();
  let hoses: Hose[] = [];
  if (isMultiSelection(state.data.selection)) {
    hoses = state.data.selection.ids
      .map((id) => state.data.hoses.find((hose) => hose.id === id))
      .filter((hose) => hose !== undefined) as Hose[];
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
      title={pageData.title}
      subTitle={pageData.subTitle}
      isRFQ={action === 'RFQ'}
      hoses={hoses}
      onSave={save}
      onAdd={function (arg0: any): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default Action;
