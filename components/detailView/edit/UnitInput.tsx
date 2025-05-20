import { colors } from '@/lib/tokens/colors';
import { useCallback, useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { Typography } from '../../Typography';
import { Icon } from '@/components/Icon/Icon';

type UnitInputProps = {
  label?: string;
  value: number;
  onChangeText: (value: number) => void;
  unit: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
  isMissing?: boolean;
};

export const UnitInput: React.FC<UnitInputProps> = ({
  label,
  value,
  onChangeText,
  unit,
  editable = true,
  keyboardType = 'numeric',
  required,
  isMissing,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    if (editable) setIsFocused(true);
  }, [setIsFocused, editable]);

  const handleBlur = useCallback(() => {
    if (editable) setIsFocused(false);
  }, [setIsFocused, editable]);

  const handleChange = (text: string) => {
    if (text === '') {
      onChangeText(NaN);
      return;
    }

    const numericRegex = /^[0-9]*\.?[0-9]*$/;
    if (numericRegex.test(text)) {
      const parsedValue = parseFloat(text);

      if (!isNaN(parsedValue) || text === '.') {
        onChangeText(parsedValue);
      }
    }
  };

  const isRequiredValueMissing =
    (required && (isNaN(value) || !value)) || isMissing;

  const displayValue = isNaN(value) ? '' : value;

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
            isFocused &&
              editable &&
              !isRequiredValueMissing &&
              styles.inputFocused,
          ]}
          keyboardType={keyboardType}
          value={displayValue.toString()}
          onChangeText={handleChange}
          onFocus={handleFocus}
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
    right: 0,
    bottom: -22,
    fontSize: 12,
    lineHeight: 16,
  },
});
