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
}

export const DateInput: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const [date, setDate] = useState<Date | null>(value);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
    onChange(date);
  };
  return (
    <View>
      <Typography name={'navigation'} style={styles.label} text={label} />
      <Pressable style={styles.inputContainer} onPress={showDatePicker}>
        <Typography
          name='navigation'
          text={date?.toLocaleDateString() || 'Select Date'}
          style={styles.valueStyle}
        />
        <View style={styles.iconContainer}>
          <Icon name='Calendar' size='md' color={colors.extended666} />
        </View>
      </Pressable>
      <DateTimePickerModal
        date={date ?? undefined}
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueStyle: { color: colors.extended333 },
});
