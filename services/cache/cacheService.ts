import { MMKV } from 'react-native-mmkv';
import { HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';
import { useMemo } from 'react';
import { ActivityDone, ActivityDraft } from '@/context/state';

/**
 * Cache Layer - Handles local storage using MMKV
 * This acts as the "database" until further syncs with the API
 */
const storage = new MMKV({
  id: 'app-cache',
  encryptionKey: 'THM-app-cache-key',
});

const CACHE_KEYS = {
  S1_CODE: 'user_s1_code',
  S1_ITEMS: 'user_s1_items',
  HOSES: 'hoses_data',
  LAST_SYNC: 'last_sync_timestamp',
  ACTIVITIES_DONE: 'activities_done',
  ACTIVITIES_DRAFTS: 'activities_drafts',
  EDITED_HOSES: 'edited_hoses',
} as const;

export const setS1Code = (s1Code: string): void => {
  try {
    storage.set(CACHE_KEYS.S1_CODE, s1Code);
  } catch (error) {
    console.error('Failed to cache S1 code:', error);
    throw error;
  }
};

export const getS1Code = (): string | null => {
  try {
    const s1Code = storage.getString(CACHE_KEYS.S1_CODE);
    return s1Code ?? null;
  } catch (error) {
    console.error('Failed to get S1 code from cache:', error);
    return null;
  }
};

export const setS1Items = (s1Items: S1Item[]): void => {
  try {
    const s1ItemsJson = JSON.stringify(s1Items);
    storage.set(CACHE_KEYS.S1_ITEMS, s1ItemsJson);
    console.log(`${s1Items.length} S1 items cached successfully`);
  } catch (error) {
    console.error('Failed to cache S1 items:', error);
    throw error;
  }
};

export const getS1Items = (): S1Item[] => {
  try {
    const s1ItemsJson = storage.getString(CACHE_KEYS.S1_ITEMS);
    if (s1ItemsJson) {
      return JSON.parse(s1ItemsJson);
    }
    return [];
  } catch (error) {
    console.error('Failed to get S1 items from cache:', error);
    return [];
  }
};

export const setHoses = (hoses: HoseData[]): void => {
  try {
    const hosesJson = JSON.stringify(hoses);
    storage.set(CACHE_KEYS.HOSES, hosesJson);
    storage.set(CACHE_KEYS.LAST_SYNC, Date.now());
  } catch (error) {
    console.error('Failed to cache hoses data:', error);
    throw error;
  }
};

export const getHoses = (): HoseData[] => {
  try {
    const hosesJson = storage.getString(CACHE_KEYS.HOSES);
    if (!hosesJson) {
      return [];
    }
    return JSON.parse(hosesJson) as HoseData[];
  } catch (error) {
    console.error('Failed to get hoses from cache:', error);
    return [];
  }
};

export const updateHose = (updatedHose: Partial<HoseData>): void => {
  try {
    const hoses = getHoses();
    const index = hoses.findIndex(
      (hose) => hose.assetId === updatedHose.assetId,
    );

    const editedHosesJson = storage.getString(CACHE_KEYS.EDITED_HOSES);
    let editedHoses: Partial<HoseData>[] = [];
    if (editedHosesJson) {
      editedHoses = JSON.parse(editedHosesJson);
    }
    editedHoses.push(updatedHose);
    storage.set(CACHE_KEYS.EDITED_HOSES, JSON.stringify(editedHoses));

    if (index !== -1) {
      hoses[index] = updatedHose as HoseData;
      setHoses(hoses);
      console.log('Hose updated in cache:', updatedHose.assetId);
    } else {
      console.warn('Hose not found in cache for update:', updatedHose.assetId);
    }
  } catch (error) {
    console.error('Failed to update hose in cache:', error);
    throw error;
  }
};

export const clearHoses = (): void => {
  try {
    storage.set(CACHE_KEYS.HOSES, JSON.stringify([]));
  } catch (error) {
    console.error('Failed to remove hose from cache:', error);
    throw error;
  }
};

export const addHose = (newHose: HoseData): void => {
  try {
    const hoses = getHoses();
    hoses.push(newHose);
    setHoses(hoses);
    console.log('New hose added to cache:', newHose.assetId);
  } catch (error) {
    console.error('Failed to add hose to cache:', error);
    throw error;
  }
};

export const getLastSyncTime = (): Date | null => {
  try {
    const timestamp = storage.getNumber(CACHE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error('Failed to get last sync time:', error);
    return null;
  }
};

export const setDoneActivities = (activitiesDone: ActivityDone[]): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DONE, JSON.stringify(activitiesDone));
  } catch (error) {
    console.error('Failed to cache activities done:', error);
    throw error;
  }
};

