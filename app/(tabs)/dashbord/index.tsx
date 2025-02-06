import { DashboardNumber } from "@/components/dashboard";
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

  const onActionChange = (value: (typeof menuOptions)[0]["value"]) => {
    console.log(value);
    if (value === "scrapHoses") {
      router.push("/(tabs)/dashbord/hoses/scrapHoses");
    } else if (value === "requestForQuote") {
      router.push("/(tabs)/dashbord/hoses/requestForQuote");
    } else if (value === "contactTessTeam") {
      router.push("/(tabs)/dashbord/hoses/contactTessTeam");
    }
  };
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

        <Link href="/(tabs)/dashbord/hoses/inspection">
          <Text>Hoses soon to be inspected</Text>
        </Link>
        <Link href="/(tabs)/dashbord/hoses/overdue">
          <Text>Replacements overdue</Text>
        </Link>
        <Link href="/(tabs)/dashbord/hoses/upcoming">
          <Text>Replacements upcoming</Text>
        </Link>
        <Link href="/(tabs)/dashbord/hoses/iInTransit">
          <Text>New hoses in transit</Text>
        </Link>
        <Link href="/(tabs)/dashbord/hoses/recycled">
          <Text>Hoses recycled</Text>
        </Link>
        {/* <View style={style.header}>
          <Typography name="tableContent" text="Failed inspections (11)" />
          <Select
            menuTitle="Actions"
            selected="Actions"
            options={menuOptions}
            onChange={onActionChange}
          />
        </View> */}
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
    alignItems: "stretch",
    justifyContent: "center",
    padding: 0,
    gap: 6,
    flexDirection: "row",
    // borderColor: "#009640",
    // borderWidth: 2,
  },
});

export default Dashbord;
