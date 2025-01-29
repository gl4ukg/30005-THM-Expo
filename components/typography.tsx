import { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

interface Props {
  name: 
    | "button"
    | "buttonCapstock"
    | "navigation"
    | "sectionHeader"
    | "numericalHighlight"
    | "fieldLabel"
    | "fieldValue"
    | "tableHeader"
    | "tableContent";
  text: string;
}

export const Typography: FC<Props> = ({ name, text }) => {

  return <Text style={getStyle(name)}>{text}</Text>;
};

const getStyle = (name: Props['name']) => {
  switch (name) {
    case 'button':
      return styles.button;
    case 'buttonCapstock':
      return styles.buttonCapstock;
    case 'navigation':
      return styles.navigation;
    case 'sectionHeader':
      return styles.sectionHeader;
    case 'numericalHighlight':
      return styles.numericalHighlight;
    case 'fieldLabel':
      return styles.fieldLabel;
    case 'fieldValue':
      return styles.fieldValue;
    case 'tableHeader':
      return styles.tableHeader;
    case 'tableContent':
      return styles.tableContent;
  }
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    fontFamily: Platform.select({android:'OpenSans_400Regular', ios:'OpenSans-Regular'})
  },
  buttonCapstock: {
    fontSize: 18,
    fontFamily: Platform.select({android:'OpenSans_400Regular', ios:'OpenSans-Regular'}),	
  },
	navigation: {
		fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({android:'OpenSans_400Regular', ios:'OpenSans-Regular'})
	},
	sectionHeader: {
		fontSize: 20,
    lineHeight: 22,
    fontFamily: Platform.select({android:'OpenSans_600SemiBold', ios:'OpenSans-SemiBold'})
	},
  numericalHighlight: {
		fontSize: 28,
    lineHeight: 22,
    fontFamily: Platform.select({android:'Roboto_500Medium', ios:'Roboto-Medium'})
	},
  fieldLabel: {
		fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.select({android:'Roboto_400Regular', ios:'Roboto-Regular'})
	},
  fieldValue: {
		fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.select({android:'Roboto_400Regular', ios:'Roboto-Regular'})
	},
	tableHeader:{
	  fontSize :28,
    lineHeight: 22,
    fontFamily:Platform.select({android:'RobotoCondensed_400Regular', ios:'RobotoCondensed-Regular'})
	},
	tableContent:{
	  fontSize :28,
    lineHeight: 22,
    fontFamily:Platform.select({android:'RobotoCondensed_400Regular', ios:'RobotoCondensed-Regular'})
	}
});

