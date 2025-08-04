import { Typography } from '@/components/Typography';
import { ContextProvider, useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { syncData } from '@/lib/util/sync';
import { registerBackgroundTaskAsync } from '@/tasks';
import { useNetInfo } from '@react-native-community/netinfo';
import * as BackgroundTask from 'expo-background-task';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <App />
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
    console.log('status', status, isRegistered);
  };
  useEffect(() => {
    dispatch({
      type: 'UPDATE_CONNECTION_TYPE',
      payload: type as 'wifi' | 'mobile' | null,
    });
    if (type === 'wifi' && isInternetReachable) {
      // sync application data
      syncData({
        userEventsArray: [],
        onUpdate: (isLoading: boolean) => {
          dispatch({
            type: 'SET_DATA_LOADING',
            payload: isLoading,
          });
        },
      });
    }
  }, [type]);
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
