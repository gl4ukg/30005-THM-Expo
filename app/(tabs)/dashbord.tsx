import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const Dashbord = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Text>Dashbord</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Dashbord;
