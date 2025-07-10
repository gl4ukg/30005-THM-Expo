import { MMKV } from 'react-native-mmkv';
import { HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';
import { useMemo } from 'react';

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
  USER_DATA: 'user_data',
} as const;

export const setS1Code = (s1Code: string): void => {
  try {
    storage.set(CACHE_KEYS.S1_CODE, s1Code);
    console.log('S1 code cached successfully:', s1Code);
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
    console.log(`${hoses.length} hoses cached successfully`);
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

export const updateHose = (updatedHose: HoseData): void => {
  try {
    const hoses = getHoses();
    const index = hoses.findIndex(
      (hose) => hose.assetId === updatedHose.assetId,
    );

    if (index !== -1) {
      hoses[index] = updatedHose;
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

export const removeHose = (assetId: number): void => {
  try {
    const hoses = getHoses();
    const filteredHoses = hoses.filter((hose) => hose.assetId !== assetId);
    setHoses(filteredHoses);
    console.log('Hose removed from cache:', assetId);
  } catch (error) {
    console.error('Failed to remove hose from cache:', error);
    throw error;
  }
};

// Sync time operations
export const getLastSyncTime = (): Date | null => {
  try {
    const timestamp = storage.getNumber(CACHE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error('Failed to get last sync time:', error);
    return null;
  }
};

export const isCacheStale = (maxAgeMinutes: number = 1440): boolean => {
  const lastSync = getLastSyncTime();
  if (!lastSync) return true;

  const now = new Date();
  const ageMinutes = (now.getTime() - lastSync.getTime()) / (1000 * 60);
  return ageMinutes > maxAgeMinutes;
};

// Cache management
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

// Custom hook for cache operations
export const useCacheService = () => {
  const cacheOperations = useMemo(
    () => ({
      setS1Code: (s1Code: string) => setS1Code(s1Code),
      getS1Code: () => getS1Code(),
      setS1Items: (s1Items: S1Item[]) => setS1Items(s1Items),
      getS1Items: () => getS1Items(),

      setHoses: (hoses: HoseData[]) => setHoses(hoses),
      getHoses: () => getHoses(),
      updateHose: (updatedHose: HoseData) => updateHose(updatedHose),
      addHose: (newHose: HoseData) => addHose(newHose),
      removeHose: (assetId: number) => removeHose(assetId),

      getLastSyncTime: () => getLastSyncTime(),
      isCacheStale: (maxAgeMinutes?: number) => isCacheStale(maxAgeMinutes),
      clearCache: () => clearCache(),
      getCacheStats: () => getCacheStats(),
    }),
    [],
  );

  return cacheOperations;
};
