import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { GHD } from './types';
import { formatDate } from '@/lib/util/formatDate';

type GeneralInfoProps = {
  generalInfo: GHD;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({ generalInfo }) => {
  return (
    <View>
      <Datafield label='RFID:' value={generalInfo.RFid} />
      <Datafield
        label='Installation date:'
        value={formatDate(generalInfo.installationDate)}
      />

      <Datafield label='Description:' value={generalInfo.description} />
      <Datafield label='Customer ID:' value={generalInfo.customerId} />
      <Datafield
        label='S1 Plant, Vessel, Unit:'
        value={generalInfo.s1PlantVesselUnit}
      />
      <Datafield label='S2 Equipment:' value={generalInfo.S2Equipment} />
      <Datafield
        label='Equipment Subunit:'
        value={generalInfo.equipmentSubunit}
      />
      <Datafield label='Other Info:' value={generalInfo.otherInfo} />
      <Datafield
        label='Pollution exposure:'
        value={generalInfo.pollutionExposure}
      />
      <Datafield label='UV exposure:' value={generalInfo.uvExposure} />
    </View>
  );
};

export default GeneralInfo;
