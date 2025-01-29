import { NavMenu } from "@/components/UI";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { tokens } from "@/lib/tokens";
import { Icon } from "@/components/Icon/Icon";

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
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "2",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "4",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "3",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "11",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "22",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Icon name="Settings" color="#000" size="sm" />,
          },
          {
            id: "43",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "34",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "16",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "27",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Icon name="Settings" color="#000" size="sm" />,
          },
          {
            id: "48",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Settings" color="#000" size="sm" />,
          },
          {
            id: "39",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "51",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
          },
          {
            id: "52",
            title: "About",
            links: [{ title: "About", to: "/ui" }],
            icon: () => <Icon name="Settings" color="#000" size="sm" />,
          },
          {
            id: "54",
            title: "Home",
            links: [
              { title: "Home", to: "/" },
              { title: "UI", to: "/ui" },
            ],
            icon: () => <Icon name="Locked" color="#000" size="sm" />,
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
