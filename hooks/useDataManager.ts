import { useAppContext } from '@/context/ContextProvider';
import { ActivityDone, ActivityDraft } from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { getAllHosesByS1 } from '@/services/api/asset';
import { cache } from '@/services/cache/cacheService';
import { loginCacheService } from '@/services/cache/loginCacheService';

type DataAction = { status: 'success' | 'error'; message?: string };
export const useDataManager = (): {
  isLoading: boolean;
  getHoseData: () => Promise<DataAction>;
  removeHoseData: () => Promise<DataAction>;
  editHose: (hose: Partial<HoseData>) => Promise<DataAction>;
  activitiesData: typeof activitiesData;
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
      const hoses = cache.hoses.get();
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
      const S1Code = state.data.s1Code ?? cache.s1.code.get();
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
        cache.hoses.set(S1Hoses);
        dispatch({
          type: 'SET_DATA_LOADING',
          payload: false,
        });
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
      cache.hoses.set([]);
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
  const editHose = async (hose: Partial<HoseData>): Promise<DataAction> => {
    try {
      // find hose and update it in cache add hose to array of hose changes
      cache.editedHoses.add(hose);
      // update hose in context
      dispatch({
        type: 'SAVE_HOSE_DATA',
        payload: {
          hoseData: hose,
          hoseId: hose.assetId!,
        },
      });
      return {
        status: 'success',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to update hose',
      };
    }
  };
  const activitiesData = {
    syncStoreToContext: () => {
      dispatch({
        type: 'SET_ACTIVITIES_DONE',
        payload: cache.activities.done.get(),
      });
    },
    setAllDone: (activitiesToSet: ActivityDone[]) => {
      cache.activities.done.set(activitiesToSet);
      dispatch({
        type: 'SET_ACTIVITIES_DONE',
        payload: activitiesToSet,
      });
    },
    updateDoneTimestamp: (activityDone: ActivityDone, timestamp: number) => {
      cache.activities.done.setAsSynced({
        ...activityDone,
        syncingTimestamp: timestamp,
      });
      dispatch({
        type: 'ACTIVITY_DONE_TIMESTAMP',
        payload: { id: activityDone.id, timestamp },
      });
    },
    createDraft: (activityDraft: Omit<ActivityDraft, 'id'>) => {
      const newId = generateNumericDraftId(state.data.drafts.map((d) => d.id));
      cache.activities.draft.save({
        ...activityDraft,
        id: newId,
      } as ActivityDraft);
      dispatch({
        type: 'CREATE_DRAFT',
        payload: { ...activityDraft, id: newId },
      });
      return newId;
    },
    saveDraft: (activityDraft: ActivityDraft) => {
      cache.activities.draft.save(activityDraft);
      dispatch({
        type: 'SAVE_DRAFT',
        payload: activityDraft,
      });
    },
    addHoseToDraft: (hoseId: number, draftId: number) => {
      cache.activities.draft.addHose(hoseId, draftId);
      dispatch({
        type: 'ADD_HOSE_TO_DRAFT',
        payload: {
          hoseId,
          draftId,
        },
      });
    },
    removeDraft: (id: number) => {
      cache.activities.draft.delete(id);
      dispatch({
        type: 'REMOVE_DRAFT',
        payload: id,
      });
    },
    moveDraftToDone: (id: number) => {
      cache.activities.draft.moveToDone(id);
      dispatch({
        type: 'MOVE_DRAFT_TO_DONE',
        payload: id,
      });
    },
    clearAllDone: () => {
      cache.activities.done.set([]);
      dispatch({
        type: 'SET_ACTIVITIES_DONE',
        payload: [],
      });
    },
  };
  return {
    isLoading: state.data.isLoading,
    getHoseData,
    removeHoseData,
    editHose,
    activitiesData,
  };
};
