import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection, MultiSelectionActionsType } from '@/context/state';
import { TemporaryRFQFormData } from '@/context/Reducer'; // Use TemporaryRFQFormData from Reducer.ts

import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TooltipWrapper } from '../detailView/edit/TooltipWrapper';
import { getScanUrl } from '@/app/(app)/scan';

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

interface Props {
  contactType: Exclude<
    MultiSelectionActionsType,
    'CONTACT_SUPPORT' | 'REPLACE_HOSE'
  >;
  hoses: HoseData[];
  allowScanToAdd?: boolean;
  onSave: (arg0: any) => void;
}

export const ContactForm: React.FC<Props> = ({
  hoses,
  contactType,
  allowScanToAdd = false,
  onSave,
}) => {
  const { state, dispatch } = useAppContext();

  // Cast global state to the specific type for this form
  const globalTempData = state.data.temporaryContactFormData as
    | TemporaryRFQFormData
    | null
    | undefined;

  const initialFormData: TemporaryRFQFormData = {
    comment: globalTempData?.comment || '',
    name: globalTempData?.name || state.auth.user?.name || '',
    mail: globalTempData?.mail || state.auth.user?.email || '',
    phone: globalTempData?.phone || '',
    rfq: globalTempData?.rfq === undefined ? null : globalTempData.rfq,
  };

  const [formData, setFormData] =
    useState<TemporaryRFQFormData>(initialFormData);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    hoses.map((h) => h.assetId).filter((id): id is number => id !== undefined),
  );

  useEffect(() => {
    const globalData = state.data.temporaryContactFormData as
      | TemporaryRFQFormData
      | null
      | undefined;
    const user = state.auth.user;
    setFormData({
      comment: globalData?.comment || '',
      name: globalData?.name || user?.name || '',
      mail: globalData?.mail || user?.email || '',
      phone: globalData?.phone || '',
      rfq: globalData?.rfq === undefined ? null : globalData.rfq,
    });
  }, [state.data.temporaryContactFormData, state.auth.user]);

  const originallySelectedHoses = useMemo(() => {
    setSelectedIds(hoses.map((h) => h.assetId));
    return hoses;
  }, [hoses]);

  const handleMail = (email: string) => {
    const updatedFormData = { ...formData, mail: email };
    setFormData(updatedFormData);
    dispatch({
      type: 'SET_TEMPORARY_CONTACT_FORM_DATA',
      payload: updatedFormData,
    });
    const isValid = emailValidation(email);
    if (isValid === true) {
      setEmailError(undefined);
    } else setEmailError(isValid);
  };

  const handleInputChange = (
    field: keyof TemporaryRFQFormData,
    value: string | null,
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    dispatch({
      type: 'SET_TEMPORARY_CONTACT_FORM_DATA',
      payload: updatedFormData,
    });
  };

  const canSelectHoses = useMemo(
    () => isMultiSelection(state.data.selection),
    [state.data.selection],
  );

  // const handleSelectionChange = useCallback(
  //   (id: number) => {
  //     if (canSelectHoses)
  //       dispatch({
  //         type: 'TOGGLE_HOSE_MULTI_SELECTION',
  //         payload: id,
  //       });
  //     setSelectedIds((prevSelectedIds) => {
  //       if (prevSelectedIds.includes(id)) {
  //         return prevSelectedIds.filter((i) => i !== id);
  //       } else {
  //         return [...prevSelectedIds, id];
  //       }
  //     });
  //   },
  //   [dispatch, canSelectHoses],
  // );
  const handleSelectionChange = useCallback((id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((i) => i !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }, []);

  const rfqOptions = [
    'TESS to quote with pressure test and certificate',
    'TESS to quote without pressure test',
    'Unspecified',
  ];

  const isButtonDisabled =
    !formData.name ||
    !formData.mail ||
    !!emailError ||
    !formData.phone ||
    selectedIds.length === 0 ||
    (contactType === 'RFQ' &&
      (!formData.rfq || !rfqOptions.includes(formData.rfq)));

  const renderListContent = () => (
    <>
      {selectedIds.length > 0 && (
        <ListTable
          items={originallySelectedHoses}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          canSelect={canSelectHoses}
        />
      )}
      {allowScanToAdd && (
        <View style={styles.addHoseContainer}>
          <LinkButton
            variant='light'
            title={`+ Add hoses to this ${formLabels[contactType].title.toLowerCase()}`}
            onPress={() => {
              dispatch({
                type: 'SET_TEMPORARY_CONTACT_FORM_DATA',
                payload: { ...formData },
              });
              router.push(getScanUrl(contactType));
            }}
          />
        </View>
      )}
    </>
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={styles.listHeaderComponent}>
            <Typography
              name='navigationBold'
              text={formLabels[contactType].title}
              style={styles.contactTitle}
            />
            <Typography
              name='navigation'
              text={formLabels[contactType].subtitle}
              style={styles.contactSubtitle}
            />
          </View>
        }
        ListFooterComponent={
          <View style={styles.inputsContainer}>
            {contactType === 'RFQ' && (
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
                contactType === 'RFQ'
                  ? 'Delivery address / Comments'
                  : 'Comment:'
              }
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
              value={formData.mail || ''}
              onChangeText={handleMail}
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
                title={formLabels[contactType].confirmButton}
                size='sm'
                disabled={isButtonDisabled}
                onPress={() => {
                  onSave({
                    ...formData,
                    selectedIds,
                  });
                  dispatch({ type: 'CLEAR_TEMPORARY_CONTACT_FORM_DATA' });
                }}
              />
              <ButtonTHS
                title='Cancel'
                variant='tertiary'
                size='sm'
                onPress={() => {
                  dispatch({ type: 'CLEAR_TEMPORARY_CONTACT_FORM_DATA' });
                  router.back();
                }}
              />
            </View>
          </View>
        }
        data={['one']}
        renderItem={renderListContent}
        keyExtractor={(item, index) => `form-content-${index}`}
      />
    </>
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
