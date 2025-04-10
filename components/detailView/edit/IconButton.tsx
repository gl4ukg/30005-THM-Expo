import { Pressable } from 'react-native';
import { Icon, iconSize } from '../../Icon/Icon';
import { IconName } from '../../Icon/iconMapping';

interface iconButtonProps {
  icon: IconName;
  handlePress: () => void;
  color: string;
  size?: keyof typeof iconSize;
}

export const IconButton: React.FC<iconButtonProps> = ({
  icon,
  handlePress,
  color,
  size = 'lg',
}) => {
  return (
    <Pressable onPress={handlePress}>
      <Icon name={icon} size={size} color={color} />
    </Pressable>
  );
};
