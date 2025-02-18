import { Typography } from "@/components/typography";
import { colors } from "@/lib/tokens/colors";
import React, { ReactNode } from "react";

import {
  Pressable,
  View,
  type PressableProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonTHSProps extends PressableProps {
  title: string;
  children?: ReactNode | ReactNode[];
  variant: "primary"|"secondary"|"link";
  disabled?: boolean;

}
export const ButtonTHS: React.FC<ButtonTHSProps> = ({
  children,
  title,
  onPress,
  variant,
  disabled = false,
}) => {
  const variantstyle: Record<ButtonTHSProps["variant"], ViewStyle> = {
    primary:{backgroundColor: colors.primary50},
    secondary:{backgroundColor: colors.white},
    link:{paddingLeft:0,marginLeft:0}
  }
  const textColorMap: Record<ButtonTHSProps["variant"], TextStyle> = {
    primary:{color: colors.white},
    secondary:{color: colors.black},
    link: {color: colors.white, textAlign:"left"},
  };

  const typographyStyle: TextStyle = {
    fontSize: variant === "link" ? 16 : 18,
    ...textColorMap[variant],
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.container,
        variantstyle[variant],
        pressed && styles.containerPressed,
        disabled && styles.containerDisabled
      ]}
    >
      <View>
        {React.Children.map(children, (child) => child)}
        <Typography name={"button"} text={title} style={typographyStyle}/>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    width:"80%",
    margin:"auto"
  },
  containerPressed: {
    borderColor:colors.white,
  },
  containerDisabled:{
    opacity:0.5
  }

});
