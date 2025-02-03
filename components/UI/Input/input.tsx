import { Icon } from "@/components/Icon/Icon"
import { IconName } from "@/components/Icon/iconMapping"
import { Typography } from "@/components/typography";
import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native"

interface Props{
    icon?: IconName;
    label?: string;
    placeHolder?: string;
}
export const Input: React.FC<Props> = ({icon, label, placeHolder = "" }) => {
    const [text, onChangeText] = useState('')

    return (
        <View style={styles.outerView}>
            { label &&
                <View style={styles.labelView}>
                    <Typography name="fieldLabel" text={label}/>
                </View>
                }   
            <View style={styles.innerView}>
                { icon &&
                <Icon name={icon} size="md"/>
                }
                <TextInput 
                    style={styles.input}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={placeHolder}/>
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
        backgroundColor:"#C9C9C9",
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
    }
});