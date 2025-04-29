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
  info: Partial<UHD>;
  endSuffix: 'End1' | 'End2';
};
const CouplingSection: React.FC<CouplingSectionProps> = ({
  info,
  endSuffix,
}) => (
  <View style={styles.couplingSection}>
    <DataField
      label='Material Quality'
      value={info[`materialQuality${endSuffix}` as keyof UHD] || undefined}
    />
    <DataField
      label='Type Fitting'
      value={info[`typeFitting${endSuffix}` as keyof UHD] || undefined}
    />
    <DataField
      label='Inner Diameter'
      value={info[`innerDiameter${endSuffix}` as keyof UHD] || undefined}
    />
    <DataField
      label='Gender'
      value={info[`gender${endSuffix}` as keyof UHD] || undefined}
    />
    <DataField
      label='Angle'
      value={info[`angle${endSuffix}` as keyof UHD] || undefined}
    />
    <DataField
      label={`Comment ${endSuffix.replace('End', 'End ')}`}
      value={info[`comment${endSuffix}` as keyof UHD] || undefined}
    />
  </View>
);

export const UniversalHoseData = ({ info }: UniversalHoseDataProps) => {
  const compareValues = (
    val1: string | number | undefined | null,
    val2: string | number | undefined | null,
  ): boolean => {
    const v1 = val1 || '';
    const v2 = val2 || '';
    return v1 === v2 && (!!val1 || !!val2);
  };

  const areCouplingsSame = couplingsFields.every((key) => {
    const keyEnd1 = `${key}End1` as keyof UHD;
    const keyEnd2 = `${key}End2` as keyof UHD;
    const value1 = info[keyEnd1];
    const value2 = info[keyEnd2];
    return compareValues(value1, value2);
  });

  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <DataField label='Hose Standard' value={info.hoseStandard} />
      <DataField label='Inner Diameter' value={info.generalDimensionEnd1} />
      <DataField label='Total Length' value={info.hoseLength} />
      <DataField label='WP BAR' value={info.wp} />
      <DataField label='WP PSI' value={info.wpPsi} />
      <CouplingSection info={info} endSuffix='End1' />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.checkboxContainer}>
          <Checkbox disabled isChecked={areCouplingsSame} onChange={() => {}} />
          <Typography name='button' text='Same as end 1' />
        </View>
      </View>
      {!areCouplingsSame && <CouplingSection info={info} endSuffix='End2' />}
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
