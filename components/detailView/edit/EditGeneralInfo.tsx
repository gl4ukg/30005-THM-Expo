import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../UI/Input/input';
import { SelectField } from '../../detailHose/SelectField';
import { RadioGroup } from '../../detailHose/radioGroup';
import { GHD } from '../types';

type EditGeneralInfoProps = {
  generalInfo: GHD;
  onInputChange: (field: string, value: string) => void;
};

const EditGeneralInfo: React.FC<EditGeneralInfoProps> = ({
  generalInfo,
  onInputChange,
}) => (
  <View>
    <View style={styles.inputContainer}>
      <Input
        label='Description:'
        value={generalInfo.description}
        onChangeText={(text) => onInputChange('description', text)}
      />
    </View>
    <View style={styles.inputContainer}>
      <Input
        label='Customer ID:'
        value={generalInfo.customerId}
        onChangeText={(text) => onInputChange('customerId', text)}
      />
    </View>
    <SelectField
      label='S1 Plant, Vessel, Unit:'
      value={generalInfo.s1PlantVesselUnit}
      onChange={(value) => onInputChange('s1PlantVesselUnit', value)}
      options={[]}
    />
    <SelectField
      label='S2 Equipment:'
      value={generalInfo.S2Equipment}
      onChange={(value) => onInputChange('S2Equipment', value)}
      options={[]}
    />
    <View style={styles.inputContainer}>
      <Input
        label='Equipment Subunit:'
        value={generalInfo.equipmentSubunit}
        onChangeText={(text) => onInputChange('equipmentSubunit', text)}
      />
    </View>
    <View style={styles.inputContainer}>
      <Input
        label='Other Info:'
        value={generalInfo.otherInfo}
        onChangeText={(text) => onInputChange('otherInfo', text)}
      />
    </View>
    <RadioGroup
      label='Pollution exposure:'
      choices={[
        { id: 'internal', label: 'internal, not exposed' },
        { id: 'exposed', label: 'exposed' },
      ]}
      selected={generalInfo.pollutionExposure}
      onChange={(value) => onInputChange('pollutionExposure', value)}
      type={'horizontal'}
    />
    <RadioGroup
      label='UV exposure:'
      choices={[
        { id: 'internal', label: 'internal, not exposed' },
        { id: 'exposed', label: 'exposed' },
      ]}
      selected={generalInfo.uvExposure}
      onChange={(value) => onInputChange('uvExposure', value)}
      type={'horizontal'}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
});

export default EditGeneralInfo;
