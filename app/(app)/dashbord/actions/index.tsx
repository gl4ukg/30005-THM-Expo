import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { Link, useRouter } from 'expo-router';
import { Text, FlatList, View } from 'react-native';

const ActionsView = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          gap: 10,
          maxWidth: 300,
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        <Typography name={'navigationBold'}>Actions</Typography>
        <ButtonTHS
          variant='primary'
          size='lg'
          title='Request for quote'
          onPress={() => router.push('/dashbord/actions/rfq')}
        />
        <ButtonTHS
          variant='primary'
          size='lg'
          title='Scrap'
          onPress={() => router.push('/dashbord/actions/scrap')}
        />
        <ButtonTHS
          variant='primary'
          size='lg'
          title='Contact TESS team'
          onPress={() => router.push('/dashbord/actions/contact')}
        />
      </View>
    </View>
  );
};
export default ActionsView;
