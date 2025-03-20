import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import Bookmark from './Bookmark';
import { TPN } from './types';
import { Typography } from '../typography';

interface TessPartNumbersProps {
  tessPartNumbersData: TPN;
}

const TessPartNumbers: React.FC<TessPartNumbersProps> = ({
  tessPartNumbersData,
}) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Tess Part Numbers' />
      <Datafield label='Hose Type' value={tessPartNumbersData.hoseType} />
      <Datafield label='Ferrule 1' value={tessPartNumbersData.ferrule1} />
      <Datafield label='Ferrule 2' value={tessPartNumbersData.ferrule2} />
      <Datafield label='Insert 1' value={tessPartNumbersData.insert1} />
      <Datafield label='Insert 2' value={tessPartNumbersData.insert2} />
      <View style={styles.section}>
        <Typography
          name='navigationBold'
          text='Additional Parts Mounted On Hose'
        />
      </View>
      <Datafield label='Add A End 1' value={tessPartNumbersData.addAEnd1} />
      <Datafield label='Add B End 1' value={tessPartNumbersData.addBEnd1} />
      <Datafield label='Add C End 1' value={tessPartNumbersData.addCEnd1} />
      <Datafield label='Add A End 2' value={tessPartNumbersData.addAEnd2} />
      <Datafield label='Add B End 2' value={tessPartNumbersData.addBEnd2} />
      <Datafield label='Add C End 2' value={tessPartNumbersData.addCEnd2} />
      <View style={styles.section}>
        <Typography name='navigationBold' text='Safety & Protection' />
      </View>
      <Datafield label='Spiral Guard' value={tessPartNumbersData.spiralGuard} />
      <Datafield label='Hookie' value={tessPartNumbersData.hookie} />
      <Datafield label='Whipcheck' value={tessPartNumbersData.whipcheck} />
      <Datafield
        label='Hose Protection'
        value={tessPartNumbersData.hoseProtection}
      />
      <Datafield
        label='Break Away/Weak Link'
        value={tessPartNumbersData.breakAwayWeakLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
});

export default TessPartNumbers;
