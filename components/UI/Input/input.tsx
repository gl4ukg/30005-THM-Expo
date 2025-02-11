import { Icon } from "@/components/Icon/Icon"
import { IconName } from "@/components/Icon/iconMapping"
import { Typography } from "@/components/typography";
import { colors } from "@/lib/tokens/colors";
import { useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native"

interface Props{
    icon?: IconName;
    label?: string;
    placeHolder?: string;
    value: string;
    onChangeText: (text: string) => void;
    labelColor?: string;
    type?:string;

}
export const Input: React.FC<Props> = ({icon, label, placeHolder = "", value, onChangeText, labelColor = "black", type}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <View style={styles.outerView}>
            { label &&
                <View style={styles.labelView}>
                    <Typography name="fieldLabel" text={label} style={{color:labelColor}}/>
                    </View>
                }   
            <View style={styles.innerView}>
                { icon &&
                <Icon name={icon} size="md" color={labelColor}/>
                }
                <TextInput 
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeHolder}
                    secureTextEntry={type === 'password' && !isPasswordVisible}
                    />
                    {type === 'password' && 
                    <Pressable onPress={togglePasswordVisibility} style={styles.iconContainer}>
                        <Icon name={isPasswordVisible ? "EyeOff" : "Eye"} size="xsm" color={colors.passwordEyeIcon} />
                    </Pressable>
                    }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        height:38,
        width:245,
        marginLeft: 2,
        borderWidth: 0,
        padding: 10,
        backgroundColor:colors.inputBackground,
        position:"relative",

    },
    outerView:{
        flexDirection:"column",
    },
    innerView:{
        flexDirection:'row',
        alignItems:"center",
    },
    labelView:{
        marginLeft:34,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        justifyContent: 'center',
     },
});