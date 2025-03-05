import { View } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';

const MaintananceInfo = () => {
  return (
    <View>
      <Bookmark title='MaintananceInfo' />
      <Typography name={'sectionHeaderCapslock'}>
        MaintananceInfo Content
      </Typography>
    </View>
  );
};

export default MaintananceInfo;
