import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/Typography';
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
  required?: boolean;
  isMissing?: boolean;
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
 * @validateOnSave - Whether the error message should be displayed when the input field is saved. To be used when the input field is the last in its form or alone.
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
      required,
      isMissing,
      ...inputProps
    },
    ref: React.Ref<TextInput>,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showValidationError, setShowValidationError] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    const inputMode =
      type === 'password' || type === 'textArea' ? 'text' : type;

    const isRequiredValueMissing = (required && !value) || isMissing;

    const handleUnfocused = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      inputProps.onBlur && inputProps.onBlur(e);
      setIsFocused(false);

      if (errorMessage && value !== '') {
        setShowValidationError(true);
      } else {
        setShowValidationError(false);
      }
    };

    const handleFocused = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      inputProps.onFocus && inputProps.onFocus(e);
      setIsFocused(true);

      if (!isRequiredValueMissing) {
        setShowValidationError(false);
      }
    };

    useEffect(() => {
      if (validateOnSave && errorMessage) {
        setShowValidationError(true);
      }

      if (!validateOnSave && value) {
        setShowValidationError(false);
      }
    }, [errorMessage, validateOnSave, value]);

    const showErrorState =
      isRequiredValueMissing || (showValidationError && !!errorMessage);
    const displayErrorMessage = isRequiredValueMissing
      ? 'Required field'
      : showValidationError && errorMessage
        ? errorMessage
        : null;

    return (
      <View>
        <View style={styles.outerView}>
          {icon && (
            <View style={styles.iconWrapper}>
              <Icon
                name={icon}
                size='md'
                color={
                  showErrorState && !disabled
                    ? colors.error
                    : darkMode
                      ? colors.white
                      : colors.extended666
                }
                styles={{ opacity: disabled ? 0.5 : 1 }}
              />
            </View>
          )}
          <View style={styles.innerView}>
            {label && (
              <View style={styles.labelContainer}>
                <Typography
                  name='navigation'
                  text={label}
                  style={[
                    styles.labelBase,
                    darkMode ? styles.labelDarkMode : styles.labelLightMode,
                    showErrorState && !disabled && styles.labelError,
                    disabled && styles.labelDisabled,
                  ]}
                />
                {isRequiredValueMissing && !disabled && (
                  <Icon name='Alert' color={colors.error} size='xsm' />
                )}
              </View>
            )}
            <View>
              <TextInput
                {...inputProps}
                style={[
                  styles.input,
                  darkMode && styles.darkMode,
                  disabled && styles.disabled,

                  showErrorState && !disabled && styles.errorBorder,
                  isFocused &&
                    !showErrorState &&
                    !disabled &&
                    styles.focusedBorder,
                  type === 'textArea' && styles.textAreaStyle,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={inputProps.placeholder}
                inputMode={inputMode}
                multiline={type === 'textArea'}
                numberOfLines={type === 'textArea' ? undefined : 1}
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
        {displayErrorMessage && !disabled && (
          <Typography
            name={'navigation'}
            text={displayErrorMessage}
            style={[
              styles.errorBase,
              darkMode ? styles.errorTextDarkMode : styles.errorTextLightMode,
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
    paddingRight: 10,
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
    alignItems: 'flex-end',
  },
  iconWrapper: {
    paddingBottom: Platform.OS === 'ios' ? 8 : 9,
    paddingLeft: 2,
  },
  innerView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    gap: 4,
    position: 'relative',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelBase: {},
  labelLightMode: {
    color: colors.extended666,
  },
  labelDarkMode: {
    color: colors.white,
  },
  labelError: {
    color: colors.errorText,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  errorBase: {
    paddingTop: 4,
    fontSize: 12,
    lineHeight: 16,
  },
  errorTextLightMode: {
    color: colors.error,
  },
  errorTextDarkMode: {
    color: colors.errorTextDarkMode,
  },
  errorPaddingIfIcon: {
    paddingLeft: 37,
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1,
    paddingVertical: 6,
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 5,
    paddingLeft: 9,
    paddingRight: 9,
  },
  disabled: {
    backgroundColor: colors.secondary95,
    color: colors.extended666,
    opacity: 1,
    borderColor: colors.secondary95,
  },
  darkMode: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.secondary95,
  },
  textAreaStyle: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: 6,
  },
});
