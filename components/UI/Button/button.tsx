import { colors } from "@/lib/tokens/colors";
import React, { ReactNode } from "react";

import {
  Pressable,
  View,
  Text,
  type PressableProps,
  StyleSheet,
} from "react-native";

interface ButtonTHSProps extends PressableProps {
  title: string;
  children?: ReactNode | ReactNode[];
  variant: "primary" | "s";
}
export const ButtonTHS: React.FC<ButtonTHSProps> = ({
  children,
  title,
  onPress,
  variant,
}) => {
  const variantStyle: Record<ButtonTHSProps["variant"], any> = {
    primary: {},
    s: {},
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        variantStyle[variant],
      ]}
    >
      <View>
        {React.Children.map(children, (child) => child)}
        <Text style={styles.text}>{title}</Text>
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
    backgroundColor: colors.secondary[500],
  },
  containerPressed: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
