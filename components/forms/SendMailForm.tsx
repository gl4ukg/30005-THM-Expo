import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection } from '@/context/state';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { showDiscardChagesAlert } from '../UI/BottomNavigation/showDiscardChangesAlert';

interface Props {
  hoses: HoseData[];
  onSave: (arg0: any) => void;
}
export const SendMailForm: React.FC<Props> = ({ hoses, onSave }) => {
  const { state, dispatch } = useAppContext();

  const [subject, setSubject] = useState(
    state.data.temporarySendMailFormData?.subject || '',
  );
  const [message, setMessage] = useState(
    state.data.temporarySendMailFormData?.message || '',
  );
  const [name, setName] = useState(
    state.data.temporarySendMailFormData?.name || state.auth.user?.name || '',
  );
  const [email, setEmail] = useState(
    state.data.temporarySendMailFormData?.email || state.auth.user?.email || '',
  );
  const [phone, setPhone] = useState(
    state.data.temporarySendMailFormData?.phone || '',
  );

  const [selectedIds, setSelectedIds] = useState<number[]>(
    hoses.map((h) => h.assetId),
  );
  const originallySelectedHoses = useMemo(() => hoses, [hoses]);
  usePreventGoBack();
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const handleEmail = (email: string) => {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };
  const handleSelectionChange = useCallback((id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((i) => i !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }, []);

  const isButtonDisabled =
    !name || !email || !!emailError || !phone || selectedIds.length === 0;

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
              value={email}
              onChangeText={handleEmail}
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
                onPress={() => {
                  onSave({
                    subject,
                    comment: message,
                    name,
                    mail: email,
                    phone,
                    selectedIds,
                  });
                  dispatch({ type: 'CLEAR_TEMPORARY_SEND_MAIL_FORM_DATA' });
                  dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
                }}
              />
              <ButtonTHS
                title='Cancel'
                variant='tertiary'
                size='sm'
                onPress={() => {
                  dispatch({ type: 'CLEAR_TEMPORARY_SEND_MAIL_FORM_DATA' });
                  dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
                  router.back();
                }}
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
              onPress={() => {
                dispatch({
                  type: 'SET_TEMPORARY_SEND_MAIL_FORM_DATA',
                  payload: { subject, message, name, email, phone },
                });
                router.navigate('/scan?scanPurpose=CONTACT_SUPPORT');
              }}
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
