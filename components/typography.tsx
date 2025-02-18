import { FC } from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
} from "react-native";
import { Platform } from "react-native";

interface Props extends TextProps {
  name: keyof typeof styles;
  text: string;
  style?: StyleProp<TextStyle>;
}

export const Typography: FC<Props> = ({ name, text, style, ...restProps }) => {
  return (
    <Text style={[styles[name], style]} {...restProps}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  buttonCapsLock: {
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
    fontWeight: 600,
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
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "RobotoCondensed_300Light",
      ios: "RobotoCondensed-Light",
    }),
  },
  tableContent: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "RobotoCondensed_400Regular",
      ios: "RobotoCondensed-Regular",
    }),
  },
  tableContentNumber: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({
      android: "RobotoCondensed_300Light",
      ios: "RobotoCondensed-Light",
    }),
  },
});

