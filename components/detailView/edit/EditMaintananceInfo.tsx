import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../UI/Input/input';
import { RadioGroup } from '@/components/detailHose/radioGroup';
import { SelectField } from '@/components/detailHose/SelectField';
import { TooltipWrapper } from '@/components/detailHose/tooltipWrapper';
import { Typography } from '@/components/typography';

type EditMaintananceProps = {
  hoseData: any;
  onInputChange: (field: string, value: string) => void;
};

const EditMaintananceInfo: React.FC<EditMaintananceProps> = ({
  hoseData,
  onInputChange,
}) => {
  const handleApprovalChange = (selectedLabel: string) => {
    onInputChange('approved', selectedLabel);
  };

  return (
    <View style={styles.container}>
      <TooltipWrapper>
        <Input
          label='Inspected By:'
          value={hoseData.inspectedBy}
          onChangeText={(text) => onInputChange('inspectedBy', text)}
          type={'text'}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Condition', message: '' }}>
        <SelectField
          label='Condition:'
          value={hoseData.hoseCondition}
          onChange={(value) => onInputChange('hoseCondition', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper>
        <RadioGroup
          label={'Approved:'}
          choices={[
            { id: 'Yes', label: 'YES' },
            { id: 'No', label: 'NO' },
            { id: 'NotInsepcted', label: 'Not inspected' },
          ]}
          selected={hoseData.approved}
          onChange={handleApprovalChange}
          type={'horizontal'}
        />
      </TooltipWrapper>
      <TooltipWrapper>
        <Input
          label={'Comment:'}
          value={hoseData.comment}
          onChangeText={(text) => onInputChange('comment', text)}
          type='textArea'
        />
      </TooltipWrapper>

      <Typography
        name={'navigationBold'}
        text='Criticality / Intervals'
        style={styles.subTitle}
      />
      <TooltipWrapper>
        <SelectField
          label='Criticality'
          value={hoseData.criticality}
          onChange={(value) => onInputChange('criticality', value)}
          options={[
            { id: 'Not set', label: 'Not set' },
            { id: '1 - None', label: '1 - None' },
            { id: '2 - Very low', label: '2 - Very low' },
            { id: '3 - Low', label: '3 - Low' },
            { id: '4 - Medium', label: '4 - Medium' },
            { id: '5 - High', label: '5 - High' },
            { id: '6 - Very high', label: '6 - Very high' },
          ]}
        />
      </TooltipWrapper>
    </View>
  );
};

export default EditMaintananceInfo;

const styles = StyleSheet.create({
  subTitle: {
    paddingVertical: 20,
  },
  container: {
    padding: 10,
  },
});
