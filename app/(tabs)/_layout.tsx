import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/typography";
import { BottomNavigation } from "@/components/UI/BottomNavigation";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider style={[styles.safeArea]}>
      <StatusBar backgroundColor="#004637" style="light" />
      <View
        style={[
          styles.statusBarIOS,
          {
            height: insets.top,
          },
        ]}
      />
      <SafeAreaView style={{ height: "100%", flex: 1 }}>
        <View style={styles.header}>
          <Icon name="User" color="white" size="sm" />
          <Typography
            name="navigation"
            text="Test Princess"
            style={styles.headerText}
          />
        </View>
        <Tabs
          screenOptions={{ headerShown: false }}
          initialRouteName="dashbord"
          tabBar={() => <></>}
        >
          <Tabs.Screen
            name="user"
            options={
              {
                // tabBarShowLabel: false,
                // headerShadowVisible: false,
                // headerShown: false,
                // tabBarIcon: ({ color }) => (
                //   <Icon name="User" color={color} size="md" />
                // ),
              }
            }
          />
          <Tabs.Screen
            name="dashbord"
            options={
              {
                // title: "Dashbord",
                // tabBarIcon: ({ color }) => (
                //   <Icon name="Settings" color={color} size="md" />
                // ),
              }
            }
          ></Tabs.Screen>
        </Tabs>
      </SafeAreaView>
      <BottomNavigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    position: "relative",
  },
  statusBarIOS: {
    width: "100%",
    backgroundColor: "#004637",
  },
  header: {
    height: 50,
    backgroundColor: "#004637",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  headerText: { color: "white" },
});
