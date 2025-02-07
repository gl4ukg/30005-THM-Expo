import { View,StyleSheet } from "react-native"
import { ButtonTHS } from "../UI/Button/button"
import { Input } from "../UI/Input/input";
import { useState } from "react";
import { LoginHeader } from "./loginHeader";

interface Props{
    nextView: (page:string) => void;
}

export const RequestAccess: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [company, setCompany] = useState('');
    const [unit, setUnit] = useState('');

    
    const handleRequest = () => {
        console.log("Email:", email);
        console.log("Full Name:", fullName);
        console.log("Mobile Number:", mobileNumber);
        console.log("Company:", company);
        console.log("Unit:", unit)
    };

    return (
        <View style={styles.container}>
            <LoginHeader header="REQUEST ACCESS"/>
            <View style={styles.form}>
                <Input icon="Email" label="Your email (User ID)" placeHolder="ola@nordmann.no" value={email} onChangeText={setEmail} labelColor="white"/>
                <Input icon="User" label="Your full name" value={fullName} onChangeText={setFullName} labelColor="white"/>
                <Input icon="Phone" label="Your mobile number" value={mobileNumber} onChangeText={setMobileNumber} labelColor="white"/>
                <Input icon="Industry" label="Your company" value={company} onChangeText={setCompany} labelColor="white"/>
                <Input icon="Task" label="Your unit (plant, vessel, rig)" value={unit} onChangeText={setUnit} labelColor="white"/>
            </View>
            <ButtonTHS title={"REQUEST ACCESS"} onPress={handleRequest} />

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        gap: 50,
        borderWidth: 1, 
        borderColor: "yellow",
        height: "100%",
        padding: 20,
    },
    form:{
        width:"100%",
        gap:15,
        alignItems:"center",
      },

})