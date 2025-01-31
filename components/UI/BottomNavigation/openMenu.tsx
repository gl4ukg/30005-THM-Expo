import { FC } from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

interface OpenMenuProps {
  isOpen: boolean;
  handlePress: () => void;
  color?: string;
  style?: any;
}

export const OpenMenu: FC<OpenMenuProps> = ({
  isOpen,
  handlePress,
  style,
  color = "#fff",
}) => {
  return (
    <Pressable style={style} onPress={handlePress}>
      {ArrowUp(isOpen, color)}
    </Pressable>
  );
};

const ArrowUp = (isUp: boolean, color: string) => {
  return (
    <Svg
      width={55}
      height={21}
      viewBox="0 0 55 21"
      fill="none"
      style={{ transform: [{ rotate: isUp ? "180deg" : "0deg" }] }}
    >
      <Path
        d="M55 15.9338L27.5651 0.807694L27.5542 0.807694L-2.30783e-07 15.9234L1.84933e-07 21L27.5108 5.80127L54.9024 21L55 15.9338Z"
        fill={color}
      />
    </Svg>
  );
};
