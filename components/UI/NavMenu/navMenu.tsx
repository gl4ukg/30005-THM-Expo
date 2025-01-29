import {
  type NavElementsType,
  NavElement,
} from "@/components/UI/NavMenu/navElement";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export const NavMenu: FC<{
  elements: NavElementsType[];
  handleLinkPress?: () => void;
}> = ({ elements, handleLinkPress }) => {
  const collapsable = elements.filter((element) => "links" in element);
  const [areCollapsed, updateAreCollapsed] = useState<Record<string, boolean>>(
    collapsable.reduce((acc, element) => {
      acc[element.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCollapsed = (id: string) => {
    const nowState = areCollapsed[id];
    if (nowState === false) {
      return updateAreCollapsed({
        ...areCollapsed,
        [id]: true,
      });
    } else {
      let newAreCollapsed = { ...areCollapsed };
      Object.keys(newAreCollapsed).forEach((key) => {
        if (key !== id) {
          newAreCollapsed[key] = true;
        } else {
          newAreCollapsed[key] = false;
        }
      });
      updateAreCollapsed(newAreCollapsed);
    }
  };
  return (
    <ScrollView style={styles.list}>
      {elements.map((element) => {
        if ("links" in element) {
          return (
            <NavElement
              key={element.id}
              id={element.id}
              isCollapsed={areCollapsed[element.id]}
              toggleCollapsed={toggleCollapsed}
              title={element.title}
              icon={element.icon}
              links={element.links}
              handleLinkPress={handleLinkPress}
            />
          );
        } else {
          return (
            <NavElement
              key={element.title}
              title={element.title}
              icon={element.icon}
              to={element.to}
              handleLinkPress={handleLinkPress}
            />
          );
        }
      })}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    minWidth: 300,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    marginBottom: 40,
    borderTopWidth: 2,
    borderColor: "#009640",
    backgroundColor: "#BDECB9",
  },
});
