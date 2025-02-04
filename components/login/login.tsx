import { View } from "react-native"
import { Typography } from "../typography"
import { ButtonTHS } from "../UI/Button/button"
import { Input } from "../UI/Input/input";
import { Link } from "expo-router";
interface Props{
    nextView: (page:string) => void;
}

export const LoginScreen: React.FC<Props> = ({nextView}) => {
    return <View>
        <Input icon="Email" label="Email" placeHolder="ola@nordmann.no" />
        <Input icon="User" label="Your full name" />
        <Input icon="Password" label="Password" />
        <ButtonTHS title={"login"} onPress={() => nextView("Login")} />
    </View>;
}