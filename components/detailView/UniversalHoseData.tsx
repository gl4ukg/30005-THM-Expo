import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UHD } from './types';
import Bookmark from './Bookmark';
import Datafield from './Datafield';
import { Typography } from '../typography';
import { Checkbox } from '../UI/Checkbox';

interface UniversalHoseDataProps {
  universalHoseData: UHD;
}

const CouplingSection = ({ universalHoseData }: { universalHoseData: UHD }) => (
  <>
    <Datafield
      label='Material Quality'
      value={universalHoseData.materialQuality}
    />
    <Datafield label='Type Fitting' value={universalHoseData.typeFitting} />
    <Datafield
      label='Inner Diameter 2'
      value={universalHoseData.innerDiameter2}
    />
    <Datafield label='Gender' value={universalHoseData.gender} />
    <Datafield label='Angle' value={universalHoseData.angle} />
    <Datafield label='Comment End 1' value={universalHoseData.commentEnd1} />
  </>
);

const UniversalHoseData = ({ universalHoseData }: UniversalHoseDataProps) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <Datafield label='Hose Standard' value={universalHoseData.hoseStandard} />
      <Datafield
        label='Inner Diameter'
        value={universalHoseData.innerDiameter}
      />
      <Datafield label='Total Length' value={universalHoseData.totalLength} />
      <Datafield label='WP BAR' value={universalHoseData.wpBar} />
      <Datafield label='WP PSI' value={universalHoseData.wpPsi} />
      <View style={styles.sectionSpacer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>
      <CouplingSection universalHoseData={universalHoseData} />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.sectionTitleContainer}>
          <Checkbox isChecked={false} onChange={() => {}} disabled />
          <Typography name='button' text='Same as end 1' />
        </View>
      </View>
      <CouplingSection universalHoseData={universalHoseData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionSpacer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UniversalHoseData;
