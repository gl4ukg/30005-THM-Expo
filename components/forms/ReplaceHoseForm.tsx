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
import { TemporaryReplaceHoseFormData } from '@/context/Reducer';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { UnitInput } from '../detailView/edit/UnitInput';

interface Props {
  hoses: HoseData[];
  onSave: (formData: Record<string, string | undefined>) => void;
}

export const ReplaceHoseForm: FC<Props> = ({ hoses, onSave }) => {
  const { state, dispatch } = useAppContext();
  const [selectedIds, setSelectedIds] = useState<number[]>(
    hoses.map((h) => h.assetId),
  );

  const globalTempData = state.data.temporaryContactFormData as
    | TemporaryReplaceHoseFormData
    | null
    | undefined;

  const initialFormData: TemporaryReplaceHoseFormData = {
    replacementType: globalTempData?.replacementType || 'Planned',
    replacementReasons: globalTempData?.replacementReasons || [],
    replacementImpacts: globalTempData?.replacementImpacts || [],
    downtime: globalTempData?.downtime || '',
    comment: globalTempData?.comment || '',
    name: globalTempData?.name || state.auth.user?.name || '',
    email: globalTempData?.email || state.auth.user?.email || '',
    phone: globalTempData?.phone || '',
  };

  const [formData, setFormData] =
    useState<TemporaryReplaceHoseFormData>(initialFormData);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const originallySelectedHoses = useMemo(() => hoses, [hoses]);
  usePreventGoBack();

  useEffect(() => {
    const globalData = state.data.temporaryContactFormData as
      | TemporaryReplaceHoseFormData
      | null
      | undefined;
    const user = state.auth.user;
    setFormData({
      replacementType: globalData?.replacementType || 'Planned',
      replacementReasons: globalData?.replacementReasons || [],
      replacementImpacts: globalData?.replacementImpacts || [],
      downtime: globalData?.downtime || '',
      comment: globalData?.comment || '',
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
    field: keyof TemporaryReplaceHoseFormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (
    field: keyof TemporaryReplaceHoseFormData,
    value: string[],
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
    !formData.name || !formData.email || !!emailError || !formData.phone;
  return (
    <FlatList
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
                    handleMultiSelectChange('replacementReasons', value)
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
                    handleMultiSelectChange('replacementImpacts', value)
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
              onPress={() => {
                onSave({
                  name: formData.name,
                  mail: formData.email,
                  phone: formData.phone,
                  comment: formData.comment,
                  selectedIds: selectedIds.join(','),
                  replacementType: formData.replacementType,
                  replacementReasons:
                    formData.replacementType === 'Unplanned'
                      ? formData.replacementReasons?.join(',')
                      : undefined,
                  replacementImpacts:
                    formData.replacementType === 'Unplanned'
                      ? formData.replacementImpacts?.join(',')
                      : undefined,
                  downtime:
                    formData.replacementType === 'Unplanned'
                      ? formData.downtime
                      : undefined,
                });
                dispatch({ type: 'CLEAR_TEMPORARY_REPLACE_HOSE_FORM_DATA' });
                dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
              }}
            />
            <ButtonTHS
              title='Cancel'
              variant='tertiary'
              size='sm'
              onPress={() => {
                dispatch({ type: 'CLEAR_TEMPORARY_REPLACE_HOSE_FORM_DATA' });
                dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
                router.back();
              }}
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
              onPress={() => {
                dispatch({
                  type: 'SET_TEMPORARY_REPLACE_HOSE_FORM_DATA',
                  payload: { ...formData },
                });
                router.push(`/scan?scanPurpose=REPLACE_HOSE`);
              }}
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
