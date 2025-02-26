import { BarChart, Primary, Secondary } from "@/components/dashboard";
import { BarData } from "@/components/dashboard/barChart";
import { Typography } from "@/components/typography";
import { Select } from "@/components/UI/Select";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const month: BarData = [
    {
      value: 72,
      label: "Jan",
    },
    {
      value: 138,
      label: "Feb",
    },
    {
      value: 91,
      label: "Mar",
    },
    {
      value: 125,
      label: "Apr",
    },
    {
      value: 141,
      label: "May",
    },
    {
      value: 68,
      label: "Jun",
    },
    {
      value: 68,
      label: "Jul",
    },
  ];
const day: BarData = [
    {
      value: 2,
      label: "Mon",
    },
    {
      value: 5,
      label: "Tue",
    },
    {
      value: 10,
      label: "Wed",
    },
    {
      value: 12,
      label: "Thu",
    },
    {
      value: 15,
      label: "Fri",
    },
    {
      value: 18,
      label: "Sat",
    },
    {
      value: 20,
      label: "Sun",
    },
  ];

  const week: BarData = [
    {
      value: 72,
      label: "w46",
    },
    {
      value: 138,
      label: "w47",
    },
    {
      value: 91,
      label: "w48",    
    },    
    {
      value: 125,
      label: "w49",
    },    
    {
      value: 141,
      label: "w50",
    },  
    {
      value: 68,
      label: "w51",
    },
    {
      value: 68,
      label: "w52",
    },
  ]

  const year: BarData = [
    {
      value: 2022,
      label: "2020",
    },
    {
      value: 3122,
      label: "2021",
    },
    {
      value: 2122,
      label: "2022",
    },
    {
      value: 5121,
      label: "2023",
    },
    {
      value: 1012,
      label: "2024",
    },
    {
      value: 1221,
      label: "2025",
    },

  ]

  const team: BarData = [
    {
      label: "Mar",
      value: 41,
    },
    {
      label: "Øyv",
      value: 34,
    },
    {
      label: "Hja",
      value: 26,
    },
    {
      label: "Arn",
      value: 41,
    },
    {
      label: "Fra",
      value: 58,
    },
    {
      label: "Eiv",
      value: 27,
    },
  ]

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
  {
    label: "pr Year",
    value: "year",
  },
  {
    label: "pr Team",
    value: "team",
  },
];

const Dashbord = () => {
  const [selected, setSelected] =
    useState<(typeof options)[0]["value"]>("month");
  
  const [barData, setBarData] = useState<BarData>(team);
  useEffect(() => {
    switch (selected) {
      case "month":
        setBarData(month);
        break;
      case "week":
        setBarData(week);
        break;
      case "day":
        setBarData(day);
        break;
      case "year":
        setBarData(year);
        break;
      case "team":
        setBarData(team);
        break;
    }
  }, [selected]);
  const router = useRouter();

  const goToFilter = (filter: string) => {
    router.push(`/(tabs)/dashbord/hoses/${filter}`);
  };
  const goToHost = (id: string) => {
    router.push(`/(tabs)/dashbord/hoses/hose/[${id}]`);
  };
  return (
    <SafeAreaView style={style.safeView}>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.header}>
          <Typography name="tableHeader" text="Inspections" />
          <Select
            selected={selected}
            options={options}
            onChange={setSelected}
          />
        </View>
        <BarChart barData={barData} />
        <View style={style.menu}>
          <Primary
            label="Failed"
            value={1129}
            trend={1}
            state="error"
            onPress={() => goToHost("failed")}
          />
          <Primary
            label="Overdue"
            value={0}
            trend={-1}
            state="warning"
            onPress={() => goToFilter("overdue")}
          />
          <Primary
            label="w/Remarks"
            value={12}
            trend={0}
            state="success"
            onPress={() => goToFilter("withRemarks")}
          />
        </View>
        <Secondary
          onPress={() => goToFilter("inspection")}
          label="Hoses soon to be inspected"
          value={230}
          trend={1}
        />
        <View style={style.replacements}>
          <Typography name="sectionHeader" text="Replacements" />
        </View>
        <Secondary
          onPress={() => goToFilter("overdue")}
          label="Replacements overdue"
          value={123}
          trend={-1}
        />
        <Secondary
          onPress={() => goToFilter("upcoming")}
          label="Replacements upcoming"
          value={8}
          trend={1}
        />
        <Secondary
          onPress={() => goToFilter("iInTransit")}
          label="New hoses in transit"
          value={14}
          trend={-1}
        />
        <Secondary
          onPress={() => goToFilter("recycled")}
          label="Hoses recycled"
          value={14}
          trend={1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
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
    position: "relative",
    alignItems: "center",
    // justifyContent: "space-evenly",
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
