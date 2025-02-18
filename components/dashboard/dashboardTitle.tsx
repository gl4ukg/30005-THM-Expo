import { Trend } from "@/components/dashboard/trend";
import { Typography } from "@/components/typography";
import { tokens } from "@/lib/tokens";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  label: string;
  value: number;
  trend?: 0 | 1 | -1;
  onPress: () => void;
}

export const DashboardTitle: FC<Props> = ({ label, value, onPress, trend }) => {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <View style={styles.container}>
        <Typography name="navigation" text={label} style={styles.label} />
        <View style={styles.value}>
          <Typography name="numericalHighlight" text={`${value}`} />
          {trend && (
            <Trend
              trend={trend}
              style={styles.trend}
              color={
                trend === 1
                  ? tokens.colors.errorText
                  : trend === -1
                  ? tokens.colors.lightContrast
                  : "transparent"
              }
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: tokens.colors.secondary95,
    borderBottomWidth: 1,
    padding: 12,
    paddingRight: 0,
  },
  label: {
    color: tokens.colors.secondary75,
  },
  value: {
    position: "relative",
    paddingRight: 24,
  },
  trend: {
    position: "absolute",
    right: 0,
  },
});
