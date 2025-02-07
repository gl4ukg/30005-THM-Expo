import { View, Linking, Alert, TouchableOpacity,StyleSheet } from "react-native"
import { Typography } from "../typography";
import { colors } from "@/lib/tokens/colors";

interface Props {
    header: string;
  }
export const HelpLinks: React.FC<Props> = ({header}) => {
    const phoneNumber = '+47 32 84 40 05';
    const emailAddr = 'thm@tess.no';

    const handlePhonePress = async() => {
        const url = `tel:${phoneNumber.replaceAll(' ', '')}`;
        try{
            await Linking.openURL(url);
        }catch(error){
            Alert.alert('Error', 'Could not open phone app')
        }
    };
    const handleEmailPress = async() => {
        const url = `mailto:${emailAddr}`;
        try{
            await Linking.openURL(url);
        }catch(error){
            Alert.alert('Error', 'Could not open email app')
        }
    }

    return (
        <View style={styles.paragraph}>
            <View>
                <Typography name={"navigationBold"} text={header} style={styles.whiteText}/>
                <Typography name={"navigation"} text={"Please contact the THM team:"} style={styles.whiteText}/>
                <TouchableOpacity onPress={handlePhonePress}>
                    <Typography name={"button"} text={phoneNumber} style={styles.whiteText}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEmailPress}>
                    <Typography name={"button"} text={emailAddr} style={styles.whiteText}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    paragraph:{
        width:"90%",
        margin:"auto",
        justifyContent:"center",
        alignItems:'center',
        borderWidth:1,
        borderColor:"red"
    },
    whiteText:{
        color:colors.white,
    },

})