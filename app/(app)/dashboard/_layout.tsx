import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='hoses/[filter]/index' />
        <Stack.Screen name='hoses/index' />
        <Stack.Screen name='hoses/hose/[hoseId]' />
        <Stack.Screen name='hoses/register/' />
      </Stack>
    </>
  );
}
