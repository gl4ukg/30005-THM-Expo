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
       <LoginHeader header="WELCOME" style={styles.loginHeader} >
            <View style={styles.paragraph}>
                <Typography name="navigation" text="to TESS Hose Management (THM)." style={styles.whiteText} />
                <Typography name="navigation" style={styles.whiteText} >
                    <Typography name="navigationBold" text="Existing users: "  />
                    <Typography name="navigation" text="sign in with your user login."  />
                </Typography>
                <Typography name="navigation" style={styles.whiteText} >
                    <Typography name="navigationBold" text="New users: "  />
                    <Typography name="navigation" text="request access and our team will revert to you with information needed to setup your account."  />
                </Typography>
            </View>
       </LoginHeader>
        <ButtonTHS title={"LOGIN"} onPress={() => nextView("Login")} variant={"primary"} style={{width: "100%"}} />
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
        width: "100%",
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        // borderColor: colors.white,
        // borderWidth: 1,
    },
    loginHeader:{
        marginBottom: 50
    },
    paragraph:{
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