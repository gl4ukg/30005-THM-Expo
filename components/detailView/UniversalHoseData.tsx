import React from 'react';
import { View, StyleSheet } from 'react-native';
import Datafield from './Datafield';
import { UVH } from './types';
import Bookmark from './Bookmark';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { Typography } from '../typography';

interface UniversalHoseDataProps {
  universalHoseData: UVH;
  editMode: boolean;
  onInputChange: (field: string, value: string) => void;
}

const UniversalHoseData = ({
  universalHoseData,
  editMode,
  onInputChange,
}: UniversalHoseDataProps) => {
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
          <Typography name='navigationBold' text='Coupling end 1' />
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
          <Datafield
            label='Material Quality'
            value={universalHoseData.materialQuality}
          />
          <Datafield
            label='Type Fitting'
            value={universalHoseData.typeFitting}
          />
          <Datafield
            label='Inner Diameter 2'
            value={universalHoseData.innerDiameter2}
          />
          <Datafield label='Gender' value={universalHoseData.gender} />
          <Datafield label='Angle' value={universalHoseData.angle} />
          <Datafield
            label='Comment End 1'
            value={universalHoseData.commentEnd1}
          />
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
});

export default UniversalHoseData;
