import { Pressable, StyleSheet, View } from "react-native"
import { Typography } from "../typography"
import { ButtonTHS } from "../UI/Button/button"
import {Image} from 'react-native'
import { LoginHeader } from "./loginHeader";
import { colors } from "@/lib/tokens/colors";

interface Props{
    nextView: (page:string) => void;
}

const welcomeText =["to TESS Hose Management (THM).",
    "Existing users: sign in with your user login.",
    "New users: request access and our team will revert to you with information needed to setup your account."];

export const Welcome: React.FC<Props> = ({nextView}) => {
    return <View style={styles.container}>
       <LoginHeader header="WELCOME" subHeader={welcomeText}/>
        <ButtonTHS title={"LOGIN"} onPress={() => nextView("Login")} />
            <Pressable onPress={() => nextView("RequestAccess")}>
                <Typography text="Request Access" name="sectionHeader" style={styles.whiteText}/>
            </Pressable>
        <View style={styles.semiFooter}>
            <Typography name={"button"} text={"We hose the world"} style={styles.whiteText}/>
            <Image source={require('../../assets/images/norway-flag.png')}/>
        </View>
    </View>;
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        gap: 200,
        borderWidth: 1, 
        borderColor: "yellow",
        height: "100%",
        padding: 20,
    },
    paragraph:{
        width:"80%",
        margin:"auto",
        gap:5,
    },
    semiFooter:{
        width:"100%",
        gap:5,
        alignItems:"center",
      },
    whiteText:{
        color:colors.white,
    }
})