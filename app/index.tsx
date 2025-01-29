import { NavMenu } from "@/components/UI";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "@/components/Icon/Icon";
import { BottomNavigation } from "@/components/UI/BottomNavigation";
import { Link } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView contentContainerStyle={styles.navigationContainer}>
        <Link asChild href="/(tabs)/dashbord" style={[styles.link]}>
          <Pressable
          // style={({ pressed }) => [pressed && styles.containerPressed]}
          >
            <Text>Dashbord</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: "100%",
    position: "relative",
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  link: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    elevation: 3,
    backgroundColor: "#BDECB9",
  },
});
