import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const HoseModule = () => {
  return (
    <View>
      <Bookmark title='HoseModule' />
      <Typography name={'sectionHeaderCapslock'}>HoseModule Content</Typography>
    </View>
  );
};

export default HoseModule;
