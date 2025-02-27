import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const Documents = () => {
  return (
    <View>
      <Bookmark title='Documents' />
      <Typography name={'sectionHeaderCapslock'}>Documents content</Typography>
    </View>
  );
};

export default Documents;
