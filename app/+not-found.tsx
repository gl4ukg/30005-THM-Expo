import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={{ color: "white" }}>Not Found</Text>
    </View>
  );
}
