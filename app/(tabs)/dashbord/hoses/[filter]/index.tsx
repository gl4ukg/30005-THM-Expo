import { ListTable } from "@/components/dashboard/listTable";
import { Typography } from "@/components/typography";
import { Select } from "@/components/UI/Select";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  slug: string;
}

type HostType = {
  id: number;
  name: string;
  position: string;
  condition: string;
  lastInspection: string;
  lastInspectionDate: string;
  nextInspection: string;
  nextInspectionDate: string;
  missingData: string[];
};

const getFilteredHoses = (filter: string) => {
  const random6DiggetString: string = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const randomDateString = () => {
    const dateNum =
      Math.random() * (+new Date("01-01-2026") - +new Date("01-01-2000") + 1) +
      +new Date("01-01-2026");
    const date = new Date(dateNum);
    return date.toLocaleDateString().replace(/\/20/g, "").replace(/\//g, "");
  };
  const mockedList: HostType[] = [];
  return {
    listLength: mockedList.length,
    listTitle: `Failed inspections (${mockedList.length})`,
    filteredList: mockedList,
  };
};

const Host: React.FC<Props> = (props) => {
  const options = [
    { value: "contactTessTeam", label: "Contact TESS Team" },
    { value: "requestForQuote", label: "Request for quote" },
    { value: "scrapHoses", label: "Scrap hoses" },
  ];
  const [action, setAction] = useState<string | null>(null);
  const { filter } = useLocalSearchParams();
  const { filteredList, listTitle, listLength } = getFilteredHoses(
    Array.isArray(filter) ? filter[0] : filter
  );
  const onChangeAction = (value: string) => {
    setAction(value);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.header}>
          <Typography name="tableHeader" text={listTitle} />
          <Select
            selected={action}
            options={options}
            onChange={onChangeAction}
            menuTitle="Actions"
          />
        </View>
        <ListTable />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Host;

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
