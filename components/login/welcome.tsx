import { StyleSheet, View } from "react-native"
import { Typography } from "../typography"
import { ButtonTHS } from "../UI/Button/button"
import {Image} from 'react-native'
interface Props{
    nextView: (page:string) => void;
}

export const Welcome: React.FC<Props> = ({nextView}) => {
    return <View style={styles.container}>
        <View style={styles.paragraph}>
            <Typography text="WELCOME" name={"sectionHeader"} style={{color:'white'}}/>
            <Typography text="to TESS Hose Management(THM)." name={"sectionHeader"} style={{color:'white'}}/>
            <Typography text="Existing users: sign in with your user login" name={"sectionHeader"} style={{color:'white'}}/>
            <Typography text="New users: request access and our team will revert to you with information needed to setup your account." name={"sectionHeader"} style={{color:'white'}}/>
        </View>
        <ButtonTHS title={"LOGIN"} onPress={() => nextView("Login")} />
        <View style={styles.semiFooter}>
            <Typography name={"button"} text={"We hose the world"} style={{color:'white'}}/>
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
})