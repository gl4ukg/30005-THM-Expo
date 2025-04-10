import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UHD } from './types';
import Bookmark from './Bookmark';
import Datafield from './Datafield';
import { Typography } from '../typography';
import { Checkbox } from '../UI/Checkbox';

type UniversalHoseDataProps = {
  info: UHD;
};

type CouplingSectionProps = {
  info: Pick<
    UHD,
    | 'materialQuality'
    | 'typeFitting'
    | 'innerDiameter2'
    | 'gender'
    | 'angle'
    | 'commentEnd1'
  >;
  title: string;
};
const CouplingSection: React.FC<CouplingSectionProps> = ({ info, title }) => (
  <View style={styles.couplingSection}>
    <Typography
      name='navigationBold'
      text={title}
      style={styles.sectionTitle}
    />
    <Datafield label='Material Quality' value={info.materialQuality} />
    <Datafield label='Type Fitting' value={info.typeFitting} />
    <Datafield label='Inner Diameter 2' value={info.innerDiameter2} />
    <Datafield label='Gender' value={info.gender} />
    <Datafield label='Angle' value={info.angle} />
    <Datafield label='Comment End 1' value={info.commentEnd1} />
  </View>
);

const UniversalHoseData = ({ info }: UniversalHoseDataProps) => {
  const areCouplingsSame = [
    'materialQuality',
    'typeFitting',
    'innerDiameter2',
    'gender',
    'angle',
    'commentEnd1',
  ].every((key) => {
    const value1 = info[key as keyof UHD];
    const value2 = info[`${key}2` as keyof UHD];

    return value1 === value2 && value1 !== '' && value1 !== undefined;
  });

  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <Datafield label='Hose Standard' value={info.hoseStandard} />
      <Datafield label='Inner Diameter' value={info.innerDiameter} />
      <Datafield label='Total Length' value={info.totalLength} />
      <Datafield label='WP BAR' value={info.wpBar} />
      <Datafield label='WP PSI' value={info.wpPsi} />
      <CouplingSection info={info} title='Coupling end 1' />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.checkboxContainer}>
          <Checkbox disabled isChecked={areCouplingsSame} onChange={() => {}} />
          <Typography name='button' text='Same as end 1' />
        </View>
      </View>
      {!areCouplingsSame && (
        <CouplingSection info={info} title='Coupling end 2' />
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
