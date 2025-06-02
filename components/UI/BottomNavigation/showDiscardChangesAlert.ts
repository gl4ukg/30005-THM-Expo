import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { Alert } from 'react-native';

let isAlertShowing = false;

export const resetDiscardChangesAlert = () => {
  isAlertShowing = false;
};

export const showDiscardChangesAlert = (
  dispatch: React.Dispatch<AppAction>,
  hasTemporaryData: boolean = true,
) => {
  if (isAlertShowing) {
    return;
  }

  isAlertShowing = true;

  const title = hasTemporaryData ? 'Discard changes?' : 'Leave screen?';
  const message = hasTemporaryData
    ? 'You have unsaved changes. Discard them and leave the screen?'
    : 'Are you sure you want to leave this screen?';

  Alert.alert(
    title,
    message,
    [
      {
        text: "Don't leave",
        style: 'cancel',
        onPress: () => {
          // Reset the flag immediately when user cancels
          isAlertShowing = false;
        },
      },
      {
        text: hasTemporaryData ? 'Discard' : 'Discard changes',
        style: 'destructive',
        onPress: () => {
          isAlertShowing = false;

          dispatch({
            type: 'SET_IS_CANCELABLE',
            payload: false,
          });
          dispatch({
            type: 'FINISH_SELECTION',
          });
          dispatch({
            type: 'CLEAR_ALL_TEMPORARY_DATA',
          });
          dispatch({
            type: 'SET_HOSE_TEMPLATE',
            payload: {},
          });

          // Navigate after a short delay to ensure state updates are processed
          setTimeout(() => {
            router.push('/(app)/dashboard');
          }, 100);
        },
      },
    ],
    {
      onDismiss: () => {
        console.log('Alert dismissed, resetting flag');
        isAlertShowing = false;
      },
    },
  );
};
