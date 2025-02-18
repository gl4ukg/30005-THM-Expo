import { TessLines } from "@/components/decorative/tessLines";
import { Icon } from "@/components/Icon/Icon";
import { OpenMenu } from "@/components/UI/BottomNavigation/openMenu";
import { NavMenu } from "@/components/UI/NavMenu/navMenu";
import { Link, useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomNavigationProps {}
export const BottomNavigation: FC<BottomNavigationProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.modal, isOpen && styles.modalOpen]}>
      <Collapsible collapsed={!isOpen} style={styles.collapsible}>
        <NavMenu
          handleLinkPress={() => setIsOpen(false)}
          elements={[
            {
              title: "Download / sync data",
              to: "/(tabs)/dashbord/hoses",
              icon: () => <Icon name="Download" color="#009640" />,
            },
            {
              title: "Upload your data",
              to: "/(tabs)/dashbord",
              icon: () => <Icon name="Upload" color="#009640" />,
            },
            {
              id: "Inspection",
              title: "Inspection",
              icon: () => <Icon name="Search" color="#009640" />,
              links: [
                {
                  title: "Inspect",
                  to: "/",
                },
                {
                  title: "Edit hose data",
                  to: "/(tabs)/user",
                },
                {
                  title: "Update RFID",
                  to: "/(tabs)/dashbord/hoses",
                },
                {
                  title: "Metering",
                  to: "/(tabs)/dashbord/hoses",
                },
              ],
            },
            {
              title: "Alerts /KPIs",
              to: "/(tabs)/user",
              icon: () => <Icon name="Meter" color="#009640" />,
            },
            {
              title: "Order hoses",
              to: "/(tabs)/user",
              icon: () => <Icon name="Cart" color="#009640" />,
            },
            {
              title: "Hose replacement & pressure testing",
              to: "/(tabs)/user",
              icon: () => <Icon name="Task" color="#009640" />,
            },
            {
              title: "Report ID as scrapped",
              to: "/(tabs)/user",
              icon: () => <Icon name="Trash" color="#009640" />,
            },
            {
              title: "Send mail",
              to: "/(tabs)/user",
              icon: () => <Icon name="Email" color="#009640" />,
            },
            {
              title: "Settings",
              to: "/(tabs)/user",
              icon: () => <Icon name="Settings" color="#009640" />,
            },
          ]}
        />
      </Collapsible>
      <View style={[styles.navigationContainer, { bottom: insets.bottom }]}>
        <View style={[styles.background, { bottom: -insets.bottom }]}>
          <TessLines width={Dimensions.get("window").width * 0.6} />
        </View>
        <View style={styles.buttonsWrapper}>
          <Link asChild href="/(tabs)/user" style={styles.button}>
            <Pressable
              style={({ pressed }) => [pressed && {}]}
              onPress={() => setIsOpen(false)}
            >
              <Icon name="User" color="#fff" />
            </Pressable>
          </Link>
          <View style={{ width: 30, height: 30 }} />
          <OpenMenu
            isOpen={isOpen}
            handlePress={() => setIsOpen((isOpen) => !isOpen)}
          />
          <Pressable style={styles.button}>
            <Icon name="Search" color="#fff" />
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Icon name="Left" color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1000,
  },
  modalOpen: {
    flex: 1,
    height: "100%",
    position: "absolute",
    backgroundColor: "#00000075",
    justifyContent: "flex-end",
    top: 0,
  },
  collapsible: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    flex: 1,
    paddingTop: 9,
    zIndex: 1000,
  },
  navigationContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#007c34",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 1000,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    height: 50,
    maxWidth: 350,
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#007c34",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
