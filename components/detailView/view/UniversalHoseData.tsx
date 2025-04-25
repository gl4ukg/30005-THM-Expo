import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import {
  CouplingsFields,
  couplingsFields,
} from '@/components/detailView/edit/EditUniversalHoseData';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { UHD } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';

type UniversalHoseDataProps = {
  info: Partial<UHD>;
};

export type CouplingSectionProps = {
  info: Partial<Pick<UHD, CouplingsFields>>;
};
const CouplingSection: React.FC<CouplingSectionProps> = ({ info }) => (
  <View style={styles.couplingSection}>
    <DataField
      label='Material Quality'
      value={info.materialQuality || undefined}
    />
    <DataField label='Type Fitting' value={info.typeFitting || undefined} />
    <DataField label='Inner Diameter' value={info.innerDiameter || undefined} />
    <DataField label='Gender' value={info.gender || undefined} />
    <DataField label='Angle' value={info.angle || undefined} />
    <DataField label='Comment End 1' value={info.commentEnd || undefined} />
  </View>
);

export const UniversalHoseData = ({ info }: UniversalHoseDataProps) => {
  const compareValues = (
    val1: (typeof info)[keyof typeof info],
    val2: (typeof info)[keyof typeof info],
  ): boolean => {
    return val1 === val2 && !!val1 && !!val2;
  };
  const areCouplingsSame = couplingsFields.every((key) => {
    const value1 = info[key];
    const value2 = info[`${key}2`];
    return compareValues(value1, value2);
  });

  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <DataField label='Hose Standard' value={info.hoseStandard} />
      <DataField label='Inner Diameter' value={info.innerDiameter} />
      <DataField label='Total Length' value={info.totalLength} />
      <DataField label='WP BAR' value={info.wpBar} />
      <DataField label='WP PSI' value={info.wpPsi} />
      <CouplingSection info={info} />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.checkboxContainer}>
          <Checkbox disabled isChecked={areCouplingsSame} onChange={() => {}} />
          <Typography name='button' text='Same as end 1' />
        </View>
      </View>
      {!areCouplingsSame && <CouplingSection info={info} />}
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
