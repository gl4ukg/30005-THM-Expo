import { colors } from '@/lib/tokens/colors';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../../Typography';
import { RadioButton } from './RadioButton';

export interface Choice {
  id: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  choices: Choice[];
  selected: string | null;
  onChange: (selectedId: string) => void;
  type: 'horizontal' | 'vertical' | 'menu';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  choices,
  selected = '',
  onChange,
  type,
}) => {
  return (
    <View style={styles.wrapper}>
      <Typography name={'navigation'} style={styles.label}>
        {label}
      </Typography>
      <View
        style={[
          styles.radioContainer,
          type === 'horizontal' && { flexDirection: 'row' },
        ]}
      >
        {choices.map((choice) => (
          <RadioButton
            key={choice.id}
            id={choice.id}
            label={choice.label}
            isSelected={selected === choice.id}
            onChange={() => onChange(choice.id)}
            menu={type === 'menu'}
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
