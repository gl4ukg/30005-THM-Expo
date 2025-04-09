import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import Bookmark from './Bookmark';
import { TPN } from './types';
import { Typography } from '../typography';

interface TessPartNumbersProps {
  info: TPN;
}

const TessPartNumbers: React.FC<TessPartNumbersProps> = ({ info }) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Tess Part Numbers' />
      <Datafield label='Hose Type' value={info.hoseType} />
      <Datafield label='Ferrule 1' value={info.ferrule1} />
      <Datafield label='Ferrule 2' value={info.ferrule2} />
      <Datafield label='Insert 1' value={info.insert1} />
      <Datafield label='Insert 2' value={info.insert2} />
      <View style={styles.section}>
        <Typography
          name='navigationBold'
          text='Additional Parts Mounted On Hose'
        />
      </View>
      <Datafield label='Add A End 1' value={info.addAEnd1} />
      <Datafield label='Add B End 1' value={info.addBEnd1} />
      <Datafield label='Add C End 1' value={info.addCEnd1} />
      <Datafield label='Add A End 2' value={info.addAEnd2} />
      <Datafield label='Add B End 2' value={info.addBEnd2} />
      <Datafield label='Add C End 2' value={info.addCEnd2} />
      <View style={styles.section}>
        <Typography name='navigationBold' text='Safety & Protection' />
      </View>
      <Datafield label='Spiral Guard' value={info.spiralGuard} />
      <Datafield label='Hookie' value={info.hookie} />
      <Datafield label='Whipcheck' value={info.whipcheck} />
      <Datafield label='Hose Protection' value={info.hoseProtection} />
      <Datafield label='Break Away/Weak Link' value={info.breakAwayWeakLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 10,
  },
});

export default TessPartNumbers;
