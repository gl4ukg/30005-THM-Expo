import { useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '@/context/ContextProvider';
import {
  showDiscardChangesAlert,
  resetDiscardChangesAlert,
} from '@/components/UI/BottomNavigation/showDiscardChangesAlert';
import { usePreventRemove } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export const usePreventGoBack = () => {
  const { dispatch, state } = useAppContext();
  const preventionActiveRef = useRef(false);

  const hasTemporaryData = !!(
    state.data.temporaryContactFormData ||
    state.data.temporarySendMailFormData ||
    state.data.temporaryReplaceHoseFormData
  );

  const handleNavigationAttemptBlocked = useCallback(() => {
    resetDiscardChangesAlert();
    showDiscardChangesAlert(dispatch, hasTemporaryData);
  }, [dispatch, hasTemporaryData]);

  const shouldPreventNavigation = state.data.isCancelable;

  useEffect(() => {
    if (shouldPreventNavigation !== preventionActiveRef.current) {
      preventionActiveRef.current = shouldPreventNavigation;
    }
  }, [shouldPreventNavigation]);

  usePreventRemove(shouldPreventNavigation, handleNavigationAttemptBlocked);

  useFocusEffect(
    useCallback(() => {
      resetDiscardChangesAlert();
      dispatch({
        type: 'SET_IS_CANCELABLE',
        payload: true,
      });
    }, [dispatch]),
  );
};
