import { useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockedData } from '../[filter]/mocked';
import React, { useState } from 'react';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import { ActionMenu } from '@/components/UI/ActionMenu';

interface Props {
  // Define your props here
}

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

  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        id={hoseData.id}
        date={hoseData.prodDate}
        missingData={checkMissingData(hoseData)}
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
