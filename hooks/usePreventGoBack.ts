import { useEffect } from 'react';
import { useAppContext } from '@/context/ContextProvider';
import {
  showDiscardChangesAlert,
  resetDiscardChangesAlert,
} from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { usePreventRemove } from '@react-navigation/native';

export const usePreventGoBack = () => {
  const { dispatch, state } = useAppContext();

  const handleNavigationAttemptBlocked = () => {
    showDiscardChangesAlert(dispatch);
  };

  usePreventRemove(state.data.isCancelable, handleNavigationAttemptBlocked);

  useEffect(() => {
    resetDiscardChangesAlert();

    dispatch({
      type: 'SET_IS_CANCELABLE',
      payload: true,
    });
  }, [dispatch]);
};
