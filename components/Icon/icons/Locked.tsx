import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type SvgIconProps } from "@/components/Icon/Icon";

const Locked: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect width={size} height={size} transform="translate(0.5)" fill="none" />
      <Path
        d="M18.5 10.5H17V6C17 4.80653 16.5259 3.66193 15.682 2.81802C14.8381 1.97411 13.6935 1.5 12.5 1.5C11.3065 1.5 10.1619 1.97411 9.31802 2.81802C8.47411 3.66193 8 4.80653 8 6V10.5H6.5C6.10218 10.5 5.72064 10.658 5.43934 10.9393C5.15804 11.2206 5 11.6022 5 12V21C5 21.3978 5.15804 21.7794 5.43934 22.0607C5.72064 22.342 6.10218 22.5 6.5 22.5H18.5C18.8978 22.5 19.2794 22.342 19.5607 22.0607C19.842 21.7794 20 21.3978 20 21V12C20 11.6022 19.842 11.2206 19.5607 10.9393C19.2794 10.658 18.8978 10.5 18.5 10.5ZM9.5 6C9.5 5.20435 9.81607 4.44129 10.3787 3.87868C10.9413 3.31607 11.7044 3 12.5 3C13.2956 3 14.0587 3.31607 14.6213 3.87868C15.1839 4.44129 15.5 5.20435 15.5 6V10.5H9.5V6ZM18.5 21H6.5V12H18.5V21Z"
        fill={color}
      />
    </Svg>
  );
};

export default Locked;
