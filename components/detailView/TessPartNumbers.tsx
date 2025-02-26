import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const TessPartNumbers = () => {
  return (
    <View>
      <Bookmark title='TessPartNumbers' />
      <Typography name={'sectionHeaderCapslock'}>
        TessPartNumbers Content
      </Typography>
    </View>
  );
};

export default TessPartNumbers;
