import { View, ViewStyle } from 'react-native';
import { iconMapping } from './iconMapping';

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
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'sm',
  color = '#000',
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
