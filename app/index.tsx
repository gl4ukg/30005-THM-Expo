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
import { RequestAccess } from "@/components/login/requestAccess";
import { colors } from "@/lib/tokens/colors";

const Login = () => {
  const [view, setView] = useState("Welcome");
  const handlePress = (page: string) => {
    setView(page);
  };

  return (
    <ImageBackground source={require('../assets/images/TESS-THM-inspector.png')}>

    <SafeAreaView >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {view ==="Welcome" && (
          <Welcome nextView={handlePress}/>            
        )}
        {view === "Login" && (
          <LoginScreen nextView={handlePress}/>
        )}
         {view === "RequestAccess" && (
          <RequestAccess nextView={handlePress}/>
        )}
        <View style={styles.footerView}>
          <Typography name={"navigation"} text={"© 2025 Copyright TESS AS"} style={styles.whiteText}/>
          <TessLines/>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    // height: "100%",
    position: "relative",
  },
  scrollView: {
    width: "100%",
    borderWidth: 2,
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
  footerView:{
    width:"100%",
    gap:5,
    alignItems:"center",
  },
  whiteText:{
    color:colors.white,
  }
});
