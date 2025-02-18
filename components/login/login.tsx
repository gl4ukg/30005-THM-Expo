import { View, StyleSheet, Alert } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
interface Props {
	nextView: (page: string) => void;
}

export const LoginScreen: React.FC<Props> = () => {
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailBlur = () => {
		if (!email.includes('@') && email !== '') {
			Alert.alert('Invalid Email', 'Please enter a valid email address.');
		}
	};

	const handleNameBlur = () => {
		if (!/^[\p{L}\s]+$/u.test(fullName) && fullName !== '') {
			Alert.alert('Invalid Name', 'Please enter a valid name.');
		}
	};

	const handleLogin = () => {
		console.log('Email:', email);
		console.log('Full Name:', fullName);
		console.log('Password:', password);
	};

    const isButtonDisabled = !email || !fullName || !password;

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<LoginHeader header={'LOGIN'} />
				<Input
					icon='Email'
					label='Email'
					placeHolder='ola@nordmann.no'
					value={email}
					onChangeText={setEmail}
					labelColor='white'
					onBlur={handleEmailBlur}
				/>
				<Input
					icon='User'
					label='Your full name'
					value={fullName}
					onChangeText={setFullName}
					labelColor='white'
					onBlur={handleNameBlur}
				/>
				<Input
					icon='Password'
					label='Password'
					value={password}
					onChangeText={setPassword}
					labelColor='white'
					type='password'
				/>
			</View>
			<ButtonTHS title={'LOGIN'} onPress={handleLogin} variant={"primary"} disabled={isButtonDisabled}/>
			<HelpLinks header='Unable to log in?' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 150,
		height: '100%',
		marginBottom: 50,
	},
	form: {
		width: '100%',
		gap: 15,
		alignItems: 'center',
	},
	whiteText: {
		color: colors.white,
	},
});
