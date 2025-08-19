import { BottomNavigation } from '@/components/UI/BottomNavigation';
import { TopBarNavigation } from '@/components/UI/TopBarNavigation';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
  return (
    <>
      <StatusBar backgroundColor={colors.secondary25} style='light' />
      <IosStatusBarBackground height={insets.top} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopBarNavigation
          selectedS1Code={state.data.s1Code}
          s1Items={state.data.s1Items}
          onSelectS1={async (s1Code: string) => {
            try {
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
          }}
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
