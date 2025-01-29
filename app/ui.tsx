import { Link } from "expo-router";
import { Text, View } from "react-native";

const Ui = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Text>Dashboard</Text>
      </Link>
    </View>
  );
};

export default Ui;
