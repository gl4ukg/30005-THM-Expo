import { getScanUrl } from '@/app/(app)/scan';
import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { showDiscardChangesAlert } from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { useAppContext } from '@/context/ContextProvider';
import { PartialRFQFormData } from '@/context/Reducer';
import { MultiSelectionActionsType } from '@/context/state';
import { useUserValidation } from '@/hooks/useUserValidation';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TooltipWrapper } from '../detailView/edit/TooltipWrapper';
import { successToast } from '@/lib/util/toasts';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { useDataManager } from '@/hooks/useDataManager';

const formLabels: Record<
  Extract<MultiSelectionActionsType, 'RFQ' | 'CONTACT' | 'SCRAP'>,
  { title: string; subtitle: string; confirmButton: string }
> = {
  RFQ: {
    title: 'Order hoses',
    subtitle: 'Request for quote',
    confirmButton: 'Send RFQ',
  },
  CONTACT: {
    title: 'Contact TESS Team',
    subtitle: 'Message',
    confirmButton: 'Send message',
  },
  SCRAP: {
    title: 'Scrap hoses',
    subtitle: 'Scrap report',
    confirmButton: 'Scrap hoses',
  },
};
const rfqOptions = [
  'TESS to quote with pressure test and certificate',
  'TESS to quote without pressure test',
  'Unspecified',
];

interface Props {
  draftId: string;
  allowScanToAdd?: boolean;
}
export const saveAsDraftToast = () => {
  successToast(
    'Draft saved',
    'You can return and complete the draft at any time.',
  );
};

export const ActionForm: React.FC<Props> = ({
  draftId,
  allowScanToAdd = false,
}) => {
  const { state, dispatch } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoses, setHoses] = useState<HoseData[]>([]);
  const [formData, setFormData] = useState<PartialRFQFormData>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [canSelectHoses, setCanSelectHoses] = useState<boolean>(false);
  const [actionType, setActionType] =
    useState<Extract<MultiSelectionActionsType, 'RFQ' | 'CONTACT' | 'SCRAP'>>(
      'RFQ',
    );
  const { activities } = useDataManager();
  const flatListRef = useRef<FlatList>(null);
  const { hasErrors } = useUserValidation();
  usePreventGoBack(isSubmitting);

  useFocusEffect(
    useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
      const draft = state.data.drafts.find((d) => d.id === +draftId);
      if (!draft) return;
      setFormData(draft.formData as PartialRFQFormData);
      setSelectedIds([...draft.selectedIds]);
      setCanSelectHoses(draft.selectedIds.length > 0);
      setHoses(
        state.data.hoses.filter((h) => draft.selectedIds.includes(h.assetId)),
      );
      setActionType(draft.type as 'RFQ' | 'CONTACT' | 'SCRAP');
    }, [draftId, state.data.drafts]),
  );

  const handleInputChange = (
    field: keyof PartialRFQFormData, // Use TemporaryRFQFormData here
    value: string | null,
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

  const onSend = () => {
    setIsSubmitting(true);
    activities.draft.save({
      id: +draftId,
      selectedIds,
      type: actionType,
      status: 'draft',
      formData,
      modifiedAt: new Date().toISOString(),
    });
    activities.draft.moveToDone(+draftId);
    router.dismissAll();
    router.replace('/dashboard');
    successToast(
      `${formLabels[actionType].title} request sent`,
      `Your ${formLabels[actionType].title.toLowerCase()} has been sent successfully.`,
    );
  };
  const handleSaveAsDraft = () => {
    setIsSubmitting(true);
    activities.draft.save({
      id: +draftId,
      selectedIds,
      type: actionType,
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
      type: actionType,
      status: 'draft',
      formData,
      modifiedAt: new Date().toISOString(),
    });
    router.navigate(getScanUrl(actionType, draftId.toString()));
  };

  let isButtonDisabled;

  switch (actionType) {
    case 'RFQ':
      isButtonDisabled =
        hasErrors ||
        selectedIds.length === 0 ||
        formData.rfq === '' ||
        !formData.rfq;
      break;
    case 'CONTACT':
      isButtonDisabled = hasErrors || selectedIds.length === 0;
      break;
    case 'SCRAP':
      isButtonDisabled = hasErrors || selectedIds.length === 0;
      break;
    default:
      isButtonDisabled = true;
  }

  const renderItem = () => {
    return (
      <>
        {selectedIds.length > 0 && (
          <ListTable
            items={hoses}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
            canSelect={canSelectHoses}
          />
        )}
        {allowScanToAdd && (
          <View style={styles.addHoseContainer}>
            <LinkButton
              variant='light'
              title={`+ Add hoses to this ${formLabels[actionType].title.toLowerCase()}`}
              onPress={handleAddHoses}
            />
          </View>
        )}
      </>
    );
  };
  return (
    <FlatList
      ref={flatListRef}
      ListHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Typography
            name='navigationBold'
            text={formLabels[actionType].title}
            style={styles.contactTitle}
          />
          <Typography
            name='navigation'
            text={formLabels[actionType].subtitle}
            style={styles.contactSubtitle}
          />
        </View>
      }
      ListFooterComponent={
        <View style={styles.inputsContainer}>
          {actionType === 'RFQ' && (
            <TooltipWrapper
              tooltipData={{
                title: 'RFQ type',
                message: '',
              }}
            >
              <Select
                label={'RFQ type'}
                selectedOption={formData.rfq || ''}
                onChange={(value) => handleInputChange('rfq', value)}
                hasAlternativeOption={false}
                options={rfqOptions}
              />
            </TooltipWrapper>
          )}
          <Input
            type='textArea'
            label={
              actionType === 'RFQ' ? 'Delivery address / Comments' : 'Comment:'
            }
            value={formData.comment || ''}
            onChangeText={(value) => handleInputChange('comment', value)}
          />

          <View style={styles.buttonContainer}>
            <ButtonTHS
              title={formLabels[actionType].confirmButton}
              size='sm'
              disabled={isButtonDisabled}
              onPress={onSend}
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
      renderItem={renderItem}
      keyExtractor={(item, index) => `form-content-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  listHeaderComponent: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 30,
  },
  contactTitle: {
    color: colors.black,
  },
  contactSubtitle: {
    color: colors.extended333,
  },
  inputsContainer: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 50,
    paddingTop: 30,
  },
  addHoseContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    paddingTop: 30,
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});
