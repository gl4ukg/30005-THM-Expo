import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../typography';
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
      <View>
        <View style={styles.labelContainer}>
          <Typography
            name={'navigation'}
            style={[styles.label, hasError && styles.errorStyle]}
            text={label}
          />
          {hasError && <Icon name='Alert' color={colors.error} size='xsm' />}
        </View>
        <Pressable
          style={[styles.inputContainer, hasError && styles.errorBorder]}
          onPress={() => setModalOpen(true)}
        >
          <Typography
            name='navigation'
            style={[styles.valueStyle, hasError && styles.errorStyle]}
            text={selectedValue || 'Select...'}
          />

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
  valueStyle: { color: colors.extended333 },
});
