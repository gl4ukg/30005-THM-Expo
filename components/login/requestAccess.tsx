import { View, StyleSheet } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { Typography } from '@/components/typography';

interface Props {
  nextView: (page: 'login' | 'requestAccess') => void;
}

export const RequestAccess: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [company, setCompany] = useState('');
  const [units, setUnits] = useState(['']);

  const handleRequest = () => {
    console.log('Email:', email);
    console.log('Full Name:', fullName);
    console.log('Mobile Number:', mobileNumber);
    console.log('Company:', company);
    console.log('Unit:', units);
  };

  const addUnitField = () => {
    setUnits([...units, '']);
  };

  const updateUnitValue = (index: number, value: string) => {
    const newUnits = [...units];
    newUnits[index] = value;
    setUnits(newUnits);
  };

  const isButtonDisabled =
    !email || !fullName || !mobileNumber || !company || !units;

  return (
    <View style={styles.container}>
      <LoginHeader header='REQUEST ACCESS' />
      <View style={styles.form}>
        <Input
          icon='Email'
          label='Your email (User ID)'
          placeHolder='ola@nordmann.no'
          value={email}
          onChangeText={setEmail}
          labelColor={colors.white}
          darkMode={true}
        />
        <Input
          icon='User'
          label='Your full name'
          value={fullName}
          onChangeText={setFullName}
          labelColor={colors.white}
          darkMode={true}
        />
        <Input
          icon='Phone'
          label='Your mobile number'
          value={mobileNumber}
          onChangeText={setMobileNumber}
          labelColor={colors.white}
          darkMode={true}
        />
        <Input
          icon='Industry'
          label='Your company'
          value={company}
          onChangeText={setCompany}
          labelColor={colors.white}
          darkMode={true}
        />
        {units.map((unit, index) => (
          <Input
            key={index}
            icon='Task'
            label={
              index === 0
                ? 'Your unit (plant, vessel, rig)'
                : `Unit ${index + 1}`
            }
            value={unit}
            onChangeText={(value) => updateUnitValue(index, value)}
            labelColor={colors.white}
            darkMode={true}
          />
        ))}
        <View style={styles.buttonPlacement}>
          <LinkButton
            title={'+ Add more units?'}
            variant={'dark'}
            onPress={addUnitField}
          />
        </View>
      </View>
      <ButtonTHS
        title={'REQUEST ACCESS'}
        onPress={handleRequest}
        variant={'primary'}
        disabled={isButtonDisabled}
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
    textAlign: 'center',
  },
});
