import { colors } from '@/lib/tokens/colors';
import { formatDate, stringToDate } from '@/lib/util/formatDate';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../typography';
import Bookmark from './Bookmark';
import Datafield from './Datafield';
import EditMaintananceInfo from './edit/EditMaintananceInfo';
import { HID } from './types';

type MaintananceProps = {
  hoseData: HID;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
};
const MaintananceInfo: React.FC<MaintananceProps> = ({
  hoseData,
  editMode,
  onInputChange,
}) => {
  const today = new Date();
  const nextInspectionError = stringToDate(hoseData.nextInspection) < today;

  return (
    <View style={styles.container}>
      <Bookmark title='Maintanance Info' />
      <Typography
        name={'navigationBold'}
        text='Inspection'
        style={styles.subTitle}
      />
      <Datafield
        label={'Inspected Date:'}
        value={formatDate(hoseData.inspectedDate)}
      />
      {editMode ? (
        <EditMaintananceInfo
          hoseData={hoseData}
          onInputChange={onInputChange}
        />
      ) : (
        <>
          <Datafield label={'Inspected By:'} value={hoseData.inspectedBy} />
          <Datafield label={'Condition:'} value={hoseData.hoseCondition} />
          <Datafield label={'Approved:'} value={hoseData.approved} />
          <Datafield label={'Comment:'} value={hoseData.comment} />
          <Typography
            name={'navigationBold'}
            text='Criticality / Intervals'
            style={styles.subTitle}
          />
          <Datafield
            label={'Hose Production Date:'}
            value={formatDate(hoseData.prodDate)}
          />
          <Datafield label={'Criticality:'} value={hoseData.criticality} />
        </>
      )}
      <View style={styles.inspectionDetails}>
        <Datafield
          label={'Inspection Interval:'}
          value={hoseData.inspectionInterval}
        />
        <Datafield
          label={'Next Inspection:'}
          value={formatDate(hoseData.nextInspection)}
          error={nextInspectionError}
        />
        <Datafield
          label={'Replacement Interval:'}
          value={hoseData.replacementInterval}
        />
        <Datafield
          label={'Replacement Date:'}
          value={formatDate(hoseData.replacementDate)}
        />
      </View>
      <View style={styles.spacing}>
        <Datafield label={'Drawing Number:'} value={hoseData.drawingNumber} />
        <Datafield label={'Position Number:'} value={hoseData.positionNumber} />
        <Datafield
          label={'Customer Article Number:'}
          value={hoseData.customerArticleNumber}
        />
      </View>
    </View>
  );
};

export default MaintananceInfo;

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
