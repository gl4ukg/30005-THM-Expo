import { ButtonTHS, NavMenu } from "@/components/UI";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import { Welcome } from "@/components/login/welcome";
import { LoginScreen } from "@/components/login/login";
import { Typography } from "@/components/typography";
import { TessLines } from "@/components/decorative/tessLines";

const Login = () => {
  const [view, setView] = useState<string>("Welcome");
  const handlePress = (page: string) => {
    setView(page);
  };

  return (
    <ImageBackground source={require('../assets/images/TESS-THM-inspector.png')}   style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
    <SafeAreaView style={styles.view}>
      <ScrollView contentContainerStyle={styles.navigationContainer}>
        {view ==="Welcome" && (
          <Welcome nextView={handlePress}/>            
        )}
        {view === "Login" && (
          <LoginScreen nextView={handlePress}/>
        )}
        <Typography name={"button"} text={"© 2025 Copyright TESS AS"} style={{color:'white'}}/>
        <TessLines/>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: "100%",
    position: "relative",
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  link: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#BDECB9",
  },
});
