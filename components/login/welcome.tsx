import { View } from "react-native"
import { Typography } from "../typography"
import { ButtonTHS } from "../UI/Button/button"
import {Image} from 'react-native'
interface Props{
    nextView: (page:string) => void;
}

export const Welcome: React.FC<Props> = ({nextView}) => {
    return <View>
        <Typography text="Howdy" name={"button"} />
        <ButtonTHS title={"LOGIN"} onPress={() => nextView("Login")} />
        <Typography name={"button"} text={"We hose the world"} style={{color:'white'}}/>
        <Image source={require('../../assets/images/norway-flag.png')}/>
    </View>;
}