import { Typography } from '@/components/Typography';
import { FC } from 'react';
import { View } from 'react-native';

interface Props {}

export const ReplaceHoseForm: FC<Props> = () => {
  return (
    <View>
      <Typography text='Replace Hose' name='sectionHeader' />
    </View>
  );
};
