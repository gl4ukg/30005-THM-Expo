import { View, StyleSheet } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
import { Typography } from '@/components/typography';
import { emailValidation } from '@/lib/util/validation';

interface Props {
  nextView: (page: 'login' | 'requestAccess') => void;
}

export const ResetPassword: React.FC<Props> = () => {
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
    <View style={styles.container}>
      <LoginHeader header='RESET PASSWORD'>
        <Typography
          name='navigation'
          text='Enter your email (User ID) to reset your password.'
          style={styles.whiteText}
        />
      </LoginHeader>

      <View style={styles.form}>
        <Input
          icon='Email'
          label='Your email (User ID)'
          placeHolder='ola@nordmann.no'
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
          style={styles.whiteText}
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
  buttonPlacement: {
    alignSelf: 'flex-start',
    paddingLeft: 50,
  },
  footer: {
    width: '100%',
    gap: 50,
  },
  whiteText: {
    color: colors.white,
    textAlign: 'left',
  },
});
