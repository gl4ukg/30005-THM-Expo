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
        </Stack>
      </View>
    </View>
  );
}
