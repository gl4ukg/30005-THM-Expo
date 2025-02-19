import { View, StyleSheet, Pressable } from "react-native";
import { IconName } from "../Icon/iconMapping";
import { Icon } from "../Icon/Icon";
import { Typography } from "../typography";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/lib/tokens/colors";

interface Props {
    icon:IconName,
    counter:Number,
}

export const SelectedHoseCounter: React.FC<Props> = ({
    icon,
    counter
}) => {

    return(
        <Pressable>
        <View style={elementStyle.frame}>
            <View style={elementStyle.iconWrapper}>
                <Icon name={icon} color={colors.primary} size="md"/>
            </View>
            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={elementStyle.svg}>
                <Circle cx="11" cy="11" r="11" fill={colors.secondary25}/>
                <Typography name={"navigation"} text={counter.toString()}style={{color:colors.white, margin:"auto"}}/>
            </Svg>
        </View>
        </Pressable>
    )

};

const elementStyle = StyleSheet.create({
    frame:{
        width:40,
        height:40,
    },
    svg:{
        position:"absolute",
        top:2,
        right:3,
    },
    iconWrapper:{
        position:"absolute",
        left:3,
        bottom:0,
    }
})