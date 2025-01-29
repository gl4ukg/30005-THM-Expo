import { Icon } from "@/components/Icon/Icon";
import { BottomNavigation } from "@/components/UI/BottomNavigation";
import { OpenMenu } from "@/components/UI/BottomNavigation/openMenu";
import { transform } from "@babel/core";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={{ height: "100%", flex: 1 }}>
        <Tabs tabBar={(props: BottomTabBarProps) => <></>}>
          <Tabs.Screen
            name="user"
            options={{
              tabBarShowLabel: false,
              headerShadowVisible: false,
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Icon name="User" color={color} size="md" />
              ),
            }}
          />
          <Tabs.Screen
            name="dashbord"
            options={{
              title: "Dashbord",
              tabBarIcon: ({ color }) => (
                <Icon name="Settings" color={color} size="md" />
              ),
            }}
          ></Tabs.Screen>
        </Tabs>
      </View>
      <BottomNavigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
});
