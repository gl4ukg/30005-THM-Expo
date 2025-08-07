import { useAppContext } from '@/context/ContextProvider';
import { getAllHosesByS1 } from '@/services/api/asset';
import {
  clearHoses,
  getHoses,
  getS1Code,
  setHoses,
} from '@/services/cache/cacheService';
import { loginCacheService } from '@/services/cache/loginCacheService';

type DataAction = { status: 'success' | 'error'; message?: string };
export const useDataManager = (): {
  isLoading: boolean;
  getHoseData: () => Promise<DataAction>;
  removeHoseData: () => Promise<DataAction>;
} => {
  const { state, dispatch } = useAppContext();
  const apiKey = loginCacheService.getApiKey();

  const getHoseData = async (): Promise<DataAction> => {
    if (!state.settings.internetReachable) {
      // check if mmkv storage is available
      dispatch({
        type: 'SET_LAST_UPDATE',
        payload: 'error',
      });
      const hoses = getHoses();
      if (hoses.length > 0) {
        return {
          status: 'error',
          message:
            'No internet connection, but cached data found. Founded hoses: ' +
            hoses.length,
        };
      }
      return {
        status: 'error',
        message: 'No internet connection',
      };
    }
    dispatch({
      type: 'SET_DATA_LOADING',
      payload: true,
    });
    if (!state.auth.user && !apiKey) {
      dispatch({
        type: 'SET_LAST_UPDATE',
        payload: 'error',
      });
      return {
        status: 'error',
        message: 'Login failed, user not found',
      };
    }
    try {
      const S1Code = state.data.s1Code ?? getS1Code();
      if (!S1Code) {
        dispatch({
          type: 'SET_LAST_UPDATE',
          payload: 'error',
        });
        return {
          status: 'error',
          message: 'S1 code not found',
        };
      } else {
        const S1Hoses = await getAllHosesByS1(S1Code);
        if (!S1Hoses?.length) {
          dispatch({
            type: 'SET_LAST_UPDATE',
            payload: 'error',
          });
          dispatch({
            type: 'SET_HOSE_DATA',
            payload: [],
          });
          return {
            status: 'error',
            message: 'No hoses found',
          };
        }
        dispatch({
          type: 'SET_HOSE_DATA',
          payload: S1Hoses,
        });
        setHoses(S1Hoses);
        dispatch({
          type: 'SET_LAST_UPDATE',
          payload: 'synced',
        });
      }

      return {
        status: 'success',
      };
    } catch (error) {
      dispatch({
        type: 'SET_DATA_LOADING',
        payload: false,
      });
      dispatch({
        type: 'SET_LAST_UPDATE',
        payload: 'error',
      });
      return {
        status: 'error',
        message: 'Failed to sync data',
      };
    }
  };
  const removeHoseData = async (): Promise<DataAction> => {
    try {
      dispatch({
        type: 'SET_HOSE_DATA',
        payload: [],
      });
      clearHoses();
      return {
        status: 'success',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to remove hoses',
      };
    }
  };
  return {
    isLoading: state.data.isLoading,
    getHoseData,
    removeHoseData,
  };
};
