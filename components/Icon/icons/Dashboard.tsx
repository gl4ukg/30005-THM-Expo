import React from 'react';

import { type SvgIconProps } from '@/components/Icon/Icon';
import Svg, { Path } from 'react-native-svg';

const Dashboard: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M21 4.5H7.5V6H21V4.5Z' fill={color} />
      <Path d='M21 18H7.5V19.5H21V18Z' fill={color} />
      <Path d='M21 11.25H7.5V12.75H21V11.25Z' fill={color} />
      <Path d='M4.5 11.25H3V12.75H4.5V11.25Z' fill={color} />
      <Path d='M4.5 4.5H3V6H4.5V4.5Z' fill={color} />
      <Path d='M4.5 18H3V19.5H4.5V18Z' fill={color} />
    </Svg>
  );
};

export default Dashboard;
