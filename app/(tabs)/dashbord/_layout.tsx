import { Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DashbordLayout() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen
          name="hoses/[filter]/index"
          options={{ headerShown: true }}
        />
        <Stack.Screen name="hoses/index" options={{ headerShown: true }} />
        <Stack.Screen
          name="hoses/hose/[slug]"
          options={{ headerShown: true }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: "100%",
  },
});
