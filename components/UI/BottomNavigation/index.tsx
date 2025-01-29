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
              id: "1",
              title: "SAS",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              id: "12",
              title: "fsa",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              id: "131",
              title: "Homevxfsd",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              id: "1532",
              title: "Homeasdas",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              id: "1SDA",
              title: "Home123",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              id: "1SDFS",
              title: "Home23",
              icon: () => <Icon name="Locked" color="black" />,
              links: [
                {
                  title: "Home",
                  to: "/",
                },
                {
                  title: "User",
                  to: "/(tabs)/user",
                },
                {
                  title: "Hoses",
                  to: "/(tabs)/hoses",
                },
              ],
            },
            {
              title: "Userd23",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User23",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "Usersd",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "Userd",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User888f",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User88",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User99",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User9",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User8",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User7",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User5",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User4",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User3",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User2",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1BF",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1AAA",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1XX",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1QQ",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1Q",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1W",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1U",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1M",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1B",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1A",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
            {
              title: "User1F",
              to: "/(tabs)/user",
              icon: () => <Icon name="User" color="black" />,
            },
          ]}
        />
      </Collapsible>
      <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
        <View style={styles.background}>
          <TessLines />
        </View>
        <View style={styles.buttonsWrapper}>
          <Link asChild href="/(tabs)/user" style={styles.button}>
            <Pressable style={({ pressed }) => [pressed && {}]}>
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
    paddingTop: 9,
    paddingInline: 20,
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
    left: 0,
    right: 0,
    maxHeight: Dimensions.get("window").height - 150,
    flex: 1,
    paddingTop: 9,
    paddingInline: 20,
    zIndex: 1000,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#007c34",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 9,
    paddingInline: 20,
    zIndex: 1000,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    height: 32,
    maxWidth: 450,
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#007c34",
    justifyContent: "center",
    alignItems: "center",
  },
});
