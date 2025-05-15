import { Bookmark } from '@/components/detailView/common/Bookmark';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { Select, TestDataSelect } from '@/components/UI/SelectModal/Select';
import { EditProps } from '@/lib/types/edit';
import { TPN } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';

export const EditTessPartNumbers: React.FC<EditProps<TPN>> = ({
  info,
  onInputChange,
  showValidationErrors,
}) => (
  <View style={styles.container}>
    <Bookmark title='Tess Part Numbers' />
    <View style={styles.section}>
      <TooltipWrapper tooltipData={{ title: 'Hose Type', message: '' }}>
        <Select
          label='Hose Type'
          selectedOption={info.hoseType ?? null}
          onChange={(value) => onInputChange('hoseType', value)}
          options={[]}
          required={showValidationErrors}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Ferrule 1', message: '' }}>
        <Select
          label='Ferrule 1'
          selectedOption={info.ferrule1 ?? null}
          onChange={(value) => onInputChange('ferrule1', value)}
          options={[]}
          required={showValidationErrors}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Ferrule 2', message: '' }}>
        <Select
          label='Ferrule 2'
          selectedOption={info.ferrule2 ?? null}
          onChange={(value) => onInputChange('ferrule2', value)}
          options={[]}
          required={showValidationErrors}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Insert 1', message: '' }}>
        <Select
          label='Insert 1'
          selectedOption={info.insert1 ?? null}
          onChange={(value) => onInputChange('insert1', value)}
          options={[]}
          required={showValidationErrors}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Insert 2', message: '' }}>
        <Select
          label='Insert 2'
          selectedOption={info.insert2 ?? null}
          onChange={(value) => onInputChange('insert2', value)}
          options={[]}
          required={showValidationErrors}
        />
      </TooltipWrapper>
    </View>
    <View style={styles.section}>
      <Typography
        name='navigationBold'
        text='Additional Parts Mounted On Hose'
      />
      <TooltipWrapper tooltipData={{ title: 'Add A End 1', message: '' }}>
        <Select
          label='Add A End 1'
          selectedOption={info.additionalsAend1 ?? null}
          onChange={(value) => onInputChange('additionalsAend1', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Add B End 1', message: '' }}>
        <Select
          label='Add B End 1'
          selectedOption={info.additionalsBend1 ?? null}
          onChange={(value) => onInputChange('additionalsBend1', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Add C End 1', message: '' }}>
        <Select
          label='Add C End 1'
          selectedOption={info.additionalsCend1 ?? null}
          onChange={(value) => onInputChange('additionalsCend1', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Add A End 2', message: '' }}>
        <Select
          label='Add A End 2'
          selectedOption={info.additionalsAend2 ?? null}
          onChange={(value) => onInputChange('additionalsAend2', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Add B End 2', message: '' }}>
        <Select
          label='Add B End 2'
          selectedOption={info.additionalsBend2 ?? null}
          onChange={(value) => onInputChange('additionalsBend2', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Add C End 2', message: '' }}>
        <Select
          label='Add C End 2'
          selectedOption={info.additionalsCend2 ?? null}
          onChange={(value) => onInputChange('additionalsCend2', value)}
          options={[]}
        />
      </TooltipWrapper>
    </View>
    <View style={styles.section}>
      <Typography name='navigationBold' text='Safety & Protection' />

      <TooltipWrapper tooltipData={{ title: 'Spiral Guard', message: '' }}>
        <Select
          label='Spiral Guard'
          selectedOption={info.spiralGuard ?? null}
          onChange={(value) => onInputChange('spiralGuard', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Hookie', message: '' }}>
        <Select
          label='Hookie'
          selectedOption={info.hookie ?? null}
          onChange={(value) => onInputChange('hookie', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Whipcheck', message: '' }}>
        <Select
          label='Whipcheck'
          selectedOption={info.whipCheck ?? null}
          onChange={(value) => onInputChange('whipCheck', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Hose Protection', message: '' }}>
        <Select
          label='Hose Protection'
          selectedOption={info.hoseProtection ?? null}
          onChange={(value) => onInputChange('hoseProtection', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{ title: 'Break Away/Weak Link', message: '' }}
      >
        <Select
          label='Break Away/Weak Link'
          selectedOption={info.breakaway ?? null}
          onChange={(value) => onInputChange('breakaway', value)}
          options={[]}
        />
      </TooltipWrapper>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 30,
  },
  section: {
    gap: 10,
    marginBottom: 20,
  },
});
