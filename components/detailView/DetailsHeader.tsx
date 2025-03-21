import { colors } from '@/lib/tokens/colors';
import { formatDate } from '@/lib/util/formatDate';
import { View, StyleSheet } from 'react-native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';

type DetailsHeaderProps = {
  id: string;
  date: string;
  shortcuts?: any;
  missingData?: boolean;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
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
          {formatDate(date)}
        </Typography>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
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

export default DetailsHeader;