export const getDoneActivities = (): ActivityDone[] => {
  try {
    const activitiesDoneJson = storage.getString(CACHE_KEYS.ACTIVITIES_DONE);
    if (!activitiesDoneJson) {
      return [];
    }
    return JSON.parse(activitiesDoneJson) as ActivityDone[];
  } catch (error) {
    console.error('Failed to get activities done from cache:', error);
    return [];
  }
};
export const updateDoneActivity = (updatedActivityDone: ActivityDone): void => {
  try {
    const activitiesDone = getDoneActivities();
    const index = activitiesDone.findIndex(
      (activityDone) => activityDone.id === updatedActivityDone.id,
    );

    if (index !== -1) {
      activitiesDone[index] = updatedActivityDone;
      setDoneActivities(activitiesDone);
      console.log('Activity done updated in cache:', updatedActivityDone.id);
    } else {
      console.warn(
        'Activity done not found in cache for update:',
        updatedActivityDone.id,
      );
    }
  } catch (error) {
    console.error('Failed to update activity done in cache:', error);
    throw error;
  }
};

export const clearDoneActivities = (): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DONE, '[]');
  } catch (error) {
    console.error('Failed to clear activities done:', error);
    throw error;
  }
};

export const setDraftActivities = (activitiesDraft: ActivityDraft[]): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DRAFTS, JSON.stringify(activitiesDraft));
  } catch (error) {
    console.error('Failed to cache activities draft:', error);
    throw error;
  }
};

export const getDraftActivities = (): ActivityDraft[] => {
  try {
    const activitiesDraftJson = storage.getString(CACHE_KEYS.ACTIVITIES_DRAFTS);
    if (!activitiesDraftJson) {
      return [];
    }
    return JSON.parse(activitiesDraftJson) as ActivityDraft[];
  } catch (error) {
    console.error('Failed to get activities draft from cache:', error);
    return [];
  }
};

export const updateDraftActivity = (
  updatedActivityDraft: ActivityDraft,
): void => {
  try {
    const activitiesDraft = getDraftActivities();
    const index = activitiesDraft.findIndex(
      (activityDraft) => activityDraft.id === updatedActivityDraft.id,
    );

    if (index !== -1) {
      activitiesDraft[index] = updatedActivityDraft;
      setDraftActivities(activitiesDraft);
      console.log('Activity draft updated in cache:', updatedActivityDraft.id);
    } else {
      console.warn(
        'Activity draft not found in cache for update:',
        updatedActivityDraft.id,
      );
    }
  } catch (error) {
    console.error('Failed to update activity draft in cache:', error);
    throw error;
  }
};
export const addHoseToDraft = (hoseId: number, draftId: number): void => {
  try {
    const activitiesDraft = getDraftActivities();
    const updatedActivitiesDraft = activitiesDraft.map((activityDraft) => {
      if (activityDraft.id === draftId) {
        return {
          ...activityDraft,
          modifiedAt: new Date().toISOString(),
          selectedIds: [...activityDraft.selectedIds, hoseId],
        };
      }
      return activityDraft;
    });
    setDraftActivities(updatedActivitiesDraft);
    console.log('Hose added to activity draft in cache:', draftId);
  } catch (error) {
    console.error('Failed to add hose to activity draft in cache:', error);
    throw error;
  }
};

export const deleteDraftActivity = (activityId: number): void => {
  try {
    const activitiesDraft = getDraftActivities();
    const updatedActivitiesDraft = activitiesDraft.filter(
      (activityDraft) => activityDraft.id !== activityId,
    );
    setDraftActivities(updatedActivitiesDraft);
    console.log('Activity draft deleted from cache:', activityId);
  } catch (error) {
    console.error('Failed to delete activity draft from cache:', error);
    throw error;
  }
};

