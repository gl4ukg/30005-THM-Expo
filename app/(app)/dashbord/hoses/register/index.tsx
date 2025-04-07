import { TooltipWrapper } from '@/components/detailHose/tooltipWrapper';
import Documents from '@/components/detailView/Documents';
import EditGeneralInfo from '@/components/detailView/edit/EditGeneralInfo';
import EditMaintananceInfo from '@/components/detailView/edit/EditMaintenanceInfo';
import EditTessPartNumbers from '@/components/detailView/edit/EditTessPartNumbers';
import EditUniversalHoseData from '@/components/detailView/edit/EditUniversalHoseData';
import { GHD, HID, HoseData, TPN, UHD } from '@/components/detailView/types';
import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { Checkbox } from '@/components/UI/Checkbox';
import { DateInput } from '@/components/UI/Input/DateInput';
import { RFIDInput } from '@/components/UI/Input/RFID';
import { AppContext } from '@/context/Reducer';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const RegisterHose = () => {
  const { hoseId } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const [registerMultiple, setRegisterMultiple] = useState(false);

  const handleCheckboxChange = () => {
    setRegisterMultiple((prevState) => !prevState);
  };

  const initialHoseData: Partial<HoseData> = {
    id: hoseId,
    generalHoseData: {} as GHD,
    universalHoseData: {} as UHD,
    tessPartNumbers: {} as TPN,
    maintananceInfo: {} as HID,
  };

  const [localState, setLocalState] = useState(initialHoseData);

  const handleInputChange = (field: string, value: string) => {
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Typography name='navigationBold' text='Register hose' />
          <Typography name='navigation'>
            Hose ID: <Typography name={'navigationBold'} text={hoseId ?? ''} />
          </Typography>
        </View>
        <View>
          <TooltipWrapper
            tooltipData={{ title: 'RFID', message: 'This is the RFID' }}
          >
            <RFIDInput label='RFID' />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'production date',
              message: 'This is the production date',
            }}
          >
            <DateInput label='Production date:' />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'installation date',
              message: 'This is the installation date',
            }}
          >
            <DateInput label='Installation date:' />
          </TooltipWrapper>
        </View>

        <EditGeneralInfo
          generalInfo={localState.generalHoseData!}
          onInputChange={handleInputChange}
        />
        <EditUniversalHoseData
          universalHoseData={localState.universalHoseData}
          onInputChange={handleInputChange}
        />
        <EditTessPartNumbers
          tessPartNumbersData={localState.tessPartNumbers}
          onInputChange={handleInputChange}
        />
        <EditMaintananceInfo
          hoseData={localState.maintananceInfo}
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
    paddingHorizontal: 50,
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
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
});
