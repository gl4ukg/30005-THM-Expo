
import { View,StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { RadioButton } from './radioButton';

interface Choice {
  id: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  choices: Choice[];
  selected: string | null;
  onChange(selectedId: string): void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, choices, selected = null, onChange }) => {
  return (
    <View>
        <Typography name={'button'}>{label}</Typography>
        <View style={styles.radioContainer}>
          {choices.map(choice => (
              <RadioButton 
              key={choice.id}
              id={choice.id}
              label={choice.label}
              isSelected={selected === choice.id}
              onChange={() => onChange(choice.id)}
              />
          ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    radioContainer:{ 
      maxWidth:'100%', 
      display:'flex', 
      flexDirection:'row', 
      gap:10,
  },
})
