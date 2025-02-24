import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const ArrowRight: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect width={size} height={size} fill='white' fillOpacity={0.01} />
      <Path
        d='M13.5 4.5L12.4275 5.54475L18.1125 11.25L3 11.25L3 12.75L18.1125 12.75L12.4275 18.4298L13.5 19.5L21 12L13.5 4.5Z'
        fill={color}
      />
    </Svg>
  );
};

export default ArrowRight;
