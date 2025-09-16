import { ButtonTHS } from '@/components/UI';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}
    >
      <Text style={{ color: 'white' }}>Not Found</Text>
      <Text style={{ color: 'white' }}>{}</Text>
      <ButtonTHS
        title='Home'
        onPress={() => router.replace('/')}
        style={{ width: 100 }}
      />
    </View>
  );
}
