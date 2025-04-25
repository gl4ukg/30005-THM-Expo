import { Bookmark } from '@/components/detailView/common/Bookmark';
import { Typography } from '@/components/Typography';
import { View } from 'react-native';

export const HistoryView = () => {
  return (
    <View>
      <Bookmark title='History' />
      <Typography name={'sectionHeaderCapslock'}>History Content</Typography>
    </View>
  );
};
