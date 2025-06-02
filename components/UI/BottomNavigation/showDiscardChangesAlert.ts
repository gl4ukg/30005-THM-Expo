import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { Alert } from 'react-native';

let isAlertShowing = false;

export const resetDiscardChangesAlert = () => {
  isAlertShowing = false;
};

export const showDiscardChangesAlert = (
  dispatch: React.Dispatch<AppAction>,
) => {
  if (isAlertShowing) {
    return;
  }

  isAlertShowing = true;

  Alert.alert(
    'Discard changes?',
    'You have unsaved changes. Discard them and leave the screen?',
    [
      {
        text: "Don't leave",
        style: 'cancel',
        onPress: () => {
          isAlertShowing = false;
        },
      },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          dispatch({
            type: 'SET_IS_CANCELABLE',
            payload: false,
          });
          dispatch({
            type: 'FINISH_SELECTION',
          });
          dispatch({
            type: 'CLEAR_TEMPORARY_CONTACT_FORM_DATA',
          });
          dispatch({
            type: 'CLEAR_TEMPORARY_SEND_MAIL_FORM_DATA',
          });
          dispatch({
            type: 'CLEAR_TEMPORARY_REPLACE_HOSE_FORM_DATA',
          });
          dispatch({
            type: 'SET_HOSE_TEMPLATE',
            payload: {},
          });

          setTimeout(() => {
            router.push('/(app)/dashboard');
            isAlertShowing = false;
          }, 100);
        },
      },
    ],
    {
      onDismiss: () => {
        isAlertShowing = false;
      },
    },
  );
};
