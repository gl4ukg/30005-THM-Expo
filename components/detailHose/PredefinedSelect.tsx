import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';
import { RadioButton } from './radioButton';

interface PredefinedSelectProps {
  options: { id: string; label: string }[];
  onSelect: (value: string) => void;
  selected: string;
  onClose: () => void;
}

export const PredefinedSelect: React.FC<PredefinedSelectProps> = ({
  options,
  onSelect,
  selected,
  onClose,
}) => {
  const [selectedValue, setSelectedValue] = useState(selected);
  const [initialValue, setInitialValue] = useState(selected);

  useEffect(() => {
    setInitialValue(selected);
    setSelectedValue(selected);
  }, [selected]);

  const handleSave = () => {
    onSelect(selectedValue);
    onClose();
  };

  const handleCancel = () => {
    setSelectedValue(initialValue);
    onSelect(initialValue);
    onClose();
  };

  const handleOptionPress = (optionId: string) => {
    setSelectedValue(optionId);
    onSelect(optionId);
    onClose();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.option,
              selectedValue === option.id && styles.selectedOption,
            ]}
            onPress={() => handleOptionPress(option.id)}
          >
            <RadioButton
              isSelected={selectedValue === option.id}
              onChange={() => handleOptionPress(option.id)}
              id={''}
              label={option.label}
              menu
            />
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Typography name={'button'} style={styles.cancelButtonText}>
            Cancel
          </Typography>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Typography name={'button'} style={styles.saveButtonText}>
            Save & Close
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: '90%',
  },
  selectedOption: {
    borderRadius: 10,
    borderColor: colors.primary,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: colors.white,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: colors.white,
  },
});
