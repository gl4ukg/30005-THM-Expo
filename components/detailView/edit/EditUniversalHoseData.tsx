import { SelectField } from '@/components/detailView/common/SelectField';
import { BarToPsiInput } from '@/components/detailView/edit/BarToPsiInput';
import { EditProps } from '@/lib/types/edit';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import UnitInput from '@/components/detailView/edit/UnitInput';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/input';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bookmark } from '../common/Bookmark';
import { UHD } from '@/lib/types/hose';

type EditUniversalHoseDataProps = EditProps<
  Pick<
    UHD,
    | 'materialQuality'
    | 'typeFitting'
    | 'innerDiameter2'
    | 'gender'
    | 'angle'
    | 'commentEnd1'
  >
>;

const EditCouplingSection: React.FC<EditUniversalHoseDataProps> = ({
  info,
  onInputChange,
}) => (
  <>
    <TooltipWrapper tooltipData={{ title: 'Material Quality', message: '' }}>
      <SelectField
        label='Material Quality'
        value={info.materialQuality}
        onChange={(value) => onInputChange('materialQuality', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Type Fitting', message: '' }}>
      <SelectField
        label='Type Fitting'
        value={info.typeFitting}
        onChange={(value) => onInputChange('typeFitting', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Inner Diameter 2', message: '' }}>
      <SelectField
        label='Inner Diameter 2'
        value={info.innerDiameter2}
        onChange={(value) => onInputChange('innerDiameter2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Gender', message: '' }}>
      <SelectField
        label='Gender'
        value={info.gender}
        onChange={(value) => onInputChange('gender', value)}
        required={true}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Angle', message: '' }}>
      <SelectField
        label='Angle'
        value={info.angle}
        onChange={(value) => onInputChange('angle', value)}
        options={[]}
      />
    </TooltipWrapper>
  </>
);

export const EditUniversalHoseData: React.FC<EditProps<UHD>> = ({
  info,
  onInputChange,
}) => {
  const [sameAsEnd1, setSameAsEnd1] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setSameAsEnd1((prev) => !prev);
  }, [setSameAsEnd1]);

  useEffect(() => {
    if (sameAsEnd1) {
      onInputChange('materialQuality2', info.materialQuality);
      onInputChange('typeFitting2', info.typeFitting);
      onInputChange('innerDiameter2', info.innerDiameter2);
      onInputChange('gender2', info.gender);
      onInputChange('angle2', info.angle);
      onInputChange('commentEnd2', info.commentEnd1);
    }
  }, [sameAsEnd1, info, onInputChange]);

  return (
    <View>
      <Bookmark title='Universal Hose Data' />
      <TooltipWrapper
        tooltipData={{
          title: 'Hose Standard',
          message: 'This is the hose standard',
        }}
      >
        <SelectField
          label='Hose Standard'
          value={info.hoseStandard}
          onChange={(value) => onInputChange('hoseStandard', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'Inner Diameter',
          message: 'This is the inner diameter',
        }}
      >
        <SelectField
          label='Inner Diameter'
          value={info.innerDiameter}
          onChange={(value) => onInputChange('innerDiameter', value)}
          options={[]}
        />
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'Total Length',
          message: 'This is the total length',
        }}
      >
        <View style={styles.inputContainer}>
          <UnitInput
            label='Total Length'
            value={Number(info.totalLength)}
            onChangeText={(value: number) =>
              onInputChange('totalLength', String(value))
            }
            unit={'mm'}
          />
        </View>
      </TooltipWrapper>
      <TooltipWrapper
        tooltipData={{
          title: 'Working pressure',
          message: 'This is the working pressure',
        }}
      >
        <BarToPsiInput
          pressureInBars={Number(info.wpBar)}
          onChange={(pressure) => {
            onInputChange('wpBar', String(pressure.bar));
            onInputChange('wpPsi', String(pressure.psi));
          }}
        />
      </TooltipWrapper>
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>
      <EditCouplingSection info={info} onInputChange={onInputChange} />
      <TooltipWrapper
        tooltipData={{
          title: 'Comment End 1',
          message: 'This is the comment end 1',
        }}
      >
        <Input
          label='Comment End 1'
          value={info.commentEnd1}
          onChangeText={(text) => onInputChange('commentEnd2', text)}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipData={{ title: 'Coupling end 2', message: '' }}>
        <View style={styles.sectionTitleContainer}>
          <Typography name='navigationBold' text='Coupling end 2' />
          <View style={styles.checkboxContainer}>
            <Checkbox isChecked={sameAsEnd1} onChange={handleCheckboxChange} />
            <Typography name='button' text='Same as end 1' />
          </View>
        </View>
      </TooltipWrapper>
      {!sameAsEnd1 && (
        <>
          <EditCouplingSection info={info} onInputChange={onInputChange} />
          <View style={styles.inputContainer}>
            <Input
              label='Comment End 2'
              value={info.commentEnd1}
              onChangeText={(text) => onInputChange('commentEnd2', text)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft: 25,
  },
  tooltipContainer: {
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
