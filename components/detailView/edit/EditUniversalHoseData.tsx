import { Bookmark } from '@/components/detailView/common/Bookmark';
import { BarToPsiInput } from '@/components/detailView/edit/BarToPsiInput';
import { options } from '@/components/detailView/edit/fakeOptions';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { UnitInput } from '@/components/detailView/edit/UnitInput';
import {
  useFieldDependencies,
  createDependencyRule,
  createDefaultFilter,
  createMockHoseStandardFilter,
  createMockCouplingFilter,
  type FieldDependencyConfig,
} from '@/components/detailView/edit/useFieldDependencies';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { UHD } from '@/lib/types/hose';
import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export const couplingsFields = [
  'materialQualityEnd1',
  'typeFittingEnd1',
  'genericDimensionEnd1',
  'genderEnd1',
  'angleEnd1',
  'commentEnd1PTC',
] as const;

const couplingsFieldsEnd = [
  'materialQualityEnd2',
  'typeFittingEnd2',
  'genericDimensionEnd2',
  'genderEnd2',
  'angleEnd2',
  'commentEnd2PTC',
] as const;

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

const buildDescription = (data: {
  hoseStandard?: string;
  innerDiameter?: string;
  hoseLength?: string;
  description?: string;
}): string => {
  const { hoseStandard, innerDiameter, hoseLength, description } = data;
  return hoseStandard && innerDiameter && hoseLength
    ? `${hoseStandard}-${innerDiameter} x ${hoseLength} mm`
    : (description ?? '');
};

