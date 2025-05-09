import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';

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
    <View>
      <Typography
        style={error ? styles.emptyValueText : styles.label}
        name={'sectionText'}
      >
        {label}
      </Typography>
      <View style={styles.emptyValueContainer}>
        {isValueEmpty ? (
          <Typography
            style={[styles.value, styles.emptyValueText]}
            name={'sectionText'}
            text='Not set'
          />
        ) : (
          <Typography
            style={error ? styles.emptyValueText : styles.value}
            name={'sectionText'}
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
  label: {
    color: colors.extended666,
  },
  value: {
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
