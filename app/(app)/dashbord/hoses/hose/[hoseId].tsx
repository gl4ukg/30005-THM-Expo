import React, { useState, useContext, useRef, useEffect } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';
import { GHD, UHD, TPN } from '@/components/detailView/types';
import { AppContext } from '@/context/Reducer';
import MaintananceInfo from '@/components/detailView/MaintananceInfo';
import EditMaintananceInfo from '@/components/detailView/edit/EditMaintananceInfo';
import Documents from '@/components/detailView/Documents';
import { colors } from '@/lib/tokens/colors';
import { StyleSheet } from 'react-native';
import { ActionsFab, Option } from '@/components/UI/ActionMenu/fab';

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
export type Section = {
  id: string;
  title: string;
  content: JSX.Element;
};

const HoseDetails = () => {
  const { hoseId } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const [action, setAction] = useState<Option<string> | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const hoseData =
    state.data.assignedUnits.hoses?.find((hose) => hose.id === hoseId) ||
    mockedData.find((hose) => hose.id === hoseId);

  const [editMode, setEditMode] = useState(false);
  const [localState, setLocalState] = useState(hoseData);

  const router = useRouter();

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

  const handleAction = (value: string) => {
    setAction({ label: value, value: value });

    if (!state.data.selectedHoses.includes(hoseData.id)) {
      dispatch({
        type: 'SELECT_HOSE',
        payload: hoseData.id,
      });
    }

    switch (value) {
      case 'edit':
        setEditMode(true);
        break;
      case 'order':
        router.push({
          pathname: `/dashbord/actions/rfq`,
          params: { hoseId: hoseData.id },
        });
        break;
      case 'scrap':
        router.push({
          pathname: `/dashbord/actions/scrap`,
          params: { hoseId: hoseData.id },
        });
        break;
      case 'contact':
        router.push({
          pathname: `/dashbord/actions/contact`,
          params: { hoseId: hoseData.id },
        });
        break;
      default:
        break;
    }
  };

  const options: Option<string>[] = [
    {
      label: 'Inspect hose',
      value: 'inspect',
      icon: 'Inspect',
    },
    {
      label: 'Edit hose data',
      value: 'edit',
      icon: 'Edit',
    },
    {
      label: 'Order hose (RFQ)',
      value: 'order',
      icon: 'Cart',
    },
    {
      label: 'Scrap hose',
      value: 'scrap',
      icon: 'Trash',
    },
    {
      label: 'Contact TESS team',
      value: 'contact',
      icon: 'Email',
    },
  ];

  return (
    <View style={styles.container}>
      {state.data.selectedHoses.length <= 1 && !editMode && (
        <ActionsFab
          selected={action?.value || null}
          options={options}
          onChange={handleAction}
          menuTitle='Actions'
        />
      )}
      <ScrollView ref={scrollViewRef}>
        <DetailsHeader
          id={localState.id}
          date={localState.prodDate}
          missingData={!localState.description}
        />

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
        {renderComponent(MaintananceInfo, EditMaintananceInfo, {
          hoseData: localState,
          onInputChange: handleInputChange,
          editMode,
        })}
        {!editMode && (
          <>
            <Documents />
            <Structure
              structure={[
                hoseData.Customer,
                hoseData.s1PlantVesselUnit,
                hoseData.S2Equipment,
              ]}
              name={hoseData.Description}
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
