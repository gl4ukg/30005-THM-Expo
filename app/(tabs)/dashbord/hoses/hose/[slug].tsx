import { useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockedData } from '../[filter]/mocked';
import React, { useState } from 'react';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import { RadioGroup } from '@/components/detailHose/radioGroup';

const HoseDetails = () => {
  const { id } = useLocalSearchParams();

  const hoseData = mockedData.find((hose) => hose.id === id);

  if (!hoseData) {
    return <Text>Hose not found</Text>;
  }

  const checkMissingData = (hose: any): boolean => {
    return Object.values(hose).some(
      (value) => value === null || value === undefined || value === '',
    );
  };
  
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleSelectionChange = (id:string) => {
    setSelectedChoiceId(id);
    console.log(id)
  };

  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        id={hoseData.id}
        date={hoseData.prodDate}
        missingData={checkMissingData(hoseData)}
      />
      <RadioGroup label={'UV exposure'} choices={[
        { id: '1', label: 'Low' },
        { id: '2', label: 'Moderate, but not exposed' },
        { id: '3', label: 'High' }
      ]} onChange={handleSelectionChange} selected={selectedChoiceId}/>
      <GeneralInfo
        description={hoseData.Description}
        customerId={hoseData.customerId}
        s1PlantVesselUnit={hoseData.s1PlantVesselUnit}
        S2Equipment={hoseData.S2Equipment}
        equipmentSubunit={hoseData.equipmentSubunit}
        otherInfo={hoseData.otherInfo}
        RFid={hoseData.RFid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HoseDetails;
