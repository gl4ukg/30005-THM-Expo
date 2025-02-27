import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const Structure = () => {
  return (
    <View>
      <Bookmark title='Structure' />
      <Typography name={'sectionHeaderCapslock'}>Structure Content</Typography>
    </View>
  );
};

export default Structure;
