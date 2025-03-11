import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';
import { PredefinedSelect } from './PredefinedSelect';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [hasModalBeenOpened, setHasModalBeenOpened] = useState(false);

  const handleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    onChange(selectedValue);
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    setHasModalBeenOpened(true);
  };

  const hasError = required && hasModalBeenOpened && selectedValue === '';

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Typography
            name={'fieldLabel'}
            style={(styles.label, hasError && styles.errorStyle)}
          >
            {label}
          </Typography>
          {hasError && <Icon name='Alert' color={colors.error} size='xsm' />}
        </View>
        <Pressable
          style={[styles.inputContainer, hasError && styles.errorBorder]}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.valueText}>{selectedValue || 'Select...'}</Text>
          <View style={styles.iconContainer}>
            <Icon
              name='CaretRight'
              size='sm'
              color={hasError ? colors.error : colors.black}
            />
          </View>
        </Pressable>
        {hasError && (
          <Typography
            name={'navigation'}
            text='Required field'
            style={[styles.errorStyle, { alignSelf: 'flex-end' }]}
          />
        )}
      </View>
      <View
        style={[
          styles.tooltipContainer,
          hasError && styles.tooltipStylingIfError,
        ]}
      >
        <Icon name='Tooltip' size='lg' color={colors.primary} />
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
  fieldContainer: {
    marginBottom: 15,
    width: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tooltipContainer: {
    width: '15%',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.secondary95,
    borderRadius: 5,
    backgroundColor: colors.white,
    width: '100%',
  },
  valueText: {
    fontSize: 16,
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
  errorStyle: {
    color: colors.errorText,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  tooltipStylingIfError: {
    paddingBottom: 22,
  },
});
