import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { RadioButton } from '../detailHose/radioButton';
import { RadioGroup } from '../detailHose/radioGroup';

type GeneralInfoProps = {
  description: string;
  customerId: string;
  s1PlantVesselUnit: string;
  S2Equipment: string;
  equipmentSubunit: string;
  otherInfo: string;
  RFid: string;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
  pollutionExposure: string;
  uvExposure: string;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  description,
  customerId,
  s1PlantVesselUnit,
  S2Equipment,
  equipmentSubunit,
  otherInfo,
  RFid,
  editMode,
  onInputChange,
  pollutionExposure,
  uvExposure,
}) => {
  const handleSelectChange = (field: string, value: string) => {
    onInputChange(field, value);
  };

  const handlePollutionExposureChange = (selectedId: string) => {
    onInputChange('pollutionExposure', selectedId);
  };

  const handleUVExposureChange = (selectedId: string) => {
    onInputChange('uvExposure', selectedId);
  };

  return (
    <View style={styles.container}>
      {editMode ? (
        <>
          <View style={styles.inputContainer}>
            <Input
              label='Description:'
              value={description}
              onChangeText={(text) => onInputChange('Description', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label='Customer ID:'
              value={customerId}
              onChangeText={(text) => onInputChange('customerId', text)}
            />
          </View>
          <SelectField
            label='S1 Plant, Vessel, Unit:'
            value={s1PlantVesselUnit}
            onChange={(value) => handleSelectChange('s1PlantVesselUnit', value)}
            options={[]}
          />

          <SelectField
            label='S2 Equipment:'
            value={S2Equipment}
            onChange={(value) => handleSelectChange('S2Equipment', value)}
            options={[]}
          />

          <View style={styles.inputContainer}>
            <Input
              label='Equipment Subunit:'
              value={equipmentSubunit}
              onChangeText={(text) => onInputChange('equipmentSubunit', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label='Other Info:'
              value={otherInfo}
              onChangeText={(text) => onInputChange('otherInfo', text)}
            />
          </View>
          <SelectField
            label='Hose Medium/Temperature:'
            value={s1PlantVesselUnit}
            onChange={(value) => handleSelectChange('s1PlantVesselUnit', value)}
            options={[]}
          />
          <View style={styles.inputContainer}>
            <Input
              label='Hose function:'
              value={otherInfo}
              onChangeText={(text) => onInputChange('hoseFunction', text)}
            />
          </View>
          <RadioGroup
            label='Pollution exposure:'
            choices={[
              { id: 'internal', label: 'internal, not exposed' },
              { id: 'exposed', label: 'exposed' },
            ]}
            selected={pollutionExposure}
            onChange={handlePollutionExposureChange}
            type={'horizontal'}
          />
          <RadioGroup
            label='UV exposure:'
            choices={[
              { id: 'internal', label: 'internal, not exposed' },
              { id: 'exposed', label: 'exposed' },
            ]}
            selected={uvExposure}
            onChange={handleUVExposureChange}
            type={'horizontal'}
          />
        </>
      ) : (
        <>
          <Datafield label='Description:' value={description} />
          <Datafield label='Customer ID:' value={customerId} />
          <Datafield
            label='S1 Plant, Vessel, Unit:'
            value={s1PlantVesselUnit}
          />
          <Datafield label='S2 Equipment:' value={S2Equipment} />
          <Datafield label='Equipment Subunit:' value={equipmentSubunit} />
          <Datafield label='Other Info:' value={otherInfo} />
          <Datafield label='RFID:' value={RFid} />
          <Datafield label='Hose Medium/Temperature:' value={''} />
          <Datafield label='Hose function:' value={''} />
          <Datafield label='Polution exposure:' value={''} />
          <Datafield label='UV exposure:' value={''} />
        </>
      )}
      <Datafield label='RFID:' value={RFid} />
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
