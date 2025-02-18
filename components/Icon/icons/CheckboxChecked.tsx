import { SvgIconProps } from "@/components/Icon/Icon";
import React from "react";
import Svg, { Path, Rect, G, Defs, ClipPath } from "react-native-svg";

const CheckboxChecked: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect width={size} height={size} fill="none" />
      <Path
        d="M9.75 18L3 11.25L4.0605 10.1895L9.75 15.8783L19.9395 5.68951L21 6.75001L9.75 18Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckboxChecked;
