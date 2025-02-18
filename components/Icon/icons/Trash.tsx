import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type SvgIconProps } from "@/components/Icon/Icon";

const Trash: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M11 9H9.5V18H11V9Z" fill={color} />
      <Path d="M15.5 9H14V18H15.5V9Z" fill={color} />
      <Path
        d="M3.5 4.5V6H5V21C5 21.3978 5.15804 21.7794 5.43934 22.0607C5.72064 22.342 6.10218 22.5 6.5 22.5H18.5C18.8978 22.5 19.2794 22.342 19.5607 22.0607C19.842 21.7794 20 21.3978 20 21V6H21.5V4.5H3.5ZM6.5 21V6H18.5V21H6.5Z"
        fill={color}
      />
      <Path d="M15.5 1.5H9.5V3H15.5V1.5Z" fill={color} />
    </Svg>
  );
};

export default Trash;
