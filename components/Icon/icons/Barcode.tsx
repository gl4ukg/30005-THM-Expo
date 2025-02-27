import { type SvgIconProps } from '@/components/Icon/Icon';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Barcode: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 16 16' fill='none'>
      <Path d='M3 4.5H1.5L1.5 21H3L3 4.5Z' fill={color} />
      <Path d='M10.5 4.5L9 4.5L9 19.5H10.5L10.5 4.5Z' fill={color} />
      <Path d='M7.5 4.5H4.5L4.5 19.5H7.5L7.5 4.5Z' fill={color} />
      <Path d='M15 4.5H12L12 19.5H15L15 4.5Z' fill={color} />
      <Path d='M19.5 4.5H16.5V19.5L19.5 19.5L19.5 4.5Z' fill={color} />
      <Path d='M22.5 4.5H21L21 21H22.5L22.5 4.5Z' fill={color} />
    </Svg>
  );
};

export default Barcode;
