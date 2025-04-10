import React from 'react';
import { View } from 'react-native';
import { DataField } from '../common/Datafield';
import { GHD } from '../types';

type GeneralInfoProps = {
  info: GHD;
};

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ info }) => {
  return (
    <View>
      <DataField label='RFID:' value={info.RFid} />
      <DataField label='Installation date:' value={info.installationDate} />
      <DataField label='Description:' value={info.description} />
      <DataField label='Customer ID:' value={info.customerId} />
      <DataField
        label='S1 Plant, Vessel, Unit:'
        value={info.s1PlantVesselUnit}
      />
      <DataField label='S2 Equipment:' value={info.S2Equipment} />
      <DataField label='Equipment Subunit:' value={info.equipmentSubunit} />
      <DataField label='Other Info:' value={info.otherInfo} />
      <DataField label='Pollution exposure:' value={info.pollutionExposure} />
      <DataField label='UV exposure:' value={info.uvExposure} />
    </View>
  );
};
