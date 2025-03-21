import { View, StyleSheet } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';
import { stringToDate, formatDate } from '@/lib/util/formatDate';
import Datafield from './Datafield';
import React from 'react';
import { SelectField } from '../detailHose/SelectField';
import { RadioGroup } from '../detailHose/radioGroup';
import { HID } from './types';
import { Input } from '../UI/Input/input';
import { TooltipWrapper } from '../detailHose/tooltipWrapper';
import EditMaintananceInfo from './edit/EditMaintananceInfo';

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
    padding: 10,
  },
  inputContainer: {
    paddingBottom: 20,
  },
});
