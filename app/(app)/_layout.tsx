import { BottomNavigation } from '@/components/UI/BottomNavigation';
import { TopBarNavigation } from '@/components/UI/TopBarNavigation';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { Redirect, router, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { cache } from '@/services/cache/cacheService';
import { useDataManager } from '@/hooks/useDataManager';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useAppContext();
  const { getHoseData } = useDataManager();
  if (!state.auth.user) {
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/' />;
  }
  const handleSelection = (s1Code: number) => {
    if (!state.settings.internetReachable) {
      Alert.alert(
        'No internet connection',
        'You need fast internet connection to change location!',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    }
    Alert.alert(
      'Change Location',
      'You are going to replace all information about hoses and data in this location. Are you sure you want to change location?',
      [
        {
          text: 'No stay here',
          style: 'cancel',
        },
        {
          text: 'Yes, change location',
          onPress: async () => {
            try {
              router.replace('/dashboard');
              dispatch({
                type: 'CHANGE_S1_SELECTION',
                payload: s1Code,
              });
              cache.s1.code.set(s1Code);
              const { status } = await getHoseData();
              if (status === 'error') {
                throw new Error('Failed to get hoses');
              }
            } catch (error) {
              console.error('Failed to change S1 selection:', error);
              dispatch({
                type: 'SET_DATA_LOADING',
                payload: false,
              });
            }
          },
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <>
      <StatusBar backgroundColor={colors.secondary25} style='light' />
      <IosStatusBarBackground height={insets.top} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopBarNavigation
          selectedS1Code={state.data.s1Code}
          s1Items={state.data.s1Items}
          onSelectS1={handleSelection}
        />
        <Tabs
          screenOptions={{
            headerShown: false,
            sceneStyle: { backgroundColor: colors.white },
          }}
          initialRouteName='dashboard'
          tabBar={() => <></>}
        >
          <Tabs.Screen name='dashboard' />
          <Tabs.Screen name='settings' />
          <Tabs.Screen name='scan' />
        </Tabs>
      </SafeAreaView>
      <BottomNavigation />
    </>
  );
}

const IosStatusBarBackground = ({ height }: { height: number }) => {
  return <View style={[styles.statusBarIOS, { height }]} />;
};

const styles = StyleSheet.create({
  statusBarIOS: {
    width: '100%',
    backgroundColor: colors.secondary25,
  },
});
