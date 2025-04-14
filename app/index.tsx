import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Typography } from '@/components/typography';
import { TessLines } from '@/components/decorative/tessLines';
import { colors } from '@/lib/tokens/colors';
import { Link, useRouter } from 'expo-router';
import { TessLogo } from '@/components/login/logo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NorwegianFlag } from '@/components/decorative/norwegianFlag';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { ButtonTHS } from '@/components/UI';
import { LoginHeader } from '@/components/login/loginHeader';
import { mockedData } from '@/context/mocked';
import { useAppContext } from '@/context/ContextProvider';

type LoginViews =
  | 'welcome'
  | 'login'
  | 'requestAccess'
  | 'resetPassword'
  | 'createPassword';
const Login = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('@/assets/images/Island-Patriot-11.png')}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.safeArea}>
          {/* TODO: remove View block under */}
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Link
              href={{
                pathname: '/(app)/dashbord/hoses/register',
                params: { id: '2209045' },
              }}
              style={{ backgroundColor: 'hotpink' }}
            >
              Register Hose 123
            </Link>

            <Link
              href={'/dashbord'}
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
                onPress={() => {
                  dispatch({
                    type: 'SET_HOSE_DATA',
                    payload: mockedData,
                  });
                  router.push('/dashbord');
                }}
              >
                <Typography
                  name='navigation'
                  text='dashboard'
                  numberOfLines={1}
                />
              </Pressable>
            </Link>
            <Link
              href={'/scan'}
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
                <Typography name='navigation' text='Scan' numberOfLines={1} />
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
                  { flex: 1, backgroundColor: colors.dashbordRed },
                ]}
              >
                <Typography name='navigation' text='Ui' numberOfLines={1} />
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
                <View style={styles.container}>
                  <LoginHeader header='WELCOME' style={styles.loginHeader}>
                    <View style={styles.paragraph}>
                      <Typography
                        name='navigation'
                        text='to TESS Hose Management (THM).'
                        style={styles.whiteText}
                      />
                      <Typography name='navigation' style={styles.whiteText}>
                        <Typography
                          name='navigationBold'
                          text='Existing users: '
                        />
                        <Typography
                          name='navigation'
                          text='sign in with your user login.'
                        />
                      </Typography>
                      <Typography name='navigation' style={styles.whiteText}>
                        <Typography name='navigationBold' text='New users: ' />
                        <Typography
                          name='navigation'
                          text='request access and our team will revert to you with information needed to setup your account.'
                        />
                      </Typography>
                    </View>
                  </LoginHeader>
                  <View style={styles.content}>
                    <View style={styles.buttonWrapper}>
                      <ButtonTHS
                        title={'LOGIN'}
                        onPress={() => {
                          router.push('/login');
                        }}
                        variant={'primary'}
                      />
                      <LinkButton
                        variant='dark'
                        title='Request Access'
                        onPress={() => {
                          router.push('/login/requestAccess');
                        }}
                        vSpace={7}
                        hSpace={7}
                      />
                    </View>
                    <View style={styles.semiFooter}>
                      <Typography
                        name={'navigation'}
                        text={'We hose the world'}
                        style={styles.whiteText}
                      />
                      <NorwegianFlag width={32} />
                      <Typography
                        name={'navigation'}
                        text={'© 2025 Copyright TESS AS'}
                        style={styles.copyRights}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
  scrollView: {
    // zIndex: 10,
    paddingBottom: 30,
  },
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
  copyRights: {
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 26,
  },
  lines: {
    zIndex: 1,
    position: 'sticky',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    marginHorizontal: 'auto',
    padding: 20,
    height: '100%',
    gap: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loginHeader: {
    marginBottom: 10,
  },
  paragraph: {
    gap: 5,
  },
  content: {
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    gap: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  semiFooter: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
});
