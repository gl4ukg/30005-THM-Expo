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
import { GHD as GeneralInfoType } from '@/components/detailView/types';
import { UHD as UniversalHoseDataType } from '@/components/detailView/types';
import UniversalHoseData from '@/components/detailView/UniversalHoseData';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';

type HoseData = {
  customerId: string;
  id: string;
  prodDate: string;
  Department: string;
  Description: string;
  Status: string;
  Customer: string;
  RFid: string;
  s1PlantVesselUnit: string;
  S2Equipment: string;
  equipmentSubunit: string;
  otherInfo: string;
  tempClass: string;
  pressureClass: string;
  dimID: string;
  lengthID: string;
  connection1Type: string;
  connection2Type: string;
  connection1Dim: string;
  connection2Dim: string;
  batchNo: string;
  certificateNo: string;
  pollutionExposure: string;
  uvExposure: string;
  hoseStandard: string;
  innerDiameter: string;
  totalLength: string;
  wpBar: string;
  wpPsi: string;
  materialQuality: string;
  typeFitting: string;
  innerDiameter2: string;
  gender: string;
  angle: string;
  commentEnd1: string;
  hoseType: string;
  ferrule1: string;
  ferrule2: string;
  insert1: string;
  insert2: string;
  addAEnd1: string;
  addBEnd1: string;
  addCEnd1: string;
  addAEnd2: string;
  addBEnd2: string;
  addCEnd2: string;
  spiralGuard: string;
  hookie: string;
  whipcheck: string;
  hoseProtection: string;
  breakAwayWeakLink: string;
};

const HoseDetails = () => {
  const { slug } = useLocalSearchParams();
  const hoseData = mockedData.find(
    (hose) => hose.id === slug,
  ) as unknown as HoseData;

  const scrollViewRef = useRef(null);
  const structureRef = useRef(null);
  const historyRef = useRef(null);

  const [editMode, setEditMode] = useState(false);

  const mapHoseDataToGeneralInfo = (hoseData: HoseData): GeneralInfoType => ({
    description: hoseData?.Description || '',
    customerId: hoseData?.customerId || '',
    s1PlantVesselUnit: hoseData?.s1PlantVesselUnit || '',
    S2Equipment: hoseData?.S2Equipment || '',
    equipmentSubunit: hoseData?.equipmentSubunit || '',
    otherInfo: hoseData?.otherInfo || '',
    RFid: hoseData?.RFid || '',
    hoseMediumTemperature: '',
    hoseFunction: '',
    pollutionExposure: hoseData?.pollutionExposure || 'internal',
    uvExposure: hoseData?.uvExposure || 'internal',
  });

  const mapHoseDataToUniversalHoseData = (
    hoseData: HoseData,
  ): UniversalHoseDataType => ({
    hoseStandard: hoseData?.hoseStandard || '',
    innerDiameter: hoseData?.innerDiameter || '',
    totalLength: hoseData?.totalLength || '',
    wpBar: hoseData?.wpBar || '',
    wpPsi: hoseData?.wpPsi || '',
    materialQuality: hoseData?.materialQuality || '',
    typeFitting: hoseData?.typeFitting || '',
    innerDiameter2: hoseData?.innerDiameter2 || '',
    gender: hoseData?.gender || '',
    angle: hoseData?.angle || '',
    commentEnd1: hoseData?.commentEnd1 || '',
  });

  const mapHoseDataToTPN = (hoseData: HoseData) => ({
    hoseType: hoseData?.hoseType || '',
    ferrule1: hoseData?.ferrule1 || '',
    ferrule2: hoseData?.ferrule2 || '',
    insert1: hoseData?.insert1 || '',
    insert2: hoseData?.insert2 || '',
    addAEnd1: hoseData?.addAEnd1 || '',
    addBEnd1: hoseData?.addBEnd1 || '',
    addCEnd1: hoseData?.addCEnd1 || '',
    addAEnd2: hoseData?.addAEnd2 || '',
    addBEnd2: hoseData?.addBEnd2 || '',
    addCEnd2: hoseData?.addCEnd2 || '',
    spiralGuard: hoseData?.spiralGuard || '',
    hookie: hoseData?.hookie || '',
    whipcheck: hoseData?.whipcheck || '',
    hoseProtection: hoseData?.hoseProtection || '',
    breakAwayWeakLink: hoseData?.breakAwayWeakLink || '',
  });

  const [editedGeneralInfo, setEditedGeneralInfo] = useState(
    mapHoseDataToGeneralInfo(hoseData),
  );

  const [editedUniversalHoseData, setEditedUniversalHoseData] = useState(
    mapHoseDataToUniversalHoseData(hoseData),
  );

  const [editedTPNData, setEditedTPNData] = useState(
    mapHoseDataToTPN(hoseData),
  );

  const handleInputChange = (field: string, value: string) => {
    if (editedGeneralInfo.hasOwnProperty(field)) {
      setEditedGeneralInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else if (editedUniversalHoseData.hasOwnProperty(field)) {
      setEditedUniversalHoseData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else if (editedTPNData.hasOwnProperty(field)) {
      setEditedTPNData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const checkMissingData = (hoseData: GeneralInfoType) => {
    return (
      !hoseData.description ||
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
          <Structure
            structure={[
              'Customer WEB DEMO',
              'Test Princess',
              'This structure is really long and should hopefully wrap',
            ]}
            name={'5254-04 x 250 mm'}
          />
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
    <>
      <DetailsHeader
        id={hoseData.id}
        date={hoseData.prodDate}
        missingData={checkMissingData(editedGeneralInfo)}
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
      <ScrollView ref={scrollViewRef}>
        <GeneralInfo
          generalInfo={editedGeneralInfo}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <UniversalHoseData
          universalHoseData={editedUniversalHoseData}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <TessPartNumbers
          tessPartNumbersData={editedTPNData}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        {shortcuts.map((section) => (
          <View key={section.id}>{section.content}</View>
        ))}
      </ScrollView>
    </>
  );
};

export default HoseDetails;
