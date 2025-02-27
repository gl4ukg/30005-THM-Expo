import { View, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { RadioButton } from './radioButton';
import { colors } from '@/lib/tokens/colors';

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

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  choices,
  selected = null,
  onChange,
}) => {
  return (
    <View style={styles.wrapper}>
      <Typography name={'button'} style={styles.label}>
        {label}
      </Typography>
      <View style={styles.radioContainer}>
        {choices.map((choice) => (
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
  wrapper: {
    gap: 5,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    color: colors.extended666,
  },
});
