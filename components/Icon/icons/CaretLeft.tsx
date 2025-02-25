import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const CaretLeft: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect width={size} height={size} fill='white' fillOpacity={0.01} />
      <Path d='M15 18L7.5 12L15 6L15 18Z' fill={color} />
    </Svg>
  );
};

export default CaretLeft;
