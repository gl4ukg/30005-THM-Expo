import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { RadioGroup } from '../detailHose/radioGroup';
import { GHD } from './types';

type GeneralInfoProps = {
  generalInfo: GHD;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  generalInfo,
  editMode,
  onInputChange,
}) => {
  const handleSelectChange = (field: string, value: string) => {
    onInputChange(field, value);
  };

  const handlePollutionExposureChange = (selectedLabel: string) => {
    onInputChange('pollutionExposure', selectedLabel);
  };

  const handleUVExposureChange = (selectedLabel: string) => {
    onInputChange('uvExposure', selectedLabel);
  };

  return (
    <View style={styles.container}>
      {editMode ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
      <Datafield label='RFID:' value={generalInfo.RFid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default GeneralInfo;
