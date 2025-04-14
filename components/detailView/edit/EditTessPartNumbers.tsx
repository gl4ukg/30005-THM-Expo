import { Bookmark } from '@/components/detailView/common/Bookmark';
import { EditProps } from '@/lib/types/edit';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/typography';
import { StyleSheet, View } from 'react-native';
import { SelectField } from '../common/SelectField';
import { TPN } from '@/lib/types/hose';

export const EditTessPartNumbers: React.FC<EditProps<TPN>> = ({
  info,
  onInputChange,
}) => (
  <View>
    <Bookmark title='Tess Part Numbers' />
    <TooltipWrapper tooltipData={{ title: 'Hose Type', message: '' }}>
      <SelectField
        label='Hose Type'
        value={info.hoseType}
        onChange={(value) => onInputChange('hoseType', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 1', message: '' }}>
      <SelectField
        label='Ferrule 1'
        value={info.ferrule1}
        onChange={(value) => onInputChange('ferrule1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 2', message: '' }}>
      <SelectField
        label='Ferrule 2'
        value={info.ferrule2}
        onChange={(value) => onInputChange('ferrule2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 1', message: '' }}>
      <SelectField
        label='Insert 1'
        value={info.insert1}
        onChange={(value) => onInputChange('insert1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 2', message: '' }}>
      <SelectField
        label='Insert 2'
        value={info.insert2}
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
        value={info.addAEnd1}
        onChange={(value) => onInputChange('addAEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 1', message: '' }}>
      <SelectField
        label='Add B End 1'
        value={info.addBEnd1}
        onChange={(value) => onInputChange('addBEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 1', message: '' }}>
      <SelectField
        label='Add C End 1'
        value={info.addCEnd1}
        onChange={(value) => onInputChange('addCEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add A End 2', message: '' }}>
      <SelectField
        label='Add A End 2'
        value={info.addAEnd2}
        onChange={(value) => onInputChange('addAEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 2', message: '' }}>
      <SelectField
        label='Add B End 2'
        value={info.addBEnd2}
        onChange={(value) => onInputChange('addBEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 2', message: '' }}>
      <SelectField
        label='Add C End 2'
        value={info.addCEnd2}
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
        value={info.spiralGuard}
        onChange={(value) => onInputChange('spiralGuard', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hookie', message: '' }}>
      <SelectField
        label='Hookie'
        value={info.hookie}
        onChange={(value) => onInputChange('hookie', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Whipcheck', message: '' }}>
      <SelectField
        label='Whipcheck'
        value={info.whipcheck}
        onChange={(value) => onInputChange('whipcheck', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hose Protection', message: '' }}>
      <SelectField
        label='Hose Protection'
        value={info.hoseProtection}
        onChange={(value) => onInputChange('hoseProtection', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper
      tooltipData={{ title: 'Break Away/Weak Link', message: '' }}
    >
      <SelectField
        label='Break Away/Weak Link'
        value={info.breakAwayWeakLink}
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
