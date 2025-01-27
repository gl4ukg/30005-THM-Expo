import { NavMenu } from "@/components/UI";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { tokens } from "@/lib/tokens";

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.navigationContainer}>
      <NavMenu
        elements={[
          {
            id: "1",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "2",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Text>About</Text>,
          },
          {
            id: "4",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "3",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "11",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "22",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Text>About</Text>,
          },
          {
            id: "43",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "34",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "16",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "27",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Text>About</Text>,
          },
          {
            id: "48",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "39",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "51",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
          {
            id: "52",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Text>About</Text>,
          },
          {
            id: "54",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Text>Home</Text>,
          },
        ]}
      />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    width: "100%",
  },
});
