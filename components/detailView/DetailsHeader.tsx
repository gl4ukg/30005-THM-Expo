import { colors } from '@/lib/tokens/colors';
import { formatDate } from '@/lib/util/formatDate';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../Icon/Icon';

type DetailsHeaderProps = {
  id: string;
  date: string;
  missingData?: boolean;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  id,
  date,
  missingData,
}) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            {missingData && (
              <Icon name='Alert' color={colors.error} size='xsm' />
            )}
            <Text style={styles.hoseData}>
              Hose ID: <Text style={styles.boldText}>{id}</Text>
            </Text>
          </View>
          <Text style={styles.hoseData}>
            Production Date:
            <Text style={styles.boldText}>{formatDate(date)}</Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
