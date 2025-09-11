import { HelpLinks } from '@/components/login/HelpLinks';
import { LoginHeader } from '@/components/login/LoginHeader';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { useLoginManager } from '@/hooks/useLoginManager';
import { colors } from '@/lib/tokens/colors';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState(
    process.env.EXPO_PUBLIC_DEV_USER_EMAIL ?? '',
  );
  const [password, setPassword] = useState(
    process.env.EXPO_PUBLIC_DEV_USER_PASSWORD ?? '',
  );
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const { login, isLoading } = useLoginManager();
  const handleEmail = (email: string) => {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };

  const handleLogin = async () => {
    const { status, message } = await login(email, password);
    if (status === 'error') {
      Alert.alert('Login failed', message);
    } else {
      router.push('/(app)/dashboard');
    }
  };

  const isButtonDisabled = !email || !password || isLoading;

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
          disabled={isLoading}
          errorMessage={emailError}
        />
        <Input
          icon='Password'
          label='Password'
          value={password}
          onChangeText={setPassword}
          darkMode={true}
          type='password'
          disabled={isLoading}
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
            disabled={isLoading}
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
