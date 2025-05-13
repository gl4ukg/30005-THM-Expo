import { router } from 'expo-router';
import { Alert } from 'react-native';

export const showDiscardChagesAlert = () => {
  Alert.alert(
    'Discard changes?',
    'You have unsaved changes. Discard them and leave the screen?',
    [
      { text: "Don't leave", style: 'cancel', onPress: () => {} },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          router.dismissAll();
          return router.push('/(app)/dashboard');
        },
      },
    ],
  );
};
