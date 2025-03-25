import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TPN } from '../types';
import { SelectField } from '../../detailHose/SelectField';
import { Typography } from '@/components/typography';

type EditTessPartNumbersProps = {
  tessPartNumbersData: TPN;
  onInputChange: (field: string, value: string) => void;
};

const EditTessPartNumbers: React.FC<EditTessPartNumbersProps> = ({
  tessPartNumbersData,
  onInputChange,
}) => (
  <View>
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
    <View style={styles.section}>
      <Typography
        name='navigationBold'
        text='Additional Parts Mounted On Hose'
      />
    </View>
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
    <View style={styles.section}>
      <Typography name='navigationBold' text='Safety & Protection' />
    </View>
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
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
});

export default EditTessPartNumbers;
