import { getScanUrl } from '@/app/(app)/scan';
import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { PartialSendMailFormData } from '@/context/Reducer';

import { colors } from '@/lib/tokens/colors';
import { emailValidation } from '@/lib/util/validation';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props {
  draftId: string;
}
export const SendMailForm: React.FC<Props> = ({ draftId }) => {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState<PartialSendMailFormData>({});
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const originallySelectedHoses = useMemo(() => {
    const draft = state.data.drafts.find((d) => d.id === +draftId);
    if (!draft) return [];
    return state.data.hoses.filter((hose) =>
      draft.selectedIds?.includes(hose.assetId),
    );
  }, [selectedIds]);

  useFocusEffect(
    useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
      const draft = state.data.drafts.find((d) => d.id === +draftId);
      if (!draft) {
        setFormData({});
        setSelectedIds([]);
        return;
      }
      setFormData(draft.formData as PartialSendMailFormData);
      setSelectedIds([...draft.selectedIds]);
    }, [draftId, state.data.drafts]),
  );

  const handleEmailInput = (emailValue: string) => {
    const updatedFormData = { ...formData, email: emailValue };
    setFormData(updatedFormData);
    const validation = emailValidation(emailValue);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };

  const handleInputChange = (
    field: keyof PartialSendMailFormData,
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

  const handleSend = () => {
    // TODO move draft to done and change status to done
  };

  const handleSaveAsDraft = () => {
    dispatch({
      type: 'SAVE_DRAFT',
      payload: {
        id: +draftId,
        selectedIds,
        type: 'CONTACT_SUPPORT',
        status: 'draft',
        formData,
      },
    });
    router.push('/dashboard');
  };
  const handleCancel = () => {
    router.push('/dashboard');
  };

  const handleAddHoses = () => {
    const draft = state.data.drafts.find((d) => d.id === +draftId);
    if (!draft) {
      dispatch({
        type: 'CREATE_DRAFT',
        payload: {
          id: +draftId,
          selectedIds,
          type: 'CONTACT_SUPPORT',
          formData,
        },
      });
    } else {
      dispatch({
        type: 'SAVE_DRAFT',
        payload: {
          id: +draftId,
          selectedIds,
          status: 'draft',
          type: 'CONTACT_SUPPORT',
          formData,
        },
      });
    }
    router.navigate(getScanUrl('CONTACT_SUPPORT', draftId.toString()));
  };

  const isButtonDisabled =
    !formData.name ||
    !formData.email ||
    !!emailError ||
    !formData.phone ||
    selectedIds.length === 0;

  return (
    <>
      <FlatList
        ref={flatListRef}
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
                value={formData.comment || ''}
                onChangeText={(value) => handleInputChange('comment', value)}
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
                onPress={handleSend}
              />
              <ButtonTHS
                title='Save as draft'
                size='sm'
                variant='secondary'
                onPress={handleSaveAsDraft}
              />
              <ButtonTHS
                title='Cancel'
                variant='tertiary'
                size='sm'
                onPress={handleCancel}
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
              onPress={handleAddHoses}
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
