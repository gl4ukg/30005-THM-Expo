import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { RadioGroup } from '@/components/detailView/common/RadioGroup';
import { options } from '@/components/detailView/edit/fakeOptions';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';

export const EditMaintenanceInfo: React.FC<
  {
    info: HoseData;
    onInputChange: (
      field: keyof HoseData,
      value: HoseData[keyof HoseData],
    ) => void;
  } & { isInspect?: boolean }
> = ({ info, onInputChange, isInspect }) => {
  const getSelectedApprovalId = (
    approved: boolean | undefined,
  ): 'Yes' | 'No' | 'NotInspected' => {
    if (approved === true) return 'Yes';
    if (approved === false) return 'No';
    return 'NotInspected';
  };

  const handleApprovalChange = (selectedId: string) => {
    let approvalValue: boolean;
    if (selectedId === 'Yes') {
      approvalValue = true;
    } else {
      approvalValue = false;
    }

    onInputChange('approved', approvalValue);
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Maintenance Info' />
      <View style={styles.section}>
        <TooltipWrapper>
          <Input
            label='Inspected By:'
            value={info.inspector || ''}
            onChangeText={(text) => onInputChange('inspector', text)}
            type={'text'}
          />
        </TooltipWrapper>
        <TooltipWrapper tooltipData={{ title: 'Condition', message: '' }}>
          <Select
            label='Condition:'
            selectedOption={info.hoseCondition || ''}
            onChange={(value) => onInputChange('hoseCondition', value)}
            options={options}
          />
        </TooltipWrapper>
        <TooltipWrapper>
          <RadioGroup
            label={'Approved:'}
            choices={[
              { id: 'Yes', label: 'YES' },
              { id: 'No', label: 'NO' },
              { id: 'NotInspected', label: 'Not inspected' },
            ]}
            selected={getSelectedApprovalId(info.approved)}
            onChange={handleApprovalChange}
            type={'horizontal'}
          />
        </TooltipWrapper>
        <TooltipWrapper>
          <Input
            label={'Comment:'}
            value={info.generalComment || ''}
            onChangeText={(text) => onInputChange('generalComment', text)}
            type='textArea'
          />
        </TooltipWrapper>
      </View>
      <View style={styles.section}>
        <Typography
          name={'navigationBold'}
          text='Criticality / Intervals'
          style={styles.subTitle}
        />
        {isInspect ? (
          <>
            <DataField
              label={'Criticality:'}
              value={String(info.criticality ?? '')}
            />
            <View style={styles.inspectionDetails}>
              <DataField
                label={'Inspection Interval:'}
                value={info.inspectionInterval ?? ''}
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
                value={info.replacementInterval ?? ''}
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
          <>
            <TooltipWrapper tooltipData={{ title: 'Criticality', message: '' }}>
              <Select
                label='Criticality'
                selectedOption={String(info.criticality ?? '')}
                onChange={(value) => onInputChange('criticality', value)}
                options={[
                  '1 - None',
                  '2 - Very low',
                  '3 - Low',
                  '4 - Medium',
                  '5 - High',
                  '6 - Very high',
                ]}
                required
              />
            </TooltipWrapper>

            <View style={styles.inspectionDetails}>
              <DataField
                label={'Inspection Interval:'}
                value={info.inspectionInterval ?? ''}
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
                value={info.replacementInterval ?? ''}
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
        )}
      </View>
      <View style={styles.section}>
        <TooltipWrapper tooltipData={{ title: 'Drawing Number', message: '' }}>
          <Input
            label={'Drawing Number:'}
            value={info.drawingNumber ?? ''}
            onChangeText={(text) => onInputChange('drawingNumber', text)}
            type='text'
          />
        </TooltipWrapper>
        <TooltipWrapper
          tooltipData={{ title: 'Drawing position number', message: '' }}
        >
          <Input
            label={'Drawing position number:'}
            value={info.posNumber ?? ''}
            onChangeText={(text) => onInputChange('posNumber', text)}
            type='text'
          />
        </TooltipWrapper>
        <TooltipWrapper
          tooltipData={{ title: 'Drawing article number', message: '' }}
        >
          <Input
            label={'Drawing article number:'}
            value={info.artNumber ?? ''}
            onChangeText={(text) => onInputChange('artNumber', text)}
            type='text'
          />
        </TooltipWrapper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitle: {},
  container: {
    flex: 1,
    gap: 20,
  },
  section: {
    gap: 20,
  },
  inspectionDetails: {
    borderLeftWidth: 2,
    borderColor: colors.strokeInputField,
    paddingLeft: 18,
    marginTop: 10,
    paddingBottom: 10,
  },
});
