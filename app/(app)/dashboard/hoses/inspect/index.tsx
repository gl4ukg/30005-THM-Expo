import { Photos } from '@/components/detailView/common/Photos';
import { EditMaintenanceInfo } from '@/components/detailView/edit/EditMaintenanceInfo';
import { ListTable } from '@/components/dashboard/listTable';
import { Typography } from '@/components/Typography';
import { HoseData } from '@/lib/types/hose';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ButtonTHS } from '@/components/UI';
import { useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/context/ContextProvider';

export const InspectHose = () => {
  const { state, dispatch } = useAppContext();
  const { hoseId, rfid, scanMethod } = useLocalSearchParams();
  const [hoseData, setHoseData] = useState(() => {
    if (scanMethod === 'rfid') {
      return state.data.hoses.find((hose) => hose.RFid === rfid);
    } else {
      return state.data.hoses.find((hose) => hose.id === hoseId);
    }
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

  const handleCompleteInspection = () => {
    console.log('Complete Inspection:', hoseData);
  };

  const handleSaveDraft = () => {
    console.log('Save Draft:', hoseData);
  };

  const handleCancel = () => {
    console.log('Cancel Inspection');
  };

  if (!hoseData) {
    return <Typography name={'navigation'}>Hose is not registered.</Typography>;
  }

  return (
    <ScrollView style={styles.container}>
      <ListTable items={[hoseData]} selectedIds={[]} canSelect={false} />

      <View style={styles.infoSection}>
        <Typography name='fieldLabel'>Description:</Typography>
        <Typography name='fieldValue'>{hoseData.description}</Typography>
        <Typography name='fieldLabel' style={styles.fieldMargin}>
          S1 Plant, Vessel, Unit:
        </Typography>
        <Typography name='fieldValue'>{hoseData.s1PlantVesselUnit}</Typography>
        <Typography name='fieldLabel' style={styles.fieldMargin}>
          S2 Equipment:
        </Typography>
        <Typography name='fieldValue'>{hoseData.S2Equipment}</Typography>
        <Typography name='fieldLabel' style={styles.fieldMargin}>
          Equipment Subunit:
        </Typography>
        <Typography name='fieldValue'>{hoseData.equipmentSubunit}</Typography>
        <Typography name='fieldLabel' style={styles.fieldMargin}>
          Other Info:
        </Typography>
        <Typography name='fieldValue'>{hoseData.otherInfo}</Typography>
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
          title='Save as Draft'
          onPress={handleSaveDraft}
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
  container: {
    flex: 1,
    padding: 10,
  },
  infoSection: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

export default InspectHose;
