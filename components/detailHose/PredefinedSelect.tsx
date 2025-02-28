import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';
import { RadioButton } from './radioButton';
import { Input } from '../UI/Input/input';

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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInitialValue(selected);
    setSelectedValue(selected);
  }, [selected]);

  const handleSave = () => {
    setSelectedValue(inputValue);
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

  const handleNAPress = () => {
    setSelectedValue('N/A');
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
        <Pressable
          key={'N/A'}
          style={[
            styles.option,
            selectedValue === 'N/A' && styles.selectedOption,
          ]}
          onPress={() => handleNAPress()}
        >
          <RadioButton
            isSelected={selectedValue === 'N/A'}
            onChange={() => handleNAPress()}
            id={''}
            label={'N/A'}
            menu
          />
        </Pressable>
        {selectedValue === 'N/A' && (
          <View style={styles.manualInput}>
            <Input
              placeHolder='Add comment'
              value={inputValue}
              onChangeText={(value) => setInputValue(value)}
              multiline
              label='Comment:'
            />
          </View>
        )}
      </ScrollView>
      <Pressable />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Typography name={'button'} style={styles.cancelButtonText}>
            Cancel
          </Typography>
        </Pressable>
        {selectedValue === 'N/A' && (
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Typography name={'button'} style={styles.saveButtonText}>
              Save & Close
            </Typography>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  manualInput: {
    width: '80%',
    margin: 20,
  },
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
