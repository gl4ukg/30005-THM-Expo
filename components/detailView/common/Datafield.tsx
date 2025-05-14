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
    <View style={styles.container}>
      <View style={styles.emptyValueContainer}>
        <Typography
          style={error ? styles.emptyValueText : styles.label}
          name={'sectionText'}
        >
          {label}
        </Typography>
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
      </View>
      {error && <Icon name='Alert' color={colors.error} size='md' />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
  },
  label: {
    color: colors.extended666,
  },
  value: {
    color: colors.extended333,
  },
  emptyValueContainer: {
    alignItems: 'flex-start',
  },
  emptyValueText: {
    color: colors.errorText,
  },
});
