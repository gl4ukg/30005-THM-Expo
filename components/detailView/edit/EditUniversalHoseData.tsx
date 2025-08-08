import { Bookmark } from '@/components/detailView/common/Bookmark';
import { BarToPsiInput } from '@/components/detailView/edit/BarToPsiInput';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { UnitInput } from '@/components/detailView/edit/UnitInput';
import {
  useFieldDependencies,
  buildDependencyConfig,
  type FieldDependencyConfig,
  type DependencyMap,
} from '@/components/detailView/edit/useFieldDependencies';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/Input';
import { Select } from '@/components/UI/SelectModal/Select';
import { type UHD } from '@/lib/types/hose';
import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { options } from './fakeOptions';

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

const uhdDependencyMap: DependencyMap<UHD> = {
  hoseStandard: {
    childField: 'innerDiameter',
    filterMap: {
      '1SC': ['6L M12x1,5', '6S M14x1,5', '8L M14x1,5'],
      '2SC': ['8S M16x1,5', '10L M16x1,5', '10S M18x1,5', '12L M18x1,5'],
      '1SN': ['12S M20x1,5', '14S M22x1,5', '15L M22x1,5', '16S M24x1,5'],
      '2SN': ['18L M26x1,5', '20S M30x2', '22L M30x2', '25S M36x2'],
      '4SP': ['28L M36x2', '30S M42x2', '35L M45x2', '38S M52x2'],
      '4SH': ['42L M52x2', '6L M12x1,5', '8S M16x1,5', '12L M18x1,5'],
      R13: ['15L M22x1,5', '20S M30x2', '25S M36x2', '30S M42x2'],
      R15: ['35L M45x2', '38S M52x2', '42L M52x2'],
      ISO18752: ['6S M14x1,5', '10S M18x1,5', '16S M24x1,5', '22L M30x2'],
      'Steel 1 Layer': ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5'],
      'Steel 2 Layer': ['12L M18x1,5', '15L M22x1,5', '18L M26x1,5'],
      'LP Sea Water': ['20S M30x2', '25S M36x2', '30S M42x2'],
      'LP Fresh Water': ['22L M30x2', '28L M36x2', '35L M45x2'],
      'LP Air': ['6L M12x1,5', '10L M16x1,5', '15L M22x1,5'],
      'LP N2': ['8S M16x1,5', '12S M20x1,5', '16S M24x1,5'],
      'LP HC': ['14S M22x1,5', '18L M26x1,5', '22L M30x2'],
      Thermoplast: ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5', '12L M18x1,5'],
    },
  },
  innerDiameter: {
    childField: 'materialQualityEnd1',
    filterMap: {
      '6L M12x1,5': ['AISI 316', 'Carbon steel', 'Brass'],
      '6S M14x1,5': ['AISI 316', 'Carbon steel', 'Duplex 22Cr'],
      '8L M14x1,5': ['AISI 316', 'Carbon steel', '6MO'],
      '8S M16x1,5': ['AISI 316', 'Carbon steel', 'Superduplex 25Cr'],
      '10L M16x1,5': ['Carbon steel', 'Cast iron'],
      '12L M18x1,5': ['AISI 316', 'Carbon steel', 'Titan'],
      '20S M30x2': ['6MO', 'Duplex 22Cr', 'Superduplex 25Cr'],
      '25S M36x2': ['Hastelloy', 'Titan'],
    },
  },
  materialQualityEnd1: {
    childField: 'typeFittingEnd1',
    filterMap: {
      '6MO': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      'AISI 316': ['BSP', 'JIC', 'NPT', 'SAE3000', 'TW Female', 'TW Male'],
      Aluminum: [
        'CAM-LOCK type A',
        'CAM-LOCK type B',
        'CAM-LOCK type C',
        'CAM-LOCK type D',
        'CAM-LOCK type DC',
        'CAM-LOCK type DP',
        'CAM-LOCK type E',
        'CAM-LOCK type F',
      ],
      Brass: ['BSP', 'NPT', 'Clawcoupling', 'Clawc. AM'],
      'Carbon steel': ['JIC', 'SAE3000', 'SAE6000', 'Flange ASA 150 rf'],
      'Cast iron': ['DIN 2633 Flange', 'Flange ASA 150 rf'],
      'Duplex 22Cr': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      Hastelloy: ['DIN 2633 Flange', 'BOSS'],
      'Superduplex 25Cr': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      Titan: ['DIN 2633 Flange', 'BOSS'],
    },
  },
  typeFittingEnd1: {
    childField: 'genericDimensionEnd1',
    filterMap: {
      BSP: ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5', '12L M18x1,5'],
      JIC: ['6S M14x1,5', '8S M16x1,5', '10S M18x1,5', '12S M20x1,5'],
      MM: ['14S M22x1,5', '15L M22x1,5', '16S M24x1,5', '18L M26x1,5'],
      NPT: ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5', '12L M18x1,5'],
      SAE3000: ['20S M30x2', '22L M30x2', '25S M36x2', '28L M36x2'],
      SAE6000: ['30S M42x2', '35L M45x2', '38S M52x2', '42L M52x2'],
      'CAM-LOCK type A': ['6L M12x1,5', '8L M14x1,5'],
      'CAM-LOCK type B': ['10L M16x1,5', '12L M18x1,5'],
      'CAM-LOCK type C': ['15L M22x1,5', '18L M26x1,5'],
      'CAM-LOCK type D': ['22L M30x2', '28L M36x2'],
      'CAM-LOCK type DC': ['6S M14x1,5', '8S M16x1,5'],
      'CAM-LOCK type DP': ['10S M18x1,5', '12S M20x1,5'],
      'CAM-LOCK type E': ['14S M22x1,5', '16S M24x1,5'],
      'CAM-LOCK type F': ['20S M30x2', '25S M36x2'],
      'TW Female': ['30S M42x2', '35L M45x2'],
      'TW Male': ['38S M52x2', '42L M52x2'],
      'DDC Hose unit': ['6L M12x1,5', '6S M14x1,5', '8L M14x1,5', '8S M16x1,5'],
      Clawcoupling: [
        '10L M16x1,5',
        '10S M18x1,5',
        '12L M18x1,5',
        '12S M20x1,5',
      ],
      'Clawc. AM': ['14S M22x1,5', '15L M22x1,5', '16S M24x1,5', '18L M26x1,5'],
      'DIN 2633 Flange': ['20S M30x2', '22L M30x2', '25S M36x2', '28L M36x2'],
      'Flange ASA 150 rf': ['30S M42x2', '35L M45x2', '38S M52x2', '42L M52x2'],
      BOSS: ['18L M26x1,5', '20S M30x2', '22L M30x2', '25S M36x2'],
    },
  },
  materialQualityEnd2: {
    childField: 'typeFittingEnd2',
    filterMap: {
      '6MO': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      'AISI 316': ['BSP', 'JIC', 'NPT', 'SAE3000', 'TW Female', 'TW Male'],
      Aluminum: [
        'CAM-LOCK type A',
        'CAM-LOCK type B',
        'CAM-LOCK type C',
        'CAM-LOCK type D',
        'CAM-LOCK type DC',
        'CAM-LOCK type DP',
        'CAM-LOCK type E',
        'CAM-LOCK type F',
      ],
      Brass: ['BSP', 'NPT', 'Clawcoupling', 'Clawc. AM'],
      'Carbon steel': ['JIC', 'SAE3000', 'SAE6000', 'Flange ASA 150 rf'],
      'Cast iron': ['DIN 2633 Flange', 'Flange ASA 150 rf'],
      'Duplex 22Cr': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      Hastelloy: ['DIN 2633 Flange', 'BOSS'],
      'Superduplex 25Cr': ['SAE6000', 'DIN 2633 Flange', 'BOSS'],
      Titan: ['DIN 2633 Flange', 'BOSS'],
    },
  },
  typeFittingEnd2: {
    childField: 'genericDimensionEnd2',
    filterMap: {
      BSP: ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5', '12L M18x1,5'],
      JIC: ['6S M14x1,5', '8S M16x1,5', '10S M18x1,5', '12S M20x1,5'],
      MM: ['14S M22x1,5', '15L M22x1,5', '16S M24x1,5', '18L M26x1,5'],
      NPT: ['6L M12x1,5', '8L M14x1,5', '10L M16x1,5', '12L M18x1,5'],
      SAE3000: ['20S M30x2', '22L M30x2', '25S M36x2', '28L M36x2'],
      SAE6000: ['30S M42x2', '35L M45x2', '38S M52x2', '42L M52x2'],
      'CAM-LOCK type A': ['6L M12x1,5', '8L M14x1,5'],
      'CAM-LOCK type B': ['10L M16x1,5', '12L M18x1,5'],
      'CAM-LOCK type C': ['15L M22x1,5', '18L M26x1,5'],
      'CAM-LOCK type D': ['22L M30x2', '28L M36x2'],
      'CAM-LOCK type DC': ['6S M14x1,5', '8S M16x1,5'],
      'CAM-LOCK type DP': ['10S M18x1,5', '12S M20x1,5'],
      'CAM-LOCK type E': ['14S M22x1,5', '16S M24x1,5'],
      'CAM-LOCK type F': ['20S M30x2', '25S M36x2'],
      'TW Female': ['30S M42x2', '35L M45x2'],
      'TW Male': ['38S M52x2', '42L M52x2'],
      'DDC Hose unit': ['6L M12x1,5', '6S M14x1,5', '8L M14x1,5', '8S M16x1,5'],
      Clawcoupling: [
        '10L M16x1,5',
        '10S M18x1,5',
        '12L M18x1,5',
        '12S M20x1,5',
      ],
      'Clawc. AM': ['14S M22x1,5', '15L M22x1,5', '16S M24x1,5', '18L M26x1,5'],
      'DIN 2633 Flange': ['20S M30x2', '22L M30x2', '25S M36x2', '28L M36x2'],
      'Flange ASA 150 rf': ['30S M42x2', '35L M45x2', '38S M52x2', '42L M52x2'],
      BOSS: ['18L M26x1,5', '20S M30x2', '22L M30x2', '25S M36x2'],
    },
  },
};

