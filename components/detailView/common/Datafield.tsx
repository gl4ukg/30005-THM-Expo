import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../typography';
import { Icon } from '../../Icon/Icon';

interface DataFieldProps {
  label: string;
  value: string | number | undefined;
  error?: boolean;
}

export const DataField: React.FC<DataFieldProps> = ({
  label,
  value,
  error,
}) => {
  const isValueEmpty = value === undefined || value === '';
  if (isValueEmpty) {
    error = true;
  }

  return (
    <View style={styles.container}>
      <Typography
        style={error ? styles.emptyValueText : styles.label}
        name={'fieldLabel'}
      >
        {label}
      </Typography>
      <View style={styles.emptyValueContainer}>
        {isValueEmpty ? (
          <Typography
            style={[styles.value, styles.emptyValueText]}
            name={'fieldValue'}
            text='Not set'
          />
        ) : (
          <Typography
            style={error ? styles.emptyValueText : styles.value}
            name={'fieldValue'}
          >
            {value !== undefined ? value.toString() : 'N/A'}
          </Typography>
        )}

        {error && <Icon name='Alert' color={colors.error} size='sm' />}
      </View>
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
    color: colors.errorText,
  },
});
