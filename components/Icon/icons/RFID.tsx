import { type SvgIconProps } from '@/components/Icon/Icon';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const RFID: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M6 13.5C3.525 13.5 1.5 15.525 1.5 18C1.5 20.475 3.525 22.5 6 22.5C8.475 22.5 10.5 20.475 10.5 18C10.5 15.525 8.475 13.5 6 13.5ZM6 21C4.35 21 3 19.65 3 18C3 16.35 4.35 15 6 15C7.65 15 9 16.35 9 18C9 19.65 7.65 21 6 21Z'
        fill={color}
      />
      <Path
        d='M22.5 18H21C21 9.75 14.25 3 6 3V1.5C15.075 1.5 22.5 8.925 22.5 18Z'
        fill={color}
      />
      <Path
        d='M16.5 18H15C15 13.05 10.95 9 6 9V7.5C11.775 7.5 16.5 12.225 16.5 18Z'
        fill={color}
      />
    </Svg>
  );
};

export default RFID;
