import { BottomNavigation } from '@/components/UI/BottomNavigation';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import SubUnitSelect from '../../components/UI/TopBarNavigation/SubUnitSelect';º
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { TopBarNavigation } from '@/components/UI/TopBarNavigation';

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
      <View
        style={[
          styles.statusBarIOS,
          {
            height: insets.top,
          },
        ]}
      />
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
        <Tabs.Screen name='user' />
        <Tabs.Screen name='dashboard' />
      </Tabs>
      <BottomNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  statusBarIOS: {
    width: '100%',
    backgroundColor: colors.secondary25,
  },
});
