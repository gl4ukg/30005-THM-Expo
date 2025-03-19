import React, { useRef, useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { mockedData } from '../../../../../context/mocked';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams } from 'expo-router';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';
import { GHD, UHD, TPN, HID } from '@/components/detailView/types';
import UniversalHoseData from '@/components/detailView/UniversalHoseData';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';
import MaintananceInfo from '@/components/detailView/MaintananceInfo';
import { AppContext } from '@/context/Reducer';

type HoseData = {
  id: string;
  prodDate: string;
  Description: string;
  customerId: string;
  s1PlantVesselUnit: string;
  S2Equipment: string;
  equipmentSubunit: string;
  otherInfo: string;
  RFid: string;
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

  const hoseData =
    state.data.assignedUnits.hoses?.find(
      (hose: HoseData) => hose.id === slug,
    ) || mockedData.find((hose) => hose.id === slug);

  const scrollViewRef = useRef(null);
  const structureRef = useRef(null);
  const historyRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [localState, setLocalState] = useState<HoseData>(hoseData);
  const [snapshotState, setSnapshotState] = useState<HoseData | null>(null);

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'SAVE_HOSE_DATA',
      payload: {
        hoseId: hoseData.id,
        hoseData: {
          ...localState,
          [field]: value,
        },
      },
    });
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const toggleEditMode = () => {
    if (!editMode) {
      setSnapshotState({ ...localState });
    } else if (snapshotState) {
      setLocalState(snapshotState);
    }
    setEditMode(!editMode);
  };

  const handleSave = () => {
    dispatch({
      type: 'SAVE_HOSE_DATA',
      payload: {
        hoseId: hoseData.id,
        hoseData: localState,
      },
    });
    setSnapshotState(null);
    setEditMode(false);
  };

  const checkMissingData = (generalInfo: GHD) => {
    return (
      !generalInfo.description ||
      !generalInfo.customerId ||
      !generalInfo.s1PlantVesselUnit ||
      !generalInfo.S2Equipment ||
      !generalInfo.equipmentSubunit ||
      !generalInfo.otherInfo ||
      !generalInfo.RFid
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
        id={localState.id}
        date={localState.prodDate}
        missingData={checkMissingData(localState as unknown as GHD)}
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
          generalInfo={localState as unknown as GHD}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <UniversalHoseData
          universalHoseData={localState as UHD}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <TessPartNumbers
          tessPartNumbersData={localState as TPN}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <MaintananceInfo
          hoseData={localState as unknown as HID}
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
