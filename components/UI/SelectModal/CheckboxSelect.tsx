import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI/Button/Button';
import { Checkbox } from '@/components/UI/Checkbox';
import { Input } from '@/components/UI/Input/Input';
import { Option } from '@/components/UI/SelectModal/Select';
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
  options: Option[];
  selected: Option[];
  onSelect: (option: Option) => void;
  onClose: () => void;
  onSave: (alternativeOption?: Option) => void;
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
    selected?.findIndex((o) => o.id === 'alternativeOption') > -1,
  );
  const [manualInput, setManualInput] = useState(
    selected?.find((o) => o.id === 'alternativeOption')?.value || '',
  );
  console.log(
    'manualInput',
    selected?.find((o) => o.id === 'alternativeOption'),
  );
  const [searchText, setSearchText] = useState('');
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
          .filter((opt) =>
            opt.value.toLowerCase().includes(searchText.toLowerCase()),
          )
          .sort((a, b) => a.value.localeCompare(b.value))
          .map((option) => (
            <Checkbox
              key={option.id}
              label={option.value}
              isChecked={selected.findIndex((o) => o.id === option.id) > -1}
              onChange={() => {
                console.log('option', option.id);
                onSelect(option);
              }}
            />
          ))}
        {hasAlternativeOption && (
          <Checkbox
            label={'Ohter (please specify)'}
            isChecked={isAlternativeOption}
            onChange={() => {
              console.log('option', 'alternativeOption');
              scrollViewRef.current?.scrollToEnd({ animated: true });
              setError('');
              setIsAlternativeOption((prev) => !prev);
              onSelect({ id: 'alternativeOption', value: manualInput });
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
              console.log('manualInput', manualInput);
              onSave({ id: 'alternativeOption', value: manualInput });
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
