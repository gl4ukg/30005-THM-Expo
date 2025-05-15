import { ContactForm } from '@/components/forms/ContactForm';
import { ReplaceHoseForm } from '@/components/forms/ReplaceHoseForm';
import { SendMailForm } from '@/components/forms/SendMailForm';
import { useAppContext } from '@/context/ContextProvider';
import {
  isMultiSelection,
  isSingleSelection,
  MultiSelectionActionsType,
} from '@/context/state';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { HoseData } from '@/lib/types/hose';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
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
      .map((id) => state.data.hoses.find((hose) => hose.assetId === id))
      .filter((hose) => hose !== undefined) as HoseData[];
  } else if (isSingleSelection(state.data.selection)) {
    const id = state.data.selection.id;
    hoses = [state.data.hoses.find((hose) => hose.assetId === id)!];
  }
  const router = useRouter();
  const sendMail = async (formData: {
    comment: string;
    name: string;
    mail: string;
    phone: string;
    rfq: string | null;
    selectedIds: string[];
  }) => {
    Alert.alert(
      'Save',
      `
      
      Comment: ${formData.comment} 
      
      Name: ${formData.name} 
      
      Mail: ${formData.mail} Phone: ${formData.phone} RFQ: ${formData.rfq}

      Selected ids: ${formData.selectedIds.join(',')}
      `,
      [
        {
          text: 'OK',
          onPress: () => {
            router.push('/dashboard');
          },
        },
      ],
    );
  };
  usePreventGoBack();
  const replaceHose = async (formData: Record<string, string | undefined>) => {
    Alert.alert(
      'Replace',
      Object.keys(formData)
        .map((key) => `${key}: ${formData[key]}`)
        .join('\n'),
      [
        {
          text: 'OK',
          onPress: () => {
            router.push('/dashboard');
          },
        },
      ],
    );
  };
  if (action === 'CONTACT_SUPPORT') {
    return <SendMailForm hoses={hoses} onSave={sendMail} />;
  } else if (action === 'REPLACE_HOSE') {
    return <ReplaceHoseForm hoses={hoses} onSave={replaceHose} />;
  } else {
    return (
      <ContactForm
        contactType={action}
        hoses={hoses}
        allowScanToAdd={allowScan === 'true'}
        onSave={sendMail}
      />
    );
  }
};

export default Action;
