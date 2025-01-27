import Reactﬁ from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";
import { iconMapping } from "./iconMapping";

type IconProps = {
  name: keyof typeof iconMapping;
  size?: keyof typeof iconSize;
  color?: string;
};

export const iconSize = {
  sm: 24,
  md: 32,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = "sm",
  color = "#000",
}) => {
  const IconComponent = iconMapping[name];
  const iconSizeNumber = iconSize[size];

  return (
    <View style={{ width: iconSizeNumber, height: iconSizeNumber }}>
      <IconComponent size={iconSizeNumber} color={color} />
    </View>
  );
};
