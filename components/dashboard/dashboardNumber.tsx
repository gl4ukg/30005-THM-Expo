import { Trend } from "@/components/dashboard/trend";
import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/typography";
import { tokens } from "@/lib/tokens";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  label: string;
  value: number;
  state: "error" | "warning" | "success";
  trend?: 0 | 1 | -1;
  onPress: () => void;
}

export const DashboardNumber: FC<Props> = ({
  value,
  label,
  onPress,
  trend,
  state,
}) => {
  const colors: Record<
    Props["state"],
    { backgroundColor: string; textColor: string }
  > = {
    error: {
      backgroundColor: tokens.colors.dashbordRed,
      textColor: tokens.colors.dashbordRedText,
    },
    warning: {
      backgroundColor: tokens.colors.dashbordYellow,
      textColor: tokens.colors.dashbordYellowText,
    },
    success: {
      backgroundColor: tokens.colors.dashbordGreen,
      textColor: tokens.colors.dashbordGreenText,
    },
  };
  return (
    <Pressable
      style={[
        style.container,
        { backgroundColor: colors[state].backgroundColor },
      ]}
      onPress={onPress}
    >
      <View style={style.valueContainer}>
        <View style={style.spacer}></View>
        <Typography
          name="numericalHighlight"
          text={`${value}`}
          style={[{ color: colors[state].textColor }]}
        />
        <View style={style.spacer}></View>
        <Trend
          trend={trend}
          color={colors[state].textColor}
          style={style.trend}
        />
      </View>
      <Typography name="fieldValue" text={label} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 4,
    gap: 4,
    width: 120,
  },
  valueContainer: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  spacer: {
    width: 24,
  },
  trend: {
    position: "absolute",
    right: 0,
  },
});
