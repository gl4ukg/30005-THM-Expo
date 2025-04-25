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
      <DataField label='Add A End 1' value={info.addAEnd1} />
      <DataField label='Add B End 1' value={info.addBEnd1} />
      <DataField label='Add C End 1' value={info.addCEnd1} />
      <DataField label='Add A End 2' value={info.addAEnd2} />
      <DataField label='Add B End 2' value={info.addBEnd2} />
      <DataField label='Add C End 2' value={info.addCEnd2} />
      <View style={styles.section}>
        <Typography name='navigationBold' text='Safety & Protection' />
      </View>
      <DataField label='Spiral Guard' value={info.spiralGuard} />
      <DataField label='Hookie' value={info.hookie} />
      <DataField label='Whipcheck' value={info.whipcheck} />
      <DataField label='Hose Protection' value={info.hoseProtection} />
      <DataField label='Break Away/Weak Link' value={info.breakAwayWeakLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 10,
  },
});
