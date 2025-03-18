import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';

type UnitInputProps = {
  unit: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  onBlur?: () => void;
};

const UnitInput = ({
  unit,
  value,
  onChangeText,
  onBlur,
  label,
}: UnitInputProps) => {
  return (
    <View>
      {label && <Typography name='fieldLabel' text={label} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
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
});

export default UnitInput;
