import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function DashbordLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: true }} />
        <Stack.Screen
          name='hoses/[filter]/index'
          options={{ headerShown: true }}
        />
        <Stack.Screen name='hoses/index' options={{ headerShown: true }} />
        <Stack.Screen
          name='hoses/hose/[hoseId]'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='hoses/hose/register/'
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
  },
});
