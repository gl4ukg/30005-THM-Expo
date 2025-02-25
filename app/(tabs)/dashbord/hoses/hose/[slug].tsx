import { useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockedData } from '../[filter]/mocked';
import React from 'react';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';

const HoseDetails = () => {
  const { id } = useLocalSearchParams();

  const hoseData = mockedData.find((hose) => hose.id === id);

  if (!hoseData) {
    return <Text>Hose not found</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        id={hoseData.id}
        date={hoseData.prodDate}
        missingData={hoseData.missingData}
      />
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
