import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { TPN } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';
interface TessPartNumbersProps {
  info: TPN;
}

export const TessPartNumbers: React.FC<TessPartNumbersProps> = ({ info }) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Tess Part Numbers' />
      <DataField label='Hose Type' value={info.hoseType} />
      <DataField label='Ferrule 1' value={info.ferrule1} />
      <DataField label='Ferrule 2' value={info.ferrule2} />
      <DataField label='Insert 1' value={info.insert1} />
      <DataField label='Insert 2' value={info.insert2} />
      <View style={styles.section}>
        <Typography
          name='navigationBold'
          text='Additional Parts Mounted On Hose'
        />
      </View>
      <DataField label='Add A End 1' value={info.additionalsAend1} />
      <DataField label='Add B End 1' value={info.additionalsBend1} />
      <DataField label='Add C End 1' value={info.additionalsCend1} />
      <DataField label='Add A End 2' value={info.additionalsAend2} />
      <DataField label='Add B End 2' value={info.additionalsBend2} />
      <DataField label='Add C End 2' value={info.additionalsCend2} />
      <View style={styles.section}>
        <Typography name='navigationBold' text='Safety & Protection' />
      </View>
      <DataField label='Spiral Guard' value={info.spiralGuard} />
      <DataField label='Hookie' value={info.hookie} />
      <DataField label='Whipcheck' value={info.whipCheck} />
      <DataField label='Hose Protection' value={info.hoseProtection} />
      <DataField label='Break Away/Weak Link' value={info.breakaway} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 10,
  },
});
