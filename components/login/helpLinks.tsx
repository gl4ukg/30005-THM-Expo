import { View, Linking, Alert,StyleSheet, Pressable } from "react-native"
import { Typography } from "../typography";
import { colors } from "@/lib/tokens/colors";
import { Link } from "@react-navigation/native";
import { LinkButton } from "@/components/UI/Button/linkButton";

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
                <Pressable onPress={handlePhonePress}>
                    <Typography name={"navigation"} text={phoneNumber} style={styles.whiteText}/>
                </Pressable>
                <LinkButton variant="dark" title={emailAddr} onPress={() => handleEmailPress()}  />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    paragraph:{
        width:"100%",
        justifyContent:"flex-start",
        alignItems:'flex-start',
    },
    whiteText:{
        color:colors.white,
    },
    linkColor:{
        color:colors.linkLightGreen,
    }

})