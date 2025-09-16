import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View } from 'react-native';

interface BarcodeScannerProps {
  label: string;
  value: string;
  onPress: () => void;
  disableScan?: boolean;
}

export const BarcodeInput: React.FC<BarcodeScannerProps> = ({
  label,
  value,
  onPress,
  disableScan = false,
}) => {
  const handlePress = () => {
    if (!disableScan) {
      onPress();
    }
  };

  return (
    <View>
      <Typography name={'navigation'} style={styles.label} text={label} />
      <Pressable
        style={({ pressed }) => [
          styles.inputContainer,
          disableScan && styles.disabledInputContainer,
          pressed && !disableScan && styles.pressedInputContainer,
        ]}
        onPress={handlePress}
        disabled={disableScan}
      >
        <Typography
          name='navigation'
          text={value || 'Scan...'}
          style={[styles.valueStyle, disableScan && styles.disabledValueStyle]}
        />
        <View style={styles.iconContainer}>
          <Icon
            name='Barcode'
            size='md'
            color={disableScan ? colors.secondary95 : colors.extended666}
          />
        </View>
      </Pressable>
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
  disabledInputContainer: {
    backgroundColor: colors.secondary95,
  },
  pressedInputContainer: {
    backgroundColor: colors.secondary95,
  },
  disabledValueStyle: {
    color: colors.extended666,
  },
});
