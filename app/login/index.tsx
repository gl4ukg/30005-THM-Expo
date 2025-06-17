import { HelpLinks } from '@/components/login/HelpLinks';
import { LoginHeader } from '@/components/login/LoginHeader';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { mockedData } from '@/context/mocked';
import { colors } from '@/lib/tokens/colors';
import { getHoseData } from '@/lib/util/hoseData';
import { login } from '@/lib/util/login';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('itera@test.no');
  const [fullName, setFullName] = useState('Test Tess User');
  const [password, setPassword] = useState('iteraTest');
  const [nameError, setNameError] = useState<undefined | string>(undefined);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  const { state, dispatch } = useAppContext();

  const handleEmail = (email: string) => {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };

  const handleName = (name: string) => {
    setFullName(name);
    if (!/^[\p{L}\s]+$/u.test(fullName) && fullName !== '') {
      setNameError('Invalid Name: Please enter a valid name.');
    } else if (name.length < 4) {
      setNameError('too short');
    } else setNameError(undefined);
  };

  const handleLogin = async () => {
    dispatch({
      type: 'SET_LOGIN_LOADING',
      payload: true,
    });

    // /login -> 200 and cookie or 400 and error
    try {
      const user = await login(email, password);
      if (!user) {
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        Alert.alert('Login - failed', 'Invalid password or user not found', [
          {
            text: 'OK',
          },
        ]);
        return;
      } else {
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        dispatch({
          type: 'LOGIN',
          payload: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            id: `${user.userId}`,
            phoneNumber: user.phoneNumber,
            customerNumbers: user.customerNumbers,
          },
        });
        const hoseData = await getHoseData(user.customerNumbers);
        dispatch({
          type: 'SET_HOSE_DATA',
          payload: hoseData,
        });
        router.push('/(app)/dashboard');
      }
    } catch (error) {
      const message = (error as Error).message;
      Alert.alert(
        'Login - failed',
        message || 'Invalid password or user not found',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch({
                type: 'SET_LOGIN_LOADING',
                payload: false,
              });
            },
          },
        ],
      );
    }
  };

  const isButtonDisabled =
    !email || !fullName || !password || state.auth.isLoingLoading;

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <LoginHeader header={'LOGIN'} />
        <Input
          icon='Email'
          label='Email'
          placeholder='ola@nordmann.no'
          value={email}
          onChangeText={handleEmail}
          darkMode={true}
          type='email'
          errorMessage={emailError}
        />
        <Input
          icon='User'
          label='Your full name'
          value={fullName}
          onChangeText={handleName}
          darkMode={true}
          errorMessage={nameError}
        />
        <Input
          icon='Password'
          label='Password'
          value={password}
          onChangeText={setPassword}
          darkMode={true}
          type='password'
        />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: -10,
          }}
        >
          <LinkButton
            variant='dark'
            title='Forgot Password?'
            onPress={() => router.push('/login/forgotPassword')}
          />
        </View>
      </View>
      <ButtonTHS
        title={'LOGIN'}
        onPress={handleLogin}
        variant={'primary'}
        disabled={isButtonDisabled}
      />
      <View style={styles.footer}>
        <HelpLinks header='Unable to log in?' />
        <Typography
          name={'navigation'}
          text={'© 2025 Copyright TESS AS'}
          style={styles.copyRights}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    flex: 1,
    height: '100%',
    maxWidth: 340,
    marginHorizontal: 'auto',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 50,
  },
  form: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  copyRights: {
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 26,
  },
  footer: {
    width: '100%',
    gap: 50,
    alignItems: 'center',
  },
});
