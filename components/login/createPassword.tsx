import { View, StyleSheet, Alert } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
import { Typography } from '@/components/typography';
import { passwordRequirements, validatePassword } from '@/lib/util/validation';
interface Props {
  nextView: (page: 'login' | 'requestAccess') => void;
}

export const CreateNewPassword: React.FC<Props> = () => {
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
      <View style={styles.form}>
        <LoginHeader header={'CREATE NEW PASSWORD'}>
          <View>
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
          </View>
        </LoginHeader>
        <Input
          icon='Password'
          label='Temporary password'
          value={tempPassword}
          onChangeText={setTempPassword}
          darkmode={true}
          type='password'
        />
        <Input
          icon='Password'
          label='Create new password'
          value={newPassword}
          onChangeText={handleNewPassword}
          errorMessage={newError}
          darkmode={true}
          type='password'
        />
        <Input
          icon='Password'
          label='Confirm new password'
          value={confirmPassword}
          onChangeText={comparePasswords}
          errorMessage={confirmError}
          darkmode={true}
          type='password'
        />
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
  whiteText: {
    color: colors.white,
  },
  footer: {
    width: '100%',
    gap: 50,
  },
});
