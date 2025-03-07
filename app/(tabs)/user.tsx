import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { useAppContext } from '@/context/THScontextProvider';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

const User = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {state.auth.user === null ? (
        <ButtonTHS
          variant='primary'
          size='sm'
          title='Log in'
          onPress={() => router.push('/')}
        />
      ) : (
        <View
          style={{ gap: 10, width: '100%', alignItems: 'center', padding: 20 }}
        >
          <Typography name='navigationBold'>User</Typography>
          <Typography name='navigationBold'>
            Name: {state.auth.user?.name}
          </Typography>
          <Typography name='navigationBold'>
            Email: {state.auth.user?.email}
          </Typography>
          <Typography name='navigationBold'>
            Password: {state.auth.user?.id}
          </Typography>
          <ButtonTHS
            variant='primary'
            size='sm'
            title='Log out'
            onPress={() => dispatch({ type: 'LOGOUT' })}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default User;
