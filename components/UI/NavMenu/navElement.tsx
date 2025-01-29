import { Href, Link } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";

interface NavElement {
  title: string;
  icon?: FC<any>;
  key?: string;
}
interface NavLink extends NavElement {
  to: Href;
}
interface NavMenu extends NavElement {
  links: NavLink[];
  id: string;
  isCollapsed: boolean;
  toggleCollapsed: (id: string) => void;
}
export type NavElementsType =
  | NavLink
  | Omit<NavMenu, "isCollapsed" | "toggleCollapsed">;
type NavElementType = { handleLinkPress?: () => void } & (NavLink | NavMenu);

export const NavElement: FC<NavElementType> = (props) => {
  if ("to" in props) {
    return (
      <Link asChild href={props.to} style={[styles.container]}>
        <Pressable
          style={({ pressed }) => [pressed && styles.containerPressed]}
          onPress={props?.handleLinkPress}
        >
          <View>{props.icon && <props.icon />}</View>
          <Text>{props.title}</Text>
        </Pressable>
      </Link>
    );
  } else if ("links" in props) {
    const { isCollapsed, toggleCollapsed, id } = props;
    return (
      <>
        <Pressable
          style={({ pressed }) => [
            styles.container,
            pressed && styles.containerPressed,
          ]}
          onPress={() => toggleCollapsed(id)}
        >
          <View>{props.icon && <props.icon />}</View>
          <View>
            <Text style={[styles.title, !isCollapsed && styles.titleOpened]}>
              {props.title}
            </Text>
          </View>
        </Pressable>
        <Collapsible collapsed={isCollapsed} align="center">
          <View style={[styles.linksWrapper]}>
            {props.links.map((link, index) => (
              <View key={index} style={styles.innerLink}>
                <Link asChild href={link.to}>
                  <Pressable
                    style={({ pressed }) => [
                      pressed && styles.containerPressed,
                    ]}
                    onPress={props?.handleLinkPress}
                  >
                    <View>{link.icon && <link.icon />}</View>
                    <Text>{link.title}</Text>
                  </Pressable>
                </Link>
              </View>
            ))}
          </View>
        </Collapsible>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    elevation: 3,
    backgroundColor: "#BDECB9",
  },
  containerPressed: {
    opacity: 0.6,
  },
  linksWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    elevation: 3,
    backgroundColor: "#BDECB9",
  },
  innerLink: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 69,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#E2F9E0",
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "regular",
    letterSpacing: 0.25,
    color: "black",
  },
  titleOpened: {
    fontWeight: "bold",
  },
});
