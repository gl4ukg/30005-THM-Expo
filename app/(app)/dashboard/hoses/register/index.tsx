import { Documents } from '@/components/detailView/common/Documents';
import { EditGeneralInfo } from '@/components/detailView/edit/EditGeneralInfo';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { EditTessPartNumbers } from '@/components/detailView/edit/EditTessPartNumbers';
import { EditUniversalHoseData } from '@/components/detailView/edit/EditUniversalHoseData';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { Checkbox } from '@/components/UI/Checkbox';
import { DateInput } from '@/components/UI/Input/DateInput';
import { RFIDInput } from '@/components/UI/Input/RFID';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { GHD, HID, HoseData, TPN, UHD } from '@/lib/types/hose';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { getScanUrl } from '@/app/scan';
import { BarcodeInput } from '@/components/UI/Input/BarcodeInput';
import { BarcodeScannerModal } from '@/components/UI/Input/BarcodeScannerModal';

const excludedTemplateFields: (keyof HoseData)[] = [
  'customerId',
  'RFid',
  'hoseCondition',
  'approved',
  'comment',
  'id',
];

const RegisterHose = () => {
  const {
    hoseId: incomingId,
    rfid: incomingRfid,
    scanMethod,
  } = useLocalSearchParams<{
    hoseId?: string;
    rfid?: string;
    scanMethod?: 'RFID' | 'Barcode';
  }>();

  const { state, dispatch } = useAppContext();
  const [registerMultiple, setRegisterMultiple] = useState(false);
  const [rfid, setRfid] = useState<string | undefined>(incomingRfid);
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);

  const initialHoseData: Partial<HoseData> = {
    ...state.data.hoseTemplate,
    id: incomingId,
    RFid: incomingRfid,
  };

  const [localState, setLocalState] = useState(initialHoseData);

  const handleCheckboxChange = () => {
    setRegisterMultiple((prevState) => !prevState);
  };

  useEffect(() => {
    if (state.data.hoseTemplate) {
      setLocalState((prevState) => ({
        ...state.data.hoseTemplate,
        ...prevState,
        id: incomingId ?? prevState.id ?? state.data.hoseTemplate?.id,
        RFid: incomingRfid ?? prevState.RFid ?? state.data.hoseTemplate?.RFid,
      }));
    }
  }, [state.data.hoseTemplate, incomingId, incomingRfid]);

  const handleInputChange = (field: string, value: string | undefined) => {
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRFIDScanned = useCallback((newRfid: string | null) => {
    if (newRfid) {
      setRfid(newRfid);
      setLocalState((prevState) => ({
        ...prevState,

        RFid: newRfid,
      }));
    } else {
      setRfid(undefined);
      setLocalState((prevState) => ({
        ...prevState,
        RFid: undefined,
      }));
    }
  }, []);

  const openBarcodeModal = () => {
    if (scanMethod === 'Barcode' && !!incomingId) return;
    setIsBarcodeModalVisible(true);
  };

  const handleBarcodeScannedFromModal = (barcode: string | null) => {
    if (barcode) {
      setLocalState((prevState) => ({
        ...prevState,
        id: barcode,
      }));
    }
    setIsBarcodeModalVisible(false);
  };

  const handleSave = () => {
    if (!localState.id) {
      Alert.alert('Error', 'Hose ID is required');
      return;
    }

    Alert.alert('Success', `Hose ${localState.id} registered successfully`);

    if (registerMultiple) {
      const template: Partial<HoseData> = { ...localState };

      excludedTemplateFields.forEach((field) => {
        if (field in template) {
          delete template[field];
        }
      });

      dispatch({
        type: 'SET_HOSE_TEMPLATE',
        payload: template,
      });

      router.push(getScanUrl('REGISTER_HOSE'));
    } else {
      dispatch({
        type: 'SET_HOSE_TEMPLATE',
        payload: {},
      });
      router.push('/(app)/dashboard');
    }
  };

  const handleSaveAsDraft = () => {
    Alert.alert('Draft saved', 'Hose registration saved as draft');
    router.push('/(app)/dashboard');
  };

  const handleCancel = () => {
    router.push('/(app)/dashboard');
  };

  console.log(incomingId, incomingRfid, scanMethod);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Typography name='navigationBold' text='Register hose' />
          <Typography name='navigation'>
            Hose ID:
            <Typography name={'navigationBold'} text={localState.id || ''} />
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
              value={localState.id || ''}
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
              value={localState.prodDate ? new Date(localState.prodDate) : null}
              onChange={(date) =>
                handleInputChange('prodDate', date.toString())
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
                localState.installationDate
                  ? new Date(localState.installationDate)
                  : null
              }
              onChange={(date) =>
                handleInputChange('installationDate', date.toString())
              }
            />
          </TooltipWrapper>
        </View>

        <EditGeneralInfo
          info={localState as GHD}
          onInputChange={handleInputChange}
          isRegisterView
        />
        <EditUniversalHoseData
          info={localState as UHD}
          onInputChange={handleInputChange}
        />
        <EditTessPartNumbers
          info={localState as TPN}
          onInputChange={handleInputChange}
        />
        <EditMaintenanceInfo
          info={localState as HID}
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
          <ButtonTHS title='Save & close' size='sm' onPress={handleSave} />
          <ButtonTHS
            title='Save as draft'
            onPress={handleSaveAsDraft}
            variant='secondary'
            size='sm'
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
    backgroundColor: colors.white,
  },
});
