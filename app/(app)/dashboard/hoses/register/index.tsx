import { Documents } from '@/components/detailView/common/Documents';
import { EditGeneralInfo } from '@/components/detailView/edit/EditGeneralInfo';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { EditTessPartNumbers } from '@/components/detailView/edit/EditTessPartNumbers';
import { EditUniversalHoseData } from '@/components/detailView/edit/EditUniversalHoseData';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { showDiscardChangesAlert } from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { Checkbox } from '@/components/UI/Checkbox';
import { DateInput } from '@/components/UI/Input/DateInput';
import { RFIDInput } from '@/components/UI/Input/RFID';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { BarcodeInput } from '@/components/UI/Input/BarcodeInput';
import { BarcodeScannerModal } from '@/components/UI/Input/BarcodeScannerModal';
import { getDefaultRequiredHoseData } from '@/lib/util/validation';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { saveAsDraftToast } from '@/components/forms/ActionForm';
import { successToast } from '@/lib/util/toasts';

const excludedTemplateFields: (keyof HoseData)[] = [
  'customerID',
  'RFID',
  'hoseCondition',
  'approved',
  'generalComment',
  'assetId',
];

const RegisterHose = () => {
  usePreventGoBack();
  const {
    hoseId: incomingId,
    rfid: incomingRfid,
    scanMethod,
    draftId,
  } = useLocalSearchParams<{
    hoseId?: string;
    rfid?: string;
    scanMethod?: 'RFID' | 'Barcode';
    draftId?: string;
  }>();
  const { state, dispatch } = useAppContext();
  const [registerMultiple, setRegisterMultiple] = useState(false);
  const [rfid, setRfid] = useState<string | undefined>(incomingRfid);
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [hoseData, setHoseData] = useState<
    Partial<HoseData> & { showValidationErrors?: boolean }
  >(() => {
    const templateData = state.data.hoseTemplate || {};
    const defaultRequired = getDefaultRequiredHoseData();
    const mergedTemplate = { ...defaultRequired, ...templateData };

    excludedTemplateFields.forEach((field) => {
      delete mergedTemplate[field];
    });
    return {
      ...mergedTemplate,
      assetId: incomingId ? Number(incomingId) : undefined,
      RFID: incomingRfid,
      showValidationErrors: false,
    };
  });
  let id = useMemo(
    () =>
      draftId
        ? +draftId
        : generateNumericDraftId(state.data.drafts.map((d) => d.id)),
    [],
  );
  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0 });
      }

      if (draftId) {
        const draft = state.data.drafts.find((d) => d.id === +draftId);
        if (draft) {
          setHoseData({
            ...(draft.formData as Partial<HoseData>),
            showValidationErrors: false,
          });
        }
      }
    }, [draftId, state.data.drafts]),
  );

  const handleCheckboxChange = () => {
    setRegisterMultiple((prevState) => !prevState);
  };

  const handleCancel = () => {
    showDiscardChangesAlert(dispatch);
  };

  useEffect(() => {
    if (state.data.hoseTemplate) {
      const templateData = state.data.hoseTemplate || {};
      const defaultRequired = getDefaultRequiredHoseData();
      const mergedTemplate = { ...defaultRequired, ...templateData };

      setHoseData((prevState) => ({
        ...mergedTemplate,
        ...prevState,
        assetId: incomingId
          ? Number(incomingId)
          : (prevState.assetId ?? mergedTemplate?.assetId),
        RFID: incomingRfid ?? prevState.RFID ?? mergedTemplate?.RFID,
      }));
    }
  }, [state.data.hoseTemplate, incomingId, incomingRfid]);

  const handleInputChange = (
    field: keyof HoseData,
    value: HoseData[keyof HoseData] | undefined,
  ) => {
    setHoseData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRFIDScanned = useCallback((newRfid: string | null) => {
    if (newRfid) {
      setRfid(newRfid);
      setHoseData((prevState) => ({
        ...prevState,
        RFID: newRfid,
      }));
    } else {
      setRfid(undefined);
      setHoseData((prevState) => ({
        ...prevState,
        RFID: undefined,
      }));
    }
  }, []);

  const openBarcodeModal = () => {
    if (scanMethod === 'Barcode' && !!incomingId) return;
    setIsBarcodeModalVisible(true);
  };

  const handleBarcodeScannedFromModal = (barcode: string | null) => {
    if (barcode) {
      setHoseData((prevState) => ({
        ...prevState,
        id: barcode,
      }));
    }
    setIsBarcodeModalVisible(false);
  };

  const handleSave = useCallback(async () => {
    const requiredFieldsList: (keyof HoseData)[] = [
      'itemDescription',
      'productionDate',
      'installedDate',
      'criticality',
      'hoseType',
      'hoseLength_mm',
      'wp_BAR',
      'ferrule1',
      'ferrule2',
      'insert1',
      'insert2',
      'typeFittingEnd1',
      'genericDimensionEnd1',
      'genderEnd1',
      'angleEnd1',
      'materialQualityEnd1',
      'typeFittingEnd2',
      'genericDimensionEnd2',
      'genderEnd2',
      'angleEnd2',
    ];

    const missing = requiredFieldsList.filter(
      (field) =>
        hoseData[field] === undefined ||
        hoseData[field] === null ||
        hoseData[field] === '',
    );

    if (missing.length > 0) {
      Alert.alert(
        'Missing Required Fields',
        `Please fill in the following fields: ${missing.join(', ')}`,
      );
      setHoseData((prevState) => ({
        ...prevState,
        showValidationErrors: true,
      }));
      return;
    }

    dispatch({ type: 'SET_IS_CANCELABLE', payload: false });

    const newHoseData = hoseData as HoseData;

    if (registerMultiple) {
      const newDraftId = generateNumericDraftId(
        state.data.drafts.map((d) => d.id),
      );
      dispatch({
        type: 'CREATE_DRAFT',
        payload: {
          formData: newHoseData,
          selectedIds: [],
          type: 'REGISTER_HOSE',
          status: 'draft',
          id: newDraftId,
        },
      });
      Alert.alert(
        'Save Error',
        'Failed to save hose to cache. Please try again.',
        [{ text: 'OK' }],
      );
      router.push(`/scan?scanPurpose=REGISTER_HOSE&draftId=${newDraftId}`);
    } else {
      dispatch({
        type: 'MOVE_DRAFT_TO_DONE',
        payload: +id,
      });
      router.dismissAll();
      router.replace('/(app)/dashboard');
      successToast(
        'Hose registered successfully',
        'The hose has been registered.',
      );
    }
  }, [hoseData, dispatch, router, registerMultiple]);

  const handleSaveAsDraft = () => {
    dispatch({
      type: 'SAVE_DRAFT',
      payload: {
        formData: hoseData,
        selectedIds: [],
        type: 'REGISTER_HOSE',
        id: +id,
        status: 'draft',
      },
    });
    saveAsDraftToast();
    router.dismissAll();
    router.replace('/(app)/dashboard');
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.header}>
          <Typography name='navigationBold' text='Register hose' />
          <Typography name='navigation'>
            Hose ID:
            <Typography name={'navigationBold'} text={` ${hoseData.assetId}`} />
          </Typography>
        </View>

        <View>
          <TooltipWrapper
            tooltipData={{
              title: 'Barcode Scanner',
              message: 'Scan barcode to enter hose ID',
            }}
          >
            <BarcodeInput
              label='Barcode (Hose ID)'
              onPress={openBarcodeModal}
              value={`${hoseData.assetId}`}
              disableScan={scanMethod === 'Barcode' && !!incomingId}
            />
          </TooltipWrapper>

          <TooltipWrapper
            tooltipData={{ title: 'RFID', message: 'This is the RFID' }}
          >
            <RFIDInput
              label='RFID'
              onRFIDScanned={handleRFIDScanned}
              initialValue={rfid}
              disableScan={scanMethod === 'RFID' && !!incomingRfid}
            />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'production date',
              message: 'This is the production date',
            }}
          >
            <DateInput
              label='Production date'
              value={
                hoseData.productionDate
                  ? new Date(hoseData.productionDate)
                  : null
              }
              onChange={(date) =>
                handleInputChange('productionDate', date?.toISOString())
              }
            />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'Installation date',
              message: 'This is the installation date',
            }}
          >
            <DateInput
              label='Installation date'
              value={
                hoseData.installedDate ? new Date(hoseData.installedDate) : null
              }
              onChange={(date) =>
                handleInputChange('installedDate', date?.toISOString())
              }
            />
          </TooltipWrapper>
        </View>

        <EditGeneralInfo
          info={hoseData}
          onInputChange={handleInputChange}
          isRegisterView
        />
        <EditUniversalHoseData
          info={hoseData}
          onInputChange={handleInputChange}
          showValidationErrors={hoseData.showValidationErrors}
        />
        <EditTessPartNumbers
          info={hoseData}
          onInputChange={handleInputChange}
          showValidationErrors={hoseData.showValidationErrors}
        />
        <EditMaintenanceInfo
          info={hoseData}
          onInputChange={handleInputChange}
        />
        <Documents />
        <View style={styles.checkboxContainer}>
          <Checkbox
            isChecked={registerMultiple}
            onChange={handleCheckboxChange}
          />
          <Typography
            name='button'
            text='Register next hose with same data (after Save)'
            style={styles.checkboxText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonTHS title={`Save & close`} size='sm' onPress={handleSave} />
          <ButtonTHS
            title='Save as draft'
            variant='secondary'
            size='sm'
            onPress={handleSaveAsDraft}
          />
          <ButtonTHS
            title='Cancel'
            onPress={handleCancel}
            variant='tertiary'
            size='sm'
          />
        </View>
      </ScrollView>

      <BarcodeScannerModal
        visible={isBarcodeModalVisible}
        onClose={() => setIsBarcodeModalVisible(false)}
        onBarcodeScanned={handleBarcodeScannedFromModal}
      />
    </View>
  );
};

export default RegisterHose;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },
  checkboxContainer: {
    marginVertical: 50,
    borderWidth: 1,
    borderColor: colors.extended333,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxText: {
    paddingVertical: 10,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30,
    gap: 10,
  },
  container: {
    padding: 10,
  },
});
