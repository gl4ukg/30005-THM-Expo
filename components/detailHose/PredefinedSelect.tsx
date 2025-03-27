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
import { ButtonTHS } from '../UI';
import { Input } from '@/components/UI/Input/input';

interface PredefinedSelectProps {
  options: { id: string; label: string }[];
  onSelect: (value: string) => void;
  selected: string;
  onClose: () => void;
  title: string;
  onlyOptions?: boolean;
}

export const PredefinedSelect: React.FC<PredefinedSelectProps> = ({
  options,
  onSelect,
  selected,
  onClose,
  title,
  onlyOptions = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(selected);
  const [initialValue, setInitialValue] = useState(selected);
  const [manualInput, setManualInput] = useState('');
  const [searchText, setSearchText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setInitialValue(selected);
    setSelectedValue(selected);
    if (
      !options.some((option) => option.id === selected) &&
      selected !== 'N/A' &&
      selected !== ''
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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography name='navigation' text={title} style={styles.title} />
        <View>
          <Typography name='navigationBold' text='Not sure what to choose?' />
          <Typography
            name='navigation'
            text={
              'Text, context-sensitive, for help or instructions/advice, related to what to chose in each spesific list.'
            }
          />
        </View>
        {!onlyOptions && (
          <Input
            value={searchText}
            onChangeText={setSearchText}
            label='Type to search:'
            placeHolder='...'
          />
        )}
      </View>
      <ScrollView ref={scrollViewRef} style={styles.optionsContainer}>
        {filteredOptions
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((option) => (
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
        {!onlyOptions && (
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
        )}
        {selectedValue === 'N/A' && !onlyOptions && (
          <KeyboardAvoidingView>
            <Input
              // ref={textInputRef}
              label='Comment:'
              // style={styles.manualInput}
              placeHolder='Enter manual option'
              value={manualInput}
              onChangeText={handleTextChange}
            />
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        {selectedValue === 'N/A' && (
          <ButtonTHS
            title='Save & close'
            onPress={handleSave}
            variant='secondary'
            size='sm'
            style={styles.button}
          />
        )}
        <ButtonTHS
          title='Cancel'
          onPress={handleCancel}
          variant='tertiary'
          size='sm'
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 50,
    gap: 20,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'stretch',
    width: '100%',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    width: '100%',
  },
  optionsContainer: {},
  selectedOption: {
    borderRadius: 10,
    borderColor: colors.primary,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
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
  searchInput: {
    height: 40,
    borderColor: colors.secondary95,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  titleContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  buttonsContainer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  button: {
    maxWidth: 220,
  },
});
