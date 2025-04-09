import React from 'react';
import { View } from 'react-native';
import Datafield from './Datafield';
import { GHD } from './types';

type GeneralInfoProps = {
  info: GHD;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({ info }) => {
  return (
    <View>
      <Datafield label='RFID:' value={info.RFid} />
      <Datafield label='Installation date:' value={info.installationDate} />
      <Datafield label='Description:' value={info.description} />
      <Datafield label='Customer ID:' value={info.customerId} />
      <Datafield
        label='S1 Plant, Vessel, Unit:'
        value={info.s1PlantVesselUnit}
      />
      <Datafield label='S2 Equipment:' value={info.S2Equipment} />
      <Datafield label='Equipment Subunit:' value={info.equipmentSubunit} />
      <Datafield label='Other Info:' value={info.otherInfo} />
      <Datafield label='Pollution exposure:' value={info.pollutionExposure} />
      <Datafield label='UV exposure:' value={info.uvExposure} />
    </View>
  );
};

export default GeneralInfo;
