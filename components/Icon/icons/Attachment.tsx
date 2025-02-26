import { type SvgIconProps } from "@/components/Icon/Icon";
import React from "react";
import Svg, { Defs, G, Path, Rect, ClipPath } from "react-native-svg";

const Attachment: React.FC<SvgIconProps> = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <G clip-path="url(#clip0_2753_8293)">
      <Rect width={size} height={size} fill="transparent" />
      <Path d="M10.5375 7.08757L4.9125 1.46257C3.975 0.487569 2.4375 0.487569 1.4625 1.42507C0.487497 2.36257 0.487497 3.93757 1.4625 4.87507L1.5 4.91257L2.55 6.00007L3.075 5.47507L1.9875 4.38757C1.35 3.75007 1.35 2.66257 1.9875 2.02507C2.625 1.38757 3.7125 1.35007 4.35 1.98757C4.35 1.98757 4.35 1.98757 4.3875 2.02507L9.975 7.61257C10.65 8.25007 10.65 9.33757 10.0125 9.97507C9.375 10.6501 8.2875 10.6501 7.65 10.0126C7.65 10.0126 7.65 10.0126 7.6125 9.97507L4.8375 7.20007C4.4625 6.82507 4.5 6.22507 4.8375 5.88757C5.2125 5.55007 5.775 5.55007 6.15 5.88757L7.6875 7.42507L8.2125 6.90007L6.6375 5.32507C5.9625 4.68757 4.9125 4.72507 4.275 5.40007C3.675 6.03757 3.675 7.05007 4.275 7.72507L7.0875 10.5376C8.025 11.5126 9.5625 11.5126 10.5375 10.5751C11.5125 9.63757 11.5125 8.06257 10.5375 7.08757C10.5375 7.12507 10.5375 7.08757 10.5375 7.08757Z" fill={color}/>
      </G>
      <Defs>
      <ClipPath id="clip0_2753_8293">
        <Rect width={size} height={size} fill="transparent"/>
      </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Attachment;

