import { View, StyleSheet, Pressable } from "react-native";
import { IconName } from "../Icon/iconMapping";
import { Icon } from "../Icon/Icon";
import { Typography } from "../typography";
import { colors } from "@/lib/tokens/colors";

interface Props {
    icon:IconName,
    counter:number,
    handlePress: () => void,
}

export const SelectedHoseCounter: React.FC<Props> = ({
    icon,
    counter,
    handlePress,
}) => {

    return(
        <Pressable onPress={handlePress}>
        <View style={elementStyle.frame}>
            <View style={elementStyle.iconWrapper}>
                <Icon name={icon} color={colors.primary} size="md"/>
            </View>
            <View style={elementStyle.circle}>
                <Typography name={"navigation"} text={counter.toString()}style={{color:colors.white, margin:"auto"}}/>
            </View>
        </View>
        </Pressable>
    )

};

const elementStyle = StyleSheet.create({
    frame:{
        width:40,
        height:40,
    },
    circle: {
        position: "absolute",
        top: 2,
        right: 3,
        width: 22,
        height: 22,
        borderRadius: 11, 
        backgroundColor: colors.secondary25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper:{
        position:"absolute",
        left:3,
        bottom:0,
    }
})