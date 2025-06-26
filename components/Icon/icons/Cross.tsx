import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const Cross: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z'
        fill={color}
      />
    </Svg>
  );
};

export default Cross;
