import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
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
  const [manualInput, setManualInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setInitialValue(selected);
    setSelectedValue(selected);
    if (
      !options.some((option) => option.id === selected) &&
      selected !== 'N/A'
    ) {
      setManualInput(selected);
      setSelectedValue('N/A');
    } else {
      setManualInput('');
    }
  }, [selected, options]);

  const handleSave = () => {
    if (selectedValue === 'N/A' && manualInput.trim() !== '') {
      onSelect(manualInput);
    } else {
      onSelect(selectedValue);
    }
    onClose();
  };

  const handleCancel = () => {
    setSelectedValue(initialValue);
    setManualInput('');
    onSelect(initialValue);
    onClose();
  };

  const handleOptionPress = (optionId: string) => {
    setSelectedValue(optionId);
    setManualInput('');
    onSelect(optionId);
    onClose();
  };

  const handleNAPress = () => {
    setSelectedValue('N/A');
    setTimeout(() => {
      textInputRef.current?.focus();
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleTextChange = (text: string) => {
    setManualInput(text);
  };

  const notStandardChoice = (selected: string) => {
    return !options.some((option) => option.id === selected) && selected !== '';
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        {options.map((option, i) => (
          <Pressable
            key={i}
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
            id={'na'}
            label={'N/A'}
            menu
          />
        </Pressable>
        {selectedValue === 'N/A' && (
          <KeyboardAvoidingView>
            <TextInput
              ref={textInputRef}
              style={styles.manualInput}
              placeholder='Enter manual option'
              value={manualInput}
              onChangeText={handleTextChange}
            />
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {selectedValue === 'N/A' && (
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Typography name={'button'}>Save & Close</Typography>
          </Pressable>
        )}
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Typography name={'button'}>Cancel</Typography>
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
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    borderColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
  },

  cancelButton: {
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  manualInput: {
    height: 40,
    borderColor: colors.secondary95,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});
