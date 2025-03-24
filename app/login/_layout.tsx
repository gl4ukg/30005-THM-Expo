import { TessLines } from '@/components/decorative/tessLines';
import { TessLogo } from '@/components/login/logo';
import { colors } from '@/lib/tokens/colors';
import { Slot, Stack } from 'expo-router';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginLayout() {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('@/assets/images/Island-Patriot-11.png')}
    >
      <SafeAreaView style={[styles.safeArea]}>
        <KeyboardAvoidingView style={[styles.safeArea]}>
          <ScrollView>
            <View style={styles.viewContainer}>
              <TessLogo width={180} color={colors.white} />
              <Slot />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <View style={styles.lines}>
        <TessLines />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  viewContainer: {
    paddingTop: 36,
    flex: 1,
  },
  lines: {
    zIndex: 1,
    position: 'sticky',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});
