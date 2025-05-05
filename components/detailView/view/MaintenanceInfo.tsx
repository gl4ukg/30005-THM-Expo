import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { HID } from '@/lib/types/hose';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';
type MaintenanceProps = {
  info: Partial<HID>;
};
export const MaintenanceInfo: React.FC<MaintenanceProps> = ({
  info: hoseData,
}) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Maintenance Info' />
      <Typography
        name={'navigationBold'}
        text='Inspection'
        style={styles.subTitle}
      />
      <DataField
        label={'Inspected Date:'}
        value={
          hoseData.inspectedDate
            ? formatDate(new Date(hoseData.inspectedDate))
            : ''
        }
      />
      <DataField label={'Inspected By:'} value={hoseData.inspectedBy} />
      <DataField label={'Condition:'} value={hoseData.hoseCondition} />
      <DataField
        label={'Approved:'}
        value={
          hoseData.approved === undefined
            ? ''
            : hoseData.approved
              ? 'Yes'
              : 'No'
        }
      />
      <DataField label={'Comment:'} value={hoseData.generalComment} />
      <Typography
        name={'navigationBold'}
        text='Criticality / Intervals'
        style={styles.subTitle}
      />
      <DataField
        label={'Hose Production Date:'}
        value={hoseData.prodDate ? formatDate(new Date(hoseData.prodDate)) : ''}
      />
      <DataField label={'Criticality:'} value={hoseData.criticality} />
      <View style={styles.inspectionDetails}>
        <DataField
          label={'Inspection Interval:'}
          value={hoseData.inspectionInterval}
        />
        <DataField
          label={'Next Inspection:'}
          value={
            hoseData.nextInspection
              ? formatDate(new Date(hoseData.nextInspection))
              : ''
          }
        />
        <DataField
          label={'Replacement Interval:'}
          value={hoseData.replacementInterval}
        />
        <DataField
          label={'Replacement Date:'}
          value={
            hoseData.replacementDate
              ? formatDate(new Date(hoseData.replacementDate))
              : ''
          }
        />
      </View>
      <View style={styles.spacing}>
        <DataField label={'Drawing Number:'} value={hoseData.drawingNumber} />
        <DataField label={'Position Number:'} value={hoseData.positionNumber} />
        <DataField
          label={'Customer Article Number:'}
          value={hoseData.customerArticleNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inspectionDetails: {
    borderLeftWidth: 2,
    borderColor: colors.strokeInputField,
    paddingLeft: 18,
    marginTop: 10,
  },
  subTitle: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingBottom: 20,
  },
  spacing: {
    paddingTop: 10,
  },
});
