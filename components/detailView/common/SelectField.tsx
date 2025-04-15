import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { PredefinedSelect } from '../edit/PredefinedSelect';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
  required?: boolean;
  onlyOptions?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required,
  onlyOptions,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    onChange(selectedValue);
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const isRequiredValueMissing = required && !selectedValue;

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
            style={[styles.value, isRequiredValueMissing && styles.valueError]}
            text={selectedValue || 'Select...'}
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
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}
      >
        <SafeAreaView style={styles.fullScreenModal}>
          <PredefinedSelect
            options={options}
            onSelect={handleSelect}
            selected={selectedValue}
            onClose={() => handleClose()}
            title={label}
            onlyOptions={onlyOptions}
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
  valueError: { color: colors.errorText },
});
