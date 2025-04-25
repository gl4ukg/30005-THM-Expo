import { colors } from '@/lib/tokens/colors';
import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { RadioSelect } from '@/components/UI/SelectModal/RadioSelect';
import { MultiSelect } from '@/components/UI/SelectModal/MultiSelect';

// export type Option = {
//   id: string | 'alternativeOption';
//   value: string;
// };

interface Props {
  label: string;
  selectedOption: string | null;
  onChange: <T extends string>(option: T) => void;
  options: string[];
  isMultiSelect?: boolean;
  required?: boolean;
  hasAlternativeOption?: boolean;
}

export const Select: React.FC<Props> = ({
  label,
  selectedOption,
  onChange,
  options,
  required,
  hasAlternativeOption,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (option: string) => {
    // setSelectedValue(newValue);
    onChange(option);
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const isRequiredValueMissing = required && !selectedOption;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.labelContainer}>
          <Typography
            name={'navigation'}
            style={[styles.label, isRequiredValueMissing && styles.labelError]}
            text={label}
          />
          {isRequiredValueMissing && (
            <Icon name='Alert' color={colors.error} size='xsm' />
          )}
        </View>
        <Pressable
          style={[
            styles.inputContainer,
            isRequiredValueMissing && styles.inputContainerError,
          ]}
          onPress={() => setModalOpen(true)}
        >
          <Typography
            name='navigation'
            style={[
              styles.value,
              !selectedOption && styles.valueNotSelected,
              isRequiredValueMissing && styles.valueError,
            ]}
            text={selectedOption?.trim() || 'Select...'}
          />

          <View style={styles.iconContainer}>
            <Icon
              name='CaretRight'
              size='sm'
              color={isRequiredValueMissing ? colors.error : colors.black}
            />
          </View>
        </Pressable>
        {isRequiredValueMissing && (
          <Typography
            name={'navigation'}
            text='Required field'
            style={[styles.errorMessage]}
          />
        )}
      </View>

      <Modal
        animationType='slide'
        transparent={false}
        visible={modalOpen}
        onRequestClose={handleClose}
      >
        <SafeAreaView style={styles.fullScreenModal}>
          <RadioSelect
            title={label}
            options={options}
            selected={selectedOption || null}
            onSelect={handleSelect}
            onClose={handleClose}
            hasAlternativeOption={hasAlternativeOption}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    marginBottom: 5,
    color: colors.extended666,
  },
  labelError: {
    color: colors.errorText,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.secondary95,
    borderRadius: 1,
    backgroundColor: colors.white,
    width: '100%',
  },
  inputContainerError: {
    borderColor: colors.errorText,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: colors.white,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.errorText,
    position: 'absolute',
    right: 0,
    bottom: -22,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  tooltipStylingIfError: {
    paddingBottom: 22,
  },
  value: { color: colors.extended333 },
  valueNotSelected: { color: colors.extended666 },
  valueError: { color: colors.errorText },
  valueDisabled: { color: colors.extended666 },
});