const allDependencyOptions = [
  ...new Set(
    Object.values(uhdDependencyMap).flatMap((dependency) => {
      if (!dependency) return [];
      const parentOptions = Object.keys(dependency.filterMap);
      const childOptions = Object.values(dependency.filterMap).flat();
      return [...parentOptions, ...childOptions];
    }),
  ),
];

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
    () => buildDependencyConfig(uhdDependencyMap, allDependencyOptions),
    [],
  );

  const { getFilteredOptionsForField, shouldResetField, isParentField } =
    useFieldDependencies(localInfo, fieldDependencyConfig);

  const getCascadingChildren = (parentField: keyof UHD): (keyof UHD)[] => {
    const dependency = uhdDependencyMap[parentField];
    if (!dependency?.childField) {
      return [];
    }
    const childField = dependency.childField;
    return [childField, ...getCascadingChildren(childField)];
  };

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
    let nextInfo = { ...localInfo, [field]: value };

    if (isParentField(field)) {
      const fieldsToReset = getCascadingChildren(field);
      fieldsToReset.forEach((childField) => {
        nextInfo[childField] = '';
        onInputChange(childField as keyof Partial<UHD>, '');
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

    if (nextInfo.itemDescription !== localInfo.itemDescription) {
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
            options={Object.keys(uhdDependencyMap.hoseStandard!.filterMap)}
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
          selectedOption={localInfo.materialQualityEnd2 || ''}
          onChange={(value) => handleFieldChange('materialQualityEnd2', value)}
          options={getFilteredOptionsForField('materialQualityEnd2')}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Type Fitting 2', message: '' }}>
        <Select
          label='Type Fitting'
          selectedOption={localInfo.typeFittingEnd2 || ''}
          onChange={(value) => handleFieldChange('typeFittingEnd2', value)}
          options={getFilteredOptionsForField('typeFittingEnd2')}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper
        tooltipData={{ title: 'Generic Dimension 2', message: '' }}
      >
        <Select
          label='Generic Dimension'
          selectedOption={localInfo.genericDimensionEnd2 || ''}
          onChange={(value) => handleFieldChange('genericDimensionEnd2', value)}
          options={getFilteredOptionsForField('genericDimensionEnd2')}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Gender 2', message: '' }}>
        <Select
          label='Gender'
          selectedOption={localInfo.genderEnd2 || ''}
          onChange={(value) => handleFieldChange('genderEnd2', value)}
          required={showValidationErrors}
          options={options}
        />
      </TooltipWrapper>

      <TooltipWrapper tooltipData={{ title: 'Angle 2', message: '' }}>
        <Select
          label='Angle'
          selectedOption={localInfo.angleEnd2 || ''}
          onChange={(value) => handleFieldChange('angleEnd2', value)}
          options={options}
          required={showValidationErrors}
        />
      </TooltipWrapper>

      <View style={styles.inputContainer}>
        <Input
          label='Comment End 2'
          value={localInfo.commentEnd2PTC || ''}
          onChangeText={(text) => handleFieldChange('commentEnd2PTC', text)}
          disabled={sameAsEnd1}
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
