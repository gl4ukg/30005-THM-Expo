import { HoseData } from '@/lib/types/hose';
import { getS1, getAllHosesByUser, S1Item } from '@/services/api/asset';
import {
  setS1Code,
  getS1Code,
  setS1Items,
  getS1Items,
  setHoses,
  getHoses,
  updateHose as cacheUpdateHose,
  addHose as cacheAddHose,
  isCacheStale,
  getCacheStats as getCacheStatsFromCache,
  clearCache,
} from '@/services/cache/cacheService';
import { useCallback, useMemo, useState } from 'react';

export const initializeUserData = async (): Promise<{
  s1Code: string;
  s1Items: S1Item[];
  hoses: HoseData[];
}> => {
  try {
    console.log('Initializing user data...');

    // Step 1: Get S1 code from API
    console.log('Fetching S1 code from API...');
    const s1Response = await getS1();
    console.log('S1 response received:', s1Response);

    const s1Code = s1Response.selectedS1Code;
    const s1Items = s1Response.s1Items;
    console.log('Extracted S1 code:', s1Code, 'Type:', typeof s1Code);
    console.log('S1 items count:', s1Items.length);

    // Step 2: Cache S1 code and items
    setS1Code(s1Code);
    setS1Items(s1Items);
    console.log('S1 code and items cached:', s1Code);

    // Step 3: Get hoses from API using S1 code
    console.log('Fetching hoses from API with S1 code:', s1Code);
    const hosesResponse = await getAllHosesByUser(s1Code);
    console.log('Full hoses response:', JSON.stringify(hosesResponse, null, 2));

    // Extract hoses from API response
    let hoses: HoseData[] = [];

    if (
      hosesResponse &&
      hosesResponse.hoses &&
      Array.isArray(hosesResponse.hoses)
    ) {
      hoses = hosesResponse.hoses;
    } else if (Array.isArray(hosesResponse)) {
      hoses = hosesResponse;
    } else {
      console.error(
        'Could not extract hoses array from response:',
        hosesResponse,
      );
      console.error('Response type:', typeof hosesResponse);
      console.error(
        'Available properties:',
        hosesResponse ? Object.keys(hosesResponse) : 'none',
      );
      throw new Error(
        `Invalid hoses response structure. Expected hoses array, got: ${JSON.stringify(hosesResponse)}`,
      );
    }

    console.log(`Extracted ${hoses.length} hoses from API response`);

    // Step 4: Cache hoses data
    setHoses(hoses);
    console.log(`${hoses.length} hoses cached successfully`);

    return {
      s1Code,
      s1Items,
      hoses,
    };
  } catch (error) {
    console.error('Failed to initialize user data:', error);

    // Fallback to cached data if available
    const cachedS1Code = getS1Code();
    const cachedS1Items = getS1Items();
    const cachedHoses = getHoses();

    if (cachedS1Code && cachedHoses.length > 0) {
      console.log('Using cached data as fallback');
      return {
        s1Code: cachedS1Code,
        s1Items: cachedS1Items,
        hoses: cachedHoses,
      };
    }

    throw error;
  }
};

export const getHosesData = async (
  forceRefresh: boolean = false,
): Promise<HoseData[]> => {
  try {
    // Check if we should use cache
    if (!forceRefresh && !isCacheStale()) {
      const cachedHoses = getHoses();
      if (cachedHoses.length > 0) {
        console.log('Returning cached hoses data');
        return cachedHoses;
      }
    }

    // Cache is stale or empty, fetch from API
    console.log('Cache is stale or empty, fetching fresh data...');
    const s1Code = getS1Code();

    if (!s1Code) {
      throw new Error('S1 code not found in cache. Please login again.');
    }

    const hosesResponse = await getAllHosesByUser(s1Code);

    let hoses: HoseData[] = [];

    if (
      hosesResponse &&
      hosesResponse.hoses &&
      Array.isArray(hosesResponse.hoses)
    ) {
      hoses = hosesResponse.hoses;
    } else if (Array.isArray(hosesResponse)) {
      hoses = hosesResponse;
    } else {
      console.warn('Unexpected hoses response format:', hosesResponse);
      hoses = [];
    }

    setHoses(hoses);
    console.log('Fresh hoses data cached');

    return hoses;
  } catch (error) {
    console.error('Failed to get hoses data:', error);

    // Fallback to cached data
    const cachedHoses = getHoses();
    if (cachedHoses.length > 0) {
      console.log('Using cached hoses as fallback');
      return cachedHoses;
    }

    throw error;
  }
};

