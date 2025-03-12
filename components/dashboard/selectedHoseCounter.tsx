import { View, StyleSheet, Pressable } from 'react-native';
import { IconName } from '../Icon/iconMapping';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';
import { colors } from '@/lib/tokens/colors';

interface Props {
  icon: IconName;
  counter: number;
  handlePress: () => void;
}

export const SelectedHoseCounter: React.FC<Props> = ({
  icon,
  counter,
  handlePress,
}) => {
  return (
    <Pressable onPress={handlePress} style={elementStyle.button}>
      <Typography
        name={'navigation'}
        text={`(${counter})`}
        style={elementStyle.counter}
      />
      <Icon name={icon} color={colors.primary} size='md' />
    </Pressable>
  );
};

const elementStyle = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  counter: {
    color: colors.secondary25,
  },
});
