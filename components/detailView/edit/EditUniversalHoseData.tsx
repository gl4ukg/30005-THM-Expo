import { Bookmark } from '@/components/detailView/common/Bookmark';
import { BarToPsiInput } from '@/components/detailView/edit/BarToPsiInput';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { UnitInput } from '@/components/detailView/edit/UnitInput';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { EditProps } from '@/lib/types/edit';
import { UHD } from '@/lib/types/hose';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const couplingsFields = [
  'materialQuality',
  'typeFitting',
  'innerDiameter',
  'gender',
  'angle',
  'commentEnd',
] as const;

const couplingsFieldsEnd = couplingsFields.map((field) => `${field}2` as const);

export type CouplingsFields = (typeof couplingsFields)[number];
export type CouplingsFieldsEnd = (typeof couplingsFieldsEnd)[number];

export const isFieldACouplingField = (
  field: keyof UHD,
): field is CouplingsFields => {
  return !!couplingsFields.find((f) => f === field);
};
export const isFieldACouplingFieldEnd = (
  field: keyof UHD,
): field is CouplingsFieldsEnd => {
  return !!couplingsFieldsEnd.find((f) => f === field);
};

const calculateDefaultDescription = (data: Partial<UHD>): string => {
  const { hoseStandard, innerDiameter, totalLength } = data;
  if (hoseStandard && innerDiameter && totalLength) {
    return `${hoseStandard}-${innerDiameter} x ${totalLength} mm`;
  }
  return '';
};

export const EditUniversalHoseData: React.FC<EditProps<Partial<UHD>>> = ({
  info,
  onInputChange,
}) => {
  const [localInfo, setLocalInfo] = useState<Partial<UHD>>(info);
  const [sameAsEnd1, setSameAsEnd1] = useState(false);

  useEffect(() => {
    const initialDescription =
      info.description || calculateDefaultDescription(info);
    const newLocalInfo = { ...info, description: initialDescription };
    setLocalInfo(newLocalInfo);

    if (initialDescription !== info.description && initialDescription) {
      onInputChange('description', initialDescription);
    }

    let endsMatch = couplingsFields.length > 0;
    if (endsMatch) {
      for (const key of couplingsFields) {
        const key2 = `${key}2` as keyof UHD;
        if (info[key] !== info[key2]) {
          endsMatch = false;
          break;
        }
      }
    }
    const end1HasValues = couplingsFields.some(
      (key) => info[key] != null && info[key] !== '',
    );
    setSameAsEnd1(endsMatch && end1HasValues);
  }, [info]);

  const syncEndFields = () => {
    const updatedInfo = { ...localInfo };
    couplingsFields.every((key) => {
      updatedInfo[`${key}2`] = updatedInfo[key];
    });
    setLocalInfo(updatedInfo);
  };

  const handleCheckboxChange = () => {
    const newSameAsEnd1 = !sameAsEnd1;
    setSameAsEnd1(newSameAsEnd1);
    syncEndFields();
  };

  const handleFieldChange = (field: keyof UHD, value: any) => {
    const oldInfo = { ...localInfo };
    let nextInfo = { ...oldInfo, [field]: value };

    let descriptionToSet = nextInfo.description;

    if (field === 'description') {
      descriptionToSet = value;
    } else if (
      ['hoseStandard', 'innerDiameter', 'totalLength'].includes(field)
    ) {
      descriptionToSet = calculateDefaultDescription(nextInfo);
    }

    nextInfo.description = descriptionToSet;

    if (sameAsEnd1 && isFieldACouplingField(field)) {
      const end2Field = `${field}2` as const;
      nextInfo[end2Field] = value;
    }

    setLocalInfo(nextInfo);

    onInputChange(field, value);

    if (nextInfo.description !== oldInfo.description) {
      onInputChange('description', nextInfo.description);
    }

    if (sameAsEnd1 && isFieldACouplingField(field)) {
      const end2Field = `${field}2` as const;
      onInputChange(end2Field, value);
    }

    if (sameAsEnd1 && isFieldACouplingFieldEnd(field)) {
      const baseField = field.substring(0, field.length - 1) as CouplingsFields;
      if (value !== nextInfo[baseField]) {
        setSameAsEnd1(false);
      }
    }
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
        <Select
          label='Hose Standard'
          selectedOption={localInfo.hoseStandard}
          onChange={(value) => handleFieldChange('hoseStandard', value)}
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
          value={localInfo.innerDiameter || ''}
          onChange={(value) => handleFieldChange('innerDiameter', value)}
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
          title: 'description',
          message: 'This is the description',
        }}
      >
        <Input
          label='Description:'
          value={localInfo.description || ''}
          errorMessage='This is the error message'
          onChangeText={(text) => handleFieldChange('description', text)}
        />
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
        <Select
          label='Material Quality'
          selectedOption={localInfo.materialQuality || ''}
          onChange={(value) => handleFieldChange('materialQuality', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting', message: '' }}>
        <Select
          label='Type Fitting'
          selectedOption={localInfo.typeFitting || ''}
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
        <Select
          label='Inner Diameter'
          selectedOption={localInfo.innerDiameter || ''}
          onChange={(value) => handleFieldChange('innerDiameter', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender', message: '' }}>
        <Select
          label='Gender'
          selectedOption={localInfo.gender || ''}
          onChange={(value) => handleFieldChange('gender', value)}
          required={true}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle', message: '' }}>
        <Select
          label='Angle'
          selectedOption={localInfo.angle || ''}
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
          value={localInfo.commentEnd || ''}
          onChangeText={(text) => handleFieldChange('commentEnd', text)}
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
        <Select
          label='Material Quality'
          selectedOption={localInfo.materialQuality2 || ''}
          onChange={(value) => handleFieldChange('materialQuality2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting 2', message: '' }}>
        <Select
          label='Type Fitting'
          selectedOption={localInfo.typeFitting2 || ''}
          onChange={(value) => handleFieldChange('typeFitting2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Inner Diameter 2', message: '' }}>
        <Select
          label='Inner Diameter 2'
          selectedOption={localInfo.innerDiameter2 || ''}
          onChange={(value) => handleFieldChange('innerDiameter2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender 2', message: '' }}>
        <Select
          label='Gender'
          selectedOption={localInfo.gender2 || ''}
          onChange={(value) => handleFieldChange('gender2', value)}
          required={true}
          options={[]}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle 2', message: '' }}>
        <Select
          label='Angle'
          selectedOption={localInfo.angle2 || ''}
          onChange={(value) => handleFieldChange('angle2', value)}
          options={[]}
        />
      </TooltipWrapper>

      <View style={styles.inputContainer}>
        <Input
          label='Comment End 2'
          value={localInfo.commentEnd2 || ''}
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
