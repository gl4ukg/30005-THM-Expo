import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { type SvgIconProps } from '@/components/Icon/Icon';

const Plus: React.FC<SvgIconProps> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <Path d='M12 5V19M5 12H19' stroke={color} />
  </Svg>
);

export default Plus;
