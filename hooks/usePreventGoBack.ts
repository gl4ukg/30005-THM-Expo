import { useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '@/context/ContextProvider';
import { showDiscardChangesAlert } from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { usePreventRemove } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export const usePreventGoBack = (preventGoBack: boolean = true) => {
  const { dispatch, state } = useAppContext();
  const preventionActiveRef = useRef(false);
  const isAlertShowingRef = useRef(false);

  const handleNavigationAttemptBlocked = useCallback(() => {
    isAlertShowingRef.current = false;
    showDiscardChangesAlert(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (state.data.isCancelable !== preventionActiveRef.current) {
      preventionActiveRef.current = state.data.isCancelable;
    }
  }, [state.data.isCancelable]);

  usePreventRemove(state.data.isCancelable, handleNavigationAttemptBlocked);

  useFocusEffect(
    useCallback(() => {
      isAlertShowingRef.current = false;

      if (preventGoBack) {
        dispatch({
          type: 'SET_IS_CANCELABLE',
          payload: true,
        });

        return () => {
          dispatch({
            type: 'SET_IS_CANCELABLE',
            payload: false,
          });
        };
      }
    }, [dispatch, preventGoBack]),
  );
};
