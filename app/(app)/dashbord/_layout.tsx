import { Stack } from 'expo-router';

export default function DashbordLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: true }} />
        <Stack.Screen
          name='hoses/[filter]/index'
          options={{ headerShown: true }}
        />
        <Stack.Screen name='hoses/index' options={{ headerShown: true }} />
        <Stack.Screen
          name='hoses/hose/[slug]'
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
