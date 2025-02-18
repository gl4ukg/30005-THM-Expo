import { View,StyleSheet } from "react-native"
import { ButtonTHS } from "../UI/Button/button"
import { Input } from "../UI/Input/input";
import { useState } from "react";
import { LoginHeader } from "./loginHeader";
import { colors } from "@/lib/tokens/colors";
import { HelpLinks } from "./helpLinks";

interface Props{
    nextView: (page:string) => void;
}

export const RequestAccess: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [company, setCompany] = useState('');
    const [units, setUnits] = useState(['']);

    
    const handleRequest = () => {
        console.log("Email:", email);
        console.log("Full Name:", fullName);
        console.log("Mobile Number:", mobileNumber);
        console.log("Company:", company);
        console.log("Unit:", units)
    };

    const addUnitField = () => {
        setUnits([...units, '']); 
    };
    
    const updateUnitValue = (index: number, value: string) => {
        const newUnits = [...units];
        newUnits[index] = value; 
        setUnits(newUnits);
    };

    const isButtonDisabled = !email || !fullName || !mobileNumber || !company || !units;

    return (
        <View style={styles.container}>
            <LoginHeader header="REQUEST ACCESS"/>
            <View style={styles.form}>
                <Input icon="Email" label="Your email (User ID)" placeHolder="ola@nordmann.no" value={email} onChangeText={setEmail} labelColor={colors.white}/>
                <Input icon="User" label="Your full name" value={fullName} onChangeText={setFullName} labelColor={colors.white}/>
                <Input icon="Phone" label="Your mobile number" value={mobileNumber} onChangeText={setMobileNumber} labelColor={colors.white}/>
                <Input icon="Industry" label="Your company" value={company} onChangeText={setCompany} labelColor={colors.white}/>
                {units.map((unit, index) => (
                    <Input key={index} icon="Task" label={index === 0 ?"Your unit (plant, vessel, rig)":`Unit ${index + 1}`} value={unit} onChangeText={(value) => updateUnitValue(index, value)} labelColor={colors.white}/>
                ))}
                <View style={styles.buttonPlacement}>
                    <ButtonTHS title={"+ Add more units?"} variant={"link"} onPress={addUnitField}/>
                </View>
            </View>
            <ButtonTHS title={"REQUEST ACCESS"} onPress={handleRequest} variant={"primary"} disabled={isButtonDisabled}/>
            <HelpLinks header="Not sure what to do?"/>

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        gap: 50,
        height: "100%",
        paddingVertical:20,
    },
    form:{
        width:"100%",
        gap:15,
        alignItems:"center",
    },
    buttonPlacement:{
        marginTop:-15,
        marginLeft:-35,
    }

})