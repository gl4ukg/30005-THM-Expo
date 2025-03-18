import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { RadioGroup } from '../detailHose/radioGroup';
import { GHD } from './types';
import { InputRow } from '../detailHose/inputRow';

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
          <InputRow
            tooltipData={{
              title: 'Description',
              message: 'THis can be used in many ways to describe the hose',
            }}
            components={
              <>
                <Input
                  label={'Description:'}
                  value={generalInfo.description}
                  onChangeText={(text) => onInputChange('description', text)}
                />
              </>
            }
          />

          <InputRow tooltipData={{ title: 'Description', message: '' }}>
            <Input
              label='Customer ID:'
              value={generalInfo.customerId}
              onChangeText={(text) => onInputChange('customerId', text)}
            />
            <Input
              label='Customer ID:'
              value={generalInfo.customerId}
              onChangeText={(text) => onInputChange('customerId', text)}
            />
          </InputRow>
          <InputRow
            tooltipData={{ title: 'S1 Plant, Vessel, Unit', message: '' }}
          >
            <SelectField
              label='S1 Plant, Vessel, Unit:'
              value={generalInfo.s1PlantVesselUnit}
              onChange={(value) =>
                handleSelectChange('s1PlantVesselUnit', value)
              }
              options={[]}
            />
          </InputRow>

          <SelectField
            label='S2 Equipment:'
            value={generalInfo.S2Equipment}
            onChange={(value) => handleSelectChange('S2Equipment', value)}
            options={[]}
          />
          <InputRow>
            <Input
              label='Equipment Subunit:'
              value={generalInfo.equipmentSubunit}
              onChangeText={(text) => onInputChange('equipmentSubunit', text)}
            />
          </InputRow>
          <InputRow
            tooltipData={{ title: 'S1 Plant, Vessel, Unit', message: '' }}
          >
            <Input
              label='Other Info:'
              value={generalInfo.otherInfo}
              onChangeText={(text) => onInputChange('otherInfo', text)}
            />
          </InputRow>
          <SelectField
            label='Hose Medium/Temperature:'
            value={generalInfo.s1PlantVesselUnit}
            onChange={(value) => handleSelectChange('s1PlantVesselUnit', value)}
            options={[]}
          />
          <InputRow>
            <Input
              label='Hose function:'
              value={generalInfo.otherInfo}
              onChangeText={(text) => onInputChange('hoseFunction', text)}
            />
          </InputRow>
          <View style={styles.radioContainer}>
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
          </View>
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
  radioContainer: {
    marginBottom: 20,
    gap: 20,
  },
});

export default GeneralInfo;
