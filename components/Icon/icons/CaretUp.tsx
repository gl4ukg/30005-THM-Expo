import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const CaretUp: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect width={size} height={size} fill='white' fillOpacity={0.01} />
      <Path d='M6 15L12 7.5L18 15L6 15Z' fill={color} />
    </Svg>
  );
};

export default CaretUp;
