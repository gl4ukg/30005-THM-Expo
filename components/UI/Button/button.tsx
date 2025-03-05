import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import React, { ReactNode } from 'react';

import {
  Pressable,
  View,
  type PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface ButtonTHSProps extends PressableProps {
  title: string;
  children?: ReactNode | ReactNode[];
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'lg';
  disabled?: boolean;
}
export const ButtonTHS: React.FC<ButtonTHSProps> = ({
  children,
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  ...restProps
}) => {
  if (restProps.style !== undefined && typeof restProps.style !== 'object')
    throw new Error('style should be a type ViewStyle');
  return (
    <Pressable
      {...restProps}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        restProps.style as ViewStyle,
        styles.base,
        styles[variant],
        styles[size],
        pressed && (pressedStyles[variant] as ViewStyle),
        disabled && styles.containerDisabled,
      ]}
    >
      <View>
        {React.Children.map(children, (child) => child)}
        <Typography
          name={size === 'lg' ? 'buttonCapsLock' : 'button'}
          numberOfLines={1}
          style={buttonTextStyle[variant]}
          text={title}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  containerPressed: {
    borderColor: colors.white,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: colors.primary50,
    color: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.primary50,
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  sm: {
    height: 40,
  },
  lg: {
    height: 55,
  },
});

const buttonTextStyle = StyleSheet.create({
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.extended333,
  },
  tertiary: {
    color: colors.extended333,
  },
});
const pressedStyles = StyleSheet.create({
  primary: {
    borderColor: colors.white,
  },
  secondary: {
    borderWidth: 2,
  },
  tertiary: {
    borderColor: colors.primary50,
    borderWidth: 1,
  },
});
