import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { HID } from '@/lib/types/hose';
import { DateFormatter } from '@/lib/util/date';
import { StyleSheet, View } from 'react-native';
type MaintenanceProps = {
  info: Partial<HID>;
  missingFields?: string[];
};
export const MaintenanceInfo: React.FC<MaintenanceProps> = ({
  info: hoseData,
  missingFields,
}) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Maintenance Info' />
      <View style={styles.section}>
        <Typography name={'navigationBold'} text='Inspection' />
        <DataField
          label={'Inspected Date:'}
          value={DateFormatter.fromString(hoseData.inspectedDate ?? '')?.sql ?? 'N/A'}
          isMissing={missingFields?.includes('inspectedDate')}
        />
        <DataField label={'Inspected By:'} value={hoseData.inspector} isMissing={missingFields?.includes('inspector')}/>
        <DataField label={'Condition:'} value={hoseData.hoseCondition} isMissing={missingFields?.includes('hoseCondition')}/>
        <DataField
          label={'Approved:'}
          value={
            hoseData.approved === undefined
              ? ''
              : hoseData.approved
                ? 'Yes'
                : 'No'
          }
          isMissing={missingFields?.includes('approved')}
        />
        <DataField label={'Comment:'} value={hoseData.generalComment} isMissing={missingFields?.includes('generalComment')}/>
      </View>
      <View style={styles.section}>
        <Typography name={'navigationBold'} text='Criticality / Intervals' />
        <DataField
          label={'Hose Production Date:'}
          value={DateFormatter.fromString(hoseData.productionDate ?? '')?.sql ?? 'N/A'}
          isMissing={missingFields?.includes('productionDate')}
        />
        <DataField label={'Criticality:'} value={hoseData.criticality} isMissing={missingFields?.includes('criticality')}/>
      </View>

      <View style={styles.inspectionDetails}>
        <DataField
          label={'Inspection Interval:'}
          value={hoseData.inspectionInterval}
          isMissing={missingFields?.includes('inspectionInterval')}
        />
        <DataField
          label={'Next Inspection:'}
          value={DateFormatter.fromString(hoseData.nextInspection ?? '')?.sql ?? 'N/A'}
          isMissing={missingFields?.includes('nextInspection')}
        />
        <DataField
          label={'Replacement Interval:'}
          value={hoseData.replacementInterval}
          isMissing={missingFields?.includes('replacementInterval')}
        />
        <DataField
          label={'Replacement Date:'}
          value={DateFormatter.fromString(hoseData.replacementDate ?? '')?.sql ?? 'N/A'}
          isMissing={missingFields?.includes('replacementDate')}
        />
      </View>
      <View style={styles.section}>
        <DataField label={'Drawing number:'} value={hoseData.drawingNumber} isMissing={missingFields?.includes('drawingNumber')}/>
        <DataField
          label={'Drawing position number:'}
          value={hoseData.posNumber}
          isMissing={missingFields?.includes('posNumber')}
        />
        <DataField
          label={'Drawing Article Number:'}
          value={hoseData.artNumber}
          isMissing={missingFields?.includes('artNumber')}
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
});