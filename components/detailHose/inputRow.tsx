import { Input } from '../UI/Input/input';
import { View, StyleSheet, TextInputProps, Alert } from 'react-native';
import { IconButton } from './iconButton';
import React, { useState } from 'react';
import { colors } from '@/lib/tokens/colors';

interface InputRowProps {
  // label: string;
  // value: string;
  // onChangeText: (value: string) => void;
  // type?: TextInputProps['inputMode'] | 'password' | 'textArea';
  tooltipData?: { title: string; message: string };
  components?: React.ReactNode;
}

export const InputRow: React.FC<React.PropsWithChildren<InputRowProps>> = ({
  // label,
  // value,
  tooltipData,
  components,
  children,
  // type,
  // onChangeText,
}) => {
  const [tooltip, setTooltip] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>{components}</View>
      <View style={styles.iconContainer}>
        {tooltipData && (
          <IconButton
            icon='Tooltip'
            color={colors.primary}
            handlePress={() =>
              Alert.alert(tooltipData.title, tooltipData.message)
            }
          />
        )}
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
