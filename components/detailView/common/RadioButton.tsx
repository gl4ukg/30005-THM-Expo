import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '../../Typography';

interface RadioButtonProps {
  isSelected: boolean;
  onChange: () => void;
  id: string;
  label: string;
  menu?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected,
  onChange,
  label,
  menu,
}) => {
  return (
    <Pressable
      onPress={onChange}
      style={[
        styles.button,
        menu && styles.menu,
        menu && isSelected && styles.menuSelected,
      ]}
    >
      <View style={[styles.wrapper, menu && styles.menuWrapper]}>
        <View
          style={[
            styles.circle,
            menu
              ? { borderColor: colors.black }
              : {
                  borderColor: isSelected
                    ? colors.primary25
                    : colors.extended333,
                },
          ]}
        >
          {isSelected && (
            <View
              style={[styles.innerCircle, menu && styles.menuInnerCircle]}
            />
          )}
        </View>
        <Typography
          style={[styles.label, isSelected && styles.selectedLabel]}
          name={'navigation'}
          text={label}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 14,
    height: 14,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  innerCircle: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: colors.primary25,
  },
  menuInnerCircle: {
    backgroundColor: colors.black,
  },

  button: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.strokeInputField,
  },
  buttonSelected: {
    backgroundColor: colors.lightContrast25,
    borderColor: colors.primary25,
  },
  label: {
    color: colors.extended333,
    flex: 1,
    wordWrap: 'break-word',
  },
  selectedLabel: {
    color: colors.black,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  menu: {
    borderColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  menuSelected: {
    borderColor: colors.primary25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuWrapper: {
    paddingHorizontal: 8,
    flex: 1,
    alignItems: 'center',
  },
});
