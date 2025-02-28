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
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    onChange(selectedValue);
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Typography name={'fieldLabel'} style={styles.label}>
          {label}
        </Typography>
        <Pressable
          style={styles.inputContainer}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.valueText}>{selectedValue || 'Select...'}</Text>
          <View style={styles.iconContainer}>
            <Icon name='CaretRight' size='sm' color={colors.black} />
          </View>
        </Pressable>
      </View>
      <View style={styles.tooltipContainer}>
        <Icon name='Tooltip' size='md' color={colors.primary} />
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
            onClose={() => setModalOpen(false)}
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
    marginTop: 15,
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
});
