import { useAppContext } from '@/context/ContextProvider';
import { login as loginApi } from '@/lib/util/login';
import { getS1 } from '@/services/api/asset';
import { getCustomers } from '@/services/api/customer';
import { cache } from '@/services/cache/cacheService';
import { loginCache } from '@/services/cache/loginCacheService';

type LoginAction = { status: 'success' | 'error'; message: string };
export const useLoginManager = (): {
  login: (email: string, password: string) => Promise<LoginAction>;
  logout: () => void;
  isLoading: boolean;
} => {
  const { state, dispatch } = useAppContext();

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginAction> => {
    if (!state.settings.internetReachable) {
      const apiKey = loginCache.apiKey.get();
      if (apiKey) {
        //  loginCache.user.get() checks if it is not expired end logout if needed
        const {
          name: userName,
          id: userId,
          email: userEmail,
        } = loginCache.user.get();
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
      const user = await loginApi(email, password);
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
        dispatch({
          type: 'LOGIN',
          payload: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            id: `${user.userId}`,
            customerNumbers: user.customerNumbers,
            phoneNumber: user.phoneNumber ?? '',
          },
        });
        loginCache.user.set({
          name: `${user.firstName} ${user.lastName}`,
          id: `${user.userId}`,
          email: user.email,
          userAccessCode: '1',
          customerNumbers: user.customerNumbers,
          phoneNumber: user.phoneNumber ?? '',
        });
        const { selectedS1Code, s1Items } = await getS1();

        if (selectedS1Code && s1Items) {
          dispatch({
            type: 'SET_S1_CODE',
            payload: selectedS1Code,
          });
          dispatch({
            type: 'SET_S1_ITEMS',
            payload: s1Items as any, // TODO : We need to change S1Item type
          });
          cache.s1.code.set(selectedS1Code);
          cache.s1.items.set(s1Items as any); // TODO : We need to change S1Item type
        } else {
          dispatch({
            type: 'SET_S1_CODE',
            payload: null,
          });
          dispatch({
            type: 'SET_S1_ITEMS',
            payload: [],
          });
          cache.s1.code.set(null);
          cache.s1.items.set([]);
        }
        dispatch({
          type: 'SET_LOGIN_LOADING',
          payload: false,
        });
        const customers = await getCustomers();
        dispatch({
          type: 'SET_CUSTOMERS',
          payload: customers,
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
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    dispatch({
      type: 'SET_S1_CODE',
      payload: null,
    });
    dispatch({
      type: 'SET_S1_ITEMS',
      payload: [],
    });
    loginCache.user.logout();
    cache.clearCache();
  };

  return {
    login,
    logout,
    isLoading: state.auth.isLogingLoading,
  };
};
