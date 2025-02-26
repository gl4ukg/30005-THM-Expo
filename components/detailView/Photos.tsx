import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const Photos = () => {
  return (
    <View>
      <Bookmark title='Photos' />
      <Typography name={'sectionHeaderCapslock'}>Photos Content</Typography>
    </View>
  );
};

export default Photos;
