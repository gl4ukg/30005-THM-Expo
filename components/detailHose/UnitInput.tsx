import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';

type UnitInputProps = {
  label?: string;
  value: number | string;
  onChangeText: (value: number | string) => void;
  unit: string;
  editable?: boolean;
};

const UnitInput: React.FC<UnitInputProps> = ({
  label,
  value,
  onChangeText,
  unit,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  const handleChange = (text: string) => {
    onChangeText(text);
  };

  return (
    <View>
      {label && <Typography name='fieldLabel' text={label} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          keyboardType='numeric'
          value={value ? value.toString() : ''}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={colors.primary}
          editable={editable}
        />
        <Typography name='fieldLabel' text={unit} />
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
});

export default UnitInput;
12;