export const EditUniversalHoseData: React.FC<{
  info: Partial<UHD>;
  onInputChange: (
    field: keyof Partial<UHD>,
    value: Partial<UHD>[keyof Partial<UHD>],
  ) => void;
  showValidationErrors?: boolean;
}> = ({ info, onInputChange, showValidationErrors }) => {
  const [sameAsEnd1, setSameAsEnd1] = useState(false);
  const [localInfo, setLocalInfo] = useState<Partial<UHD>>(info);

  const fieldDependencyConfig: FieldDependencyConfig<UHD> = useMemo(
    () => ({
      rules: [
        createDependencyRule<UHD>(
          'hoseStandard',
          'innerDiameter',
          createMockHoseStandardFilter(),
        ),
        createDependencyRule<UHD>(
          'materialQualityEnd1',
          'typeFittingEnd1',
          createMockCouplingFilter(),
        ),
        createDependencyRule<UHD>(
          'typeFittingEnd1',
          'genericDimensionEnd1',
          createMockCouplingFilter(),
        ),
      ],
      allOptions: options,
    }),
    [],
  );

  const { getFilteredOptionsForField, shouldResetField, isParentField } =
    useFieldDependencies(localInfo, fieldDependencyConfig);

  useEffect(() => {
    const newLocalInfo = { ...info };
    setLocalInfo(newLocalInfo);
    let endsMatch = couplingsFields.length > 0;
    if (endsMatch) {
      for (let i = 0; i < couplingsFields.length; i++) {
        const key1 = couplingsFields[i];
        const key2 = couplingsFieldsEnd[i];

        if (info[key1] !== info[key2]) {
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
    couplingsFields.forEach((key1, index) => {
      const key2 = couplingsFieldsEnd[index];
      const valueToSync = info[key1];
      onInputChange(key2 as keyof Partial<UHD>, valueToSync);
    });
  };

  const handleCheckboxChange = () => {
    const newSameAsEnd1 = !sameAsEnd1;
    setSameAsEnd1(newSameAsEnd1);
    if (newSameAsEnd1) {
      syncEndFields();
    }
  };

  const handleFieldChange = (field: keyof UHD, value: any) => {
    const oldInfo = { ...localInfo };
    let nextInfo = { ...oldInfo, [field]: value };

    if (isParentField(field)) {
      const tempData = { ...localInfo, [field]: value };
      const config = { ...fieldDependencyConfig };

      config.rules.forEach((rule) => {
        if (rule.parentField === field) {
          const currentChildValue = localInfo[rule.childField] as
            | string
            | undefined;
          const newFilteredOptions = rule.getFilteredOptions(
            value,
            config.allOptions,
          );

          if (
            currentChildValue &&
            !newFilteredOptions.includes(currentChildValue)
          ) {
            nextInfo[rule.childField] = '';
            onInputChange(rule.childField as keyof Partial<UHD>, '');
          }
        }
      });
    }

    if (['hoseStandard', 'innerDiameter', 'hoseLength_mm'].includes(field)) {
      const descriptionData = {
        ...nextInfo,
        hoseLength:
          typeof nextInfo.hoseLength_mm === 'number'
            ? String(nextInfo.hoseLength_mm)
            : nextInfo.hoseLength_mm,
      };
      nextInfo.itemDescription = buildDescription(descriptionData);
    }

    onInputChange(field, value);

    if (sameAsEnd1 && isFieldACouplingField(field)) {
      const end1Index = couplingsFields.indexOf(field);
      if (end1Index !== -1) {
        const end2Field = couplingsFieldsEnd[end1Index];
        onInputChange(end2Field as keyof Partial<UHD>, value);
      }
    }

    setLocalInfo(nextInfo);

    if (nextInfo.itemDescription !== oldInfo.itemDescription) {
      onInputChange('itemDescription', nextInfo.itemDescription);
    }

    if (isFieldACouplingFieldEnd(field)) {
      const end2Index = couplingsFieldsEnd.indexOf(field);
      if (end2Index !== -1) {
        const baseField = couplingsFields[end2Index];
        if (value !== info[baseField]) {
          setSameAsEnd1(false);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Universal Hose Data' />
      <View style={styles.section}>
        <TooltipWrapper
          tooltipData={{
            title: 'Hose standard',
            message: 'This is the hose standard',
          }}
        >
          <Select
            label='Hose Standard'
            selectedOption={localInfo.hoseStandard || ''}
            onChange={(value) => handleFieldChange('hoseStandard', value)}
            options={options}
            required={showValidationErrors}
          />
        </TooltipWrapper>
        <TooltipWrapper
          tooltipData={{
            title: 'Inner diameter',
            message: 'This is the Inner diameter',
          }}
        >
          <Select
            label='Inner Diameter'
            selectedOption={localInfo.innerDiameter || ''}
            onChange={(value) => handleFieldChange('innerDiameter', value)}
            options={getFilteredOptionsForField('innerDiameter')}
            required={showValidationErrors}
          />
        </TooltipWrapper>
        <TooltipWrapper
          tooltipData={{
            title: 'Hose Length',
            message: 'This is the hose length',
          }}
        >
          <View style={styles.inputContainer}>
            <UnitInput
              label='Hose Length'
              value={
                localInfo.hoseLength_mm ? Number(localInfo.hoseLength_mm) : null
              }
              onChange={(value: number | null) =>
                handleFieldChange('hoseLength_mm', String(value))
              }
              unit={'mm'}
              required={showValidationErrors}
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
            value={localInfo.itemDescription || ''}
            onChangeText={(text) => handleFieldChange('itemDescription', text)}
            required={showValidationErrors}
          />
        </TooltipWrapper>

        <TooltipWrapper
          tooltipData={{
            title: 'Working pressure',
            message: 'This is the working pressure',
          }}
        >
          <BarToPsiInput
            pressureInBars={info.wp_BAR ? Number(info.wp_BAR) : null}
            onChange={(pressure) => {
              handleFieldChange('wp_BAR', String(pressure.bar));
              handleFieldChange('wp_PSI', String(pressure.psi));
            }}
          />
        </TooltipWrapper>
      </View>
      <View style={styles.sectionTitleContainer}>
        <Typography name='navigationBold' text='Coupling end 1' />
      </View>
      <View style={styles.section}>
        <TooltipWrapper
          tooltipData={{ title: 'Material Quality', message: '' }}
        >
          <Select
            label='Material Quality'
            selectedOption={info.materialQualityEnd1 || ''}
            onChange={(value) =>
              handleFieldChange('materialQualityEnd1', value)
            }
            options={getFilteredOptionsForField('materialQualityEnd1')}
            required={showValidationErrors}
          />
        </TooltipWrapper>

        <TooltipWrapper tooltipData={{ title: 'Type Fitting', message: '' }}>
          <Select
            label='Type Fitting'
            selectedOption={info.typeFittingEnd1 || ''}
            onChange={(value) => handleFieldChange('typeFittingEnd1', value)}
            options={getFilteredOptionsForField('typeFittingEnd1')}
            required={showValidationErrors}
          />
        </TooltipWrapper>

        <TooltipWrapper
          tooltipData={{
            title: 'General Dimension',
            message: 'This is the general dimension for end 1',
          }}
        >
          <Select
            label='General Dimension'
            selectedOption={info.genericDimensionEnd1 || ''}
            onChange={(value) =>
              handleFieldChange('genericDimensionEnd1', value)
            }
            options={getFilteredOptionsForField('genericDimensionEnd1')}
            required={showValidationErrors}
          />
        </TooltipWrapper>

        <TooltipWrapper tooltipData={{ title: 'Gender', message: '' }}>
          <Select
            label='Gender'
            selectedOption={info.genderEnd1 || ''}
            onChange={(value) => handleFieldChange('genderEnd1', value)}
            required={showValidationErrors}
            options={options}
          />
        </TooltipWrapper>

        <TooltipWrapper tooltipData={{ title: 'Angle', message: '' }}>
          <Select
            label='Angle'
            selectedOption={info.angleEnd1 || ''}
            onChange={(value) => handleFieldChange('angleEnd1', value)}
            options={options}
            required={showValidationErrors}
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
            value={info.commentEnd1PTC || ''}
            onChangeText={(text) => handleFieldChange('commentEnd1PTC', text)}
          />
        </TooltipWrapper>
      </View>
      {/* --- Coupling End 2 --- */}
      <TooltipWrapper
        tooltipData={{ title: 'Coupling end 2', message: '' }}
        iconPadding={0}
      >
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
          selectedOption={info.materialQualityEnd2 || ''}
          onChange={(value) => handleFieldChange('materialQualityEnd2', value)}
          options={options}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting 2', message: '' }}>
        <Select
          label='Type Fitting'
          selectedOption={info.typeFittingEnd2 || ''}
          onChange={(value) => handleFieldChange('typeFittingEnd2', value)}
          options={options}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper
        tooltipData={{ title: 'Generic Dimension 2', message: '' }}
      >
        <Select
          label='Generic Dimension'
          selectedOption={info.genericDimensionEnd2 || ''}
          onChange={(value) => handleFieldChange('genericDimensionEnd2', value)}
          options={options}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender 2', message: '' }}>
        <Select
          label='Gender'
          selectedOption={info.genderEnd2 || ''}
          onChange={(value) => handleFieldChange('genderEnd2', value)}
          required={showValidationErrors}
          options={options}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle 2', message: '' }}>
        <Select
          label='Angle'
          selectedOption={info.angleEnd2 || ''}
          onChange={(value) => handleFieldChange('angleEnd2', value)}
          options={options}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <View style={styles.inputContainer}>
        <Input
          label='Comment End 2'
          value={info.commentEnd2PTC || ''}
          onChangeText={(text) => handleFieldChange('commentEnd2PTC', text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 40,
  },
  section: {
    gap: 10,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
