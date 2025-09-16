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
  missingFields?: string[];
};

export type CouplingSectionProps = {
  info: Partial<UHD>;
  endSuffix: 'End1' | 'End2';
  isCopyOfEnd1?: boolean;
  missingFields?: string[];
};
const CouplingSection: React.FC<CouplingSectionProps> = ({
  info,
  endSuffix,
  isCopyOfEnd1 = false,
  missingFields,
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
          isMissing={missingFields?.includes(`materialQuality${endSuffix}`)}
        />
        <DataField
          label='Type Fitting'
          value={info[`typeFitting${endSuffix}`] || undefined}
          isMissing={missingFields?.includes(`typeFitting${endSuffix}`)}
        />
        <DataField
          label='Inner Diameter'
          value={info[`genericDimension${endSuffix}`] || undefined}
          isMissing={missingFields?.includes(`genericDimension${endSuffix}`)}
        />
        <DataField
          label='Gender'
          value={info[`gender${endSuffix}`] || undefined}
          isMissing={missingFields?.includes(`gender${endSuffix}`)}
        />
        <DataField
          label='Angle'
          value={info[`angle${endSuffix}`] || undefined}
          isMissing={missingFields?.includes(`angle${endSuffix}`)}
        />
        <DataField
          label={`Comment ${endSuffix.replace('End', 'End ')}`}
          value={info[`comment${endSuffix}PTC`] || undefined}
          isMissing={missingFields?.includes(`comment${endSuffix}PTC`)}
        />
      </>
    )}
  </View>
);

export const UniversalHoseData = ({ info, missingFields }: UniversalHoseDataProps) => {
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
        <DataField label='Hose Standard' value={info.hoseStandard} isMissing={missingFields?.includes('hoseStandard')}/>
        <DataField label='Inner Diameter' value={info.genericDimensionEnd1} isMissing={missingFields?.includes('genericDimensionEnd1')}/>
        <DataField label='Total Length' value={info.hoseLength_mm} isMissing={missingFields?.includes('hoseLength_mm')}/>
        <DataField label='WP BAR' value={info.wp_BAR} isMissing={missingFields?.includes('wp_BAR')}/>
        <DataField label='WP PSI' value={info.wp_PSI} isMissing={missingFields?.includes('wp_PSI')}/>
      </View>
      <CouplingSection info={info} endSuffix='End1' missingFields={missingFields}/>
      <CouplingSection
        info={info}
        endSuffix='End2'
        isCopyOfEnd1={areCouplingsSame}
        missingFields={missingFields}
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