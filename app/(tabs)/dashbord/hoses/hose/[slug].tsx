import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HoseData {
  id: string;
  position: string;
  condition: string;
  lastInspection: string;
  missingData?: boolean;
}

const HoseDetails = () => {
  const { slug } = useLocalSearchParams();
  const hoseData = JSON.parse(slug as string) as HoseData;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hose Details</Text>
      <Text>ID: {hoseData.id}</Text>
      <Text>Position: {hoseData.position}</Text>
      <Text>Condition: {hoseData.condition}</Text>
      <Text>Last Inspection: {hoseData.lastInspection}</Text>
      {hoseData.missingData && <Text>Missing Data: Yes</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HoseDetails;
