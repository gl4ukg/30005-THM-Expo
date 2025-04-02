import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';

type UnitInputProps = {
  label?: string;
  value: number;
  onChangeText: (value: number) => void;
  unit: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const UnitInput: React.FC<UnitInputProps> = ({
  label,
  value,
  onChangeText,
  unit,
  editable = true,
  keyboardType = 'numeric',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  const handleChange = (text: string) => {
    const parsedValue = parseFloat(text);
    if (!isNaN(parsedValue)) {
      onChangeText(parsedValue);
    } else if (text === '') {
      onChangeText(0);
    }
  };

  return (
    <View>
      {label && (
        <Typography name='navigation' text={label} style={styles.label} />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            { color: colors.extended666 },
            styles.input,
            isFocused && styles.inputFocused,
          ]}
          keyboardType={keyboardType}
          value={value ? value.toString() : ''}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={colors.primary}
          editable={editable}
        />
        <Typography name='navigation' text={unit} style={styles.label} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 5,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.strokeInputField,
    backgroundColor: colors.white,
    padding: 8,
    flex: 1,
    maxWidth: 120,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  label: {
    marginBottom: 5,
    color: colors.extended666,
  },
});

export default UnitInput;
