import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI/Button/Button';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/Input';
import { colors } from '@/lib/tokens/colors';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface Props {
  title: string;
  options: string[];
  selected: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
  onSave: (alternativeOption?: string) => void;
  hasAlternativeOption?: boolean;
}

export const CheckboxSelect: React.FC<Props> = ({
  title,
  options,
  selected,
  onSave,
  onSelect,
  onClose,
  hasAlternativeOption = true,
}) => {
  const [isAlternativeOption, setIsAlternativeOption] = useState(
    !selected.every((o) => options.includes(o)),
  );
  const [manualInput, setManualInput] = useState(
    selected.find((o) => !options.includes(o)) || '',
  );

  const [error, setError] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography name='navigationBold' text={title} />
        <Typography name='navigation' text='Chose one or more' />
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.optionsContainer}
      >
        {options
          .sort((a, b) => a.localeCompare(b))
          .map((option) => {
            return (
              <Checkbox
                key={option.toLowerCase().replace(/\s/g, '-')}
                label={option}
                isChecked={selected.includes(option)}
                onChange={() => {
                  onSelect(option);
                }}
              />
            );
          })}
        {hasAlternativeOption && (
          <Checkbox
            label={'Other (please specify)'}
            isChecked={isAlternativeOption}
            onChange={() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              setError('');
              setIsAlternativeOption((prev) => !prev);
              onSelect(manualInput);
            }}
          />
        )}
        {isAlternativeOption && (
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
        <ButtonTHS
          title='Save & close'
          onPress={() => {
            if (!manualInput.trim() && isAlternativeOption) {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              setError('Please enter a value');
              textInputRef.current?.focus();
              return;
            } else if (isAlternativeOption) {
              onSave(manualInput);
              return;
            }
            onSave();
          }}
          variant='secondary'
          size='sm'
          style={styles.button}
        />
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
    gap: 30,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 10,
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
