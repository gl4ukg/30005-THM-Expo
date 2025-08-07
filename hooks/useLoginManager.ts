import { useAppContext } from '@/context/ContextProvider';
import { login } from '@/lib/util/login';
import { getS1 } from '@/services/api/asset';
import { setS1Code, setS1Items } from '@/services/cache/cacheService';
import { loginCacheService } from '@/services/cache/loginCacheService';
import { Alert } from 'react-native';

type LoginAction = { status: 'success' | 'error'; message: string };
export const useLoginManager = (): {
  login: (email: string, password: string) => Promise<LoginAction>;
  isLoading: boolean;
  clearLogin: () => void;
} => {
  const { state, dispatch } = useAppContext();

  const loginAction = async (
    email: string,
    password: string,
  ): Promise<LoginAction> => {
    if (!state.settings.connectionType) {
      const apiKey = loginCacheService.getApiKey();
      if (apiKey) {
        // getApiKey() check if it is not expired end logout if needed
        const { userName, userId, userEmail } =
          loginCacheService.getLoginCache();
        dispatch({
          type: 'LOGIN',
          payload: {
            email: userEmail,
            name: userName,
            id: userId,
          },
        });
        dispatch;
        return {
          status: 'success',
          message: 'No connection type found, using cached data',
        };
      }
    }
    dispatch({
      type: 'SET_LOGIN_LOADING',
      payload: true,
    });
    // /login -> 200 and cookie or 400 and error
    try {
      const user = await login(email, password);
      if (!user) {
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        return {
          status: 'error',
          message: 'Login failed, user not found',
        };
      } else {
        const { selectedS1Code, s1Items } = await getS1();
        if (selectedS1Code) {
          dispatch({
            type: 'SET_S1_CODE',
            payload: selectedS1Code,
          });
          dispatch({
            type: 'SET_S1_ITEMS',
            payload: s1Items,
          });
          setS1Code(selectedS1Code);
          setS1Items(s1Items);
        } else {
          dispatch({
            type: 'SET_S1_CODE',
            payload: '',
          });
          dispatch({
            type: 'SET_S1_ITEMS',
            payload: [],
          });
          setS1Code('');
          setS1Items([]);
        }
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        dispatch({
          type: 'LOGIN',
          payload: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            id: `${user.userId}`,
            customerNumbers: user.customerNumbers,
          },
        });
        loginCacheService.setLoginCache({
          name: `${user.firstName} ${user.lastName}`,
          id: `${user.userId}`,
          email: user.email,
        });
        return {
          status: 'success',
          message: 'Login successful',
        };
      }
    } catch (error) {
      const message = (error as Error).message;
      dispatch({
        type: 'SET_LOGIN_LOADING',
        payload: false,
      });
      return {
        status: 'error',
        message: message,
      };
    }
  };
  return {
    login: loginAction,
    isLoading: state.auth.isLogingLoading,
    clearLogin: () => dispatch({ type: 'LOGOUT' }),
  };
};
