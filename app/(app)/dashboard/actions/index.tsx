import { ActionForm } from '@/components/forms/ActionForm';
import { ReplaceHoseForm } from '@/components/forms/ReplaceHoseForm';
import { SendMailForm } from '@/components/forms/SendMailForm';
import { useAppContext } from '@/context/ContextProvider';
import { MultiSelectionActionsType } from '@/context/state';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { useLocalSearchParams } from 'expo-router/build/hooks';

interface Props {}
const Action: React.FC<Props> = (props) => {
  let { action, allowScan, draftId } = useLocalSearchParams<{
    action: MultiSelectionActionsType;
    allowScan: 'true' | 'false';
    draftId?: string;
  }>();
  const { state } = useAppContext();
  usePreventGoBack();
  const id = draftId
    ? draftId
    : `${generateNumericDraftId(state.data.drafts.map((d) => d.id))}`;
  if (action === 'CONTACT_SUPPORT') {
    console.log('draftId - contact support', draftId);
    return <SendMailForm draftId={id} />;
  } else if (action === 'REPLACE_HOSE') {
    return <ReplaceHoseForm draftId={id} />;
  } else {
    return <ActionForm draftId={id} allowScanToAdd={allowScan === 'true'} />;
  }
};

export default Action;
