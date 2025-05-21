import { colors } from '@/lib/tokens/colors';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { Typography } from '../../Typography';
import { Icon } from '@/components/Icon/Icon';

type UnitInputProps = {
  label?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  unit: string;
  editable?: boolean;
  required?: boolean;
  alwaysShowFeilIfMissing?: boolean;
};

export const UnitInput: React.FC<UnitInputProps> = ({
  label,
  value,
  onChange,
  unit,
  required = false,
  editable = true,
  alwaysShowFeilIfMissing = false,
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
    let processed: string | null = inputValue;

    // Handle empty input or standalone characters
    if (['', '-', '.'].includes(processed)) {
      onChange(null);
      setInputValue('');
      return;
    }

    // Add leading zero if needed
    if (processed.startsWith('.')) {
      processed = `0${processed}`;
    }

    // Remove trailing decimal
    if (processed.endsWith('.')) {
      processed = processed.slice(0, -1);
    }

    // Handle negative zero case
    if (processed === '-0') processed = '0';

    const numericValue = parseFloat(processed);
    onChange(numericValue);
    setInputValue(numericValue.toString());
  };
  const isRequiredValueMissing =
    (required && !inputValue && isTouched) || alwaysShowFeilIfMissing;

  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <Typography
            name='navigation'
            text={label}
            style={[
              styles.label,
              isRequiredValueMissing && styles.labelError,
              !editable && styles.disabledText,
            ]}
          />
          {isRequiredValueMissing && editable && (
            <Icon name='Alert' color={colors.error} size='xsm' />
          )}
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            !editable && styles.disabledInput,
            isRequiredValueMissing && editable && styles.errorBorder,
            isFocused && !isRequiredValueMissing && styles.inputFocused,
          ]}
          keyboardType='numeric'
          value={inputValue}
          onChangeText={(text) => setInputValue(text.replace(',', '.'))}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          selectionColor={colors.primary}
          editable={editable}
        />
        <Typography
          name='navigation'
          text={unit}
          style={[
            styles.unitLabel,
            isRequiredValueMissing && styles.unitError,
            !editable && styles.disabledText,
          ]}
        />
      </View>
      {/* Show error message if required and missing */}
      {isRequiredValueMissing && editable && (
        <Typography
          name={'navigation'}
          text='Required field'
          style={[styles.errorMessage]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.strokeInputField,
    backgroundColor: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 1,

    minWidth: 80,
    fontSize: 16,
    lineHeight: 22,
    color: colors.extended333,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 11,
  },
  label: {
    color: colors.extended666,
  },
  labelError: {
    color: colors.errorText,
  },
  unitLabel: {
    color: colors.extended666,
    paddingBottom: 2,
    paddingRight: 5,
  },
  unitError: {
    color: colors.errorText,
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  disabledInput: {
    backgroundColor: colors.secondary95,
    borderColor: colors.secondary95,
    color: colors.extended666,
  },
  disabledText: {
    color: colors.extended666,
    opacity: 0.7,
  },
  errorMessage: {
    color: colors.errorText,
    position: 'absolute',
    left: 0,
    bottom: -22,
    fontSize: 12,
    lineHeight: 16,
  },
});
