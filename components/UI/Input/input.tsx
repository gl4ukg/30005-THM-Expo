import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';

interface Props {
  icon?: IconName;
  label: string;
  placeHolder?: string;
  value: string;
  onChangeText: (text: string) => void;
  labelColor?: string;
  type?: string;
  multiline?: boolean;
  errorMessage?: string;
  lightMode?: boolean;
  onBlur?: () => void;
}
export const Input: React.FC<Props> = ({
  icon,
  label,
  placeHolder = '',
  value,
  onChangeText,
  labelColor = 'black',
  multiline = false,
  type,
  errorMessage,
  lightMode,
  onBlur,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
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
                errorMessage && styles.errorBorder,
                lightMode && styles.lightMode,
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeHolder}
              multiline={multiline}
              scrollEnabled={!multiline}
              secureTextEntry={type === 'password' && !isPasswordVisible}
              onBlur={onBlur}
            />
            {type === 'password' && (
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
      {errorMessage && (
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
    backgroundColor: colors.inputBackground,
    position: 'relative',
    color: colors.extended333,
    borderColor: colors.extended666,
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
  lightMode: {
    backgroundColor: colors.white,
  },
});
