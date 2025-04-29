import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { RadioGroup } from '@/components/detailView/common/RadioGroup';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { colors } from '@/lib/tokens/colors';
import { EditProps } from '@/lib/types/edit';
import { HID } from '@/lib/types/hose';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';
import { HoseData } from '@/lib/types/hose'; // Import HoseData if needed for casting

export const EditMaintenanceInfo: React.FC<
  // Adjust EditProps to accept the parent's onInputChange signature
  {
    info: Partial<HID>;
    onInputChange: (field: keyof HoseData, value: any) => void;
  } & { isInspect?: boolean }
> = ({ info, onInputChange, isInspect }) => {
  // Map boolean 'approved' state to string ID for RadioGroup
  const getSelectedApprovalId = (approved: boolean | undefined): string => {
    if (approved === true) return 'Yes';
    if (approved === false) return 'No';
    return 'NotInsepcted'; // Default if undefined
  };

  // Map string ID from RadioGroup back to boolean for onInputChange
  const handleApprovalChange = (selectedId: string) => {
    let approvalValue: boolean | undefined;
    if (selectedId === 'Yes') {
      approvalValue = true;
    } else if (selectedId === 'No') {
      approvalValue = false;
    } else {
      // Decide how 'NotInsepcted' maps back. Often false or undefined.
      // Let's use undefined for now, assuming it means not explicitly approved/disapproved.
      approvalValue = undefined;
    }
    // Call parent's onInputChange with the correct boolean type
    onInputChange('approved', approvalValue);
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Maintenance Info' />
      <TooltipWrapper>
        <Input
          label='Inspected By:'
          value={info.inspectedBy || ''}
          onChangeText={(text) => onInputChange('inspectedBy', text)}
          type={'text'}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Condition', message: '' }}>
        <Select
          label='Condition:'
          selectedOption={info.hoseCondition || ''}
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
          // Pass the mapped string ID based on the boolean value
          selected={getSelectedApprovalId(info.approved)}
          onChange={handleApprovalChange} // This now handles the mapping back
          type={'horizontal'}
        />
      </TooltipWrapper>
      <TooltipWrapper>
        <Input
          label={'Comment:'}
          // Use generalComment instead of comment
          value={info.generalComment || ''}
          // Pass 'generalComment' to onInputChange
          onChangeText={(text) => onInputChange('generalComment', text)}
          type='textArea'
        />
      </TooltipWrapper>

      <Typography
        name={'navigationBold'}
        text='Criticality / Intervals'
        style={styles.subTitle}
      />

      {isInspect ? (
        <>
          {/* Ensure criticality is displayed correctly (might be number or string) */}
          <DataField
            label={'Criticality:'}
            value={String(info.criticality ?? '')}
          />
          <View style={styles.inspectionDetails}>
            <DataField
              label={'Inspection Interval:'}
              value={info.inspectionInterval ?? ''} // Add nullish coalescing
            />
            <DataField
              label={'Next Inspection:'}
              value={
                info.nextInspection
                  ? formatDate(new Date(info.nextInspection))
                  : ''
              }
            />
            <DataField
              label={'Replacement Interval:'}
              value={info.replacementInterval ?? ''} // Add nullish coalescing
            />
            <DataField
              label={'Replacement Date:'}
              value={
                info.replacementDate
                  ? formatDate(new Date(info.replacementDate))
                  : ''
              }
            />
          </View>
        </>
      ) : (
        <TooltipWrapper>
          <Select
            label='Criticality'
            // Ensure selectedOption handles number or string
            selectedOption={String(info.criticality ?? '')}
            onChange={(value) => onInputChange('criticality', value)}
            options={[
              // Consider if options should be just numbers or strings like '3 - Low'
              '1 - None',
              '2 - Very low',
              '3 - Low',
              '4 - Medium',
              '5 - High',
              '6 - Very high',
            ]}
          />
          <View style={styles.inspectionDetails}>
            <DataField
              label={'Inspection Interval:'}
              value={info.inspectionInterval ?? ''} // Add nullish coalescing
            />
            <DataField
              label={'Next Inspection:'}
              // Add check for info.nextInspection before creating Date
              value={
                info.nextInspection
                  ? formatDate(new Date(info.nextInspection))
                  : ''
              }
            />
            <DataField
              label={'Replacement Interval:'}
              value={info.replacementInterval ?? ''} // Add nullish coalescing
            />
            <DataField
              label={'Replacement Date:'}
              value={
                info.replacementDate
                  ? formatDate(new Date(info.replacementDate))
                  : ''
              }
            />
          </View>
        </TooltipWrapper>
      )}
      <TooltipWrapper
        tooltipData={{ title: 'Drawing Number', message: '' }} // Updated tooltip title
      >
        <Input
          label={'Drawing Number:'}
          value={info.drawingNumber ?? ''} // Add nullish coalescing
          onChangeText={(text) => onInputChange('drawingNumber', text)}
          type='text'
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Position Number', message: '' }} // Updated tooltip title
      >
        <Input
          label={'Position Number:'}
          value={info.positionNumber ?? ''} // Add nullish coalescing
          onChangeText={(text) => onInputChange('positionNumber', text)}
          type='text'
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Customer Article Number', message: '' }} // Updated tooltip title
      >
        <Input
          label={'Customer Article Number:'}
          value={info.customerArticleNumber ?? ''} // Add nullish coalescing
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
