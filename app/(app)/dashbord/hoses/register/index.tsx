import EditGeneralInfo from '@/components/detailView/edit/EditGeneralInfo';
import EditMaintananceInfo from '@/components/detailView/edit/EditMaintananceInfo';
import EditTessPartNumbers from '@/components/detailView/edit/EditTessPartNumbers';
import EditUniversalHoseData from '@/components/detailView/edit/EditUniversalHoseData';
import { GHD, HID, HoseData, TPN, UHD } from '@/components/detailView/types';
import { Typography } from '@/components/typography';
import { AppContext } from '@/context/Reducer';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const RegisterHose = () => {
  const { hoseId } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);

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

  console.log('heihei, her er jeg');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Typography name='navigationBold' text='Register hose' />
          <Typography name='navigation'>
            Hose ID:{' '}
            <Typography name={'navigationBold'} text={hoseId ?? '1234'} />
          </Typography>
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
      </ScrollView>
    </View>
  );
};

export default RegisterHose;
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
});
