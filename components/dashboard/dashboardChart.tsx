import { Typography } from "@/components/typography";
import { tokens } from "@/lib/tokens";
import { colors } from "@/lib/tokens/colors";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BarChart, type barDataItem } from "react-native-gifted-charts";

const calculateAvg = (arr: { value: number }[]) => {
  return arr.reduce((a, b) => a + b.value, 0) / arr.length;
};

export const DashboardChart = () => {
  const barData: barDataItem[] = [
    {
      value: 12855,
      label: "Jan",
    },
    {
      value: 12855,
      label: "Feb",
    },
    {
      value: 12855,
      label: "Mar",
    },
    {
      value: 1482,
      label: "Apr",
    },
    {
      value: 1282,
      label: "May",
    },
    {
      value: 1382,
      label: "Jun",
    },
  ];

  return (
    <View style={styles.container}>
      {
        <BarChart
          data={barData.map((d) => ({
            ...d,
          }))}
          height={150}
          barWidth={30}
          spacing={10}
          // initialSpacing={10}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{
            color: tokens.colors.secondary75,
            fontSize: 14,
            fontWeight: 400,
            textAlign: "right",
            fontFamily: Platform.select({
              android: "RobotoCondensed_400Regular",
              ios: "RobotoCondensed-Regular",
            }),
          }}
          xAxisLabelTextStyle={{
            color: tokens.colors.secondary75,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20,
            fontFamily: Platform.select({
              android: "RobotoCondensed_400Regular",
              ios: "RobotoCondensed-Regular",
            }),
          }}
          showReferenceLine1
          referenceLine1Position={calculateAvg(barData as { value: number }[])}
          referenceLine1Config={{
            color: tokens.colors.extendedPurple + "90",
            thickness: 1,
            type: "solid",
            labelText: `Avg ${calculateAvg(
              barData as { value: number }[]
            ).toFixed(0)}`,
            labelTextStyle: {
              color: tokens.colors.extendedPurple,
              right: -70,
              top: -12,
            },
          }}
          hideRules
          disablePress
          noOfSections={6}
          stepValue={Math.max(...barData.map((d) => d.value ?? 0)) / 5}
          showValuesAsTopLabel
          topLabelContainerStyle={{
            bottom: 0,
            padding: 1,
            flex: 1,
            position: "absolute",
            flexDirection: "row",
            noWrap: true,
            left: -50,
            right: -50,
            width: 50 + 30 + 50,
            justifyContent: "center",
          }}
          topLabelTextStyle={{
            textAlign: "center",
            fontSize: 14,
          }}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "hotpink",
    width: "100%",
  },
});
