import { HelpLinks } from '@/components/login/helpLinks';
import { LoginHeader } from '@/components/login/loginHeader';
import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { Input } from '@/components/UI/Input/input';
import { colors } from '@/lib/tokens/colors';
import { emailValidation } from '@/lib/util/validation';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  const handleEmailChange = (email: string) => {
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
    setEmail(email);
  };
  const handleRequest = () => {
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };
  return (
    <>
      <View style={styles.container}>
        <LoginHeader header='RESET PASSWORD'>
          <Typography
            name='navigation'
            text='Enter your email (User ID) to reset your password.'
            style={styles.subtitle}
          />
        </LoginHeader>

        <View style={styles.form}>
          <Input
            icon='Email'
            label='Your email (User ID)'
            placeholder='ola@nordmann.no'
            value={email}
            type='email'
            onChangeText={handleEmailChange}
            errorMessage={emailError}
            darkMode={true}
          />
        </View>
        <ButtonTHS
          title={'RESET PASSWORD'}
          onPress={handleRequest}
          variant={'primary'}
          disabled={emailError !== undefined}
        />
        <View style={styles.footer}>
          <HelpLinks header='Not sure what to do?' />
          <Typography
            name={'navigation'}
            text={'© 2025 Copyright TESS AS'}
            style={styles.copyRights}
          />
        </View>
      </View>
    </>
  );
}

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
  subtitle: {
    color: colors.white,
    textAlign: 'left',
  },
  form: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    gap: 50,
    alignItems: 'center',
  },
  copyRights: {
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 26,
  },
});
