import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface Props {
  size: number;
  color: string;
}

export const TrendArrowDown: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        width={size}
        height={size}
        transform="translate(24.5) rotate(90)"
        fill="none"
      />
      <Path d="M12 15L7 10H17L12 15Z" fill={color} />
    </Svg>
  );
};
