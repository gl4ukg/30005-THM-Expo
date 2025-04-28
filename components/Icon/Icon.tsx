import { View, ViewStyle } from 'react-native';
import { iconMapping } from './iconMapping';
import { colors } from '@/lib/tokens/colors';

type IconProps = {
  name: keyof typeof iconMapping;
  size?: keyof typeof iconSize;
  color?: string;
  styles?: ViewStyle;
};

export interface SvgIconProps {
  size: number;
  color: string;
}

export const iconSize = {
  xsm: 16,
  sm: 24,
  md: 32,
  lg: 36,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'sm',
  color = colors.black,
  styles,
}) => {
  const IconComponent = iconMapping[name];
  const iconSizeNumber = iconSize[size];

  return (
    <View style={{ ...styles, width: iconSizeNumber, height: iconSizeNumber }}>
      <IconComponent size={iconSizeNumber} color={color} />
    </View>
  );
};
