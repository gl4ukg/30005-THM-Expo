import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { THSContextProvider } from '@/context/THScontextProvider';

export default function RootLayout() {
  return (
    <THSContextProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <SafeAreaView style={styles.safeArea}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='ui' options={{ headerShown: true }} />
          </SafeAreaView>
        </Stack>
      </SafeAreaProvider>
    </THSContextProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
  },
});
