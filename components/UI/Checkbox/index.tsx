import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface CheckboxProps {
  isChecked: boolean;
  label?: string;
  onChange: () => void;
  touchableSpace?: number;
  disabled?: boolean;
}
export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  touchableSpace = 10,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onChange}
      disabled={disabled}
      style={[
        styles.checkboxPressable,
        { padding: touchableSpace },
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.checkbox}>
        {isChecked && <Icon name='CheckboxChecked' color={colors.primary25} />}
      </View>
      {label && <Typography name='navigation' text={label} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderColor: colors.primary95,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxPressable: {
    flexDirection: 'row',
    gap: 15,
  },
  disabled: {
    opacity: 0.5,
  },
});
