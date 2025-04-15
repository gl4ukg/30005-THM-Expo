import { Bookmark } from '@/components/detailView/common/Bookmark';
import { RadioGroup } from '@/components/detailView/common/RadioGroup';
import { SelectField } from '@/components/detailView/common/SelectField';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { EditProps } from '@/lib/types/edit';
import { HID } from '@/lib/types/hose';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../UI/Input/Input';
import { DataField } from '../common/Datafield';

export const EditMaintenanceInfo: React.FC<EditProps<HID>> = ({
  info,
  onInputChange,
}) => {
  const handleApprovalChange = (selectedLabel: string) => {
    onInputChange('approved', selectedLabel);
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Maintenance Info' />
      <TooltipWrapper>
        <Input
          label='Inspected By:'
          value={info.inspectedBy}
          onChangeText={(text) => onInputChange('inspectedBy', text)}
          type={'text'}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Condition', message: '' }}>
        <SelectField
          label='Condition:'
          value={info.hoseCondition}
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
          selected={info.approved}
          onChange={handleApprovalChange}
          type={'horizontal'}
        />
      </TooltipWrapper>
      <TooltipWrapper>
        <Input
          label={'Comment:'}
          value={info.comment}
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
          value={info.criticality}
          onChange={(value) => onInputChange('criticality', value)}
          options={[
            { id: '0 - None', label: '1 - None' },
            { id: '1 - Very low', label: '2 - Very low' },
            { id: '2 - Low', label: '3 - Low' },
            { id: '3 - Medium', label: '4 - Medium' },
            { id: '4 - High', label: '5 - High' },
            { id: '5 - Very high', label: '6 - Very high' },
          ]}
        />
        <View style={styles.inspectionDetails}>
          <DataField
            label={'Inspection Interval:'}
            value={info.inspectionInterval}
          />
          <DataField
            label={'Next Inspection:'}
            value={formatDate(new Date(info.nextInspection))}
          />
          <DataField
            label={'Replacement Interval:'}
            value={info.replacementInterval}
          />
          <DataField
            label={'Replacement Date:'}
            value={formatDate(new Date(info.replacementDate))}
          />
        </View>
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Inspection Interval', message: '' }}
      >
        <Input
          label={'Drawing Number:'}
          value={info.drawingNumber}
          onChangeText={(text) => onInputChange('drawingNumber', text)}
          type='text'
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Inspection Interval', message: '' }}
      >
        <Input
          label={'Position Number:'}
          value={info.positionNumber}
          onChangeText={(text) => onInputChange('positionNumber', text)}
          type='text'
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Inspection Interval', message: '' }}
      >
        <Input
          label={'Customer Article Number:'}
          value={info.customerArticleNumber}
          onChangeText={(text) => onInputChange('customerArticleNumber', text)}
          type='text'
        />
      </TooltipWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  inspectionDetails: {
    borderLeftWidth: 2,
    borderColor: colors.strokeInputField,
    paddingLeft: 18,
    marginTop: 10,
    paddingBottom: 10,
  },
});
