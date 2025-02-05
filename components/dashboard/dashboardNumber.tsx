import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/typography";
import { tokens } from "@/lib/tokens";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
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
  const colors = {
    error: {
      backgroundColor: tokens.colors.main[200],
      textColor: tokens.colors.main[800],
    },
    warning: {
      backgroundColor: tokens.colors.main[200],
      textColor: tokens.colors.main[800],
    },
    success: {
      backgroundColor: tokens.colors.secondary[200],
      textColor: tokens.colors.secondary[800],
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
        <Typography
          name="numericalHighlight"
          text={value}
          style={[style.value, { color: colors[state].textColor }]}
        />
        <Trend trend={trend} color={colors[state].textColor} />
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
    width: 100,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  value: {},
});
const Trend = ({
  trend,
  color,
}: {
  trend: 0 | 1 | -1 | undefined;
  color?: string;
}) => {
  if (trend === 1) {
    return <Icon name="TrendArrowDown" size="sm" color={color} />;
  }
  if (trend === -1) {
    return <Icon name="TrendArrowDown" size="sm" color={color} />;
  }
  return <></>;
};
