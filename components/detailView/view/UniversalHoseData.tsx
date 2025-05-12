import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import {
  couplingsFields,
  CouplingsFieldsEnd,
} from '@/components/detailView/edit/EditUniversalHoseData';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { UHD } from '@/lib/types/hose';
import { areValuesEqual } from '@/lib/util/validation';
import { StyleSheet, View } from 'react-native';

type UniversalHoseDataProps = {
  info: Partial<UHD>;
};

export type CouplingSectionProps = {
  info: Partial<UHD>;
  endSuffix: 'End1' | 'End2';
  isCopyOfEnd1?: boolean;
};
const CouplingSection: React.FC<CouplingSectionProps> = ({
  info,
  endSuffix,
  isCopyOfEnd1 = false,
}) => (
  <View style={styles.couplingSection}>
    <View style={styles.sectionTitleContainer}>
      <Typography
        name='navigationBold'
        text={`Coupling End ${endSuffix.slice(-1)}`}
      />
      {endSuffix === 'End2' && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            disabled
            isChecked={isCopyOfEnd1}
            label={'Same as End 1'}
            onChange={() => {}}
          />
        </View>
      )}
    </View>
    {!isCopyOfEnd1 && (
      <>
        <DataField
          label='Material Quality'
          value={info[`materialQuality${endSuffix}`] || undefined}
        />
        <DataField
          label='Type Fitting'
          value={info[`typeFitting${endSuffix}`] || undefined}
        />
        <DataField
          label='Inner Diameter'
          value={info[`genericDimension${endSuffix}`] || undefined}
        />
        <DataField
          label='Gender'
          value={info[`gender${endSuffix}`] || undefined}
        />
        <DataField
          label='Angle'
          value={info[`angle${endSuffix}`] || undefined}
        />
        <DataField
          label={`Comment ${endSuffix.replace('End', 'End ')}`}
          value={info[`comment${endSuffix}PTC`] || undefined}
        />
      </>
    )}
  </View>
);

export const UniversalHoseData = ({ info }: UniversalHoseDataProps) => {
  const areCouplingsSame = couplingsFields.every((key) => {
    const keyEnd1 = key;
    const keyEnd2 = `${key.replace('End1', 'End2')}` as CouplingsFieldsEnd;
    const value1 = info[keyEnd1];
    const value2 = info[keyEnd2];
    return areValuesEqual(value1, value2);
  });

  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <View style={styles.dataFieldsContainer}>
        <DataField label='Hose Standard' value={info.hoseStandard} />
        <DataField label='Inner Diameter' value={info.genericDimensionEnd1} />
        <DataField label='Total Length' value={info.hoseLength_mm} />
        <DataField label='WP BAR' value={info.wp_BAR} />
        <DataField label='WP PSI' value={info.wp_PSI} />
      </View>
      <CouplingSection info={info} endSuffix='End1' />
      <CouplingSection
        info={info}
        endSuffix='End2'
        isCopyOfEnd1={areCouplingsSame}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 30,
  },
  dataFieldsContainer: {
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  couplingSection: {
    gap: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
});
