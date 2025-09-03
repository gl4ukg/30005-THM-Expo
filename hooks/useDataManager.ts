import { useAppContext } from '@/context/ContextProvider';
import { ActivityDone, ActivityDraft } from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { mapAPIHoseToHoseData } from '@/lib/util/hoseMapper';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { getS1Hoses } from '@/services/api/asset';
import { cache } from '@/services/cache/cacheService';
import { loginCache } from '@/services/cache/loginCacheService';
import NetInfo from '@react-native-community/netinfo';

type DataAction = { status: 'success' | 'error'; message?: string };
export const useDataManager = (): {
  hoses: {
    get: () => Promise<DataAction>;
    remove: () => Promise<DataAction>;
    save: (hose: Partial<HoseData>) => Promise<DataAction>;
    isLoading: boolean;
  };
  activities: {
    done: {
      set: (activitiesToSet: ActivityDone[]) => void;
      clear: () => void;
      setAsSynced: (activityDone: ActivityDone, timestamp: number) => void;
      getFromCache: () => void;
    };
    draft: {
      get: () => ActivityDraft[];
      add: (activityDraft: Omit<ActivityDraft, 'id'>) => number;
      save: (activityDraft: ActivityDraft) => void;
      addHose: (hoseId: number, draftId: number) => void;
      remove: (id: number) => void;
      moveToDone: (id: number) => void;
    };
  };
} => {
  const { state, dispatch } = useAppContext();

  const getHoseData = async (): Promise<DataAction> => {
    if (!state.settings.internetReachable) {
      NetInfo.fetch().then((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (state.isInternetReachable) {
          dispatch({
            type: 'SET_INTERNET_REACHABLE',
            payload: true,
          });
        } else {
          dispatch({
            type: 'SET_INTERNET_REACHABLE',
            payload: false,
          });
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
      });
    }
    dispatch({
      type: 'SET_DATA_LOADING',
      payload: true,
    });

    const apiKey = loginCache.apiKey.get();
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
        const S1Hoses = await getS1Hoses(S1Code);
        if (!S1Hoses) {
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
        const reformattedHoses = S1Hoses.map((hose) => {
          return mapAPIHoseToHoseData(hose);
        });

        dispatch({
          type: 'SET_HOSE_DATA',
          payload: reformattedHoses,
        });
        cache.hoses.set(reformattedHoses);
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
      console.error('Failed to sync data', error);
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

  // Activities
  const setDoneActivities = (activitiesToSet: ActivityDone[]) => {
    cache.activities.done.set(activitiesToSet);
    dispatch({
      type: 'SET_ACTIVITIES_DONE',
      payload: activitiesToSet,
    });
  };
  const moveDraftActivityToDone = (id: number) => {
    cache.activities.draft.moveToDone(id);
    dispatch({
      type: 'MOVE_DRAFT_TO_DONE',
      payload: id,
    });
  };

  const syncDoneActivitiesFromCacheToState = () => {
    dispatch({
      type: 'SET_ACTIVITIES_DONE',
      payload: cache.activities.done.get(),
    });
  };
  const setDoneActivityAsSynced = (
    activityDone: ActivityDone,
    timestamp: number,
  ) => {
    cache.activities.done.setAsSynced({
      ...activityDone,
      syncingTimestamp: timestamp,
    });
    dispatch({
      type: 'ACTIVITY_DONE_TIMESTAMP',
      payload: { id: activityDone.id, timestamp },
    });
  };

  const getDraftActivities = () => cache.activities.draft.get();
  const removeDraftActivity = (id: number) => {
    cache.activities.draft.delete(id);
    dispatch({
      type: 'REMOVE_DRAFT',
      payload: id,
    });
  };
  const clearAllDoneActivities = () => {
    cache.activities.done.set([]);
    dispatch({
      type: 'SET_ACTIVITIES_DONE',
      payload: [],
    });
  };
  const createDraft = (activityDraft: Omit<ActivityDraft, 'id'>) => {
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
  };
  const saveDraft = (activityDraft: ActivityDraft) => {
    cache.activities.draft.save(activityDraft);
    dispatch({
      type: 'SAVE_DRAFT',
      payload: activityDraft,
    });
  };
  const addHoseToDraft = (hoseId: number, draftId: number) => {
    cache.activities.draft.addHose(hoseId, draftId);
    dispatch({
      type: 'ADD_HOSE_TO_DRAFT',
      payload: {
        hoseId,
        draftId,
      },
    });
  };
  return {
    hoses: {
      get: getHoseData,
      remove: removeHoseData,
      save: editHose,
      isLoading: state.data.isLoading,
    },
    activities: {
      done: {
        set: setDoneActivities,
        clear: clearAllDoneActivities,
        setAsSynced: setDoneActivityAsSynced,
        getFromCache: syncDoneActivitiesFromCacheToState,
      },
      draft: {
        get: getDraftActivities,
        add: createDraft,
        save: saveDraft,
        addHose: addHoseToDraft,
        remove: removeDraftActivity,
        moveToDone: moveDraftActivityToDone,
      },
    },
  };
};
