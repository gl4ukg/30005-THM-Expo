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
import { Typography } from "@/components/typography";

const Login = () => {
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView contentContainerStyle={styles.navigationContainer}>
        <View style={styles.container}>
          <Link asChild href="/(tabs)/dashbord" style={[styles.link]}>
            <Pressable
            // style={({ pressed }) => [pressed && styles.containerPressed]}
            >
              <Text>Dashbord</Text>
            </Pressable>
          </Link>
        </View>
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
  container: {
    flex: 1,
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    width: "100%",
  },
  link: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#BDECB9",
  },
});
