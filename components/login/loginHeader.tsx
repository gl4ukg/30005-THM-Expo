import { StyleSheet, View } from "react-native";
import { Typography } from "../typography";
import { colors } from "@/lib/tokens/colors";

interface Props{
    header?:string,
    subHeader?:string[],
}
export const LoginHeader: React.FC<Props> = ({header, subHeader}) => {
    return (
        <View style={styles.paragraph}>
            {header &&
            <Typography text={header} name={"sectionHeader"} style={[styles.whiteText, !subHeader && styles.centeredText]}/>
            }
            {subHeader && subHeader.map((text, index) => (
                <Typography key={index} text={text} name={'sectionHeader'} style={styles.whiteText}/>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    paragraph:{
        width:"90%",
        margin:"auto",
        gap:10,
        backgroundColor:colors.black,
        paddingHorizontal:20,
        paddingVertical:10,
        opacity:3/4,
    },
    whiteText:{
        color:colors.white,
    },
    centeredText: {
        textAlign: 'center',
    }
})