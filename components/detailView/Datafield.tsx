import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DataFieldProps {
  label: string;
  value: string | number | undefined;
}

const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value !== undefined ? value.toString() : 'N/A'}
      </Text>
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
