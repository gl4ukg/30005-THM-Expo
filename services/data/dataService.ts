import { HoseData } from '@/lib/types/hose';
import { AssetApi } from '@/services/api/assetApi';
import { CacheService } from '@/services/cache/cacheService';

export class DataService {
  static async initializeUserData(): Promise<{
    s1Code: number;
    hoses: HoseData[];
  }> {
    try {
      console.log('Initializing user data...');

      // Step 1: Get S1 code from API
      console.log('Fetching S1 code from API...');
      const s1Response = await AssetApi.getS1();
      console.log('S1 response received:', s1Response);

      const s1Code = s1Response.s1Code;
      console.log('Extracted S1 code:', s1Code, 'Type:', typeof s1Code);

      // Step 2: Cache S1 code
      CacheService.setS1Code(s1Code);
      console.log('S1 code cached:', s1Code);

      // Step 3: Get hoses from API using S1 code
      console.log('Fetching hoses from API with S1 code:', s1Code);
      const hosesResponse = await AssetApi.getAllHosesByUser(s1Code);
      console.log(
        'Full hoses response:',
        JSON.stringify(hosesResponse, null, 2),
      );

      // Try to extract hoses from different possible response structures
      let hoses: HoseData[] = [];
      const response = hosesResponse as any;

      if (Array.isArray(response)) {
        hoses = response;
      } else {
        console.error('Could not extract hoses array from response:', response);
        console.error('Response type:', typeof response);
        console.error(
          'Available properties:',
          response ? Object.keys(response) : 'none',
        );
        throw new Error(
          `Invalid hoses response structure. Expected array of hoses, got: ${JSON.stringify(response)}`,
        );
      }

      console.log(`Extracted ${hoses.length} hoses from API response`);

      // Step 4: Cache hoses data
      CacheService.setHoses(hoses);
      console.log(`${hoses.length} hoses cached successfully`);

      return {
        s1Code,
        hoses,
      };
    } catch (error) {
      console.error('Failed to initialize user data:', error);

      // Fallback to cached data if available
      const cachedS1Code = CacheService.getS1Code();
      const cachedHoses = CacheService.getHoses();

      if (cachedS1Code && cachedHoses.length > 0) {
        console.log('Using cached data as fallback');
        return {
          s1Code: cachedS1Code,
          hoses: cachedHoses,
        };
      }

      throw error;
    }
  }

  /**
   * Get hoses data with cache-first strategy
   */
  static async getHoses(forceRefresh: boolean = false): Promise<HoseData[]> {
    try {
      // Check if we should use cache
      if (!forceRefresh && !CacheService.isCacheStale()) {
        const cachedHoses = CacheService.getHoses();
        if (cachedHoses.length > 0) {
          console.log('Returning cached hoses data');
          return cachedHoses;
        }
      }

      // Cache is stale or empty, fetch from API
      console.log('Cache is stale or empty, fetching fresh data...');
      const s1Code = CacheService.getS1Code();

      if (!s1Code) {
        throw new Error('S1 code not found in cache. Please login again.');
      }

      const hosesResponse = await AssetApi.getAllHosesByUser(s1Code);
      const hoses = hosesResponse.hoses;

      // Update cache
      CacheService.setHoses(hoses);
      console.log('Fresh hoses data cached');

      return hoses;
    } catch (error) {
      console.error('Failed to get hoses data:', error);

      // Fallback to cached data
      const cachedHoses = CacheService.getHoses();
      if (cachedHoses.length > 0) {
        console.log('Using cached hoses as fallback');
        return cachedHoses;
      }

      throw error;
    }
  }

  static async refreshHoses(): Promise<HoseData[]> {
    return this.getHoses(true);
  }

  static async updateHose(updatedHose: HoseData): Promise<HoseData> {
    try {
      // TODO: Send update to API when endpoint is available
      // await AssetApi.updateHose(updatedHose);

      // Update in cache
      CacheService.updateHose(updatedHose);
      console.log('Hose updated:', updatedHose.assetId);

      return updatedHose;
    } catch (error) {
      console.error('Failed to update hose:', error);
      throw error;
    }
  }

  static async addHose(newHose: HoseData): Promise<HoseData> {
    try {
      // TODO: Send to API when endpoint is available
      // const apiResponse = await AssetApi.createHose(newHose);

      // Add to cache
      CacheService.addHose(newHose);
      console.log('New hose added:', newHose.assetId);

      return newHose;
    } catch (error) {
      console.error('Failed to add hose:', error);
      throw error;
    }
  }

  static async removeHose(assetId: number): Promise<void> {
    try {
      // TODO: Send delete to API when endpoint is available
      // await AssetApi.deleteHose(assetId);

      // Remove from cache
      CacheService.removeHose(assetId);
      console.log('Hose removed:', assetId);
    } catch (error) {
      console.error('Failed to remove hose:', error);
      throw error;
    }
  }

  // Get cached data summary
  static getCacheStats() {
    return CacheService.getCacheStats();
  }

  // Clear all cached data
  static clearAllData(): void {
    CacheService.clearCache();
    console.log('All cached data cleared');
  }

  static async syncWithAPI(): Promise<boolean> {
    try {
      const hoses = await this.refreshHoses();
      console.log(`Sync completed: ${hoses.length} hoses updated`);
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  }
}
