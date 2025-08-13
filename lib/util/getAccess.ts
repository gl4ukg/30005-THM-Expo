import { AppAction } from '@/context/Reducer';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';

export const handleGetAccess = (dispatch: React.Dispatch<AppAction>) => {
  Alert.alert(
    'Unlock More Features',
    'Your current access level only includes selected functions. To unlock this feature and explore the full potential of our platform, please get in touch with our team.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Contact TESS',
        onPress: () => {
          dispatch({ type: 'SET_IS_MENU_OPEN', payload: false });
          router.push('/(app)/dashboard/actions?action=CONTACT_SUPPORT');
        },
      },
    ],
  );
};

export const needsThisCodeToGetAccess = (
  accessCode: number,
  userAccessCode?: string,
): true | undefined => {
  return userAccessCode?.includes(`${accessCode}`) ? undefined : true;
};
