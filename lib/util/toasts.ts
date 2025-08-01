import { Toast } from 'toastify-react-native';
import { colors } from '../tokens/colors';

export const successToast = (title: string, message: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    iconColor: colors.black,
    iconSize: 24,
    theme: 'light',
  });
};

export const infoToast = (title: string, message: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    iconColor: colors.black,
    iconSize: 24,
    theme: 'light',
  });
};

export const errorToast = (title: string, message: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    iconColor: colors.error,
    iconSize: 24,
    theme: 'light',
  });
};

export const warnToast = (title: string, message: string) => {
  Toast.show({
    type: 'warn',
    text1: title,
    text2: message,
    backgroundColor: colors.dashboardYellow,
    position: 'top',
    autoHide: true,
    iconColor: colors.dashboardYellowText,
    iconSize: 24,
    theme: 'light',
  });
};
