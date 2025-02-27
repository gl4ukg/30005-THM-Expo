import { Typography } from "@/components/typography";
import { ButtonTHS } from "@/components/UI";
import {  useTHSContext } from "@/context/THScontextProvider";
import {  Link, useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const User = () => {
  const { state, dispatch } = useTHSContext();
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {state.user === null ? (
            <ButtonTHS variant="primary" size="sm" title="Log in" onPress={()=> router.push("/")} />
      ) : (
        <View style={{gap: 10, width: "100%", alignItems: "center", padding: 20}}>
          <Typography name="navigationBold">User</Typography>
          <Typography name="navigationBold">Name: {state.user?.name}</Typography>
          <Typography name="navigationBold">Email: {state.user?.email}</Typography>
          <Typography name="navigationBold">Password: {state.user?.id}</Typography>
          <ButtonTHS variant="primary" size="sm" title="Log out" onPress={() => dispatch({type: "RESET_USER"})}/>
        </View>
      )
      }

    </SafeAreaView>
  );
};

export default User;
