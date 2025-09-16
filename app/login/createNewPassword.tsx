import { HelpLinks } from '@/components/login/HelpLinks';
import { LoginHeader } from '@/components/login/LoginHeader';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { Input } from '@/components/UI/Input/Input';
import { colors } from '@/lib/tokens/colors';
import { passwordRequirements, validatePassword } from '@/lib/util/validation';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ForgotPassword() {
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [newError, setNewError] = useState<undefined | string>(undefined);
  const [confirmError, setConfirmError] = useState<undefined | string>(
    undefined,
  );

  function handleNewPassword(password: string) {
    setNewPassword(password);
    const validation = passwordRequirements(password);
    if (validation === true) {
      setNewError(undefined);
    } else setNewError(validation);
  }
  function comparePasswords(password: string) {
    setConfirmPassword(password);
    const validation = validatePassword(password, newPassword);
    if (validation === true) {
      setConfirmError(undefined);
    } else setConfirmError(validation);
  }

  const handleLogin = () => {
    console.log('Password:', newPassword);
  };

  const isButtonDisabled = !tempPassword || !newPassword || !confirmPassword;
  return (
    <View style={styles.container}>
      <LoginHeader header={'CREATE NEW PASSWORD'}>
        <Typography
          name='navigation'
          text='Password must have:'
          style={styles.whiteText}
        />
        <View>
          <Typography
            name='navigation'
            text='- 8-64 characters'
            style={styles.whiteText}
          />
          <Typography
            name='navigation'
            text='- An upercase letter'
            style={styles.whiteText}
          />
          <Typography
            name='navigation'
            text='- A lowercase letter'
            style={styles.whiteText}
          />
          <Typography
            name='navigation'
            text='- A number'
            style={styles.whiteText}
          />
          <Typography
            name='navigation'
            text='- A special character'
            style={styles.whiteText}
          />
        </View>
      </LoginHeader>
      <View style={styles.form}>
        <Input
          icon='Password'
          label='Temporary password'
          value={tempPassword}
          onChangeText={setTempPassword}
          darkMode={true}
          type='password'
        />
        <Input
          icon='Password'
          label='Create new password'
          value={newPassword}
          onChangeText={handleNewPassword}
          errorMessage={newError}
          darkMode={true}
          type='password'
        />
        <Input
          icon='Password'
          label='Confirm new password'
          value={confirmPassword}
          onChangeText={comparePasswords}
          errorMessage={confirmError}
          darkMode={true}
          type='password'
        />
      </View>
      <View style={styles.footer}>
        <ButtonTHS
          title={'Create new password'}
          onPress={handleLogin}
          variant={'primary'}
          disabled={isButtonDisabled}
        />
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
  container: {
    paddingTop: 36,
    padding: 20,
    width: '100%',
    flex: 1,
    height: '100%',
    maxWidth: 340,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 50,
  },
  form: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    gap: 26,
    alignItems: 'center',
  },
  copyRights: {
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 26,
  },
  whiteText: {
    color: colors.white,
  },
});
