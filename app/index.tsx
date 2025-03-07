import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useState } from 'react';
import { Welcome } from '@/components/login/welcome';
import { LoginScreen } from '@/components/login/login';
import { Typography } from '@/components/typography';
import { TessLines } from '@/components/decorative/tessLines';
import { RequestAccess } from '@/components/login/requestAccess';
import { colors } from '@/lib/tokens/colors';
import { Link } from 'expo-router';
import { TessLogo } from '@/components/login/logo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ResetPassword } from '@/components/login/resetPassword';
import { CreateNewPassword } from '@/components/login/createPassword';

type LoginViews =
  | 'welcome'
  | 'login'
  | 'requestAccess'
  | 'resetPassword'
  | 'createPassword';
const Login = () => {
  const [view, setView] = useState<LoginViews>('welcome');
  const handlePress = (page: LoginViews) => {
    setView(page);
  };
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/images/TESS-THM-inspector.png')}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.dashbordGreen },
            ]}
            onPress={() => {
              setView('welcome');
            }}
          >
            <Typography name='navigation' text='welcome' numberOfLines={1} />
          </Pressable>
          <Pressable
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.dashbordRed },
            ]}
            onPress={() => {
              setView('resetPassword');
            }}
          >
            <Typography name='navigation' text='reset' numberOfLines={1} />
          </Pressable>
          <Pressable
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.dashbordYellow },
            ]}
            onPress={() => {
              setView('requestAccess');
            }}
          >
            <Typography name='navigation' text='request' numberOfLines={1} />
          </Pressable>
          <Pressable
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.lightContrast25 },
            ]}
            onPress={() => {
              setView('login');
            }}
          >
            <Typography name='navigation' text='login' numberOfLines={1} />
          </Pressable>
          <Pressable
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.extendedBlue },
            ]}
            onPress={() => {
              setView('createPassword');
            }}
          >
            <Typography name='navigation' text='create' numberOfLines={1} />
          </Pressable>
          <Link
            href={'/(app)/dashbord'}
            asChild
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.dashbordGreen },
            ]}
          >
            <Pressable
              style={[
                styles.link,
                { flex: 1, backgroundColor: colors.extendedBlue },
              ]}
            >
              <Typography name='navigation' text='dashbord' numberOfLines={1} />
            </Pressable>
          </Link>
          <Link
            href={'/ui'}
            asChild
            style={[
              styles.link,
              { flex: 1, backgroundColor: colors.dashbordGreen },
            ]}
          >
            <Pressable
              style={[
                styles.link,
                { flex: 1, backgroundColor: colors.extendedBlue },
              ]}
            >
              <Typography name='navigation' text='UI' numberOfLines={1} />
            </Pressable>
          </Link>
        </View>
        <View
          style={[
            styles.scrollViewWrapper,
            { height: windowHeight - insets.bottom },
          ]}
        >
          <ScrollView contentContainerStyle={[styles.scrollView]}>
            <View style={[styles.viewContainer, {}]}>
              <TessLogo width={180} color={colors.white} />
              {view === 'welcome' && <Welcome nextView={handlePress} />}
              {view === 'login' && <LoginScreen nextView={handlePress} />}
              {view === 'requestAccess' && (
                <RequestAccess nextView={handlePress} />
              )}
              {view === 'resetPassword' && (
                <ResetPassword nextView={handlePress} />
              )}
              {view === 'createPassword' && (
                <CreateNewPassword nextView={handlePress} />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={styles.lines}>
        <TessLines />
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewWrapper: {
    flex: 1,
  },
  scrollView: {},
  viewContainer: {
    paddingTop: 36,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hotpink',
  },
  footerView: {
    width: '100%',
    gap: 5,
    alignItems: 'center',
  },
  whiteText: {
    color: colors.white,
  },
  lines: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});
