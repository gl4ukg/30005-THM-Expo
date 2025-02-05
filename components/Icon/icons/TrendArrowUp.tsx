import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface Props {
  size: number;
  color: string;
}

export const TrendArrowUp: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        width={size}
        height={size}
        transform="translate(24.5) rotate(90)"
        fill="none"
      />
      <Path d="M7 14L12 9L17 14H7Z" fill={color} />
    </Svg>
  );
};
