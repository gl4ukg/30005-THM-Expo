import { useAppContext } from '@/context/ContextProvider';
import { login } from '@/lib/util/login';
import { getS1 } from '@/services/api/asset';
import { cache } from '@/services/cache/cacheService';
import { loginCacheService } from '@/services/cache/loginCacheService';

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
    if (!state.settings.internetReachable) {
      const apiKey = loginCacheService.getApiKey();
      if (apiKey) {
        // getApiKey() check if it is not expired end logout if needed
        const { name: userName, id: userId, email: userEmail } =
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
      console.log('Logging in...');
      const user = await login(email, password);
      console.log('User logged in:', user);
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
          cache.s1.code.set(selectedS1Code);
          cache.s1.items.set(s1Items);
        } else {
          dispatch({
            type: 'SET_S1_CODE',
            payload: '',
          });
          dispatch({
            type: 'SET_S1_ITEMS',
            payload: [],
          });
          cache.s1.code.set('');
          cache.s1.items.set([]);
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
          phoneNumber: `${user.phoneNumber}`,
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
