import { View } from 'react-native';
import { Typography } from '../../Typography';
import { Bookmark } from '../common/Bookmark';

export const HistoryView = () => {
  return (
    <View>
      <Bookmark title='History' />
      <Typography name={'sectionHeaderCapslock'}>History Content</Typography>
    </View>
  );
};
