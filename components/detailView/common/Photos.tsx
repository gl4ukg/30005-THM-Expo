import { View } from 'react-native';
import { Typography } from '../../Typography';
import { Bookmark } from '../common/Bookmark';

export const Photos = () => {
  return (
    <View>
      <Bookmark title='Photos' />
      <Typography name={'sectionHeaderCapslock'}>Photos Content</Typography>
    </View>
  );
};
