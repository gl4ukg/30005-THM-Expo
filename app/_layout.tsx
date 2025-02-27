import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='ui' options={{ headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   safeArea: {
//     // flex: 1,
//     // height: "100%",
//     backgroundColor: "yellow"
//   },
// });
