import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { RadioButton } from '../detailHose/radioButton';
import { RadioGroup } from '../detailHose/radioGroup';

type GeneralInfoProps = {
  generalInfo: GeneralInfo;
  editMode: boolean;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({ generalInfo, editMode }) => {
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
              onChangeText={(text) => onInputChange('Description', text)}
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
            onChange={(value) => handleSelectChange('s1PlantVesselUnit', value)}
            options={[]}
          />

          <SelectField
            label='S2 Equipment:'
            value={generalInfo.S2Equipment}
            onChange={(value) => handleSelectChange('S2Equipment', value)}
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
          <SelectField
            label='Hose Medium/Temperature:'
            value={generalInfo.s1PlantVesselUnit}
            onChange={(value) => handleSelectChange('s1PlantVesselUnit', value)}
            options={[]}
          />
          <View style={styles.inputContainer}>
            <Input
              label='Hose function:'
              value={generalInfo.otherInfo}
              onChangeText={(text) => onInputChange('hoseFunction', text)}
            />
          </View>
          <RadioGroup
            label='Pollution exposure:'
            choices={[
              { id: 'internal', label: 'internal, not exposed' },
              { id: 'exposed', label: 'exposed' },
            ]}
            selected={generalInfo.pollutionExposure}
            onChange={handlePollutionExposureChange}
            type={'horizontal'}
          />
          <RadioGroup
            label='UV exposure:'
            choices={[
              { id: 'internal', label: 'internal, not exposed' },
              { id: 'exposed', label: 'exposed' },
            ]}
            selected={generalInfo.uvExposure}
            onChange={handleUVExposureChange}
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
          <Datafield label='RFID:' value={generalInfo.RFid} />
          <Datafield
            label='Hose Medium/Temperature:'
            value={generalInfo.hoseMediumTemperature}
          />
          <Datafield label='Hose function:' value={generalInfo.hoseFunction} />
          <Datafield
            label='Polution exposure:'
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
