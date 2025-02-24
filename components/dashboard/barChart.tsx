import { Typography } from "@/components/typography";
import { colors } from "@/lib/tokens/colors";
import { FC } from "react";
import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BarChart, type barDataItem } from "react-native-gifted-charts";

const calculateAvg = (arr: { value: number }[]) => {
  return arr.reduce((a, b) => a + b.value, 0) / arr.length;
};

export type BarData =  {
  value: number;
  label: string
}[];

interface Props {
  barData: BarData
}

export const BarChartDashbord: FC<Props> = ({barData}) => {
  const width = useWindowDimensions().width;
  const height = (width - 20) / 2
  const barWidth = 24/298 * (width - 20);
  return (
    <View style={styles.container}>
      {
        <BarChart
          data={barData}
          height={height}
          barWidth={barWidth}
          spacing={5}
          initialSpacing={10}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{
            color: colors.secondary75,
            fontSize: 14,
            fontWeight: 400,
            textAlign: "left",
            fontFamily: Platform.select({
              android: "RobotoCondensed_400Regular",
              ios: "RobotoCondensed-Regular",
            }),
          }}
          xAxisLabelTextStyle={{
            color: colors.secondary75,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20,
            fontFamily: Platform.select({
              android: "RobotoCondensed_400Regular",
              ios: "RobotoCondensed-Regular",
            }),
          }}
          showReferenceLine1
          referenceLine1Position={calculateAvg(barData)}
          referenceLine1Config={{
            color: colors.extendedPurple + "90",
            thickness: 1,
            type: "solid",
            labelText: `Avg ${calculateAvg(
              barData
            ).toFixed(0)}`,
            labelTextStyle: {
              color: colors.extendedPurple,
              right: -60,
              top: -10,
            },
            zIndex:1 
          }}
          hideRules
          disablePress
          noOfSections={5}
          stepValue={Math.max(...barData.map((d) => d.value ?? 0)) / 4}
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
            width: 50 + barWidth + 50,
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
    width: "100%",
  },
});
