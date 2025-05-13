import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useAppContext } from '@/context/ContextProvider';
import { DiscardChangesDialog } from '@/components/UI/BottomNavigation/DiscardChangesAlert';
import {
  useNavigation,
  NavigationProp,
  usePreventRemove,
} from '@react-navigation/native';

export const usePreventGoBack = () => {
  const { dispatch, state } = useAppContext();
  const navigation = useNavigation();  if (Platform.OS === 'ios') {
    usePreventRemove(state.data.isCancelable, () => {
      DiscardChangesDialog();
      dispatch({
        type: 'SET_IS_CANCELABLE',
        payload: false,
      });
    });
  }
  useEffect(() => {
    dispatch({
      type: 'SET_IS_CANCELABLE',
      payload: true,
    });

    const onHardwareBackPress = () => {
      DiscardChangesDialog();
      return true;
    };

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onHardwareBackPress,
        );
      };
    }
  }, [dispatch, navigation]);
};