export const moveDraftToDone = (activityId: number): void => {
  try {
    const activitiesDraft = getDraftActivities();
    const updatedActivitiesDraft = activitiesDraft.filter(
      (activityDraft) => activityDraft.id !== activityId,
    );
    setDraftActivities(updatedActivitiesDraft);
    const activitiesDone = getDoneActivities();
    const activityDone = activitiesDraft.find(
      (activityDraft) => activityDraft.id === activityId,
    );
    if (activityDone) {
      activitiesDone.push({ ...activityDone, status: 'done' });
      setDoneActivities(activitiesDone);
    }
    console.log('Activity draft moved to done:', activityId);
  } catch (error) {
    console.error('Failed to move activity draft to done:', error);
    throw error;
  }
};

export const clearDraftActivities = (): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DRAFTS, '[]');
  } catch (error) {
    console.error('Failed to clear activities draft:', error);
    throw error;
  }
};

export const saveDraftActivity = (activityDraft: ActivityDraft): void => {
  try {
    const activitiesDraft = getDraftActivities();
    if (activitiesDraft.find((activity) => activity.id === activityDraft.id)) {
      setDraftActivities(
        activitiesDraft.map((activity) => {
          if (activity.id === activityDraft.id) {
            return activityDraft;
          }
          return activity;
        }),
      );
    } else {
      activitiesDraft.push(activityDraft);
      setDraftActivities(activitiesDraft);
      console.log('New activity draft added to cache:', activityDraft.id);
    }
  } catch (error) {
    console.error('Failed to add activity draft to cache:', error);
    throw error;
  }
};

export const isCacheStale = (maxAgeMinutes: number = 1440): boolean => {
  const lastSync = getLastSyncTime();
  if (!lastSync) return true;

  const now = new Date();
  const ageMinutes = (now.getTime() - lastSync.getTime()) / (1000 * 60);
  return ageMinutes > maxAgeMinutes;
};

export const clearCache = (): void => {
  try {
    storage.clearAll();
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear cache:', error);
    throw error;
  }
};

export const getCacheStats = (): {
  s1Code: string | null;
  s1ItemsCount: number;
  hosesCount: number;
  lastSync: Date | null;
  cacheSize: string;
} => {
  const s1Code = getS1Code();
  const s1Items = getS1Items();
  const hoses = getHoses();
  const lastSync = getLastSyncTime();

  return {
    s1Code,
    s1ItemsCount: s1Items.length,
    hosesCount: hoses.length,
    lastSync,
    cacheSize: 'N/A', // MMKV doesn't provide direct size info
  };
};

export const activities = {
  done: {
    getAll: getDoneActivities,
    setAll: setDoneActivities,
    updateOne: updateDoneActivity,
    clearAll: clearDoneActivities,
  },
  draft: {
    getAll: getDraftActivities,
    setAll: setDraftActivities,
    addOne: saveDraftActivity,
    addHoseToDraft,
    updateOne: updateDraftActivity,
    clearAll: clearDraftActivities,
    moveToDone: moveDraftToDone,
    removeOne: deleteDraftActivity,
  },
};

export const useCacheService = () => {
  const cacheOperations = useMemo(
    () => ({
      setS1Code: (s1Code: string) => setS1Code(s1Code),
      getS1Code: () => getS1Code(),
      setS1Items: (s1Items: S1Item[]) => setS1Items(s1Items),
      getS1Items: () => getS1Items(),

      setHoses: (hoses: HoseData[]) => setHoses(hoses),
      getHoses: () => getHoses(),
      clearHoses,
      updateHose: (updatedHose: HoseData) => updateHose(updatedHose),
      addHose: (newHose: HoseData) => addHose(newHose),

      activities,

      getLastSyncTime: () => getLastSyncTime(),
      isCacheStale: (maxAgeMinutes?: number) => isCacheStale(maxAgeMinutes),
      clearCache: () => clearCache(),
      getCacheStats: () => getCacheStats(),
    }),
    [],
  );

  return cacheOperations;
};
