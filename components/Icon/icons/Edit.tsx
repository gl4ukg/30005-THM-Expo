import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from '@/components/Icon/Icon';

const Edit: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Rect
        width='24'
        height='24'
        transform='matrix(-1 0 0 1 24 0)'
        fill='white'
        fillOpacity='0.01'
      />
      <Path d='M1.5 19.5H22.5V21H1.5V19.5Z' fill={color} />
      <Path
        d='M4.95 6.75C4.35 6.15 4.35 5.25 4.95 4.65L7.65 1.95C8.25 1.35 9.15 1.35 9.75 1.95L21 13.2V18H16.2L4.95 6.75ZM8.7 3L6 5.7L8.25 7.95L10.95 5.25L8.7 3ZM19.5 16.5V13.8L12 6.3L9.3 9L16.8 16.5H19.5Z'
        fill={color}
      />
    </Svg>
  );
};

export default Edit;
