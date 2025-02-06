import { DashboardNumber } from "@/components/dashboard";
import { DashboardTitle } from "@/components/dashboard/dashboardTitle";
import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/typography";
import { Select } from "@/components/UI/Select";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const options = [
  {
    label: "pr Month",
    value: "month",
  },
  {
    label: "pr Week",
    value: "week",
  },
  {
    label: "pr Day",
    value: "day",
  },
];
const menuOptions = [
  {
    label: "Scrap hoses",
    value: "scrapHoses",
    icon: () => <Icon name="Trash" color="#009640" />,
  },
  {
    label: "Request for quote",
    value: "requestForQuote",
    icon: () => <Icon name="Cart" color="#009640" />,
  },
  {
    label: "Contact TESS team",
    value: "contactTessTeam",
    icon: () => <Icon name="Email" color="#009640" />,
  },
];
const Dashbord = () => {
  const [selected, setSelected] =
    useState<(typeof options)[0]["value"]>("month");

  const router = useRouter();

  const goToFilter = (filter: string) => {
    router.push(`/(tabs)/dashbord/hoses/${filter}`);
  };
  return (
    <SafeAreaView style={style.safeView}>
      <View style={style.container}>
        <View style={style.header}>
          <Typography name="tableHeader" text="Inspections" />
          <Select
            selected={selected}
            options={options}
            onChange={setSelected}
          />
        </View>
        <View style={style.menu}>
          <DashboardNumber
            label="Failed"
            value={1129}
            trend={1}
            state="error"
            onPress={() => goToFilter("failed")}
          />
          <DashboardNumber
            label="Overdue"
            value={0}
            trend={-1}
            state="warning"
            onPress={() => goToFilter("overdue")}
          />
          <DashboardNumber
            label="Failed"
            value={12}
            trend={0}
            state="success"
            onPress={() => goToFilter("withRemarks")}
          />
        </View>
        <DashboardTitle
          onPress={() => goToFilter("inspection")}
          label="Hoses soon to be inspected"
          value={230}
          trend={1}
        />
        <View style={style.replacements}>
          <Typography name="sectionHeader" text="Replacements" />
        </View>
        <DashboardTitle
          onPress={() => goToFilter("overdue")}
          label="Replacements overdue"
          value={123}
          trend={-1}
        />
        <DashboardTitle
          onPress={() => goToFilter("upcoming")}
          label="Replacements upcoming"
          value={8}
          trend={1}
        />
        <DashboardTitle
          onPress={() => goToFilter("iInTransit")}
          label="New hoses in transit"
          value={14}
          trend={-1}
        />
        <DashboardTitle
          onPress={() => goToFilter("recycled")}
          label="Hoses recycled"
          value={14}
          trend={1}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeView: {
    flex: 1,
    borderColor: "yellow",
    borderWidth: 2,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
    padding: 20,
  },
  header: {
    // width: "100%",
    alignItems: "center",
    padding: 20,
    gap: 6,
    // borderColor: "#009640",
    // borderWidth: 2,
  },
  menu: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    gap: 12,
    flexDirection: "row",
  },
  replacements: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    gap: 12,
  },
});

export default Dashbord;
