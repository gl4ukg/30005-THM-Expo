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

const CouplingSection = ({
  universalHoseData,
  title,
}: {
  universalHoseData: UHD;
  title: string;
}) => (
  <View style={styles.couplingSection}>
    <Typography
      name='navigationBold'
      text={title}
      style={styles.sectionTitle}
    />
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
  </View>
);

const UniversalHoseData = ({ universalHoseData }: UniversalHoseDataProps) => {
  const areCouplingsSame = [
    'materialQuality',
    'typeFitting',
    'innerDiameter2',
    'gender',
    'angle',
    'commentEnd1',
  ].every((key) => {
    const value1 = universalHoseData[key as keyof UHD];
    const value2 = universalHoseData[`${key}2` as keyof UHD];

    return value1 === value2 && value1 !== '' && value1 !== undefined;
  });

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
      <CouplingSection
        universalHoseData={universalHoseData}
        title='Coupling end 1'
      />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.checkboxContainer}>
          <Checkbox disabled isChecked={areCouplingsSame} onChange={() => {}} />
          <Typography name='button' text='Same as end 1' />
        </View>
      </View>
      {!areCouplingsSame && (
        <CouplingSection
          universalHoseData={universalHoseData}
          title='Coupling end 2'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft: 25,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  couplingSection: {
    marginVertical: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 10,
  },
});

export default UniversalHoseData;
