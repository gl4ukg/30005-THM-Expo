import { BottomNavigation } from '@/components/UI/BottomNavigation';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SubUnitSelect from '../../components/UI/TopBarNavigation/SubUnitSelect';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar backgroundColor='#004637' style='light' />
      <View
        style={[
          styles.statusBarIOS,
          {
            height: insets.top,
          },
        ]}
      />
      <SubUnitSelect />
      <Tabs
        screenOptions={{ headerShown: false }}
        initialRouteName='dashbord'
        tabBar={() => <></>}
      >
        <Tabs.Screen name='user' />
        <Tabs.Screen
          name='dashbord'
          options={{
            headerShown: false,
          }}
        ></Tabs.Screen>
      </Tabs>
      <BottomNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    position: 'relative',
  },
  statusBarIOS: {
    width: '100%',
    backgroundColor: '#004637',
  },
  header: {
    height: 50,
    backgroundColor: '#004637',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerText: { color: 'white' },
});
