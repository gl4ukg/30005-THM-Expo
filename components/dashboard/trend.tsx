import { Icon } from "@/components/Icon/Icon";
import { View, ViewStyle } from "react-native";

export const Trend = ({
  trend,
  color,
  style,
}: {
  trend: 0 | 1 | -1 | undefined;
  color?: string;
  style?: ViewStyle;
}) => {
  const trendIcon =
    trend === 1 ? (
      <Icon name="TrendArrowUp" size="sm" color={color} />
    ) : trend === -1 ? (
      <Icon name="TrendArrowDown" size="sm" color={color} />
    ) : (
      <></>
    );
  return <View style={style}>{trendIcon}</View>;
};
