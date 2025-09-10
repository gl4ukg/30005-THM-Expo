import { DataField } from '@/components/detailView/common/Datafield';
import { useAppContext } from '@/context/ContextProvider';
import { GHD } from '@/lib/types/hose';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type GeneralInfoProps = {
  info: Partial<GHD>;
  missingFields?: string[];
};

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ info, missingFields }) => {
  const { state } = useAppContext();
  return (
    <View style={styles.container}>
      <DataField label='RFID:' value={info.RFID} isMissing={missingFields?.includes('RFID')}/>
      <DataField label='Installation date:' value={info.installedDate} isMissing={missingFields?.includes('installedDate')}/>
      <DataField label='Description:' value={info.itemDescription} isMissing={missingFields?.includes('itemDescription')}/>
      <DataField label='Customer ID:' value={info.customerID} isMissing={missingFields?.includes('customerID')}/>
      <DataField
        label='S1 Plant, Vessel, Unit:'
        value={`${state.data.s1Items.find((item) => item.S1Code == info.s1Code)?.S1Name}`}
        isMissing={missingFields?.includes('s1Code')}
      />
      <DataField label='S2 Equipment:' value={info.S2Equipment} isMissing={missingFields?.includes('S2Equipment')}/>
      <DataField label='Equipment Subunit:' value={info.equipmentSubunit} isMissing={missingFields?.includes('equipmentSubunit')}/>
      <DataField label='Other Info:' value={info.otherInfo} isMissing={missingFields?.includes('otherInfo')}/>
      <DataField label='Pollution exposure:' value={info.pollutionExposure} isMissing={missingFields?.includes('pollutionExposure')}/>
      <DataField label='UV exposure:' value={info.uvExposure} isMissing={missingFields?.includes('uvExposure')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 30,
  },
});