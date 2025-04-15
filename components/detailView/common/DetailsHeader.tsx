import { colors } from '@/lib/tokens/colors';
import { formatDate } from '@/lib/util/formatDate';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';

type DetailsHeaderProps = {
  id: string;
  date: string;
  shortcuts?: any;
  missingData?: boolean;
};

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  id,
  date,
  missingData,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {missingData && <Icon name='Alert' color={colors.error} size='sm' />}
        <Typography style={styles.hoseData} name={'fieldLabel'}>
          Hose ID:{' '}
          <Typography name={'fieldValue'} style={styles.boldText}>
            {id}
          </Typography>
        </Typography>
      </View>
      <Typography style={styles.hoseData} name={'fieldLabel'}>
        Production Date:
        <Typography name={'fieldValue'} style={styles.boldText}>
          {formatDate(new Date(date))}
        </Typography>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    gap: 5,
  },
  hoseData: {
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
