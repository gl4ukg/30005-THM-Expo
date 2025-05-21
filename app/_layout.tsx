import { Typography } from '@/components/Typography';
import { ContextProvider, useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { syncData } from '@/lib/util/sync';
import { useNetInfo } from '@react-native-community/netinfo';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
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
const App = () => {
  const { state, dispatch } = useAppContext();

  const { type, isInternetReachable } = useNetInfo();
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
  return (
    <>
      {state.data.isLoading && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            opacity: 0.3,
            top: 75,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            flexDirection: 'row',
            gap: 15,
          }}
        >
          <Typography name='button'>
            Connection type: {state.settings.connectionType}
          </Typography>
          <ActivityIndicator color={colors.white} />
        </View>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push',
          contentStyle: {
            backgroundColor: colors.white,
          },
        }}
      >
        {state.auth.user === null && (
          <>
            <Stack.Screen name='index' />
            <Stack.Screen name='/login' />
            <Stack.Screen name='ui' />
          </>
        )}
        {state.auth.user !== null && (
          <>
            <Stack.Screen name='(app)' />
          </>
        )}
      </Stack>
    </>
  );
};
