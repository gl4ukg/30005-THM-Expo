import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import React, { ReactNode } from 'react';

import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  type PressableProps,
} from 'react-native';

interface LinkButtonProps extends PressableProps {
  title: string;
  children?: ReactNode | ReactNode[];
  variant?: 'light' | 'dark';
  disabled?: boolean;
  vSpace?: number;
  hSpace?: number;
}
export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  title,
  onPress,
  variant = 'light',
  disabled = false,
  style,
  vSpace,
  hSpace,
}) => {
  if (style !== undefined && typeof style !== 'object')
    throw new Error('style should be a type ViewStyle');
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <View style={styles.wrapper}>
      <Pressable
        disabled={disabled}
        onPress={disabled ? undefined : onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={({ pressed }) => [
          styles.base,
          styles[variant] as ViewStyle,
          disabled && styles.containerDisabled,
          style,
          {
            paddingVertical: vSpace,
            paddingHorizontal: hSpace,
          },
        ]}
      >
        <View style={[styles.textWrapper]}>
          {React.Children.map(children, (child) => child)}
          <Typography
            name={variant === 'light' ? 'navigation' : 'navigationBold'}
            numberOfLines={1}
            style={[buttonTextStyle[variant], isPressed && styles.pressed]}
            text={title}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  base: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  containerDisabled: {
    opacity: 0.5,
    textDecorationLine: 'underline',
  },
  pressed: {
    textDecorationLine: 'underline',
  },
  light: {},
  dark: {},
});

const buttonTextStyle = StyleSheet.create({
  light: {
    color: colors.primary,
  },
  dark: {
    color: colors.lightContrast75,
  },
});
