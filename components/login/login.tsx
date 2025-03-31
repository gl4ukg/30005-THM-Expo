import { View, StyleSheet, Alert } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
import { Typography } from '@/components/typography';
import { useAppContext } from '@/context/ContextProvider';
import { router } from 'expo-router';
import { emailValidation } from '@/lib/util/validation';
import { LinkButton } from '@/components/UI/Button/linkButton';
interface Props {
  nextView: (page: 'login' | 'resetPassword') => void;
}
export const LoginScreen: React.FC<Props> = ({ nextView }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<undefined | string>(undefined);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  const { state, dispatch } = useAppContext();

  function handleEmail(email: string) {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  }

  function handleName(name: string) {
    setFullName(name);
    if (!/^[\p{L}\s]+$/u.test(fullName) && fullName !== '') {
      setNameError('Invalid Name: Please enter a valid name.');
    } else if (name.length < 4) {
      setNameError('too short');
    } else setNameError(undefined);
  }

  const handleLogin = () => {
    dispatch({
      type: 'SET_LOGIN_LOADING',
      payload: true,
    });
    // check if valid.
    // if valid send request to api or do something else.
    setTimeout(() => {
      if (password.length < 3) {
        // login and navigate to dashboard
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        Alert.alert('Login - failed', 'Invalid password or user not found', [
          {
            text: 'OK',
          },
        ]);
      } else if (password.length >= 3 && password.length < 6) {
        // login and navigate to dashboard
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        Alert.alert('Login - failed', 'No internet', [
          {
            text: 'OK',
          },
        ]);
      } else {
        // update state
        dispatch({
          type: 'LOGIN',
          payload: { email, name: fullName, id: password },
        });
        // login and navigate to dashboard
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        router.push('/(app)/dashbord');
      }
    }, 3000);
  };

  const isButtonDisabled =
    !email || !fullName || !password || state.auth.isLoingLoading;

  return (
    <View style={styles.container}>
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
        <View style={{ width: '100%', alignItems: 'flex-end', marginTop: -10 }}>
          <LinkButton
            variant='dark'
            title='Forgot Password?'
            onPress={() => router.push('/(app)/login/forgotpassword')}
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
};

const styles = StyleSheet.create({
  container: {
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
  },
  footer: {
    width: '100%',
    gap: 50,
  },
});
