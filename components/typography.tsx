import { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

interface Props {
  textType: 
    | "Button"
    | "ButtonCapstock"
    | "Navigation"
    | "Section Header"
    | "Numerical Highlight"
    | "Field Label"
    | "Field Value"
    | "Table Header"
    | "Table Content";
  string: string;
}

export const Typography: FC<Props> = ({ textType, string }) => {

  return <Text style={getStyle(textType)}>{string}</Text>;
};

const getStyle = (textType: Props['textType']) => {
  switch (textType) {
    case 'Button':
      return styles.button;
    case 'ButtonCapstock':
      return styles.buttonCapstock;
    case 'Navigation':
      return styles.navigation;
    case 'Section Header':
      return styles.sectionHeader;
    case 'Numerical Highlight':
      return styles.numericalHighlight;
    case 'Field Label':
      return styles.fieldLabel;
    case 'Field Value':
      return styles.fieldValue;
    case 'Table Header':
      return styles.tableHeader;
    case 'Table Content':
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

