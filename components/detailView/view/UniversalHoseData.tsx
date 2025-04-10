import { StyleSheet, View } from 'react-native';
import { Typography } from '../../typography';
import { Checkbox } from '../../UI/Checkbox';
import { Bookmark } from '../common/Bookmark';
import { DataField } from '../common/Datafield';
import { UHD } from '../types';

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
    <DataField label='Material Quality' value={info.materialQuality} />
    <DataField label='Type Fitting' value={info.typeFitting} />
    <DataField label='Inner Diameter 2' value={info.innerDiameter2} />
    <DataField label='Gender' value={info.gender} />
    <DataField label='Angle' value={info.angle} />
    <DataField label='Comment End 1' value={info.commentEnd1} />
  </View>
);

export const UniversalHoseData = ({ info }: UniversalHoseDataProps) => {
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
      <DataField label='Hose Standard' value={info.hoseStandard} />
      <DataField label='Inner Diameter' value={info.innerDiameter} />
      <DataField label='Total Length' value={info.totalLength} />
      <DataField label='WP BAR' value={info.wpBar} />
      <DataField label='WP PSI' value={info.wpPsi} />
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
