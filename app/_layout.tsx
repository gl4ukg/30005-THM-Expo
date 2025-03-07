import { Redirect, Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProvider, useAppContext } from '@/context/ContextProvider';

export default function RootLayout() {
  const { state } = useAppContext();
  console.log(state.auth.user);

  return (
    <ContextProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {state.auth.user === null && (
            <Stack.Screen name='index' options={{ headerShown: false }} />
          )}
          {state.auth.user !== null && (
            <SafeAreaView style={styles.safeArea}>
              <Stack.Screen name='(app)' options={{ headerShown: false }} />
              <Stack.Screen name='ui' options={{ headerShown: true }} />
            </SafeAreaView>
          )}
        </Stack>
      </SafeAreaProvider>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
  },
});
