import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const HistoryView = () => {
  return (
    <View>
      <Bookmark title='History' />
      <Typography name={'sectionHeaderCapslock'}>History Content</Typography>
    </View>
  );
};

export default HistoryView;
