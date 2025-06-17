import { useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '@/context/ContextProvider';
import { showDiscardChangesAlert } from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { usePreventRemove } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export const usePreventGoBack = () => {
  const { dispatch, state } = useAppContext();
  const preventionActiveRef = useRef(false);
  const isAlertShowingRef = useRef(false);

  const handleNavigationAttemptBlocked = useCallback(() => {
    isAlertShowingRef.current = false;
    showDiscardChangesAlert(dispatch);
  }, [dispatch]);

  const shouldPreventNavigation = state.data.isCancelable;

  useEffect(() => {
    if (shouldPreventNavigation !== preventionActiveRef.current) {
      preventionActiveRef.current = shouldPreventNavigation;
    }
  }, [shouldPreventNavigation]);

  usePreventRemove(shouldPreventNavigation, handleNavigationAttemptBlocked);

  useFocusEffect(
    useCallback(() => {
      isAlertShowingRef.current = false;
      dispatch({
        type: 'SET_IS_CANCELABLE',
        payload: true,
      });
    }, [dispatch]),
  );
};
