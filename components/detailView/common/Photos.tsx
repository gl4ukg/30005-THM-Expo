import { View } from 'react-native';
import { Typography } from '../../typography';
import { Bookmark } from '../common/Bookmark';

const Photos = () => {
  return (
    <View>
      <Bookmark title='Photos' />
      <Typography name={'sectionHeaderCapslock'}>Photos Content</Typography>
    </View>
  );
};

export default Photos;
