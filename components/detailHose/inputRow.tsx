import { Input } from '../UI/Input/input';
import { View, StyleSheet } from 'react-native';
import { IconButton } from './iconButton';
import { useState } from 'react';
import { colors } from '@/lib/tokens/colors';

interface InputRowProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const InputRow: React.FC<InputRowProps> = ({
  label,
  value,
  onChangeText,
}) => {
  const [tooltip, setTooltip] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Input
          label={label}
          value={value}
          onChangeText={(text) => onChangeText(text)}
        />
      </View>

      <View style={styles.iconContainer}>
        <IconButton
          icon={'Tooltip'}
          handlePress={() => {
            setTooltip(!tooltip);
            console.log(tooltip);
          }}
          color={colors.primary}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 15,
    width: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '15%',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
