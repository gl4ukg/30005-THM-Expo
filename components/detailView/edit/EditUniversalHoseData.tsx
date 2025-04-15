import { SelectField } from '@/components/detailView/common/SelectField';
import { BarToPsiInput } from '@/components/detailView/edit/BarToPsiInput';
import { EditProps } from '@/lib/types/edit';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import UnitInput from '@/components/detailView/edit/UnitInput';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/input';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bookmark } from '../common/Bookmark';
import { UHD } from '@/lib/types/hose';

export const EditUniversalHoseData: React.FC<EditProps<UHD>> = ({
  info,
  onInputChange,
}) => {
  const [localInfo, setLocalInfo] = useState<UHD>(info);
  const [sameAsEnd1, setSameAsEnd1] = useState(false);

  useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  const fieldMappings = {
    materialQuality: 'materialQuality2',
    typeFitting: 'typeFitting2',
    innerDiameter: 'innerDiameter2',
    gender: 'gender2',
    angle: 'angle2',
    commentEnd1: 'commentEnd2',
  };

  const syncEndFields = (shouldSync: boolean) => {
    if (shouldSync) {
      const updatedInfo = { ...localInfo };

      Object.entries(fieldMappings).forEach(([end1Field, end2Field]) => {
        const end1Key = end1Field as keyof UHD;
        const end2Key = end2Field as keyof UHD;
        const value = localInfo[end1Key];

        updatedInfo[end2Key] = value;
        onInputChange(end2Key, value);
      });

      setLocalInfo(updatedInfo);
    }
  };

  const handleCheckboxChange = () => {
    const newSameAsEnd1 = !sameAsEnd1;
    setSameAsEnd1(newSameAsEnd1);

    syncEndFields(newSameAsEnd1);
  };

  const handleFieldChange = (field: keyof UHD, value: any) => {
    const updatedInfo = { ...localInfo, [field]: value };

    if (sameAsEnd1 && field in fieldMappings) {
      const end2Field = fieldMappings[field as keyof typeof fieldMappings];
      const end2Key = end2Field as keyof UHD;

      updatedInfo[end2Key] = value;
      onInputChange(end2Key, value);
    }

    const isEnd2Field = Object.values(fieldMappings).includes(field as string);
    if (sameAsEnd1 && isEnd2Field) {
      setSameAsEnd1(false);
    }

    setLocalInfo(updatedInfo);
    onInputChange(field, value);
  };

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
          value={localInfo.hoseStandard}
          onChange={(value) => handleFieldChange('hoseStandard', value)}
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
            value={Number(localInfo.totalLength)}
            onChangeText={(value: number) =>
              handleFieldChange('totalLength', String(value))
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
          pressureInBars={Number(localInfo.wpBar)}
          onChange={(pressure) => {
            handleFieldChange('wpBar', String(pressure.bar));
            handleFieldChange('wpPsi', String(pressure.psi));
          }}
        />
      </TooltipWrapper>

      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>

      <TooltipWrapper tooltipData={{ title: 'Material Quality', message: '' }}>
        <SelectField
          label='Material Quality'
          value={localInfo.materialQuality}
          onChange={(value) => handleFieldChange('materialQuality', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting', message: '' }}>
        <SelectField
          label='Type Fitting'
          value={localInfo.typeFitting}
          onChange={(value) => handleFieldChange('typeFitting', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper
        tooltipData={{
          title: 'Inner Diameter',
          message: 'This is the inner diameter for end 1',
        }}
      >
        <SelectField
          label='Inner Diameter'
          value={localInfo.innerDiameter}
          onChange={(value) => handleFieldChange('innerDiameter', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender', message: '' }}>
        <SelectField
          label='Gender'
          value={localInfo.gender}
          onChange={(value) => handleFieldChange('gender', value)}
          required={true}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle', message: '' }}>
        <SelectField
          label='Angle'
          value={localInfo.angle}
          onChange={(value) => handleFieldChange('angle', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper
        tooltipData={{
          title: 'Comment End 1',
          message: 'This is the comment end 1',
        }}
      >
        <Input
          label='Comment End 1'
          value={localInfo.commentEnd1}
          onChangeText={(text) => handleFieldChange('commentEnd1', text)}
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

      <TooltipWrapper
        tooltipData={{ title: 'Material Quality 2', message: '' }}
      >
        <SelectField
          label='Material Quality'
          value={localInfo.materialQuality2}
          onChange={(value) => handleFieldChange('materialQuality2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting 2', message: '' }}>
        <SelectField
          label='Type Fitting'
          value={localInfo.typeFitting2}
          onChange={(value) => handleFieldChange('typeFitting2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Inner Diameter 2', message: '' }}>
        <SelectField
          label='Inner Diameter 2'
          value={localInfo.innerDiameter2}
          onChange={(value) => handleFieldChange('innerDiameter2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender 2', message: '' }}>
        <SelectField
          label='Gender'
          value={localInfo.gender2}
          onChange={(value) => handleFieldChange('gender2', value)}
          required={true}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle 2', message: '' }}>
        <SelectField
          label='Angle'
          value={localInfo.angle2}
          onChange={(value) => handleFieldChange('angle2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <View style={styles.inputContainer}>
        <Input
          label='Comment End 2'
          value={localInfo.commentEnd2}
          onChangeText={(text) => handleFieldChange('commentEnd2', text)}
        />
      </View>
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
    marginTop: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  tooltipContainer: {
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
