import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from "@/components/Icon/Icon";

const Right: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        width={size}
        height={size}
        transform="translate(24.5 24) rotate(180)"
        fill="none"
      />
      <Path
        d="M17 12L9.5 19.5L8.45 18.45L14.9 12L8.45 5.55L9.5 4.5L17 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default Right;
