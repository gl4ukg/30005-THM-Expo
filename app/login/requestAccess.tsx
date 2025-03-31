import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { useState } from 'react';
import { colors } from '@/lib/tokens/colors';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { Typography } from '@/components/typography';
import { useAppContext } from '@/context/ContextProvider';
import { Link, router } from 'expo-router';
import { emailValidation } from '@/lib/util/validation';
import { LoginHeader } from '@/components/login/loginHeader';
import { Input } from '@/components/UI/Input/input';
import { ButtonTHS } from '@/components/UI';
import { HelpLinks } from '@/components/login/helpLinks';

interface Props {
  nextView: (page: 'login' | 'requestAccess') => void;
}

interface RequestData {
  email: string;
  fullName: string;
  mobileNumber: string;
  company: string;
  units: string[];
}

interface ApiResponse {
  success: boolean;
}

interface ApiError {
  success: boolean;
  message: string;
}

const mockApiCall = (data: RequestData): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.fullName && data.company != 'Ecorp') {
        resolve({ success: true });
      } else {
        reject({ success: false, message: 'Invalid data' } as ApiError);
      }
    }, 1000);
  });
};
export default function ForgotPassword() {
  const { state, dispatch } = useAppContext();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [company, setCompany] = useState('');
  const [units, setUnits] = useState(['']);

  const [nameError, setNameError] = useState<undefined | string>(undefined);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  function handleEmail(email: string) {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  }

  function handleNameChange(name: string) {
    setFullName(name);
    if (!/^[\p{L}\s]+$/u.test(fullName) && fullName !== '') {
      setNameError('Invalid Name: Please enter a valid name.');
    } else if (name.length < 4) {
      setNameError('too short');
    } else setNameError(undefined);
  }

  const handleRequest = async () => {
    try {
      const response = await mockApiCall({
        email,
        fullName,
        mobileNumber,
        company,
        units,
      });

      if (response.success) {
        console.log('Request successful:', response);

        dispatch({
          type: 'LOGIN',
          payload: { email, name: fullName, id: mobileNumber },
        });

        router.push('/(app)/dashbord');
      }
    } catch (error) {
      const { message } = error as ApiError;
      Alert.alert('Request failed:', message);
    }
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
    <>
      <View
        style={{
          flexDirection: 'row',
          width: 340,
          paddingHorizontal: 15,
          margin: 'auto',
        }}
      >
        <Link
          href={'/login/createNewPassword'}
          asChild
          style={[
            {
              flex: 1,
              backgroundColor: colors.dashbordGreen,
            },
          ]}
        >
          <Pressable
            style={[{ flex: 1, backgroundColor: colors.extendedBlue }]}
          >
            <Typography
              name='navigation'
              text='New Password'
              numberOfLines={1}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.container}>
        <View style={styles.form}>
          <LoginHeader header='REQUEST ACCESS' />

          <Input
            icon='Email'
            label='Your email (User ID)'
            placeholder='ola@nordmann.no'
            value={email}
            type='email'
            onChangeText={handleEmail}
            errorMessage={emailError}
            darkMode={true}
          />
          <Input
            icon='User'
            label='Your full name'
            value={fullName}
            onChangeText={handleNameChange}
            errorMessage={nameError}
            darkMode={true}
          />
          <Input
            icon='Phone'
            label='Your mobile number'
            value={mobileNumber}
            type='tel'
            onChangeText={setMobileNumber}
            darkMode={true}
          />
          <Input
            icon='Industry'
            label='Your company'
            value={company}
            onChangeText={setCompany}
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
    gap: 26,
  },
  form: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  buttonPlacement: {
    alignSelf: 'flex-start',
    paddingLeft: 40,
    marginBottom: 24,
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
});
