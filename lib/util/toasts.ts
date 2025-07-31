import { Toast } from 'toastify-react-native';

export const saveAsDraftToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Saved as draft',
    position: 'top',
    visibilityTime: 5000,
    autoHide: true,
    iconColor: '#4CAF50',
    iconSize: 24,
    theme: 'light',
    closeIcon: 'times-circle',
    closeIconFamily: 'FontAwesome',
    closeIconSize: 20,
    closeIconColor: '#fff',
  });
};

export const resumeDraftToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Draft resumed',
    position: 'top',
    visibilityTime: 5000,
    autoHide: true,
    iconColor: '#2196F3',
    iconSize: 24,
    theme: 'light',
    closeIcon: 'times-circle',
    closeIconFamily: 'FontAwesome',
    closeIconSize: 20,
    closeIconColor: '#fff',
  });
};
