import { ButtonTHS } from '@/components/UI';
import { ActionsFab, Option } from '@/components/UI/ActionMenu/fab';
import { DetailsHeader } from '@/components/detailView/common/DetailsHeader';
import { Documents } from '@/components/detailView/common/Documents';
import { EditGeneralInfo } from '@/components/detailView/edit/EditGeneralInfo';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { EditTessPartNumbers } from '@/components/detailView/edit/EditTessPartNumbers';
import { EditUniversalHoseData } from '@/components/detailView/edit/EditUniversalHoseData';
import { GeneralInfo } from '@/components/detailView/view/GeneralInfo';
import { HistoryView } from '@/components/detailView/view/History';
import { MaintenanceInfo } from '@/components/detailView/view/MaintenanceInfo';
import { Structure } from '@/components/detailView/view/Structure';
import { TessPartNumbers } from '@/components/detailView/view/TessPartNumbers';
import { UniversalHoseData } from '@/components/detailView/view/UniversalHoseData';
import { AppContext, PartialRFQFormData } from '@/context/Reducer';
import { mockedHistory } from '@/context/mocked';
import { SingleSelection, SingleSelectionActionsType } from '@/context/state';
import { useDataManager } from '@/hooks/useDataManager';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { EditProps } from '@/lib/types/edit';
import { HID, HoseData } from '@/lib/types/hose';
import { needsThisCodeToGetAccess } from '@/lib/util/getAccess';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { getDefaultRequiredHoseData } from '@/lib/util/validation';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type ExtendedEditProps<T> = EditProps<T> & {
  missingFields?: string[];
};

