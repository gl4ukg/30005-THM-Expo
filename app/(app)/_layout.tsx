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

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useAppContext();
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
          selectedUnit={state.data.workingUnitId}
          optionalUnits={state.data.assignedUnits}
          onSelectUnit={(unit) => {
            dispatch({
              type: 'SET_WORKING_UNIT',
              payload: unit,
            });
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
          <Tabs.Screen name='(app)/dashboard' />
          <Tabs.Screen name='(app)/settings' />
          <Tabs.Screen name='(app)/scan' />
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
