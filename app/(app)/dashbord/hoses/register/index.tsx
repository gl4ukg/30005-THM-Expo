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
import { colors } from '@/lib/tokens/colors';
import { GHD, HID, HoseData, TPN, UHD } from '@/lib/types/hose';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const RegisterHose = () => {
  const { hoseId: incomingId, hoseRfid: incomingRfid } = useLocalSearchParams<{
    hoseId?: string;
    hoseRfid?: string;
  }>();

  const [registerMultiple, setRegisterMultiple] = useState(false);
  const [rfid, setRfid] = useState<string | undefined>(incomingRfid);

  const handleCheckboxChange = () => {
    setRegisterMultiple((prevState) => !prevState);
  };

  const initialHoseData: Partial<HoseData> = {
    id: incomingId,
  };

  const [localState, setLocalState] = useState(initialHoseData);

  const handleInputChange = (field: string, value: string | undefined) => {
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRFIDScanned = (newRfid: string | null) => {
    if (newRfid) {
      setRfid(newRfid);
      setLocalState((prevState) => ({
        ...prevState,
        id: newRfid,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Typography name='navigationBold' text='Register hose' />
          {incomingId && (
            <Typography name='navigation'>
              Hose ID:
              <Typography name={'navigationBold'} text={` ${incomingId}`} />
            </Typography>
          )}
        </View>
        <View>
          <TooltipWrapper
            tooltipData={{ title: 'RFID', message: 'This is the RFID' }}
          >
            <RFIDInput
              label='RFID'
              onRFIDScanned={handleRFIDScanned}
              initialValue={rfid}
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
                handleInputChange('productionDate', date.toString())
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
          <ButtonTHS title='Save & close' size='sm' onPress={() => {}} />
          <ButtonTHS
            title='Save as draft'
            onPress={() => {}}
            variant='secondary'
            size='sm'
          />
          <ButtonTHS
            title='Cancel'
            onPress={() => {}}
            variant='tertiary'
            size='sm'
          />
        </View>
      </ScrollView>
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
