import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { THSContextProvider } from '@/context/THScontextProvider';

export default function RootLayout() {
  return (
    <THSContextProvider>
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='ui' options={{ headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
   </THSContextProvider>
  );
}

// const styles = StyleSheet.create({
//   safeArea: {
//     // flex: 1,
//     // height: "100%",
//     backgroundColor: "yellow"
//   },
// });
