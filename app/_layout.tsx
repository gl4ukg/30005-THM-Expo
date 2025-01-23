import { BottomMenu } from "@/components/BottomMenu";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "red" }}>
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "blue",
          borderColor: "purple",
          borderWidth: 5,
        }}
      >
        <Stack>
          <Stack.Screen name="index" options={{ title: "Dashboard" }} />
          <Stack.Screen name="login" options={{ title: "Home" }} />
          <Stack.Screen name="something" options={{ title: "Something" }} />
        </Stack>
      </View>
      <BottomMenu />
    </View>
  );
}
