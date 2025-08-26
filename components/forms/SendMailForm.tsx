import { getScanUrl } from '@/app/(app)/scan';
import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { showDiscardChangesAlert } from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { PartialSendMailFormData } from '@/context/Reducer';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { useUserValidation } from '@/hooks/useUserValidation';
import { colors } from '@/lib/tokens/colors';
import { router, useFocusEffect } from 'expo-router';
import { act, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { saveAsDraftToast } from './ActionForm';
import { successToast } from '@/lib/util/toasts';
import { useDataManager } from '@/hooks/useDataManager';

interface Props {
  draftId: string;
}
export const SendMailForm: React.FC<Props> = ({ draftId }) => {
  const { state, dispatch } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PartialSendMailFormData>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { hasErrors } = useUserValidation();
  const { activities } = useDataManager();

  usePreventGoBack(isSubmitting);

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
    setIsSubmitting(true);
    activities.draft.save({
      id: +draftId,
      selectedIds,
      type: 'CONTACT_SUPPORT',
      status: 'draft',
      formData,
      modifiedAt: new Date().toISOString(),
    });
    activities.draft.moveToDone(+draftId);
    router.dismissAll();
    router.replace('/dashboard');
    successToast(
      'Contact request sent',
      'Your contact request has been sent successfully.',
    );
  };

  const handleSaveAsDraft = () => {
    setIsSubmitting(true);
    activities.draft.save({
      id: +draftId,
      selectedIds,
      type: 'CONTACT_SUPPORT',
      status: 'draft',
      formData,
      modifiedAt: new Date().toISOString(),
    });
    saveAsDraftToast();
    router.dismissAll();
    router.replace('/dashboard');
  };
  const handleCancel = () => {
    showDiscardChangesAlert(dispatch);
  };

  const handleAddHoses = () => {
    activities.draft.save({
      id: +draftId,
      selectedIds,
      type: 'CONTACT_SUPPORT',
      status: 'draft',
      formData,
      modifiedAt: new Date().toISOString(),
    });
    router.navigate(getScanUrl('CONTACT_SUPPORT', draftId.toString()));
  };

  const isButtonDisabled = hasErrors || selectedIds.length === 0;

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
