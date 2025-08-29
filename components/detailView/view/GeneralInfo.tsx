import { DataField } from '@/components/detailView/common/Datafield';
import { useAppContext } from '@/context/ContextProvider';
import { GHD } from '@/lib/types/hose';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type GeneralInfoProps = {
  info: Partial<GHD>;
};

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ info }) => {
  const { state } = useAppContext();
  return (
    <View style={styles.container}>
      <DataField label='RFID:' value={info.RFID} />
      <DataField label='Installation date:' value={info.installedDate} />
      <DataField label='Description:' value={info.itemDescription} />
      <DataField label='Customer ID:' value={info.customerID} />
      <DataField
        label='S1 Plant, Vessel, Unit:'
        value={`${state.data.s1Items.find((item) => item.S1Code == info.s1Code)?.S1Name}`}
      />
      <DataField label='S2 Equipment:' value={info.S2Equipment} />
      <DataField label='Equipment Subunit:' value={info.equipmentSubunit} />
      <DataField label='Other Info:' value={info.otherInfo} />
      <DataField label='Pollution exposure:' value={info.pollutionExposure} />
      <DataField label='UV exposure:' value={info.uvExposure} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 30,
  },
});
