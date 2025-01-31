import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const User = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Text>User</Text>
      </Link>
    </SafeAreaView>
  );
};

export default User;
