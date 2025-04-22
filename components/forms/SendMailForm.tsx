import { LinkButton } from '@/components/UI/Button/LinkButton';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection, MultiSelectionActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListTable } from '../dashboard/listTable';
import { Typography } from '../Typography';
import { ButtonTHS } from '../UI';
import { Input } from '../UI/Input/Input';

interface Props {
  hoses: HoseData[];
  onSave: (arg0: any) => void;
}
export const SendMailForm: React.FC<Props> = ({ hoses, onSave }) => {
  const { state, dispatch } = useAppContext();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState(state.auth.user?.name || '');
  const [mail, setMail] = useState(state.auth.user?.email || '');
  const [phone, setPhone] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(
    hoses.map((h) => h.id),
  );
  const originallySelectedHoses = useMemo(() => hoses, []);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  function handleMail(email: string) {
    setMail(email);
    const isValid = emailValidation(email);
    if (isValid === true) {
      setEmailError(undefined);
    } else setEmailError(isValid);
  }
  const handleSelectionChange = (id: string) => {
    if (isMultiSelection(state.data.selection))
      dispatch({
        type: 'TOGGLE_HOSE_MULTI_SELECTION',
        payload: id,
      });
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isButtonDisabled =
    !name || !mail || !!emailError || !phone || selectedIds.length === 0;

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={[styles.listHeaderComponent, styles.paddingHorizontal]}>
            <Typography
              name='navigationBold'
              text='Contact TESS Support'
              style={styles.title}
            />
            <View style={styles.inputsContainer}>
              <Input
                type='text'
                label={'Subject:'}
                value={subject}
                onChangeText={setSubject}
              />
              <Input
                type='textArea'
                label='Message'
                placeholder='Message...'
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={[styles.inputsContainer, styles.paddingHorizontal]}>
            <Input
              type='text'
              label={'From (your name):'}
              value={name}
              onChangeText={setName}
            />
            <Input
              type='email'
              label={'Your email address:'}
              value={mail}
              onChangeText={handleMail}
              errorMessage={emailError}
            />
            <Input
              type='tel'
              label={'Phone:'}
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.buttonContainer}>
              <ButtonTHS
                title='Send'
                size='sm'
                disabled={isButtonDisabled}
                onPress={() =>
                  onSave({
                    comment: message,
                    name,
                    mail,
                    phone,
                    selectedIds,
                  })
                }
              />
              <ButtonTHS
                title='Cancel'
                variant='tertiary'
                size='sm'
                onPress={() => router.push('/(app)/dashbord')}
              />
            </View>
          </View>
        }
        data={['one']}
        renderItem={() => (
          <View style={styles.listContainer}>
            {selectedIds.length > 0 && (
              <>
                <Typography
                  name='fieldLabel'
                  text='Attachments:'
                  style={[styles.label, styles.paddingHorizontal]}
                />
                <ListTable
                  items={originallySelectedHoses}
                  selectedIds={selectedIds}
                  onSelectionChange={handleSelectionChange}
                  canSelect={true}
                />
              </>
            )}
            <LinkButton
              variant='light'
              hSpace={10}
              title={`+ Add hoses as attachment`}
              onPress={() => router.push('/scan?scanPurpose=CONTACT_SUPPORT')}
            />
          </View>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  listHeaderComponent: {
    alignItems: 'center',
    gap: 30,
    paddingVertical: 30,
  },
  title: {
    color: colors.black,
  },
  inputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  listContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 20,
    paddingBottom: 30,
  },
  label: {
    color: colors.extended666,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});
