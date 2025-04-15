import { colors } from '@/lib/tokens/colors';
import { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
  style?: any;
  opacity?: number;
}
export const TessLines: FC<Props> = ({
  color = colors.primary,
  opacity = 1,
  width = 194,
  height,
  style,
}) => {
  return (
    <Svg
      style={style}
      width={width}
      height={height ?? (width * 29) / 194}
      viewBox='0 0 194 29'
      fill='none'
    >
      <G opacity={opacity} clipPath='url(#clip0_271_1021)'>
        <Path
          d='M98.4074 0L81.9019 29H112.161L128.666 0H98.4074Z'
          fill={color}
        />
        <Path
          d='M82.1599 0L65.6544 29H95.9132L112.419 0H82.1599Z'
          fill={color}
        />
        <Path
          d='M32.6904 0.103027L16.2475 28.9999H46.5062L62.9491 0.103027H32.6904Z'
          fill={color}
        />
        <Path
          d='M16.4508 0.103027L0 28.9999H30.2587L46.7095 0.103027H16.4508Z'
          fill={color}
        />
        <Path
          d='M163.741 0.103027L147.298 28.9999H177.557L194 0.103027H163.741Z'
          fill={color}
        />
        <Path
          d='M147.502 0.103027L131.051 28.9999H161.31L177.76 0.103027H147.502Z'
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id='clip0_271_1021'>
          <Rect width='194' height='29' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
    // <View style={{ width, height, backgroundColor: color }} />
  );
};
