import { Icon } from '@/components/Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockedData } from '../[filter]/mocked';

const HoseDetails = () => {
  const { id } = useLocalSearchParams();

  const hoseData = mockedData.find((hose) => hose.id === id);

  if (!hoseData) {
    return <Text>Hose not found</Text>;
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';

    try {
      const [day, month, year] = dateString.split('/');

      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const formattedDay = date.getDate();
      const formattedMonth = date
        .toLocaleString('default', {
          month: 'short',
        })
        .toUpperCase();
      const formattedYear = date.getFullYear();

      return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            {hoseData.missingData && (
              <Icon name='Alert' color={colors.error} size='xsm' />
            )}
            <Text style={styles.hoseData}>
              Hose ID: <Text style={styles.boldText}>{hoseData.id}</Text>
            </Text>
          </View>
          <Text style={styles.hoseData}>
            Production Date:{' '}
            <Text style={styles.boldText}>{formatDate(hoseData.prodDate)}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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

export default HoseDetails;
