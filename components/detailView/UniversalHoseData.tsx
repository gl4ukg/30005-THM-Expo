import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { UVH } from './types';
import Bookmark from './Bookmark';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { Typography } from '../typography';
import { Checkbox } from '../UI/Checkbox';

interface UniversalHoseDataProps {
  universalHoseData: UVH;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
}

const Section = ({ children, title }) => (
  <View style={styles.sectionContainer}>
    {title && (
      <Typography
        name='navigationBold'
        style={styles.sectionTitle}
        text={title}
      />
    )}
    {children}
  </View>
);

const CouplingSection = ({ universalHoseData }) => (
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

const EditCouplingSection = ({ universalHoseData, onInputChange }) => (
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
            <Input
              label='Total Length'
              value={universalHoseData.totalLength}
              onChangeText={(text) => onInputChange('totalLength', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label='WP Bar'
              value={universalHoseData.wpBar}
              onChangeText={(text) => onInputChange('wpBar', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label='WP Psi'
              value={universalHoseData.wpPsi}
              onChangeText={(text) => onInputChange('wpPsi', text)}
            />
          </View>
          <Section title='Coupling end 1'>
            <EditCouplingSection
              universalHoseData={universalHoseData}
              onInputChange={onInputChange}
            />
          </Section>
          <Section
            title={
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
                </View>
              </View>
            }
          >
            {!sameAsEnd1 && (
              <EditCouplingSection
                universalHoseData={universalHoseData}
                onInputChange={onInputChange}
              />
            )}
          </Section>
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
          <Datafield label='WP Bar' value={universalHoseData.wpBar} />
          <Datafield label='WP Psi' value={universalHoseData.wpPsi} />
          <Section title='Coupling end 1'>
            <CouplingSection universalHoseData={universalHoseData} />
          </Section>
          <Section title='Coupling end 2'>
            <CouplingSection universalHoseData={universalHoseData} />
          </Section>
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
  sectionContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  checkbox: {
    marginRight: 8,
  },
});

export default UniversalHoseData;
