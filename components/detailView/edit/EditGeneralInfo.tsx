import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../UI/Input/input';
import { SelectField } from '../../detailHose/SelectField';
import { RadioGroup } from '../../detailHose/radioGroup';
import { GHD } from '../types';
import { TooltipWrapper } from '@/components/detailHose/tooltipWrapper';
import { DateInput } from '@/components/UI/Input/DateInput';
import { RFIDInput } from '@/components/UI/Input/RFID';
import { EditProps } from '@/components/detailView/edit/edit';

const EditGeneralInfo: React.FC<
  EditProps<GHD> & { isRegisterView?: boolean }
> = ({ info, onInputChange, isRegisterView }) => {
  const [rfid, setRfid] = useState<string>('');
  const [localState, setLocalState] = useState(info);

  const handleRFIDScanned = (newRfid: string | null) => {
    if (newRfid) {
      setRfid(newRfid);
      setLocalState((prevState) => ({
        ...prevState,
        id: newRfid,
      }));
    }
  };

  return (
    <View style={styles.container}>
      {!isRegisterView && (
        <>
          <TooltipWrapper
            tooltipData={{ title: 'RFID', message: 'This is the RFID' }}
          >
            <RFIDInput label='RFID' onRFIDScanned={handleRFIDScanned} />
          </TooltipWrapper>
          <TooltipWrapper
            tooltipData={{
              title: 'Installation date',
              message: 'This is the installation date',
            }}
          >
            <DateInput
              label='Installation date'
              value={new Date(localState.installationDate)}
              onChange={(date) =>
                onInputChange('installationDate', date.toString())
              }
            />
          </TooltipWrapper>
        </>
      )}
      <TooltipWrapper
        tooltipData={{
          title: 'description',
          message: 'This is the description',
        }}
      >
        <Input
          label='Description:'
          value={info.description}
          errorMessage='This is the error message'
          onChangeText={(text) => onInputChange('description', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'Customer ID',
          message: 'This is the customer ID',
        }}
      >
        <Input
          label='Customer ID:'
          errorMessage='This is the error message'
          value={info.customerId}
          onChangeText={(text) => onInputChange('customerId', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Location', message: 'This is the location' }}
      >
        <SelectField
          label='S1 Plant, Vessel, Unit:'
          value={info.s1PlantVesselUnit}
          onChange={(value) => onInputChange('s1PlantVesselUnit', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 's2 equipment',
          message: 'This is the s2 equipment',
        }}
      >
        <SelectField
          label='S2 Equipment:'
          value={info.S2Equipment}
          onChange={(value) => onInputChange('S2Equipment', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Equipment', message: 'This is the equipment' }}
      >
        <Input
          label='Equipment Subunit:'
          value={info.equipmentSubunit}
          onChangeText={(text) => onInputChange('equipmentSubunit', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'Other Info',
          message: 'This is the other info',
        }}
      >
        <Input
          label='Other Info:'
          value={info.otherInfo}
          onChangeText={(text) => onInputChange('otherInfo', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'pollution exposure',
          message: 'This is the pollution exposure',
        }}
      >
        <RadioGroup
          label='Pollution exposure:'
          choices={[
            { id: 'internal', label: 'internal, not exposed' },
            { id: 'exposed', label: 'exposed' },
          ]}
          selected={info.pollutionExposure}
          onChange={(value) => onInputChange('pollutionExposure', value)}
          type={'horizontal'}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'UV exposure',
          message: 'This is the UV exposure',
        }}
      >
        <RadioGroup
          label='UV exposure:'
          choices={[
            { id: 'internal', label: 'internal, not exposed' },
            { id: 'exposed', label: 'exposed' },
          ]}
          selected={info.uvExposure}
          onChange={(value) => onInputChange('uvExposure', value)}
          type={'horizontal'}
        />
      </TooltipWrapper>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});

export default EditGeneralInfo;
