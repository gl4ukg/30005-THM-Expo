import { HoseData } from '@/lib/types/hose';
import { AssetApi, S1Item } from '@/services/api/asset';
import { CacheService } from '@/services/cache/cacheService';

export class DataService {
  static async initializeUserData(): Promise<{
    s1Code: string;
    s1Items: S1Item[];
    hoses: HoseData[];
  }> {
    try {
      console.log('Initializing user data...');

      // Step 1: Get S1 code from API
      console.log('Fetching S1 code from API...');
      const s1Response = await AssetApi.getS1();
      console.log('S1 response received:', s1Response);

      const s1Code = s1Response.selectedS1Code;
      const s1Items = s1Response.s1Items;
      console.log('Extracted S1 code:', s1Code, 'Type:', typeof s1Code);
      console.log('S1 items count:', s1Items.length);

      // Step 2: Cache S1 code and items
      CacheService.setS1Code(s1Code);
      CacheService.setS1Items(s1Items);
      console.log('S1 code and items cached:', s1Code);

      // Step 3: Get hoses from API using S1 code
      console.log('Fetching hoses from API with S1 code:', s1Code);
      const hosesResponse = await AssetApi.getAllHosesByUser(s1Code);
      console.log(
        'Full hoses response:',
        JSON.stringify(hosesResponse, null, 2),
      );

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
      CacheService.setHoses(hoses);
      console.log(`${hoses.length} hoses cached successfully`);

      return {
        s1Code,
        s1Items,
        hoses,
      };
    } catch (error) {
      console.error('Failed to initialize user data:', error);

      // Fallback to cached data if available
      const cachedS1Code = CacheService.getS1Code();
      const cachedS1Items = CacheService.getS1Items();
      const cachedHoses = CacheService.getHoses();

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
        hoses = []; // Default to empty array
      }

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

  static async changeS1Selection(newS1Code: string): Promise<HoseData[]> {
    try {
      console.log('Changing S1 selection to:', newS1Code);

      CacheService.setS1Code(newS1Code);

      const hosesResponse = await AssetApi.getAllHosesByUser(newS1Code);

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

      CacheService.setHoses(hoses);
      console.log(`S1 changed to ${newS1Code}, ${hoses.length} hoses loaded`);

      return hoses;
    } catch (error) {
      console.error('Failed to change S1 selection:', error);
      throw error;
    }
  }

  static getS1Items(): S1Item[] {
    return CacheService.getS1Items();
  }

  static getCurrentS1Code(): string | null {
    return CacheService.getS1Code();
  }
}
