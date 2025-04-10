import { ButtonTHS } from '@/components/UI';
import { ActionsFab, Option } from '@/components/UI/ActionMenu/fab';
import { Documents } from '@/components/detailView/common/Documents';
import { GeneralInfo } from '@/components/detailView/view/GeneralInfo';
import { HistoryView } from '@/components/detailView/view/History';
import { MaintenanceInfo } from '@/components/detailView/view/MaintenanceInfo';
import { Structure } from '@/components/detailView/view/Structure';
import { TessPartNumbers } from '@/components/detailView/view/TessPartNumbers';
import { UniversalHoseData } from '@/components/detailView/view/UniversalHoseData';
import { DetailsHeader } from '@/components/detailView/common/DetailsHeader';
import { EditGeneralInfo } from '@/components/detailView/edit/EditGeneralInfo';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { EditTessPartNumbers } from '@/components/detailView/edit/EditTessPartNumbers';
import { EditUniversalHoseData } from '@/components/detailView/edit/EditUniversalHoseData';
import { EditProps } from '@/components/detailView/edit/edit';
import { HoseData } from '@/components/detailView/types';
import { Typography } from '@/components/typography';
import { AppContext } from '@/context/Reducer';
import {
  Hose,
  isMultiSelection,
  SingleSelection,
  SingleSelectionActionsType,
} from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

const renderComponent = <T,>(
  Component: React.FC<{ info: T }>,
  EditComponent: React.FC<EditProps<T>>,
  props: {
    info: T;
    editMode: boolean;
    onInputChange: (field: keyof T, value: any) => void;
  },
) => {
  return props.editMode ? (
    <EditComponent info={props.info} onInputChange={props.onInputChange} />
  ) : (
    <Component info={props.info} />
  );
};
export type Section = {
  id: string;
  title: string;
  content: JSX.Element;
};

const isHoseDataType = (hose: HoseData | {}): hose is HoseData => {
  return 'id' in hose;
};

const HoseDetails = () => {
  const { hoseId } = useLocalSearchParams();

  const { state, dispatch } = useContext(AppContext);

  const scrollViewRef = useRef<ScrollView>(null);

  const [editMode, setEditMode] = useState(false);
  const [hoseData, setHoseData] = useState<HoseData | {}>(
    state.data.hoses.find((hose) => hose.id === hoseId) || {},
  );

  const router = useRouter();

  if (!isHoseDataType(hoseData)) {
    return (
      <View style={styles.container}>
        <Typography name={'navigationBold'} text='Hose not found' />
      </View>
    );
  }
  hoseData;
  const handleInputChange = (field: keyof Hose, value: string) => {
    setHoseData(
      (prevState) =>
        ({
          ...prevState,
          [field]: value,
        }) as Hose,
    );
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSave = () => {
    if (hoseData.id === undefined) return;

    dispatch({
      type: 'SAVE_HOSE_DATA',
      payload: { hoseId: hoseData.id, hoseData },
    });
    setEditMode(false);
    scrollViewRef.current?.scrollTo({ y: 0 });
  };

  const handleAction = (value: SingleSelection['type']) => {
    if (value === 'EDIT') {
      setEditMode(true);
      return;
    } else if (value === 'INSPECT') {
      // TODO implement inspection page
      Alert.alert('Not implemented', 'This feature is not implemented yet');
      return;
    } else {
      if (!hoseData.id) return;
      // setAction({ label: value, value: value });
      if (!state.data.selection) {
        dispatch({
          type: 'SELECT_ONE_HOSE',
          payload: {
            type: value,
            id: hoseData.id,
          },
        });
      }
      router.push({
        pathname: `/dashbord/actions/[action]`,
        params: { hoseId: hoseData.id, action: value },
      });
    }
  };

  const options: Option<SingleSelectionActionsType>[] = [
    {
      label: 'Inspect hose',
      value: 'INSPECT',
      icon: 'Inspect',
    },
    {
      label: 'Edit hose data',
      value: 'EDIT',
      icon: 'Edit',
    },
    {
      label: 'Order hose (RFQ)',
      value: 'RFQ',
      icon: 'Cart',
    },
    {
      label: 'Scrap hose',
      value: 'SCRAP',
      icon: 'Trash',
    },
    {
      label: 'Contact TESS Team',
      value: 'CONTACT',
      icon: 'Email',
    },
  ];

  const getStructure = (hose: HoseData) => {
    // TODO how to get structure?
    const structure: string[] = [
      hose.s1PlantVesselUnit,
      hose.S2Equipment,
      hose.equipmentSubunit,
    ];
    return structure;
  };
  return (
    <View style={styles.container}>
      {!isMultiSelection(state.data.selection) && !editMode && (
        <ActionsFab
          options={options as Option<SingleSelectionActionsType>[]}
          onChange={handleAction as (value: string) => void}
          menuTitle='Actions'
        />
      )}
      <ScrollView ref={scrollViewRef}>
        <DetailsHeader
          id={hoseData.id}
          date={hoseData.prodDate}
          missingData={hoseData.missingData}
        />

        {renderComponent(GeneralInfo, EditGeneralInfo, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(UniversalHoseData, EditUniversalHoseData, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(TessPartNumbers, EditTessPartNumbers, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(MaintenanceInfo, EditMaintenanceInfo, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {!editMode && (
          <>
            <Documents />
            <Structure
              structure={getStructure(hoseData)}
              name={
                typeof hoseData.s1PlantVesselUnit === 'string'
                  ? hoseData.s1PlantVesselUnit
                  : ''
              }
            />
            <HistoryView />
          </>
        )}
        {editMode && (
          <View style={styles.buttonContainer}>
            <ButtonTHS
              title='Save and close'
              onPress={() => {
                handleSave();
              }}
              variant='primary'
              size='sm'
            />

            <ButtonTHS
              title='Cancel'
              onPress={toggleEditMode}
              variant='tertiary'
              size='sm'
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HoseDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    paddingBottom: 50,
  },
  buttonContainer: {
    paddingHorizontal: 70,
    gap: 20,
  },
});
