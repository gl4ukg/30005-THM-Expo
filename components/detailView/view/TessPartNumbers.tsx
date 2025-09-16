import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { TPN } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';
interface TessPartNumbersProps {
  info: Partial<TPN>;
  missingFields?: string[];
}

export const TessPartNumbers: React.FC<TessPartNumbersProps> = ({ info, missingFields }) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Tess Part Numbers' />
      <View style={styles.section}>
        <DataField label='Hose Type' value={info.hoseType} isMissing={missingFields?.includes('hoseType')}/>
        <DataField label='Ferrule 1' value={info.ferrule1} isMissing={missingFields?.includes('ferrule1')}/>
        <DataField label='Ferrule 2' value={info.ferrule2} isMissing={missingFields?.includes('ferrule2')}/>
        <DataField label='Insert 1' value={info.insert1} isMissing={missingFields?.includes('insert1')}/>
        <DataField label='Insert 2' value={info.insert2} isMissing={missingFields?.includes('insert2')}/>
      </View>
      <View style={styles.section}>
        <Typography
          name='navigationBold'
          text='Additional Parts Mounted On Hose'
        />
        <DataField label='Add A End 1' value={info.additionalsAend1} isMissing={missingFields?.includes('additionalsAend1')}/>
        <DataField label='Add B End 1' value={info.additionalsBend1} isMissing={missingFields?.includes('additionalsBend1')}/>
        <DataField label='Add C End 1' value={info.additionalsCend1} isMissing={missingFields?.includes('additionalsCend1')}/>
        <DataField label='Add A End 2' value={info.additionalsAend2} isMissing={missingFields?.includes('additionalsAend2')}/>
        <DataField label='Add B End 2' value={info.additionalsBend2} isMissing={missingFields?.includes('additionalsBend2')}/>
        <DataField label='Add C End 2' value={info.additionalsCend2} isMissing={missingFields?.includes('additionalsCend2')}/>
      </View>
      <View style={styles.section}>
        <Typography name='navigationBold' text='Safety & Protection' />
        <DataField label='Spiral Guard' value={info.spiralGuard} isMissing={missingFields?.includes('spiralGuard')}/>
        <DataField label='Hookie' value={info.hookie} isMissing={missingFields?.includes('hookie')}/>
        <DataField label='Whipcheck' value={info.whipCheck} isMissing={missingFields?.includes('whipCheck')}/>
        <DataField label='Hose Protection' value={info.hoseProtection} isMissing={missingFields?.includes('hoseProtection')}/>
        <DataField label='Break Away/Weak Link' value={info.breakaway} isMissing={missingFields?.includes('breakaway')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 30,
  },
  section: {
    gap: 10,
  },
});