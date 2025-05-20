import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { TemporarySendMailFormData } from '@/context/Reducer';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props {
  hoses: HoseData[];
  onSave: (arg0: any) => void;
}
export const SendMailForm: React.FC<Props> = ({ hoses, onSave }) => {
  const { state, dispatch } = useAppContext();

  const globalTempData = state.data.temporaryContactFormData as
    | TemporarySendMailFormData
    | null
    | undefined;

  const initialFormData: TemporarySendMailFormData = {
    subject: globalTempData?.subject || '',
    message: globalTempData?.message || '',
    name: globalTempData?.name || state.auth.user?.name || '',
    email: globalTempData?.email || state.auth.user?.email || '',
    phone: globalTempData?.phone || '',
  };

  const [formData, setFormData] =
    useState<TemporarySendMailFormData>(initialFormData);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    hoses.map((h) => h.assetId),
  );
  const originallySelectedHoses = useMemo(() => hoses, [hoses]);
  usePreventGoBack();

  useEffect(() => {
    const globalData = state.data.temporaryContactFormData as
      | TemporarySendMailFormData
      | null
      | undefined;
    const user = state.auth.user;
    setFormData({
      subject: globalData?.subject || '',
      message: globalData?.message || '',
      name: globalData?.name || user?.name || '',
      email: globalData?.email || user?.email || '',
      phone: globalData?.phone || '',
    });
  }, [state.data.temporaryContactFormData, state.auth.user]);

  const handleEmailInput = (emailValue: string) => {
    setFormData((prev) => ({ ...prev, email: emailValue }));
    const validation = emailValidation(emailValue);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };

  const handleInputChange = (
    field: keyof TemporarySendMailFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    !formData.name ||
    !formData.email ||
    !!emailError ||
    !formData.phone ||
    selectedIds.length === 0;

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
                value={formData.subject || ''}
                onChangeText={(value) => handleInputChange('subject', value)}
              />
              <Input
                type='textArea'
                label='Message'
                placeholder='Message...'
                value={formData.message || ''}
                onChangeText={(value) => handleInputChange('message', value)}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={[styles.inputsContainer, styles.paddingHorizontal]}>
            <Input
              type='text'
              label={'From (your name):'}
              value={formData.name || ''}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Input
              type='email'
              label={'Your email address:'}
              value={formData.email || ''}
              onChangeText={handleEmailInput}
              errorMessage={emailError}
            />
            <Input
              type='tel'
              label={'Phone:'}
              value={formData.phone || ''}
              onChangeText={(value) => handleInputChange('phone', value)}
            />
            <View style={styles.buttonContainer}>
              <ButtonTHS
                title='Send'
                size='sm'
                disabled={isButtonDisabled}
                onPress={() => {
                  onSave({
                    subject: formData.subject,
                    comment: formData.message, // Ensure your onSave expects 'comment' for message
                    name: formData.name,
                    mail: formData.email,
                    phone: formData.phone,
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
                  payload: { ...formData },
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