export const refreshHoses = async (): Promise<HoseData[]> => {
  return getHosesData(true);
};

export const updateHose = async (updatedHose: HoseData): Promise<HoseData> => {
  try {
    // TODO: Send update to API when endpoint is available
    // await updateHoseAPI(updatedHose);

    // Update in cache
    cacheUpdateHose(updatedHose);
    console.log('Hose updated:', updatedHose.assetId);

    return updatedHose;
  } catch (error) {
    console.error('Failed to update hose:', error);
    throw error;
  }
};

export const addHose = async (newHose: HoseData): Promise<HoseData> => {
  try {
    // TODO: Send to API when endpoint is available
    // const apiResponse = await createHoseAPI(newHose);

    // Add to cache
    cacheAddHose(newHose);
    console.log('New hose added:', newHose.assetId);

    return newHose;
  } catch (error) {
    console.error('Failed to add hose:', error);
    throw error;
  }
};

// Get cached data summary
export const getCacheStats = () => {
  return getCacheStatsFromCache();
};

// Clear all cached data
export const clearAllData = (): void => {
  clearCache();
  console.log('All cached data cleared');
};

export const syncWithAPI = async (): Promise<boolean> => {
  try {
    const hoses = await refreshHoses();
    console.log(`Sync completed: ${hoses.length} hoses updated`);
    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
};

export const changeS1Selection = async (
  newS1Code: string,
): Promise<HoseData[]> => {
  try {
    console.log('Changing S1 selection to:', newS1Code);

    setS1Code(newS1Code);

    const hosesResponse = await getAllHosesByUser(newS1Code);

    let hoses: HoseData[] = [];

    if (
      hosesResponse &&
      hosesResponse.hoses &&
      Array.isArray(hosesResponse.hoses)
    ) {
      hoses = hosesResponse.hoses;
    } else if (Array.isArray(hosesResponse)) {
      hoses = hosesResponse;
    } else {
      console.warn('Unexpected hoses response format:', hosesResponse);
      hoses = [];
    }

    setHoses(hoses);
    console.log(`S1 changed to ${newS1Code}, ${hoses.length} hoses loaded`);

    return hoses;
  } catch (error) {
    console.error('Failed to change S1 selection:', error);
    throw error;
  }
};

export const getS1ItemsData = (): S1Item[] => {
  return getS1Items();
};

export const getCurrentS1Code = (): string | null => {
  return getS1Code();
};

// Custom hook for data service operations
export const useDataService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await initializeUserData();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHoses = useCallback(async (forceRefresh: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHosesData(forceRefresh);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateHoseData = useCallback(async (updatedHose: HoseData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateHose(updatedHose);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewHose = useCallback(async (newHose: HoseData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addHose(newHose);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changeS1 = useCallback(async (newS1Code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await changeS1Selection(newS1Code);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sync = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await syncWithAPI();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const dataOperations = useMemo(
    () => ({
      initializeData,
      getHoses,
      updateHoseData,
      addNewHose,
      changeS1,
      sync,
      refreshHoses: () => getHoses(true),
      getCacheStats,
      clearAllData,
      getS1ItemsData,
      getCurrentS1Code,
    }),
    [initializeData, getHoses, updateHoseData, addNewHose, changeS1, sync],
  );

  return {
    ...dataOperations,
    loading,
    error,
  };
};
