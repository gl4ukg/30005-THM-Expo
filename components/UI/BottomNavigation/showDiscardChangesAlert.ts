import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const showDiscardChangesAlert = (
  dispatch: React.Dispatch<AppAction>,
  hasTemporaryData: boolean = true,
  isAlertShowingRef?: React.MutableRefObject<boolean>,
) => {
  if (isAlertShowingRef?.current) {
    return;
  }

  if (isAlertShowingRef) {
    isAlertShowingRef.current = true;
  }

  const title = hasTemporaryData ? 'Discard changes?' : 'Leave screen?';
  const message = hasTemporaryData
    ? 'You have unsaved changes. Discard them and leave the screen?'
    : 'Are you sure you want to leave this screen?';

  const resetFlag = () => {
    if (isAlertShowingRef) {
      isAlertShowingRef.current = false;
    }
  };

  Alert.alert(
    title,
    message,
    [
      {
        text: "Don't leave",
        style: 'cancel',
        onPress: resetFlag,
      },
      {
        text: hasTemporaryData ? 'Discard' : 'Discard',
        style: 'destructive',
        onPress: () => {
          resetFlag();

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
