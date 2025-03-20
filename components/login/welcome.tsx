import { StyleSheet, View } from 'react-native';
import { Typography } from '../typography';
import { ButtonTHS } from '../UI/Button/button';
import { LoginHeader } from './loginHeader';
import { colors } from '@/lib/tokens/colors';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { NorwegianFlag } from '@/components/decorative/norwegianFlag';

interface Props {
  nextView: (page: 'login' | 'requestAccess') => void;
}

export const Welcome: React.FC<Props> = ({ nextView }) => {
  return (
    <View style={styles.container}>
      <LoginHeader header='WELCOME' style={styles.loginHeader}>
        <View style={styles.paragraph}>
          <Typography
            name='navigation'
            text='to TESS Hose Management (THM).'
            style={styles.whiteText}
          />
          <Typography name='navigation' style={styles.whiteText}>
            <Typography name='navigationBold' text='Existing users: ' />
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
            onPress={() => nextView('login')}
            variant={'primary'}
          />
          <LinkButton
            variant='dark'
            title='Request Access'
            onPress={() => nextView('requestAccess')}
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
            style={styles.whiteText}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
  whiteText: {
    color: colors.white,
  },
});
