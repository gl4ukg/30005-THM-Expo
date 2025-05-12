import { router } from 'expo-router';
import { Alert } from 'react-native';

export const ShowBackConfirmationDialog = () => {
  Alert.alert(
    'Confirm go Back',
    'Are you sure you want to go back? Any unsaved changes might be lost.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => router.push('/(app)/dashboard'),
      },
    ],
  );
};
