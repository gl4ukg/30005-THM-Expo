import React, { useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { mockedData } from '../../../../../context/mocked';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import EditGeneralInfo from '@/components/detailView/edit/EditGeneralInfo';
import UniversalHoseData from '@/components/detailView/UniversalHoseData';
import EditUniversalHoseData from '@/components/detailView/edit/EditUniversalHoseData';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';
import EditTessPartNumbers from '@/components/detailView/edit/EditTessPartNumbers';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams } from 'expo-router';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';
import { GHD, UHD, TPN } from '@/components/detailView/types';
import { AppContext } from '@/context/Reducer';

const renderComponent = (
  Component: React.FC<any>,
  EditComponent: React.FC<any>,
  props: any,
) => {
  return props.editMode ? (
    <EditComponent {...props} />
  ) : (
    <Component {...props} />
  );
};

const HoseDetails = () => {
  const { slug } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);

  const hoseData =
    state.data.assignedUnits.hoses?.find((hose) => hose.id === slug) ||
    mockedData.find((hose) => hose.id === slug);

  const [editMode, setEditMode] = useState(false);
  const [localState, setLocalState] = useState(hoseData);

  const handleInputChange = (field: string, value: string) => {
    setLocalState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSave = () => {
    dispatch({
      type: 'SAVE_HOSE_DATA',
      payload: { hoseId: hoseData.id, hoseData: localState },
    });
    setEditMode(false);
  };

  const shortcuts = [
    { id: 'photos', title: 'Photos', content: <View /> },
    { id: 'hoseModule', title: 'Hose module', content: <View /> },
    { id: 'tessPartNumbers', title: 'TESS Part Numbers', content: <View /> },
    { id: 'maintenanceInfo', title: 'Maintenance info', content: <View /> },
    { id: 'documents', title: 'Documents', content: <View /> },
    {
      id: 'structure',
      title: 'Structure',
      content: (
        <View>
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
    { id: 'history', title: 'History', content: <HistoryView /> },
  ];

  return (
    <>
      <DetailsHeader
        id={localState.id}
        date={localState.prodDate}
        missingData={!localState.description}
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
      <ScrollView>
        {renderComponent(GeneralInfo, EditGeneralInfo, {
          generalInfo: localState as GHD,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(UniversalHoseData, EditUniversalHoseData, {
          universalHoseData: localState as UHD,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(TessPartNumbers, EditTessPartNumbers, {
          tessPartNumbersData: localState as TPN,
          onInputChange: handleInputChange,
          editMode,
        })}
        {shortcuts.map((section) => (
          <View key={section.id}>{section.content}</View>
        ))}
      </ScrollView>
    </>
  );
};

export default HoseDetails;
