import { getScanUrl } from '@/app/(app)/scan';
import { SingleHoseDisplay } from '@/components/dashboard/listTable/SingleHoseDisplay';
import { DataField } from '@/components/detailView/common/Datafield';
import { Photos } from '@/components/detailView/common/Photos';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { useAppContext } from '@/context/ContextProvider';
import { usePreventGoBack } from '@/hooks/usePreventGoBack';
import { HoseData } from '@/lib/types/hose';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

const requiredFields: (keyof HoseData)[] = [
  'itemDescription',
  'productionDate',
  'installedDate',
  'criticality',
  'hoseType',
  'hoseLength_mm',
  'wp_BAR',
  'ferrule1',
  'ferrule2',
  'insert1',
  'insert2',
  'genericHoseType',
  'typeFittingEnd1',
  'genericDimensionEnd1',
  'genderEnd1',
  'angleEnd1',
  'materialQualityEnd1',
  'typeFittingEnd2',
  'genericDimensionEnd2',
  'genderEnd2',
  'angleEnd2',
];

export const InspectHose = () => {
  usePreventGoBack();
  const { state, dispatch } = useAppContext();
  const { hoseId, draftId } = useLocalSearchParams<{
    hoseId: string;
    draftId?: string;
  }>();
  const [hoseData, setHoseData] = useState<Partial<HoseData>>({});
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  let id = useMemo(
    () =>
      draftId
        ? +draftId
        : generateNumericDraftId(state.data.drafts.map((d) => d.id)),
    [],
  );
  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0 });
      }
      let hose: HoseData | undefined = state.data.hoses.find(
        (hose) => hose.assetId === +hoseId,
      );
      if (draftId) {
        const draft = state.data.drafts.find((d) => d.id === +draftId);
        if (draft) {
          setHoseData(draft.formData as Partial<HoseData>);
        }
      } else {
        if (hose) {
          setHoseData(hose);
        }
      }
    }, [hoseId, draftId, state.data.drafts]),
  );

  const handleInputChange = (
    field: keyof Partial<HoseData>,
    value: HoseData[keyof Partial<HoseData>],
  ) => {
    setHoseData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const sendInspection = () => {
    dispatch({
      type: 'MOVE_DRAFT_TO_DONE',
      payload: id,
    });
    router.push('/dashboard');
  };
  const handleSend = () => {
    if (!hoseData) return;

    const missingFields = requiredFields.filter((field) => {
      const value = hoseData[field];

      return (
        value === null || value === undefined || String(value).trim() === ''
      );
    });

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Hose Details',
        `Updating now means better maintenance and ordering later. Want to add the missing info?`,
        [
          {
            text: 'Yes, update now',
            onPress: () => {
              router.push({
                pathname: '/dashboard/hoses/hose/[hoseId]',
                params: {
                  hoseId: `${hoseData.assetId}`,
                  startInEditMode: 'true',
                  missingFields: JSON.stringify(missingFields),
                },
              });
            },
            style: 'default',
          },
          {
            text: 'No, skip',
            onPress: sendInspection,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else {
      sendInspection();
    }
  };
  const handleSaveAsDraft = () => {
    dispatch({
      type: 'SAVE_DRAFT',
      payload: {
        id: id,
        selectedIds: [hoseData.assetId!],
        type: 'INSPECT',
        status: 'draft',
        formData: hoseData,
      },
    });
    router.push('/dashboard');
  };

  const handleCancel = () => {
    console.log('Cancel Inspection');
    router.back();
  };

  if (!hoseData.assetId) {
    return (
      <View style={styles.centeredContainer}>
        <Typography name='navigation' text='No hose found.' />
        <ButtonTHS
          onPress={() => router.push(getScanUrl('INSPECT_HOSE'))}
          title='Go Back'
          variant='secondary'
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      ref={scrollViewRef}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Typography name='navigationBold' text='Inspect hose:' />
        </View>
        <Typography name={'fieldLabel'} text={`Inspection #${id}`} />
      </View>
      <SingleHoseDisplay item={hoseData as HoseData} />
      <View style={styles.infoSection}>
        <DataField label='Description:' value={hoseData.itemDescription} />
        <DataField
          label='S1 Plant, Vessel, Unit:'
          value={hoseData.s1Code ?? ''}
        />
        <DataField label='S2 Equipment:' value={hoseData.S2Equipment ?? ''} />
        <DataField
          label='Equipment Subunit:'
          value={hoseData.equipmentSubunit ?? ''}
        />
        <DataField label='Other Info:' value={hoseData.otherInfo ?? ''} />
      </View>
      <EditMaintenanceInfo
        info={hoseData}
        onInputChange={handleInputChange}
        isInspect
      />
      <Photos />
      <View style={styles.buttonContainer}>
        <ButtonTHS
          title='Complete Inspection'
          onPress={handleSend}
          variant='primary'
          size='sm'
        />
        <ButtonTHS
          title='Save as draft'
          onPress={handleSaveAsDraft}
          variant='secondary'
          size='sm'
        />
        <ButtonTHS
          title='Cancel'
          onPress={handleCancel}
          variant='tertiary'
          size='sm'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    gap: 30,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  infoSection: {
    gap: 10,
  },
  fieldMargin: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    gap: 5,
  },
});

export default InspectHose;
