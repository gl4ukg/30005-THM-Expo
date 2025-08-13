import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { NorwegianFlag } from '@/components/decorative/NorwegianFlag';
import { TessLines } from '@/components/decorative/TessLines';
import { LoginHeader } from '@/components/login/LoginHeader';
import { TessLogo } from '@/components/login/Logo';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('@/assets/images/Island-Patriot-11.png')}
    >
      <StatusBar style='light' />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.safeArea}>
          {/* TODO: remove View block under */}
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              top: Platform.OS === 'ios' ? 0 : insets.top,
              zIndex: 200,
            }}
          >
            <Link
              href={{
                pathname: '/(app)/dashboard/hoses/register',
                params: { id: '2209045' },
              }}
              style={{ backgroundColor: 'hotpink' }}
            >
              Register Hose 123
            </Link>

            <Link
              href={'/photo'}
              asChild
              style={[
                styles.link,
                { flex: 1, backgroundColor: colors.dashboardGreen },
              ]}
            >
              <Pressable
                style={[
                  styles.link,
                  { flex: 1, backgroundColor: colors.extendedBlue },
                ]}
              >
                <Typography name='navigation' text='Photos' numberOfLines={1} />
              </Pressable>
            </Link>
            <Link
              href={'/ui'}
              asChild
              style={[
                styles.link,
                { flex: 1, backgroundColor: colors.dashboardGreen },
              ]}
            >
              <Pressable
                style={[
                  styles.link,
                  { flex: 1, backgroundColor: colors.dashboardRed },
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
              <View style={styles.viewContainer}>
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
                          if (state.auth.user !== null) {
                            router.push('/dashboard');
                          } else {
                            router.push('/login');
                          }
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
    paddingTop: 36,
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
