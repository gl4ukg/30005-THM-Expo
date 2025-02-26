import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { Icon } from '../Icon/Icon';

interface DataFieldProps {
  label: string;
  value: string | number | undefined;
}

const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  const isValueEmpty = value === undefined || value === '';

  return (
    <View style={styles.container}>
      {isValueEmpty ? (
        <>
          <Typography style={styles.emptyValueText} name={'fieldLabel'}>
            {label}
          </Typography>
          <View style={styles.emptyValueContainer}>
            <Typography
              style={[styles.value, styles.emptyValueText]}
              name={'fieldValue'}
            >
              Not set
            </Typography>
            <Icon name='Alert' color={colors.error} size='sm' />
          </View>
        </>
      ) : (
        <>
          <Typography style={styles.label} name={'fieldLabel'}>
            {label}
          </Typography>
          <Typography style={styles.value} name={'fieldValue'}>
            {value !== undefined ? value.toString() : 'N/A'}
          </Typography>
        </>
      )}
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
  emptyValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyValueText: {
    color: colors.error,
  },
});
export default DataField;
