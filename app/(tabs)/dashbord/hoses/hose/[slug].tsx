import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams } from 'expo-router';
import { mockedData } from '../[filter]/mocked';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';

const HoseDetails = () => {
  const { slug } = useLocalSearchParams();
  const hoseData = mockedData.find((hose) => hose.id === slug);
  const [headerHeight, setHeaderHeight] = useState(0);
  const detailsHeaderRef = useRef(null);
  const scrollViewRef = useRef(null);
  const structureRef = useRef(null);
  const historyRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [editedHoseData, setEditedHoseData] = useState({
    Description: hoseData?.Description || '',
    customerId: hoseData?.customerId || '',
    s1PlantVesselUnit: hoseData?.s1PlantVesselUnit || '',
    S2Equipment: hoseData?.S2Equipment || '',
    equipmentSubunit: hoseData?.equipmentSubunit || '',
    otherInfo: hoseData?.otherInfo || '',
    RFid: hoseData?.RFid || '',
    pollutionExposure: hoseData?.pollutionExposure || 'internal',
    uvExposure: hoseData?.uvExposure || 'internal',
  });

  const handleInputChange = (field, value) => {
    setEditedHoseData({
      ...editedHoseData,
      [field]: value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    console.log('Saving data:', editedHoseData);
    setEditMode(false);
  };

  const checkMissingData = (hoseData) => {
    return (
      !hoseData.Description ||
      !hoseData.customerId ||
      !hoseData.s1PlantVesselUnit ||
      !hoseData.S2Equipment ||
      !hoseData.equipmentSubunit ||
      !hoseData.otherInfo ||
      !hoseData.RFid
    );
  };

  const shortcuts = [
    {
      id: 'photos',
      title: 'Photos',
      content: <View></View>,
    },
    {
      id: 'hoseModule',
      title: 'Hose module',
      content: <View></View>,
    },
    {
      id: 'tessPartNumbers',
      title: 'TESS Part Numbers',
      content: <View></View>,
    },
    {
      id: 'maintenanceInfo',
      title: 'Maintenance info',
      content: <View></View>,
    },
    {
      id: 'documents',
      title: 'Documents',
      content: <View></View>,
    },
    {
      id: 'structure',
      title: 'Structure',
      content: (
        <View ref={structureRef}>
          <Structure />
        </View>
      ),
    },
    {
      id: 'history',
      title: 'History',
      content: (
        <View ref={historyRef}>
          <HistoryView />
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View
        ref={detailsHeaderRef}
        onLayout={(event) => {
          setHeaderHeight(event.nativeEvent.layout.height);
        }}
        style={styles.header}
      >
        <DetailsHeader
          id={hoseData.id}
          date={hoseData.prodDate}
          missingData={checkMissingData(hoseData)}
          shortcuts={shortcuts}
        />
        <ButtonTHS
          title={editMode ? 'Cancel Edit' : 'Edit'}
          onPress={toggleEditMode}
          variant='primary'
          size='sm'
        />
        {editMode && (
          <ButtonTHS
            title='Save'
            onPress={handleSave}
            variant='secondary'
            size='sm'
          />
        )}
      </View>
      <ScrollView ref={scrollViewRef}>
        <GeneralInfo
          description={editedHoseData.Description}
          customerId={editedHoseData.customerId}
          s1PlantVesselUnit={editedHoseData.s1PlantVesselUnit}
          S2Equipment={editedHoseData.S2Equipment}
          equipmentSubunit={editedHoseData.equipmentSubunit}
          otherInfo={editedHoseData.otherInfo}
          RFid={editedHoseData.RFid}
          editMode={editMode}
          onInputChange={handleInputChange}
          pollutionExposure={editedHoseData.pollutionExposure}
          uvExposure={editedHoseData.uvExposure}
        />
        {shortcuts.map((section) => (
          <View key={section.id}>{section.content}</View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: -70,
  },
});

export default HoseDetails;
