import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: Date) => void;
  required?: boolean;
  isMissing?: boolean;
}

export const DateInput: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  required,
  isMissing,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirm = (selectedDate: Date) => {
    hideDatePicker();
    onChange(selectedDate);
  };

  const isRequiredValueMissing = (required && !value) || isMissing;

  return (
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
        onPress={showDatePicker}
      >
        <Typography
          name='navigation'
          text={value?.toLocaleDateString() || 'Select Date'}
          style={[
            styles.valueStyle,
            !value && styles.valueNotSelected,
            isRequiredValueMissing && styles.valueError,
          ]}
        />
        <View style={styles.iconContainer}>
          <Icon
            name='Calendar'
            size='md'
            color={isRequiredValueMissing ? colors.error : colors.extended666}
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
      <DateTimePickerModal
        date={value ?? new Date()}
        isVisible={isDatePickerVisible}
        mode='date'
        display='inline'
        onConfirm={confirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueStyle: { color: colors.extended333 },

  valueNotSelected: { color: colors.extended666 },

  valueError: { color: colors.errorText },

  errorMessage: {
    color: colors.errorText,
    position: 'absolute',
    right: 0,
    bottom: -22,
    fontSize: 12,
    lineHeight: 16,
  },
});
