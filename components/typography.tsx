import { FC } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { Platform } from "react-native";

interface Props {
  name: keyof typeof styles;
  text: string;
  style?: StyleProp<TextStyle>;
}

export const Typography: FC<Props> = ({ name, text, style }) => {
  return <Text style={[styles[name], style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  buttonCapstock: {
    fontSize: 18,
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  navigation: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  navigationBold: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  sectionHeader: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "OpenSans_600SemiBold",
      ios: "OpenSans-SemiBold",
    }),
  },
  numericalHighlight: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Platform.select({
      android: "Roboto_500Medium",
      ios: "Roboto-Medium",
    }),
  },
  fieldLabel: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "Roboto_400Regular",
      ios: "Roboto-Regular",
    }),
  },
  fieldValue: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "Roboto_400Regular",
      ios: "Roboto-Regular",
    }),
  },
  tableHeader: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Platform.select({
      android: "RobotoCondensed_400Regular",
      ios: "RobotoCondensed-Regular",
    }),
  },
  tableContent: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Platform.select({
      android: "RobotoCondensed_400Regular",
      ios: "RobotoCondensed-Regular",
    }),
  },
});

