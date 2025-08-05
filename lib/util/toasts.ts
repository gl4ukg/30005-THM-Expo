import React from 'react';
import { Toast } from 'toastify-react-native';
import { colors } from '../tokens/colors';
import CheckCircle from '@/components/Icon/icons/CheckCircle';
import InfoCircle from '@/components/Icon/icons/InfoCircle';

export const successToast = (title: string, message: string) => {
  const checkCircleIcon = React.createElement(CheckCircle, {
    size: 24,
    color: colors.black,
  });

  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    theme: 'light',
    icon: checkCircleIcon,
    useModal: false,
  });
};
export const infoToast = (title: string, message: string) => {
  const infoIcon = React.createElement(InfoCircle, {
    size: 24,
    color: colors.black,
  });
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    theme: 'light',
    icon: infoIcon,
    useModal: false,
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
