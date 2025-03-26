import { View, StyleSheet, Pressable } from 'react-native';
import { Typography } from '../../typography';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '../../Icon/Icon';
import { useState } from 'react';

interface RFIDInputProps {
  label: string;
}

export const RFIDInput: React.FC<RFIDInputProps> = ({ label }) => {
  const [rfid, setRfid] = useState<string>('');

  return (
    <View>
      <Typography name={'navigation'} style={styles.label} text={label} />
      <Pressable
        style={styles.inputContainer}
        onPress={() => {
          console.log('scannescannescanne');
        }}
      >
        <Typography
          name='navigation'
          text={rfid ? rfid : 'scan...'}
          style={styles.valueStyle}
        />
        <View style={styles.iconContainer}>
          <Icon name='RFID' size='md' color={colors.extended666} />
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
});
