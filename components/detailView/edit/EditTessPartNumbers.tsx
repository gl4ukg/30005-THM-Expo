import { TooltipWrapper } from '@/components/detailHose/tooltipWrapper';
import { Typography } from '@/components/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectField } from '../../detailHose/SelectField';
import { TPN } from '../types';

type EditTessPartNumbersProps = {
  tessPartNumbersData: TPN;
  onInputChange: (field: string, value: string) => void;
};

const EditTessPartNumbers: React.FC<EditTessPartNumbersProps> = ({
  tessPartNumbersData,
  onInputChange,
}) => (
  <View>
    <TooltipWrapper tooltipData={{ title: 'Hose Type', message: '' }}>
      <SelectField
        label='Hose Type'
        value={tessPartNumbersData.hoseType}
        onChange={(value) => onInputChange('hoseType', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 1', message: '' }}>
      <SelectField
        label='Ferrule 1'
        value={tessPartNumbersData.ferrule1}
        onChange={(value) => onInputChange('ferrule1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 2', message: '' }}>
      <SelectField
        label='Ferrule 2'
        value={tessPartNumbersData.ferrule2}
        onChange={(value) => onInputChange('ferrule2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 1', message: '' }}>
      <SelectField
        label='Insert 1'
        value={tessPartNumbersData.insert1}
        onChange={(value) => onInputChange('insert1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 2', message: '' }}>
      <SelectField
        label='Insert 2'
        value={tessPartNumbersData.insert2}
        onChange={(value) => onInputChange('insert2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <View style={styles.section}>
      <Typography
        name='navigationBold'
        text='Additional Parts Mounted On Hose'
      />
    </View>
    <TooltipWrapper tooltipData={{ title: 'Add A End 1', message: '' }}>
      <SelectField
        label='Add A End 1'
        value={tessPartNumbersData.addAEnd1}
        onChange={(value) => onInputChange('addAEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 1', message: '' }}>
      <SelectField
        label='Add B End 1'
        value={tessPartNumbersData.addBEnd1}
        onChange={(value) => onInputChange('addBEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 1', message: '' }}>
      <SelectField
        label='Add C End 1'
        value={tessPartNumbersData.addCEnd1}
        onChange={(value) => onInputChange('addCEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add A End 2', message: '' }}>
      <SelectField
        label='Add A End 2'
        value={tessPartNumbersData.addAEnd2}
        onChange={(value) => onInputChange('addAEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 2', message: '' }}>
      <SelectField
        label='Add B End 2'
        value={tessPartNumbersData.addBEnd2}
        onChange={(value) => onInputChange('addBEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 2', message: '' }}>
      <SelectField
        label='Add C End 2'
        value={tessPartNumbersData.addCEnd2}
        onChange={(value) => onInputChange('addCEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <View style={styles.section}>
      <Typography name='navigationBold' text='Safety & Protection' />
    </View>
    <TooltipWrapper tooltipData={{ title: 'Spiral Guard', message: '' }}>
      <SelectField
        label='Spiral Guard'
        value={tessPartNumbersData.spiralGuard}
        onChange={(value) => onInputChange('spiralGuard', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hookie', message: '' }}>
      <SelectField
        label='Hookie'
        value={tessPartNumbersData.hookie}
        onChange={(value) => onInputChange('hookie', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Whipcheck', message: '' }}>
      <SelectField
        label='Whipcheck'
        value={tessPartNumbersData.whipcheck}
        onChange={(value) => onInputChange('whipcheck', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hose Protection', message: '' }}>
      <SelectField
        label='Hose Protection'
        value={tessPartNumbersData.hoseProtection}
        onChange={(value) => onInputChange('hoseProtection', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper
      tooltipData={{ title: 'Break Away/Weak Link', message: '' }}
    >
      <SelectField
        label='Break Away/Weak Link'
        value={tessPartNumbersData.breakAwayWeakLink}
        onChange={(value) => onInputChange('breakAwayWeakLink', value)}
        options={[]}
      />
    </TooltipWrapper>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
});

export default EditTessPartNumbers;
