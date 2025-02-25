import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const ArrowLeft: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect width={size} height={size} fill='white' fillOpacity={0.01} />
      <Path
        d='M10.5 19.5L11.5575 18.4425L5.8725 12.75L21 12.75V11.25L5.8725 11.25L11.5575 5.5575L10.5 4.5L3 12L10.5 19.5Z'
        fill={color}
      />
    </Svg>
  );
};

export default ArrowLeft;
