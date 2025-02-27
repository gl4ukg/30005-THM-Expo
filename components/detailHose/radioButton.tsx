import { View, Pressable, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';

interface RadioButtonProps {
  isSelected: boolean;
  onChange: () => void;
  id: string;
  label: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ isSelected, onChange, label }) => {
  return (
      <Pressable onPress={onChange} style={[styles.buttonBorder, isSelected && styles.selectedBorder]}>
        <View style={styles.wrapper}>
          <View style={[styles.circle, { borderColor: isSelected ? colors.primary25 : colors.extended333 }]}>
            {isSelected && <View style={styles.innerCircle} />}
          </View>
          <Typography style={[styles.label, isSelected&& styles.selectedLabel]} name={'navigation'}>{label}</Typography>
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  circle:{
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary25,
  },
  buttonBorder:{
    height:48,
    borderWidth:1,
    borderColor:colors.strokeInputField,
  },
  selectedBorder:{
    backgroundColor:colors.lightContrast25,
    borderColor:colors.primary25,
  },
  label:{ 
    marginLeft: 7, 
    color:colors.extended333,
  },
  selectedLabel:{
    color:colors.black,
  },
  wrapper:{
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems:'center',
    marginTop:8,
    marginHorizontal:8,

  },
})