import { ContextProvider, useAppContext } from '@/context/ContextProvider';
import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const { state } = useAppContext();

  return (
    <ContextProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
        >
          {state.auth.user === null && (
            <>
              <Stack.Screen name='index' />
              <Stack.Screen name='/login' />
              <Stack.Screen name='/scan' />
            </>
          )}
          {state.auth.user !== null && (
            <SafeAreaView style={styles.safeArea}>
              <Stack.Screen name='(app)' />
              <Stack.Screen name='ui' />
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
