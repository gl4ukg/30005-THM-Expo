import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const showDiscardChangesAlert = (
  dispatch: React.Dispatch<AppAction>,
  isAlertShowingRef?: React.MutableRefObject<boolean>,
) => {
  if (isAlertShowingRef?.current) {
    return;
  }

  if (isAlertShowingRef) {
    isAlertShowingRef.current = true;
  }

  const resetFlag = () => {
    if (isAlertShowingRef) {
      isAlertShowingRef.current = false;
    }
  };

  Alert.alert(
    'Discard changes',
    'You have unsaved changes. Discard them and leave the screen?',
    [
      {
        text: "Don't leave",
        style: 'cancel',
        onPress: resetFlag,
      },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          resetFlag();

          dispatch({
            type: 'SET_IS_CANCELABLE',
            payload: false,
          });
          dispatch({
            type: 'FINISH_SELECTION_AND_RESET',
            payload: {},
          });

          setTimeout(() => {
            router.push('/(app)/dashboard');
          }, 100);
        },
      },
    ],
    {
      onDismiss: () => {
        console.log('Alert dismissed, resetting flag');
        resetFlag();
      },
    },
  );
};
