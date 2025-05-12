import { Photos } from '@/components/detailView/common/Photos';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { SingleHoseDisplay } from '@/components/dashboard/listTable/SingleHoseDisplay';
import { Typography } from '@/components/Typography';
import { HoseData } from '@/lib/types/hose';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '@/context/ContextProvider';
import { DataField } from '@/components/detailView/common/Datafield';
import { colors } from '@/lib/tokens/colors';

const requiredFields: (keyof HoseData)[] = [
  'itemDescription',
  'prodDate',
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
  const { state, dispatch } = useAppContext();
  const { hoseId, rfid, scanMethod } = useLocalSearchParams();
  const router = useRouter();
  const [hoseData, setHoseData] = useState<HoseData | undefined>(() => {
    if (!state.data.hoses) return undefined;
    if (scanMethod === 'RFID' && rfid) {
      return state.data.hoses.find((hose) => hose.RFID === rfid);
    } else if (hoseId) {
      return state.data.hoses.find((hose) => hose.assetId === +hoseId);
    }
    return undefined;
  });

  const handleInputChange = <T extends keyof HoseData>(
    field: T,
    value: HoseData[T],
  ) => {
    setHoseData((prevData) => {
      if (!prevData) {
        return undefined;
      }
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const completeInspection = () => {
    console.log('Complete Inspection:', hoseData);

    router.push('/dashboard');
  };

  const handleCompleteInspection = () => {
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
                  hoseId: hoseData.assetId,
                  startInEditMode: 'true',
                  missingFields: JSON.stringify(missingFields),
                },
              });
            },
            style: 'default',
          },
          {
            text: 'No, skip',
            onPress: completeInspection,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else {
      completeInspection();
    }
  };

  const handleCancel = () => {
    console.log('Cancel Inspection');
    router.back();
  };

  if (!hoseData) {
    return (
      <View style={styles.centeredContainer}>
        <Typography
          name={'navigation'}
          text='Hose not found or not registered.'
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Typography name='navigationBold' text='Inspect hose:' />
        </View>
        <Typography name={'fieldLabel'} text='Inspection#' />
      </View>
      <SingleHoseDisplay item={hoseData} />
      <View style={styles.infoSection}>
        <DataField label='Description:' value={hoseData.itemDescription} />
        <DataField
          label='S1 Plant, Vessel, Unit:'
          value={hoseData.s1PlantVesselUnit ?? ''}
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
          onPress={handleCompleteInspection}
          variant='primary'
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
    backgroundColor: colors.white,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  infoSection: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeInputField,
    marginTop: 15,
    marginBottom: 15,
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
