import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';

type GeneralInfoProps = {
  description: string;
  customerId: string;
  s1PlantVesselUnit: string;
  S2Equipment: string;
  equipmentSubunit: string;
  otherInfo: string;
  RFid: string;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  description,
  customerId,
  s1PlantVesselUnit,
  S2Equipment,
  equipmentSubunit,
  otherInfo,
  RFid,
}) => {
  return (
    <View style={styles.container}>
      <Datafield label='Description:' value={description} />
      <Datafield label='Customer ID:' value={customerId} />
      <Datafield label='S1 Plant, Vessel, Unit:' value={s1PlantVesselUnit} />
      <Datafield label='S2 Equipment:' value={S2Equipment} />
      <Datafield label='Equipment Subunit:' value={equipmentSubunit} />
      <Datafield label='Other Info:' value={otherInfo} />
      <Datafield label='RFID:' value={RFid} />
      <Datafield label='Hose Medium/Temperature:' value={''} />
      <Datafield label='Hose function:' value={''} />
      <Datafield label='Polution exposure:' value={''} />
      <Datafield label='UV exposure:' value={''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default GeneralInfo;
