import { ActivityDone, ActivityDraft } from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';
import { MMKV } from 'react-native-mmkv';

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

const setS1Code = (s1Code: string): void => {
  try {
    storage.set(CACHE_KEYS.S1_CODE, s1Code);
  } catch (error) {
    console.error('Failed to cache S1 code:', error);
    throw error;
  }
};

const getS1Code = (): string | null => {
  try {
    const s1Code = storage.getString(CACHE_KEYS.S1_CODE);
    return s1Code ?? null;
  } catch (error) {
    console.error('Failed to get S1 code from cache:', error);
    return null;
  }
};

const setS1Items = (s1Items: S1Item[]): void => {
  try {
    const s1ItemsJson = JSON.stringify(s1Items);
    storage.set(CACHE_KEYS.S1_ITEMS, s1ItemsJson);
  } catch (error) {
    console.error('Failed to cache S1 items:', error);
    throw error;
  }
};

const getS1Items = (): S1Item[] => {
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

const setHoses = (hoses: HoseData[]): void => {
  try {
    const hosesJson = JSON.stringify(hoses);
    storage.set(CACHE_KEYS.HOSES, hosesJson);
    storage.set(CACHE_KEYS.LAST_SYNC, Date.now());
  } catch (error) {
    console.error('Failed to cache hoses data:', error);
    throw error;
  }
};

const getHoses = (): HoseData[] => {
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

const getLastSyncTime = (): Date | null => {
  try {
    const timestamp = storage.getNumber(CACHE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error('Failed to get last sync time:', error);
    return null;
  }
};
const setSyncTime = () => {
  try {
    storage.set(CACHE_KEYS.LAST_SYNC, Date.now());
  } catch (error) {
    console.error('Failed to set last sync time:', error);
    throw error;
  }
};

const setDoneActivities = (activitiesDone: ActivityDone[]): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DONE, JSON.stringify(activitiesDone));
  } catch (error) {
    console.error('Failed to cache activities done:', error);
    throw error;
  }
};

const getDoneActivities = (): ActivityDone[] => {
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

const getEditedHoses = (): Partial<HoseData>[] => {
  try {
    const editedHosesJson = storage.getString(CACHE_KEYS.EDITED_HOSES);
    if (!editedHosesJson) {
      return [];
    }
    return JSON.parse(editedHosesJson) as Partial<HoseData>[];
  } catch (error) {
    console.error('Failed to get edited hoses from cache:', error);
    return [];
  }
};
const setEditedHoses = (editedHoses: Partial<HoseData>[]): void => {
  try {
    storage.set(CACHE_KEYS.EDITED_HOSES, JSON.stringify(editedHoses));
  } catch (error) {
    console.error('Failed to cache edited hoses:', error);
    throw error;
  }
};
const addEditedHose = (editedHose: Partial<HoseData>): void => {
  try {
    const editedHoses = getEditedHoses();
    editedHoses.push(editedHose);
    setEditedHoses(editedHoses);
    console.log('New edited hose added to cache:', editedHose.assetId);
  } catch (error) {
    console.error('Failed to add edited hose to cache:', error);
    throw error;
  }
};

const setDoneActivityAsSynced = (activityDone: ActivityDone): void => {
  try {
    const activitiesDone = getDoneActivities();
    const index = activitiesDone.findIndex(
      (doneActivity) => doneActivity.id === activityDone.id,
    );
    if (index !== -1) {
      activitiesDone[index] = { ...activityDone, syncingTimestamp: Date.now() };
      console.log('Activity done updated in cache:', activityDone.id);
    } else {
      console.warn(
        'Activity done not found in cache for update:',
        activityDone.id,
      );
    }
  } catch (error) {
    console.error('Failed to update activity done in cache:', error);
    throw error;
  }
};

const setDraftActivities = (activitiesDraft: ActivityDraft[]): void => {
  try {
    storage.set(CACHE_KEYS.ACTIVITIES_DRAFTS, JSON.stringify(activitiesDraft));
  } catch (error) {
    console.error('Failed to cache activities draft:', error);
    throw error;
  }
};

const getDraftActivities = (): ActivityDraft[] => {
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

const deleteDraftActivity = (activityId: ActivityDraft['id']): void => {
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

const moveDraftToDone = (activityId: ActivityDraft['id']): void => {
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

const saveDraftActivity = (activityDraft: ActivityDraft): void => {
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
const addHoseToDraft = (
  assetId: HoseData['assetId'],
  draftId: ActivityDraft['id'],
): void => {
  try {
    const activitiesDraft = getDraftActivities();
    const activityDraft = activitiesDraft.find(
      (activity) => activity.id === draftId,
    );
    if (activityDraft) {
      activityDraft.selectedIds.push(assetId);
      setDraftActivities(activitiesDraft);
    }
  } catch (error) {
    console.error('Failed to add hose to draft activity:', error);
    throw error;
  }
};

const isCacheStale = (maxAgeMinutes: number = 1440): boolean => {
  const lastSync = getLastSyncTime();
  if (!lastSync) return true;

  const now = new Date();
  const ageMinutes = (now.getTime() - lastSync.getTime()) / (1000 * 60);
  return ageMinutes > maxAgeMinutes;
};

const clearCache = (): void => {
  try {
    storage.clearAll();
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear cache:', error);
    throw error;
  }
};

export const cache = {
  s1: {
    code: {
      get: getS1Code,
      set: setS1Code,
    },
    items: {
      get: getS1Items,
      set: setS1Items,
    },
  },
  hoses: {
    get: getHoses,
    set: setHoses,
    getSyncTime: getLastSyncTime,
    setSyncTime: setSyncTime,
  },
  editedHoses: {
    get: getEditedHoses,
    set: setEditedHoses,
    add: addEditedHose,
  },
  activities: {
    draft: {
      get: getDraftActivities,
      set: setDraftActivities,
      delete: deleteDraftActivity,
      moveToDone: moveDraftToDone,
      save: saveDraftActivity,
      addHose: addHoseToDraft,
    },
    done: {
      get: getDoneActivities,
      set: setDoneActivities,
      setAsSynced: setDoneActivityAsSynced,
    },
  },
  clearCache,
};
