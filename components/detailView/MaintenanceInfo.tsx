import { colors } from '@/lib/tokens/colors';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../typography';
import { Bookmark } from './common/Bookmark';
import { DataField } from './common/Datafield';
import { HID } from './types';

type MaintenanceProps = {
  info: HID;
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
        value={formatDate(new Date(hoseData.inspectedDate))}
      />
      <DataField label={'Inspected By:'} value={hoseData.inspectedBy} />
      <DataField label={'Condition:'} value={hoseData.hoseCondition} />
      <DataField label={'Approved:'} value={hoseData.approved} />
      <DataField label={'Comment:'} value={hoseData.comment} />
      <Typography
        name={'navigationBold'}
        text='Criticality / Intervals'
        style={styles.subTitle}
      />
      <DataField
        label={'Hose Production Date:'}
        value={formatDate(new Date(hoseData.prodDate))}
      />
      <DataField label={'Criticality:'} value={hoseData.criticality} />
      <View style={styles.inspectionDetails}>
        <DataField
          label={'Inspection Interval:'}
          value={hoseData.inspectionInterval}
        />
        <DataField
          label={'Next Inspection:'}
          value={formatDate(new Date(hoseData.nextInspection))}
          // error={nextInspectionError} TODO
        />
        <DataField
          label={'Replacement Interval:'}
          value={hoseData.replacementInterval}
        />
        <DataField
          label={'Replacement Date:'}
          value={formatDate(new Date(hoseData.replacementDate))}
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
