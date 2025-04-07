import { ButtonTHS } from '@/components/UI';
import { ActionsFab, Option } from '@/components/UI/ActionMenu/fab';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import Documents from '@/components/detailView/Documents';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import HistoryView from '@/components/detailView/History';
import MaintenanceInfo from '@/components/detailView/MaintenanceInfo';
import Structure from '@/components/detailView/Structure';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';
import UniversalHoseData from '@/components/detailView/UniversalHoseData';
import EditGeneralInfo from '@/components/detailView/edit/EditGeneralInfo';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import EditTessPartNumbers from '@/components/detailView/edit/EditTessPartNumbers';
import EditUniversalHoseData from '@/components/detailView/edit/EditUniversalHoseData';
import { GHD, TPN, UHD } from '@/components/detailView/types';
import { Typography } from '@/components/typography';
import { AppContext } from '@/context/Reducer';
import { Hose } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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

  const [editMode, setEditMode] = useState(false);
  const [hoseData, setHoseData] = useState<Hose | undefined>(
    state.data.hoses.find((hose) => hose.id === hoseId),
  );

  const router = useRouter();

  if (hoseData === undefined) {
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
  };

  const handleAction = (value: string) => {
    if (!hoseData.id) return;
    setAction({ label: value, value: value });
    if (!state.data.selection) {
      dispatch({
        type: 'SELECT_HOSE_SINGEL_SELECT',
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

  const getStructure = (hose: Hose) => {
    // TODO how to get structure?
    const structure: string[] = [];
    if (typeof hose.Customer === 'string') structure.push(hose.Customer);
    if (hose.unit) structure.push(hose.unit as string);
    if (hose.position) structure.push(hose.position as string);
    return structure;
  };

  return (
    <View style={styles.container}>
      {state.data.selection && !editMode && (
        <ActionsFab
          selected={action?.value || null}
          options={options}
          onChange={handleAction}
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
          generalInfo: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(UniversalHoseData, EditUniversalHoseData, {
          universalHoseData: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(TessPartNumbers, EditTessPartNumbers, {
          tessPartNumbersData: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {renderComponent(MaintenanceInfo, EditMaintenanceInfo, {
          hoseData: hoseData,
          onInputChange: handleInputChange,
          editMode,
        })}
        {!editMode && (
          <>
            <Documents />
            <Structure
              structure={getStructure(hoseData)}
              name={
                typeof hoseData.Description === 'string'
                  ? hoseData.Description
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
