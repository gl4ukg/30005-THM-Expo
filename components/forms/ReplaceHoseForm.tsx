import { ListTable } from '@/components/dashboard/listTable';
import {
  replaceImpacts,
  replaceReasons,
} from '@/components/detailView/data/lists';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { MultiSelect } from '@/components/UI/SelectModal/MultiSelect';
import { Select } from '@/components/UI/SelectModal/Select';
import { useAppContext } from '@/context/ContextProvider';
import { PartialReplaceHoseFormData } from '@/context/Reducer';

import { getScanUrl } from '@/app/(app)/scan';
import { colors } from '@/lib/tokens/colors';
import { emailValidation } from '@/lib/util/validation';
import { router, useFocusEffect } from 'expo-router';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { UnitInput } from '../detailView/edit/UnitInput';

interface Props {
  draftId: string;
}

export const ReplaceHoseForm: FC<Props> = ({ draftId }) => {
  const { state, dispatch } = useAppContext();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [formData, setFormData] = useState<PartialReplaceHoseFormData>({});
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
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
      setFormData(draft.formData as PartialReplaceHoseFormData);
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
    field: keyof PartialReplaceHoseFormData,
    value: string | string[],
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
    dispatch({
      type: 'MOVE_DRAFT_TO_DONE',
      payload: +draftId,
    });
    router.push('/dashboard');
  };

  const handleSaveAsDraft = () => {
    dispatch({
      type: 'SAVE_DRAFT',
      payload: {
        id: +draftId,
        selectedIds,
        type: 'REPLACE_HOSE',
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
    if (!draft) return;
    dispatch({
      type: 'SAVE_DRAFT',
      payload: {
        id: +draftId,
        selectedIds,
        status: 'draft',
        type: 'REPLACE_HOSE',
        formData,
      },
    });
    router.push(getScanUrl('REPLACE_HOSE', draftId.toString()));
  };

  const isButtonDisabled =
    !formData.name || !formData.email || !!emailError || !formData.phone;
  return (
    <FlatList
      ref={flatListRef}
      ListHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Typography
            name='navigationBold'
            text='Replace hose'
            style={styles.contactTitle}
          />
          <Typography
            name='navigation'
            text='Replacement'
            style={styles.contactSubtitle}
          />
        </View>
      }
      ListFooterComponent={
        <View style={styles.inputsContainer}>
          <TooltipWrapper
            tooltipData={{ title: 'Replacement type', message: '' }}
          >
            <Select
              label='Replacement type:'
              selectedOption={formData.replacementType || ''}
              onChange={(value) =>
                handleInputChange('replacementType', value as string)
              }
              hasAlternativeOption={false}
              options={['Planned', 'Unplanned']}
            />
          </TooltipWrapper>
          {formData.replacementType === 'Unplanned' && (
            <>
              <TooltipWrapper
                tooltipData={{ title: 'Reason for replacement', message: '' }}
              >
                <MultiSelect
                  label='Reason:'
                  options={replaceReasons}
                  selectedOptions={formData.replacementReasons || []}
                  onSave={(value) =>
                    handleInputChange('replacementReasons', value)
                  }
                />
              </TooltipWrapper>
              <TooltipWrapper
                tooltipData={{ title: 'Impact of replacement', message: '' }}
              >
                <MultiSelect
                  label='Impact:'
                  options={replaceImpacts}
                  selectedOptions={formData.replacementImpacts || []}
                  onSave={(value) =>
                    handleInputChange('replacementImpacts', value)
                  }
                />
              </TooltipWrapper>
              <TooltipWrapper tooltipData={{ title: 'Downtime', message: '' }}>
                <UnitInput
                  value={formData.downtime ? Number(formData.downtime) : null}
                  onChange={(value) =>
                    handleInputChange('downtime', String(value))
                  }
                  unit={'hours'}
                  label='Did it cause any downtime? (hours)'
                />
              </TooltipWrapper>
            </>
          )}
          <Input
            type='textArea'
            label='Comment:'
            value={formData.comment || ''}
            onChangeText={(value) => handleInputChange('comment', value)}
          />
          <Input
            type='text'
            label={'Name:'}
            value={formData.name || ''}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <Input
            type='email'
            label={'Mail:'}
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
              title='Replace hoses'
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
        <>
          <ListTable
            items={originallySelectedHoses}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
            canSelect={true}
          />
          <View style={styles.addHoseContainer}>
            <LinkButton
              variant='light'
              title={`+ Add hose to this replacement report`}
              onPress={handleAddHoses}
            />
          </View>
        </>
      )}
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
