import BarToPsiInput from '@/components/detailHose/BarToPsiInput';
import { SelectField } from '@/components/detailHose/SelectField';
import UnitInput from '@/components/detailHose/UnitInput';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/input';
import { colors } from '@/lib/tokens/colors';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Bookmark from '../Bookmark';
import { UHD } from '../types';

interface UniversalHoseDataProps {
  universalHoseData: UHD;
  onInputChange: (field: string, value: string) => void;
}

const EditCouplingSection = ({
  universalHoseData,
  onInputChange,
}: {
  universalHoseData: UHD;
  onInputChange: (field: string, value: string) => {};
}) => (
  <>
    <SelectField
      label='Material Quality'
      value={universalHoseData.materialQuality}
      onChange={(value) => onInputChange('materialQuality', value)}
      options={[]}
    />
    <SelectField
      label='Type Fitting'
      value={universalHoseData.typeFitting}
      onChange={(value) => onInputChange('typeFitting', value)}
      options={[]}
    />
    <SelectField
      label='Inner Diameter 2'
      value={universalHoseData.innerDiameter2}
      onChange={(value) => onInputChange('innerDiameter2', value)}
      options={[]}
    />
    <SelectField
      label='Gender'
      value={universalHoseData.gender}
      onChange={(value) => onInputChange('gender', value)}
      options={[]}
    />
    <SelectField
      label='Angle'
      value={universalHoseData.angle}
      onChange={(value) => onInputChange('angle', value)}
      options={[]}
    />
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
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <SelectField
        label='Hose Standard'
        value={universalHoseData.hoseStandard}
        onChange={(value) => onInputChange('hoseStandard', value)}
        options={[]}
      />
      <SelectField
        label='Inner Diameter'
        value={universalHoseData.innerDiameter}
        onChange={(value) => onInputChange('innerDiameter', value)}
        options={[]}
      />
      <View style={styles.inputContainer}>
        <UnitInput
          label='Total Length'
          value={Number(universalHoseData.totalLength)}
          onChangeText={(text) => onInputChange('totalLength', text)}
          unit={'mm'}
        />
      </View>
      <BarToPsiInput
        pressureInBars={Number(universalHoseData.wpBar)}
        onChange={(pressure) => {
          onInputChange('wpBar', String(pressure.bar));
          onInputChange('wpPsi', String(pressure.psi));
        }}
      />
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>
      <EditCouplingSection
        universalHoseData={universalHoseData}
        onInputChange={onInputChange}
      />
      <View style={styles.inputContainer}>
        <Input
          label='Comment End 1'
          value={universalHoseData.commentEnd1}
          onChangeText={(text) => onInputChange('commentEnd2', text)}
        />
      </View>
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 2' />
        <View style={styles.checkboxContainer}>
          <Checkbox isChecked={sameAsEnd1} onChange={handleCheckboxChange} />
          <Typography name='button' text='Same as end 1' />
          <View style={styles.tooltipContainer}>
            <Icon name='Tooltip' size='md' color={colors.primary} />
          </View>
        </View>
      </View>
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
  container: {
    padding: 10,
  },
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
