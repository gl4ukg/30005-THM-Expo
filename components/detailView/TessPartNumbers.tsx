import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import Bookmark from './Bookmark';
import { SelectField } from '../detailHose/SelectField';
import { TPN } from './types';
import { Typography } from '../typography';

interface TessPartNumbersProps {
  tessPartNumbersData: TPN;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
}

const TessPartNumbers: React.FC<TessPartNumbersProps> = ({
  tessPartNumbersData,
  editMode,
  onInputChange,
}) => {
  return (
    <View style={styles.container}>
      <Bookmark title='Tess Part Numbers' />
      {editMode ? (
        <>
          <SelectField
            label='Hose Type'
            value={tessPartNumbersData.hoseType}
            onChange={(value) => onInputChange('hoseType', value)}
            options={[]}
          />
          <SelectField
            label='Ferrule 1'
            value={tessPartNumbersData.ferrule1}
            onChange={(value) => onInputChange('ferrule1', value)}
            options={[]}
          />
          <SelectField
            label='Ferrule 2'
            value={tessPartNumbersData.ferrule2}
            onChange={(value) => onInputChange('ferrule2', value)}
            options={[]}
          />
          <SelectField
            label='Insert 1'
            value={tessPartNumbersData.insert1}
            onChange={(value) => onInputChange('insert1', value)}
            options={[]}
          />
          <SelectField
            label='Insert 2'
            value={tessPartNumbersData.insert2}
            onChange={(value) => onInputChange('insert2', value)}
            options={[]}
          />
          <Typography
            name='navigationBold'
            text='Additional Parts Mounted On Hose'
          />
          <SelectField
            label='Add A End 1'
            value={tessPartNumbersData.addAEnd1}
            onChange={(value) => onInputChange('addAEnd1', value)}
            options={[]}
          />
          <SelectField
            label='Add B End 1'
            value={tessPartNumbersData.addBEnd1}
            onChange={(value) => onInputChange('addBEnd1', value)}
            options={[]}
          />
          <SelectField
            label='Add C End 1'
            value={tessPartNumbersData.addCEnd1}
            onChange={(value) => onInputChange('addCEnd1', value)}
            options={[]}
          />
          <SelectField
            label='Add A End 2'
            value={tessPartNumbersData.addAEnd2}
            onChange={(value) => onInputChange('addAEnd2', value)}
            options={[]}
          />
          <SelectField
            label='Add B End 2'
            value={tessPartNumbersData.addBEnd2}
            onChange={(value) => onInputChange('addBEnd2', value)}
            options={[]}
          />
          <SelectField
            label='Add C End 2'
            value={tessPartNumbersData.addCEnd2}
            onChange={(value) => onInputChange('addCEnd2', value)}
            options={[]}
          />
          <Typography name='navigationBold' text='Safety & Protection' />

          <SelectField
            label='Spiral Guard'
            value={tessPartNumbersData.spiralGuard}
            onChange={(value) => onInputChange('spiralGuard', value)}
            options={[]}
          />
          <SelectField
            label='Hookie'
            value={tessPartNumbersData.hookie}
            onChange={(value) => onInputChange('hookie', value)}
            options={[]}
          />
          <SelectField
            label='Whipcheck'
            value={tessPartNumbersData.whipcheck}
            onChange={(value) => onInputChange('whipcheck', value)}
            options={[]}
          />
          <SelectField
            label='Hose Protection'
            value={tessPartNumbersData.hoseProtection}
            onChange={(value) => onInputChange('hoseProtection', value)}
            options={[]}
          />
          <SelectField
            label='Break Away/Weak Link'
            value={tessPartNumbersData.breakAwayWeakLink}
            onChange={(value) => onInputChange('breakAwayWeakLink', value)}
            options={[]}
          />
        </>
      ) : (
        <>
          <Datafield label='Hose Type' value={tessPartNumbersData.hoseType} />
          <Datafield label='Ferrule 1' value={tessPartNumbersData.ferrule1} />
          <Datafield label='Ferrule 2' value={tessPartNumbersData.ferrule2} />
          <Datafield label='Insert 1' value={tessPartNumbersData.insert1} />
          <Datafield label='Insert 2' value={tessPartNumbersData.insert2} />
          <Typography
            name='navigationBold'
            text='Additional Parts Mounted On Hose'
          />
          <Datafield label='Add A End 1' value={tessPartNumbersData.addAEnd1} />
          <Datafield label='Add B End 1' value={tessPartNumbersData.addBEnd1} />
          <Datafield label='Add C End 1' value={tessPartNumbersData.addCEnd1} />
          <Datafield label='Add A End 2' value={tessPartNumbersData.addAEnd2} />
          <Datafield label='Add B End 2' value={tessPartNumbersData.addBEnd2} />
          <Datafield label='Add C End 2' value={tessPartNumbersData.addCEnd2} />
          <Typography name='navigationBold' text='Safety & Protection' />
          <Datafield
            label='Spiral Guard'
            value={tessPartNumbersData.spiralGuard}
          />
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default TessPartNumbers;
