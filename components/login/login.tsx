import { View,StyleSheet } from "react-native"
import { Typography } from "../typography"
import { ButtonTHS } from "../UI/Button/button"
import { Input } from "../UI/Input/input";
import { useState } from "react";
import { LoginHeader } from "./loginHeader";
interface Props{
    nextView: (page:string) => void;
}

export const LoginScreen: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Full Name:", fullName);
        console.log("Password:", password);
    };

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <LoginHeader header={"LOGIN"}/>
            <Input icon="Email" label="Email" placeHolder="ola@nordmann.no" value={email} onChangeText={setEmail} labelColor="white"/>
            <Input icon="User" label="Your full name" value={fullName} onChangeText={setFullName} labelColor="white"/>
            <Input icon="Password" label="Password" value={password} onChangeText={setPassword} labelColor="white" type="password"/>
        </View>
        <ButtonTHS title={"login"} onPress={handleLogin} />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        gap: 200,
        borderWidth: 1, 
        borderColor: "yellow",
        height: "100%",
    },   
    form:{
        width:"100%",
        gap:15,
        alignItems:"center",
      },
      whiteText:{
        color:'white',
    },
});