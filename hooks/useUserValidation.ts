import { useAppContext } from '@/context/ContextProvider';
import { validateUserData } from '@/lib/util/validation';
import { useMemo } from 'react';

export const useUserValidation = () => {
  const { state } = useAppContext();

  const validation = useMemo(() => {
    return validateUserData(state.auth.user);
  }, [state.auth.user]);

  return {
    hasErrors: validation.errors.length > 0,
  };
};
