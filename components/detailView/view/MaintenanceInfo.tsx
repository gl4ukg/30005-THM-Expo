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
      <View style={styles.section}>
        <Typography name={'navigationBold'} text='Inspection' />
        <DataField
          label={'Inspected Date:'}
          value={
            hoseData.inspectedDate
              ? formatDate(new Date(hoseData.inspectedDate))
              : ''
          }
        />
        <DataField label={'Inspected By:'} value={hoseData.inspector} />
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
      </View>
      <View style={styles.section}>
        <Typography name={'navigationBold'} text='Criticality / Intervals' />
        <DataField
          label={'Hose Production Date:'}
          value={
            hoseData.prodDate ? formatDate(new Date(hoseData.prodDate)) : ''
          }
        />
        <DataField label={'Criticality:'} value={hoseData.criticality} />
      </View>

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
      <View style={styles.section}>
        <DataField label={'Drawing number:'} value={hoseData.drawingNumber} />
        <DataField
          label={'Drawing position number:'}
          value={hoseData.posNumber}
        />
        <DataField
          label={'Drawing Article Number:'}
          value={hoseData.artNumber}
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
  },
  container: {
    gap: 20,
    marginBottom: 30,
  },
  section: {
    gap: 10,
  },
  // inputContainer: {
  //   paddingBottom: 20,
  // },
  // spacing: {
  //   paddingTop: 10,
  // },
});
