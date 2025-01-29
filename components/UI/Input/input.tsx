import { Icon } from "@/components/Icon/Icon"
import { IconName } from "@/components/Icon/iconMapping"
import { Typography } from "@/components/typography";
import React from "react"
import { TextInput, StyleSheet, View } from "react-native"

interface Props{
    icon?: IconName;
    label?: string;
    placeHolder?: string;


}
export const Input: React.FC<Props> = ({icon, label, placeHolder = "" }) => {
    const [text, onChangeText] = React.useState('')

    return (
        <View>
            { icon &&
            <Icon name={icon}/>
            }
            <View>
                { label &&
                <Typography name="fieldLabel" text={label}/>
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
        margin: 12,
        borderWidth: 0,
        padding: 10,
        backgroundColor:"#C9C9C9"
    },
});