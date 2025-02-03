import { Input } from "@/components/UI/Input/input";
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
      <Input label="Email" icon="Email" placeHolder="ola@nordmann.com"/>

    </SafeAreaView>
  );
};

export default Dashbord;
