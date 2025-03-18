import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { UHD } from './types';
import Bookmark from './Bookmark';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { Typography } from '../typography';
import { Checkbox } from '../UI/Checkbox';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import BarToPsiInput from '../detailHose/BarToPsiInput';
import UnitInput from '../detailHose/UnitInput';

interface UniversalHoseDataProps {
  universalHoseData: UHD;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
}

const CouplingSection = ({ universalHoseData }: { universalHoseData: UHD }) => (
  <>
    <Datafield
      label='Material Quality'
      value={universalHoseData.materialQuality}
    />
    <Datafield label='Type Fitting' value={universalHoseData.typeFitting} />
    <Datafield
      label='Inner Diameter 2'
      value={universalHoseData.innerDiameter2}
    />
    <Datafield label='Gender' value={universalHoseData.gender} />
    <Datafield label='Angle' value={universalHoseData.angle} />
    <Datafield label='Comment End 1' value={universalHoseData.commentEnd1} />
  </>
);

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
    <View style={styles.inputContainer}>
      <Input
        label='Comment End 1'
        value={universalHoseData.commentEnd1}
        onChangeText={(text) => onInputChange('commentEnd1', text)}
      />
    </View>
  </>
);

const UniversalHoseData = ({
  universalHoseData,
  editMode,
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
      {editMode ? (
        <>
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
              value={universalHoseData.totalLength}
              onChangeText={(text) => onInputChange('totalLength', text)}
              unit={'mm'}
            />
          </View>
          <BarToPsiInput
            pressureInBars={universalHoseData.wpBar}
            onChange={(pressure) => {
              onInputChange('wpBar', pressure.bar);
              onInputChange('wpPsi', pressure.psi);
            }}
          />
          <View style={styles.sectionSpacer}>
            <Typography name='navigationBold' text='Coupling end 1' />
          </View>
          <EditCouplingSection
            universalHoseData={universalHoseData}
            onInputChange={onInputChange}
          />
          <View style={styles.sectionTitleContainer}>
            <Typography
              name='navigationBold'
              style={styles.sectionTitle}
              text='Coupling end 2'
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                isChecked={sameAsEnd1}
                onChange={handleCheckboxChange}
              />
              <Typography name='button' text='Same as end 1' />
              <View style={styles.tooltipContainer}>
                <Icon name='Tooltip' size='md' color={colors.primary} />
              </View>
            </View>
          </View>
          {!sameAsEnd1 && (
            <EditCouplingSection
              universalHoseData={universalHoseData}
              onInputChange={onInputChange}
            />
          )}
          {sameAsEnd1 && (
            <EditCouplingSection
              universalHoseData={{
                ...universalHoseData,
                materialQuality: universalHoseData.materialQuality,
                typeFitting: universalHoseData.typeFitting,
                innerDiameter2: universalHoseData.innerDiameter2,
                gender: universalHoseData.gender,
                angle: universalHoseData.angle,
                commentEnd1: universalHoseData.commentEnd1,
              }}
              onInputChange={onInputChange}
            />
          )}
        </>
      ) : (
        <>
          <Datafield
            label='Hose Standard'
            value={universalHoseData.hoseStandard}
          />
          <Datafield
            label='Inner Diameter'
            value={universalHoseData.innerDiameter}
          />
          <Datafield
            label='Total Length'
            value={universalHoseData.totalLength}
          />
          <Datafield label='WP BAR' value={universalHoseData.wpBar} />
          <Datafield label='WP PSI' value={universalHoseData.wpPsi} />
          <View style={styles.sectionSpacer}>
            <Typography name='navigationBold' text='Coupling end 1' />
          </View>
          <CouplingSection universalHoseData={universalHoseData} />
          <View style={styles.sectionTitleContainer}>
            <Typography name='navigationBold' text='Coupling end 2' />
            <View style={styles.sectionTitleContainer}>
              <Checkbox isChecked={sameAsEnd1} onChange={() => {}} disabled />
              <Typography name='button' text='Same as end 1' />
            </View>
          </View>
          {!sameAsEnd1 && (
            <CouplingSection universalHoseData={universalHoseData} />
          )}
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
  checkbox: {
    marginRight: 8,
  },
  tooltipContainer: {
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionSpacer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UniversalHoseData;
