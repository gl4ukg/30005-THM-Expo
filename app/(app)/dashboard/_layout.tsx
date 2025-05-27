import { colors } from '@/lib/tokens/colors';
import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='hoses/[filter]/index' />
        <Stack.Screen name='hoses/index' />
        <Stack.Screen name='hoses/hose/[hoseId]' />
        <Stack.Screen name='hoses/register/index' />
      </Stack>
    </>
  );
}
