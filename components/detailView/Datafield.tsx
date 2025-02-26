import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../typography';

interface DataFieldProps {
  label: string;
  value: string | number | undefined;
}

const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Typography style={styles.label} name={'fieldLabel'}>
        {label}
      </Typography>
      <Typography style={styles.value} name={'fieldValue'}>
        {value !== undefined ? value.toString() : 'N/A'}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: colors.extended666,
  },
  value: {
    fontSize: 16,
    color: colors.extended333,
  },
});

export default DataField;
