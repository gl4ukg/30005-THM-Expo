import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { useState, useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  TextInputProps,
} from 'react-native';

interface Props {
  icon?: IconName;
  label: string;
  placeHolder?: string;
  value: string;
  onChangeText: (text: string) => void;
  labelColor?: string;
  type?: TextInputProps['inputMode'] | 'password' | 'textArea';
  errorMessage?: string;
  darkmode?: boolean;
  disabled?: boolean;
}
export const Input: React.FC<Props> = ({
  icon,
  label,
  placeHolder,
  value,
  onChangeText,
  labelColor = colors.black,
  type,
  errorMessage,
  darkmode,
  disabled,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const inputMode = type === 'password' || type === 'textArea' ? 'text' : type;

  const [displayError, setDisplayError] = useState(false);
  const toggleUnfocused = () => {
    setIsFocused(false);
    if (errorMessage) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  };

  return (
    <View>
      <View style={styles.outerView}>
        {icon && (
          <View style={styles.iconWrapper}>
            <Icon name={icon} size='md' color={labelColor} />
          </View>
        )}
        <View style={styles.innerView}>
          {label && (
            <View>
              <Typography
                name='fieldLabel'
                text={label}
                style={{ color: labelColor }}
              />
            </View>
          )}
          <View>
            <TextInput
              style={[
                styles.input,
                isFocused && !disabled && styles.focusedBorder,
                displayError && !disabled && styles.errorBorder,
                darkmode && styles.darkmode,
                disabled && styles.disabled,
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeHolder}
              inputMode={inputMode}
              multiline={type === 'textArea'}
              scrollEnabled={type !== 'textArea'}
              secureTextEntry={type === 'password' && !isPasswordVisible}
              onBlur={toggleUnfocused}
              onFocus={() => setIsFocused(true)}
              editable={!disabled}
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
      {displayError && (
        <Typography
          name={'navigation'}
          text={errorMessage}
          style={[styles.error, icon && styles.errorPaddingIfIcon]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    paddingVertical: 10,
    position: 'relative',
    color: colors.extended333,
    borderColor: colors.extended666,
    backgroundColor: colors.white,
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
    gap: 3,
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
  errorPaddingIfIcon: {
    paddingLeft: 37,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.secondary95,
  },
  darkmode: {
    backgroundColor: colors.inputBackground,
  },
});
