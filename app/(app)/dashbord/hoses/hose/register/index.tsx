import EditGeneralInfo from '@/components/detailView/edit/EditGeneralInfo';
import EditMaintananceInfo from '@/components/detailView/edit/EditMaintananceInfo';
import EditTessPartNumbers from '@/components/detailView/edit/EditTessPartNumbers';
import EditUniversalHoseData from '@/components/detailView/edit/EditUniversalHoseData';
import { HoseData } from '@/components/detailView/types';
import { Typography } from '@/components/typography';
import { AppContext } from '@/context/Reducer';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';

export const RegisterHose = () => {
  const { hoseId } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);

  const hoseData = { id: hoseId } as Partial<HoseData>;

  const [localState, setLocalState] = useState(hoseData);

  const handleInputChange = (field: string, value: string) => {
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  console.log('heihei, her er jeg');

  return (
    <View>
      <ScrollView>
        <View>
          <Typography name='navigationBold' text='Register hose' />
          <Typography name='navigation' text='Hose ID:'>
            <Typography name='navigationBold' text={hoseId} />
          </Typography>
        </View>

        <EditGeneralInfo
          generalInfo={hoseData.generalHoseData}
          onInputChange={handleInputChange}
        />
        <EditUniversalHoseData
          universalHoseData={hoseData.universalHoseData}
          onInputChange={handleInputChange}
        />
        <EditTessPartNumbers
          tessPartNumbersData={hoseData.tessPartNumbers}
          onInputChange={handleInputChange}
        />
        <EditMaintananceInfo
          hoseData={hoseData.maintananceInfo}
          onInputChange={handleInputChange}
        />
      </ScrollView>
    </View>
  );
};
