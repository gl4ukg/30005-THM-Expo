import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type SvgIconProps } from "@/components/Icon/Icon";

const Menu: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3.5 18V16H21.5V18H3.5ZM3.5 13V11H21.5V13H3.5ZM3.5 8V6H21.5V8H3.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default Menu;
