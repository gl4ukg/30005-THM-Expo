import { ContextProvider, useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { syncData } from '@/lib/util/sync';
import { registerBackgroundTaskAsync } from '@/tasks';
import { useNetInfo } from '@react-native-community/netinfo';
import * as BackgroundTask from 'expo-background-task';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <App />
        <ToastManager showProgressBar={false} />
      </SafeAreaProvider>
    </ContextProvider>
  );
}

registerBackgroundTaskAsync();
const App = () => {
  const { state, dispatch } = useAppContext();
  const { type, isInternetReachable } = useNetInfo();
  useEffect(() => {
    updateAsync();
  }, []);

  const updateAsync = async () => {
    const status = await BackgroundTask.getStatusAsync();
    const isRegistered = BackgroundTask.BackgroundTaskStatus;
    console.log(
      'BackgroundTask status: ',
      status,
      ' isRegistered: ',
      isRegistered,
    );
  };
  useEffect(() => {
    dispatch({
      type: 'SET_INTERNET_REACHABLE',
      payload: !!isInternetReachable,
    });
  }, [isInternetReachable]);
  if (!state.auth.user)
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push',
          contentStyle: {
            backgroundColor: colors.white,
          },
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='/login' />
        <Stack.Screen name='/photo' />
        <Stack.Screen name='/ui' />
      </Stack>
    );
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name='(app)' />
    </Stack>
  );
};
