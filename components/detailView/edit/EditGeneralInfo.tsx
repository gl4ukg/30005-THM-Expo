import { DateInput } from '@/components/UI/Input/DateInput';
import { Input } from '@/components/UI/Input/Input';
import { RFIDInput } from '@/components/UI/Input/RFID';
import { Select } from '@/components/UI/SelectModal/Select';
import { RadioGroup } from '@/components/detailView/common/RadioGroup';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { GHD } from '@/lib/types/hose';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const EditGeneralInfo: React.FC<{
  info: Partial<GHD>;
  onInputChange: (
    field: keyof Partial<GHD>,
    value: Partial<GHD>[keyof Partial<GHD>],
  ) => void;
  isRegisterView?: boolean;
}> = ({ info, onInputChange, isRegisterView }) => {
  const [rfid, setRfid] = useState<string>('');

  const handleRFIDScanned = (newRfid: string | null) => {
    if (newRfid) {
      setRfid(newRfid);
      onInputChange('RFid', newRfid);
    }
  };

  const parseDate = (dateValue: any): Date | null => {
    if (!dateValue) return null;
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? null : date;
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
              value={parseDate(info.installedDate)}
              onChange={(date) => onInputChange('installedDate', String(date))}
              required
            />
          </TooltipWrapper>
        </>
      )}
      <TooltipWrapper
        tooltipData={{
          title: 'Customer ID',
          message: 'This is the customer ID',
        }}
      >
        <Input
          label='Customer ID:'
          value={info.customerID ?? ''}
          onChangeText={(text) => onInputChange('customerID', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Location', message: 'This is the location' }}
      >
        <Select
          label='S1 Plant, Vessel, Unit:'
          selectedOption={null}
          onChange={(option) => onInputChange('s1PlantVesselUnit', option)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 's2 equipment',
          message: 'This is the s2 equipment',
        }}
      >
        <Select
          label='S2 Equipment:'
          selectedOption={info.S2Equipment ?? null}
          onChange={(value) => onInputChange('S2Equipment', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Equipment', message: 'This is the equipment' }}
      >
        <Input
          label='Equipment Subunit:'
          value={info.equipmentSubunit ?? ''}
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
          value={info.otherInfo ?? ''}
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
          selected={info.pollutionExposure ?? 'internal'}
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
          selected={info.uvExposure ?? null}
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
