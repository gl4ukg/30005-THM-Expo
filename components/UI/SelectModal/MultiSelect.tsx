import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { CheckboxSelect } from '@/components/UI/SelectModal/CheckboxSelect';

interface Props {
  label: string;
  selectedOptions: string[];
  onSave: (options: string[]) => void;
  options: string[];
  required?: boolean;
}

export const MultiSelect: React.FC<Props> = ({
  label,
  selectedOptions,
  onSave,
  options,
  required,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOptions);

  const handleSelect = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleClose = () => {
    onSave(selectedOptions);
    setModalOpen(false);
  };

  const handleSave = (alternativeOption?: string) => {
    const newSelected = alternativeOption
      ? selected.map((o) => (!options.includes(o) ? alternativeOption : o))
      : selected;
    setSelected(newSelected);
    onSave(newSelected);
    setModalOpen(false);
  };

  const isRequiredValueMissing = required && !selectedOptions?.length;
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
              !selectedOptions?.length && styles.valueNotSelected,
              isRequiredValueMissing && styles.valueError,
            ]}
            text={
              selectedOptions?.length
                ? selectedOptions?.map((option) => option).join('\n')
                : 'Select...'
            }
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
          <CheckboxSelect
            title={label}
            options={options}
            onSave={handleSave}
            onSelect={handleSelect}
            onClose={handleClose}
            selected={selected}
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