const renderComponent = <T,>(
  Component: React.FC<{ info: Partial<T> }>,
  EditComponent: React.FC<ExtendedEditProps<T>>,
  props: {
    info: Partial<T>;
    editMode: boolean;
    onInputChange: (field: keyof T, value: any) => void;
    missingFields?: string[];
  },
) => {
  return props.editMode ? (
    <EditComponent
      info={props.info}
      onInputChange={props.onInputChange}
      missingFields={props.missingFields}
      showValidationErrors
    />
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
  return 'assetId' in hose;
};

const HoseDetails = () => {
  const {
    hoseId,
    startInEditMode,
    missingFields: missingFieldsParam,
    isNotEditable,
  } = useLocalSearchParams<{
    hoseId: string;
    startInEditMode?: string;
    missingFields?: string;
    isNotEditable?: 'true';
  }>();

  const { state, dispatch } = useContext(AppContext);
  const { activitiesData, editHose } = useDataManager();
  const scrollViewRef = useRef<ScrollView>(null);

  const [editMode, setEditMode] = useState(startInEditMode === 'true');
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [hoseData, setHoseData] = useState<Partial<HoseData>>(
    state.data.hoses.find((hose) => hose.assetId === +hoseId) ?? {},
  );

  // Get original hose data from state
  const originalHoseData = state.data.hoses.find(
    (hose) => hose.assetId === +hoseId,
  );

  const router = useRouter();

  usePreventGoBack(false);
  useEffect(() => {
    dispatch({
      type: 'SET_IS_CANCELABLE',
      payload: editMode,
    });
  }, [editMode]);

  useEffect(() => {
    if (missingFieldsParam) {
      try {
        const parsedFields = JSON.parse(missingFieldsParam);
        if (Array.isArray(parsedFields)) {
          setMissingFields(parsedFields);
        }
      } catch (error) {
        console.error('Failed to parse missingFields parameter:', error);
      }
    }
  }, [missingFieldsParam]);

  const isDataMissing =
    missingFields.length > 0 || originalHoseData?.missingData;

  const handleInputChange = (
    field: keyof HoseData,
    value: HoseData[keyof HoseData],
  ) => {
    if (!originalHoseData) return;

    setHoseData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const toggleEditMode = () => {
    if (editMode) {
      // Exiting edit mode - clear temporary data and missing fields
      dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
      setMissingFields([]);
    } else {
      // Entering edit mode - set cancelable
      dispatch({ type: 'SET_IS_CANCELABLE', payload: true });
    }
    setEditMode((prev) => !prev);
  };

  const saveHoseChanges = (markAsMissingData: boolean) => {
    editHose(hoseData);
    // Clear temporary data and exit edit mode
    dispatch({ type: 'SET_IS_CANCELABLE', payload: false });
    setEditMode(false);
    setMissingFields([]);
    scrollViewRef.current?.scrollTo({ y: 0 });
    Alert.alert(
      'Success',
      `Hose data saved successfully${markAsMissingData ? ' (with missing data)' : ''}.`,
    );
  };
  const handleSave = () => {
    // if (!isHoseDataType(hoseData) || hoseData.assetId === undefined) return;

    const requiredFieldsList = Object.keys(
      getDefaultRequiredHoseData(),
    ) as (keyof HoseData)[];

    const currentMissingFields = requiredFieldsList.filter(
      (field) =>
        hoseData[field] === undefined ||
        hoseData[field] === null ||
        String(hoseData[field]).trim() === '',
    );

    if (currentMissingFields.length > 0) {
      Alert.alert(
        'Missing Data',
        'This hose has missing data, do you have the ability to add and update?',
        [
          {
            text: 'Update hose details',
            onPress: () => {
              setMissingFields(currentMissingFields);
            },
            style: 'cancel',
          },
          {
            text: 'Continue anyway.',
            onPress: () => saveHoseChanges(true),
          },
        ],
      );
    } else {
      saveHoseChanges(false);
    }
  };

  const handleAction = (value: SingleSelection['type']) => {
    if (value === 'EDIT') {
      // Create a draft for editing ?
      setEditMode(true);
      return;
    } else if (value === 'INSPECT') {
      const draftId = activitiesData.createDraft({
        type: 'INSPECT',
        status: 'draft',
        selectedIds: [hoseData.assetId ?? +hoseId],
        formData: hoseData as Partial<HID>,
        modifiedAt: new Date().toISOString(),
      });
      router.push({
        pathname: `/dashboard/hoses/inspect`,
        params: { draftId },
      });
      return;
    } else {
      const draftId = activitiesData.createDraft({
        type: value,
        status: 'draft',
        selectedIds: [hoseData.assetId ?? +hoseId],
        formData: hoseData as Partial<HID>,
        modifiedAt: new Date().toISOString(),
      });
      router.push({
        pathname: `/dashboard/actions`,
        params: { action: value, draftId: draftId, allowScan: 'false' },
      });
    }
  };

  const options: Option<SingleSelectionActionsType>[] = [
    {
      label: 'Inspect hose',
      value: 'INSPECT',
      icon: 'Inspect',
      userHasNoAccess: needsThisCodeToGetAccess(
        4,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      label: 'Edit hose data',
      value: 'EDIT',
      icon: 'Edit',
      userHasNoAccess: needsThisCodeToGetAccess(
        5,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      label: 'Order hose (RFQ)',
      value: 'RFQ',
      icon: 'Cart',
      userHasNoAccess: needsThisCodeToGetAccess(
        6,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      label: 'Scrap hose',
      value: 'SCRAP',
      icon: 'Trash',
      userHasNoAccess: needsThisCodeToGetAccess(
        7,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      label: 'Contact TESS Team',
      value: 'CONTACT',
      icon: 'Email',
    },
  ];

  const getStructure = (hose: Partial<HoseData>) => {
    const structure: (string | undefined | null)[] = [
      hose.s1Code ? `${hose.s1Code}` : undefined,
      hose.S2Equipment,
      hose.equipmentSubunit,
    ];
    return structure.filter((s): s is string => !!s && s.trim() !== '');
  };

  return (
    <View style={styles.container}>
      {!editMode && !isNotEditable && (
        <ActionsFab
          options={options as Option<SingleSelectionActionsType>[]}
          onChange={handleAction as (value: string) => void}
          menuTitle='Actions'
        />
      )}
      <ScrollView ref={scrollViewRef}>
        <DetailsHeader
          id={hoseData?.assetId?.toString() ?? hoseId}
          date={hoseData.productionDate ?? ''} // TODO: add date formating
          missingData={isDataMissing}
        />

        {renderComponent(GeneralInfo, EditGeneralInfo, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
          missingFields: editMode ? missingFields : undefined,
        })}
        {renderComponent(UniversalHoseData, EditUniversalHoseData, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
          missingFields: editMode ? missingFields : undefined,
        })}
        {renderComponent(TessPartNumbers, EditTessPartNumbers, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
          missingFields: editMode ? missingFields : undefined,
        })}
        {renderComponent(MaintenanceInfo, EditMaintenanceInfo, {
          info: hoseData,
          onInputChange: handleInputChange,
          editMode,
          missingFields: editMode ? missingFields : undefined,
        })}
        {!editMode && (
          <>
            <Documents />
            <Structure
              structure={getStructure(hoseData)}
              name={
                state.data.s1Items.find(
                  (unit) => unit.S1Code === state.data.s1Code,
                )?.S1Name ?? ''
              }
            />
            <HistoryView items={mockedHistory} />
          </>
        )}
        {editMode && (
          <View style={styles.buttonContainer}>
            <ButtonTHS
              title='Save and close'
              onPress={handleSave}
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
    padding: 10,
    paddingBottom: 50,
  },
  buttonContainer: {
    paddingTop: 50,
    paddingHorizontal: 70,
    gap: 20,
  },
});
