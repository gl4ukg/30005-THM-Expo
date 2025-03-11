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
    <Pressable onPress={handlePress}>
      <View style={elementStyle.frame}>
        <Typography
          name={'navigation'}
          text={'(' + counter.toString() + ')'}
          style={elementStyle.counter}
        />
        <Icon name={icon} color={colors.primary} size='md' />
      </View>
    </Pressable>
  );
};

const elementStyle = StyleSheet.create({
  frame: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  counter: { color: colors.secondary25, textAlign: 'right', paddingLeft: 2 },
});
