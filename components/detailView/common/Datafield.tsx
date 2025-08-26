import { colors } from '@/lib/tokens/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';

interface DataFieldProps {
  label: string;
  value: string | number | undefined | null;
}

export const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  const isValueEmpty = (
    value: string | number | undefined | null,
  ): value is undefined | null =>
    value === undefined || value === null || value === '';
  return (
    <View style={styles.container}>
      <View style={styles.emptyValueContainer}>
        <Typography
          style={isValueEmpty(value) ? styles.emptyValueText : styles.label}
          name={'sectionText'}
        >
          {label}
        </Typography>
        {isValueEmpty(value) ? (
          <Typography
            style={[styles.value, styles.emptyValueText]}
            name={'sectionText'}
            text='Not set'
          />
        ) : (
          <Typography
            style={isValueEmpty(value) ? styles.emptyValueText : styles.value}
            name={'sectionText'}
          >
            {isValueEmpty(value) ? 'N/A' : value.toString()}
          </Typography>
        )}
      </View>
      {isValueEmpty(value) && (
        <Icon name='Alert' color={colors.error} size='md' />
      )}
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
