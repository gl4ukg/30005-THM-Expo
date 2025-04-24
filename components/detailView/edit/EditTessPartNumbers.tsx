import { Bookmark } from '@/components/detailView/common/Bookmark';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { Select } from '@/components/UI/SelectModal/Select';
import { EditProps } from '@/lib/types/edit';
import { TPN } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';

export const EditTessPartNumbers: React.FC<EditProps<TPN>> = ({
  info,
  onInputChange,
}) => (
  <View>
    <Bookmark title='Tess Part Numbers' />
    <TooltipWrapper tooltipData={{ title: 'Hose Type', message: '' }}>
      <Select
        label='Hose Type'
        selectedOption={info.hoseType}
        onChange={(value) => onInputChange('hoseType', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 1', message: '' }}>
      <Select
        label='Ferrule 1'
        selectedOption={info.ferrule1}
        onChange={(value) => onInputChange('ferrule1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Ferrule 2', message: '' }}>
      <Select
        label='Ferrule 2'
        selectedOption={info.ferrule2}
        onChange={(value) => onInputChange('ferrule2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 1', message: '' }}>
      <Select
        label='Insert 1'
        selectedOption={info.insert1}
        onChange={(value) => onInputChange('insert1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Insert 2', message: '' }}>
      <Select
        label='Insert 2'
        selectedOption={info.insert2}
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
      <Select
        label='Add A End 1'
        selectedOption={info.addAEnd1}
        onChange={(value) => onInputChange('addAEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 1', message: '' }}>
      <Select
        label='Add B End 1'
        selectedOption={info.addBEnd1}
        onChange={(value) => onInputChange('addBEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 1', message: '' }}>
      <Select
        label='Add C End 1'
        selectedOption={info.addCEnd1}
        onChange={(value) => onInputChange('addCEnd1', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add A End 2', message: '' }}>
      <Select
        label='Add A End 2'
        selectedOption={info.addAEnd2}
        onChange={(value) => onInputChange('addAEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add B End 2', message: '' }}>
      <Select
        label='Add B End 2'
        selectedOption={info.addBEnd2}
        onChange={(value) => onInputChange('addBEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Add C End 2', message: '' }}>
      <Select
        label='Add C End 2'
        selectedOption={info.addCEnd2}
        onChange={(value) => onInputChange('addCEnd2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <View style={styles.section}>
      <Typography name='navigationBold' text='Safety & Protection' />
    </View>
    <TooltipWrapper tooltipData={{ title: 'Spiral Guard', message: '' }}>
      <Select
        label='Spiral Guard'
        selectedOption={info.spiralGuard}
        onChange={(value) => onInputChange('spiralGuard', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hookie', message: '' }}>
      <Select
        label='Hookie'
        selectedOption={info.hookie}
        onChange={(value) => onInputChange('hookie', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Whipcheck', message: '' }}>
      <Select
        label='Whipcheck'
        selectedOption={info.whipcheck}
        onChange={(value) => onInputChange('whipcheck', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Hose Protection', message: '' }}>
      <Select
        label='Hose Protection'
        selectedOption={info.hoseProtection}
        onChange={(value) => onInputChange('hoseProtection', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper
      tooltipData={{ title: 'Break Away/Weak Link', message: '' }}
    >
      <Select
        label='Break Away/Weak Link'
        selectedOption={info.breakAwayWeakLink}
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
