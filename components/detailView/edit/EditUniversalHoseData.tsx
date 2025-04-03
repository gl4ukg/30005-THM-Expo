import BarToPsiInput from '@/components/detailHose/BarToPsiInput';
import { SelectField } from '@/components/detailHose/SelectField';
import UnitInput from '@/components/detailHose/UnitInput';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/input';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Bookmark from '../Bookmark';
import { UHD } from '../types';
import { TooltipWrapper } from '@/components/detailHose/tooltipWrapper';

interface UniversalHoseDataProps {
  universalHoseData: UHD;
  onInputChange: (field: string, value: string) => void;
}

const EditCouplingSection = ({
  universalHoseData,
  onInputChange,
}: {
  universalHoseData: UHD;
  onInputChange: (field: string, value: string) => void;
}) => (
  <>
    <TooltipWrapper tooltipData={{ title: 'Material Quality', message: '' }}>
      <SelectField
        label='Material Quality'
        value={universalHoseData.materialQuality}
        onChange={(value) => onInputChange('materialQuality', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Type Fitting', message: '' }}>
      <SelectField
        label='Type Fitting'
        value={universalHoseData.typeFitting}
        onChange={(value) => onInputChange('typeFitting', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Inner Diameter 2', message: '' }}>
      <SelectField
        label='Inner Diameter 2'
        value={universalHoseData.innerDiameter2}
        onChange={(value) => onInputChange('innerDiameter2', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Gender', message: '' }}>
      <SelectField
        label='Gender'
        value={universalHoseData.gender}
        onChange={(value) => onInputChange('gender', value)}
        options={[]}
      />
    </TooltipWrapper>
    <TooltipWrapper tooltipData={{ title: 'Angle', message: '' }}>
      <SelectField
        label='Angle'
        value={universalHoseData.angle}
        onChange={(value) => onInputChange('angle', value)}
        options={[]}
      />
    </TooltipWrapper>
  </>
);

const EditUniversalHoseData = ({
  universalHoseData,
  onInputChange,
}: UniversalHoseDataProps) => {
  const [sameAsEnd1, setSameAsEnd1] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setSameAsEnd1((prev) => !prev);
  }, [setSameAsEnd1]);

  useEffect(() => {
    if (sameAsEnd1) {
      onInputChange('materialQuality2', universalHoseData.materialQuality);
      onInputChange('typeFitting2', universalHoseData.typeFitting);
      onInputChange('innerDiameter22', universalHoseData.innerDiameter2);
      onInputChange('gender2', universalHoseData.gender);
      onInputChange('angle2', universalHoseData.angle);
      onInputChange('commentEnd2', universalHoseData.commentEnd1);
    }
  }, [sameAsEnd1, universalHoseData, onInputChange]);

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
          value={universalHoseData.hoseStandard}
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
          value={universalHoseData.innerDiameter}
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
            value={Number(universalHoseData.totalLength)}
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
          pressureInBars={Number(universalHoseData.wpBar)}
          onChange={(pressure) => {
            onInputChange('wpBar', String(pressure.bar));
            onInputChange('wpPsi', String(pressure.psi));
          }}
        />
      </TooltipWrapper>
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>
      <EditCouplingSection
        universalHoseData={universalHoseData}
        onInputChange={onInputChange}
      />
      <TooltipWrapper
        tooltipData={{
          title: 'Comment End 1',
          message: 'This is the comment end 1',
        }}
      >
        <Input
          label='Comment End 1'
          value={universalHoseData.commentEnd1}
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
          <EditCouplingSection
            universalHoseData={universalHoseData}
            onInputChange={onInputChange}
          />
          <View style={styles.inputContainer}>
            <Input
              label='Comment End 2'
              value={universalHoseData.commentEnd1}
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

export default EditUniversalHoseData;
