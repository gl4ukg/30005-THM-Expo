import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const CaretRight: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect width={size} height={size} fill='white' fillOpacity={0.01} />
      <Path d='M9 18L16.5 12L9 6L9 18Z' fill={color} />
    </Svg>
  );
};

export default CaretRight;
