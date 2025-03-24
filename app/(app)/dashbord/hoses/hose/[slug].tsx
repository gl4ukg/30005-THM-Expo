import React, { useRef, useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { mockedData } from '../../../../../context/mocked';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams } from 'expo-router';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';
import { GHD as GeneralInfoType } from '@/components/detailView/types';
import {
  UHD as UniversalHoseDataType,
  HID,
} from '@/components/detailView/types';
import UniversalHoseData from '@/components/detailView/UniversalHoseData';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';
import MaintananceInfo from '@/components/detailView/MaintananceInfo';
import { AppContext } from '@/context/Reducer';

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
  inspectedDate: string;
  inspectedBy: string;
  hoseCondition: string;
  Approved: string;
  comment: string;
  criticality: string;
  inspectionInterval: string;
  nextInspection: string;
  replacementInterval: string;
  replacementDate: string;
};

const HoseDetails = () => {
  const { slug } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);
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

  const mapHoseDataToHID = (hoseData: HoseData): HID => ({
    inspectedDate: hoseData?.inspectedDate || '',
    inspectedBy: hoseData?.inspectedBy || '',
    hoseCondition: hoseData?.hoseCondition || '',
    approved: hoseData?.Approved || '',
    comment: hoseData?.comment || '',
    prodDate: hoseData?.prodDate || '',
    criticality: hoseData?.criticality || '',
    inspectionInterval: hoseData?.inspectionInterval || '',
    nextInspection: hoseData?.nextInspection || '',
    replacementInterval: hoseData?.replacementInterval || '',
    replacementDate: hoseData?.replacementDate || '',
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
  const [editedHID, setEditedHID] = useState(mapHoseDataToHID(hoseData));

  const [originalGeneralInfo, setOriginalGeneralInfo] = useState(
    mapHoseDataToGeneralInfo(hoseData),
  );
  const [originalUniversalHoseData, setOriginalUniversalHoseData] = useState(
    mapHoseDataToUniversalHoseData(hoseData),
  );
  const [originalTPNData, setOriginalTPNData] = useState(
    mapHoseDataToTPN(hoseData),
  );
  const [originalHID, setOriginalHID] = useState(mapHoseDataToHID(hoseData));

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
    } else if (editedHID.hasOwnProperty(field)) {
      setEditedHID((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      setEditedGeneralInfo(originalGeneralInfo);
      setEditedUniversalHoseData(originalUniversalHoseData);
      setEditedTPNData(originalTPNData);
      setEditedHID(originalHID);
    } else {
      setOriginalGeneralInfo(editedGeneralInfo);
      setOriginalUniversalHoseData(editedUniversalHoseData);
      setOriginalTPNData(editedTPNData);
      setOriginalHID(editedHID);
    }
    setEditMode(!editMode);
  };

  const handleSave = () => {
    dispatch({
      type: 'SAVE_HOSE_DATA',
      payload: {
        hoseId: hoseData.id,
        hoseData: {
          ...editedGeneralInfo,
          ...editedUniversalHoseData,
          ...editedTPNData,
          ...editedHID,
        },
      },
    });
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
              hoseData.Customer,
              hoseData.s1PlantVesselUnit,
              hoseData.S2Equipment,
            ]}
            name={hoseData.Description}
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
        size='lg'
      />
      {editMode && (
        <ButtonTHS
          title='Save'
          onPress={handleSave}
          variant='secondary'
          size='lg'
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
        <MaintananceInfo
          hoseData={editedHID}
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
