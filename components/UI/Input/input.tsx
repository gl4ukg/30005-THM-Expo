import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { forwardRef, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

interface Props extends TextInputProps {
  icon?: IconName;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: TextInputProps['inputMode'] | 'password' | 'textArea';
  errorMessage?: string;
  darkMode?: boolean;
  disabled?: boolean;
  validateOnSave?: boolean;
}

/**
 * Input component
 *
 * @description A reusable text input field that extends the TextInput component from React Native.
 * @extends TextInput
 *
 * @icon - The name of the icon to display next to the input field (if any), e.g. "User" extends string but its type is IconName from the Icon component.
 *
 * @label - The label to display above the input field.
 *
 * @value - The value of the input field.
 *
 * @onChangeText - The callback function to handle changes to the input field.
 *
 * @type - The type of input field to display. Can be 'text', 'password', or 'textArea' extending TextInputProps['inputMode'].
 *
 * @ref - The ref will be forwarded to the underlying TextInput component.
 *
 * @errorMessage - The error message to display below the input field.
 *
 * @darkMode - Whether the input field should have a dark mode style, can be used on dark backgrounds.
 *
 * @example
 * <Input
 *   icon={"User"}
 *   label="Username"
 *   type="text"
 *   darkMode={true}
 *   disabled={false}
 * />
 */
export const Input = forwardRef<TextInput, Props>(
  (
    {
      icon,
      label,
      value,
      onChangeText,
      type,
      errorMessage,
      darkMode,
      disabled,
      validateOnSave,
      ...inputProps
    },
    ref: React.Ref<TextInput>,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    const inputMode =
      type === 'password' || type === 'textArea' ? 'text' : type;

    const [displayError, setDisplayError] = useState(false);
    const handleUnfocused = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      inputProps.onBlur && inputProps.onBlur(e);
      setIsFocused(false);
      if (errorMessage && value !== '') {
        setDisplayError(true);
      } else {
        setDisplayError(false);
      }
    };

    const handleFocused = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      inputProps.onFocus && inputProps.onFocus(e);
      setIsFocused(true);
    };

    useEffect(() => {
      if (validateOnSave && errorMessage) {
        setDisplayError(true);
      }
    }, [validateOnSave, errorMessage]);

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    }, [ref]);

    return (
      <View>
        <View style={styles.outerView}>
          {icon && (
            <View style={styles.iconWrapper}>
              <Icon
                name={icon}
                size='md'
                color={darkMode ? colors.white : colors.extended666}
                styles={{ opacity: disabled ? 0.5 : 1 }}
              />
            </View>
          )}
          <View style={styles.innerView}>
            {label && (
              <View>
                <Typography
                  name='navigation'
                  text={label}
                  style={{
                    color: darkMode ? colors.white : colors.extended666,
                    opacity: disabled ? 0.5 : 1,
                  }}
                />
              </View>
            )}
            <View>
              <TextInput
                {...inputProps}
                style={[
                  styles.input,
                  isFocused && !disabled && styles.focusedBorder,
                  displayError && !isFocused && styles.errorBorder,
                  darkMode && styles.darkMode,
                  disabled && styles.disabled,
                  type === 'textArea' && styles.textAreaStyle,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={inputProps.placeholder}
                inputMode={inputMode}
                multiline={type === 'textArea'}
                scrollEnabled={type !== 'textArea'}
                secureTextEntry={type === 'password' && !isPasswordVisible}
                onBlur={handleUnfocused}
                onFocus={handleFocused}
                editable={!disabled}
                ref={ref}
              />
              {type === 'password' && !disabled && (
                <Pressable
                  onPress={togglePasswordVisibility}
                  style={styles.iconContainer}
                >
                  <Icon
                    name={isPasswordVisible ? 'EyeOff' : 'Eye'}
                    size='xsm'
                    color={colors.extended666}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        {errorMessage && displayError && (
          <Typography
            name={'navigation'}
            text={errorMessage}
            style={[
              darkMode ? styles.errorTextDarkMode : styles.error,
              icon && styles.errorPaddingIfIcon,
            ]}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    paddingVertical: 6,
    position: 'relative',
    color: colors.extended333,
    borderColor: colors.secondary95,
    backgroundColor: colors.white,
    borderRadius: 1,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: 'OpenSans_400Regular',
      ios: 'OpenSans-Regular',
    }),
  },
  outerView: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  iconWrapper: {
    justifyContent: 'flex-end',
  },
  innerView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    gap: 4,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 11,
    justifyContent: 'center',
  },
  error: {
    color: colors.error,
    paddingTop: 9,
  },
  errorTextDarkMode: {
    color: colors.errorTextDarkMode,
    paddingTop: 9,
  },
  errorPaddingIfIcon: {
    paddingLeft: 37,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 5,
  },
  disabled: {
    opacity: 1 / 2,
  },
  darkMode: {
    backgroundColor: colors.inputBackground,
  },
  textAreaStyle: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
