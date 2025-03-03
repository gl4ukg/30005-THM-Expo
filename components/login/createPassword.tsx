import { View, StyleSheet, Alert } from 'react-native';
import { ButtonTHS } from '../UI/Button/button';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { HelpLinks } from './helpLinks';
import { Typography } from '@/components/typography';
interface Props {
	nextView: (page: "login" | "requestAccess") => void;
}

export const CreateNewPassword: React.FC<Props> = () => {
	const [password, setPassword] = useState('');




	const handleLogin = () => {
		console.log('Password:', password);
	};

    const isButtonDisabled = !password;

	return (
		<View style={styles.container}>
			<View style={styles.form}>
			<LoginHeader header={'CREATE NEW PASSWORD'}>
				<View>
					<Typography name="navigation" text="Password must have:" style={styles.whiteText} />
					<View>
						<Typography name="navigation" text="- 8-64 characters" style={styles.whiteText} />
						<Typography name="navigation" text="- An upercase letter" style={styles.whiteText} />
						<Typography name="navigation" text="- A lowercase letter" style={styles.whiteText} />
						<Typography name="navigation" text="- A number" style={styles.whiteText} />
						<Typography name="navigation" text="- A special character" style={styles.whiteText} />
					</View>
				</View>
			</LoginHeader>
				<Input
					icon='Password'
					label='Temporary password'
					value={password}
					onChangeText={setPassword}
					darkmode={true}
					labelColor='white'
					type='password'
				/>
				<Input
					icon='Password'
					label='Create new password'
					value={password}
					onChangeText={setPassword}
					darkmode={true}
					labelColor='white'
					type='password'
				/>
				<Input
					icon='Password'
					label='Confirm new password'
					value={password}
					onChangeText={setPassword}
					darkmode={true}
					labelColor='white'
					type='password'
				/>
			</View>
			<ButtonTHS title={'LOGIN'} onPress={handleLogin} variant={"primary"} disabled={isButtonDisabled}/>
			<View style={styles.footer}>
				<HelpLinks header='Unable to log in?' />
				<Typography
					name={"navigation"}
					text={"© 2025 Copyright TESS AS"}
					style={styles.whiteText}
				/>  
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
        width: "100%",
        flex: 1,
        height: "100%",
        maxWidth: 340,
        marginHorizontal: "auto",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 50,
    },
    form:{
        width:"100%",
        gap:15,
        alignItems:"center",
    },
	whiteText: {
		color: colors.white,
	},
	footer: {
        width: "100%",
        gap: 50
    },
});
