import { RadioButton } from '@/components/detailView/common/RadioButton';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Input/Input';
import { colors } from '@/lib/tokens/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface Props {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
  onClose: () => void;
  hasAlternativeOption?: boolean;
}

export const RadioSelect: React.FC<Props> = ({
  options,
  onSelect,
  selected,
  onClose,
  title,
  hasAlternativeOption = true,
}) => {
  const [isAlternativeOption, setIsAlternativeOption] = useState(
    !selected || options.includes(selected) ? false : true,
  );
  const [manualInput, setManualInput] = useState(
    !selected ? '' : !options.includes(selected) ? selected : '',
  );
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography name='navigation' text={title} style={styles.title} />
        <View>
          <Typography name='navigationBold' text='Not sure what to choose?' />
          <Typography
            name='navigation'
            text='Text, context-sensitive, for help or instructions/advice, related to what to chose in each specific list.'
          />
        </View>
        {hasAlternativeOption && (
          <Input
            value={searchText}
            onChangeText={setSearchText}
            label='Type to search:'
            placeholder='...'
          />
        )}
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.optionsContainer}
      >
        {options
          .filter((opt) => opt.toLowerCase().includes(searchText.toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
          .map((option) => {
            const id = option.toLowerCase().split(' ').join('-');
            return (
              <RadioButton
                key={id}
                isSelected={!isAlternativeOption && selected === option}
                onChange={() => {
                  setError('');
                  onSelect(option);
                }}
                id={id}
                label={option}
                menu
              />
            );
          })}
        {hasAlternativeOption && (
          <RadioButton
            isSelected={isAlternativeOption}
            onChange={() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              setError('');
              setIsAlternativeOption(true);
              setManualInput('');
            }}
            id={'alternativeOption'}
            label={'N/A'}
            menu
          />
        )}
        {isAlternativeOption && hasAlternativeOption && (
          <KeyboardAvoidingView>
            <Input
              type='textArea'
              label='Comment:'
              placeholder='Enter manual option'
              value={manualInput}
              onChangeText={(text) => {
                setError('');
                setManualInput(text);
              }}
              errorMessage={error}
              validateOnSave={true}
              ref={textInputRef}
            />
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        {isAlternativeOption && (
          <ButtonTHS
            title='Save & close'
            onPress={() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              if (!manualInput.trim() && isAlternativeOption) {
                setError('Please enter a value');
                textInputRef.current?.focus();
                return;
              }
              onSelect(manualInput);
            }}
            variant='secondary'
            size='sm'
            style={styles.button}
          />
        )}
        <ButtonTHS
          title='Cancel'
          onPress={onClose}
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
  optionsContainer: {
    gap: 1,
  },
  selectedOption: {
    borderRadius: 10,
    borderColor: colors.primary,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
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
