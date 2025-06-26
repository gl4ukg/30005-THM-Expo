import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const showDiscardChangesAlert = (
  dispatch: React.Dispatch<AppAction>,
) => {
  Alert.alert(
    'Discard changes?',
    'You have unsaved changes. Discard them and leave the screen?',
    [
      {
        text: "Don't leave",
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          dispatch({
            type: 'SET_IS_CANCELABLE',
            payload: false,
          });
          requestAnimationFrame(() => {
            // router.dismissAll();
            router.back();
          });
        },
      },
    ],
  );
};
