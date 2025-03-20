import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { RadioGroup } from '../detailHose/radioGroup';
import { GHD } from './types';
import { TooltipWrapper } from '../detailHose/tooltipWrapper';

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
          <TooltipWrapper
            tooltipData={{
              title: 'Description',
              message: 'This can be used in many ways to describe the hose',
            }}
          >
            <Input
              label={'Description:'}
              value={generalInfo.description}
              onChangeText={(text) => onInputChange('description', text)}
            />
          </TooltipWrapper>
          <TooltipWrapper tooltipData={{ title: 'CustomerID', message: '' }}>
            <Input
              label='Customer ID:'
              value={generalInfo.customerId}
              onChangeText={(text) => onInputChange('customerId', text)}
            />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'S1 Plant, Vessel, Unit',
              message: 'A grouping',
            }}
          >
            <SelectField
              label='S1 Plant, Vessel, Unit:'
              value={generalInfo.s1PlantVesselUnit}
              onChange={(value) =>
                handleSelectChange('s1PlantVesselUnit', value)
              }
              options={[]}
            />
          </TooltipWrapper>

          <TooltipWrapper
            tooltipData={{ title: 'S2 Equipment', message: 'component' }}
          >
            <SelectField
              label='S2 Equipment:'
              value={generalInfo.S2Equipment}
              onChange={(value) => handleSelectChange('S2Equipment', value)}
              options={[]}
            />
          </TooltipWrapper>
          <TooltipWrapper>
            <Input
              label='Equipment Subunit:'
              value={generalInfo.equipmentSubunit}
              onChangeText={(text) => onInputChange('equipmentSubunit', text)}
            />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{ title: 'Other information', message: '' }}
          >
            <Input
              label='Other Info:'
              value={generalInfo.otherInfo}
              onChangeText={(text) => onInputChange('otherInfo', text)}
            />
          </TooltipWrapper>
          <TooltipWrapper>
            <SelectField
              label='Hose Medium/Temperature:'
              value={generalInfo.s1PlantVesselUnit}
              onChange={(value) =>
                handleSelectChange('s1PlantVesselUnit', value)
              }
              options={[]}
            />
          </TooltipWrapper>

          <TooltipWrapper>
            <Input
              label='Hose function:'
              value={generalInfo.hoseFunction}
              onChangeText={(text) => onInputChange('hoseFunction', text)}
            />
          </TooltipWrapper>
          <TooltipWrapper>
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
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'UV exposure',
              message: 'Is it exposed to the sun?',
            }}
          >
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
          </TooltipWrapper>
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
});

export default GeneralInfo;
