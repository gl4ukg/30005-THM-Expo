import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider
      style={{ flex: 1, width: "100%", backgroundColor: "red" }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ title: "Dashboard" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
