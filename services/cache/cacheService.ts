import { MMKV } from 'react-native-mmkv';
import { HoseData } from '@/lib/types/hose';

/**
 * Cache Layer - Handles local storage using MMKV
 * This acts as the "database" until further syncs with the API
 */
export class CacheService {
  private static storage = new MMKV({
    id: 'app-cache',
    encryptionKey: 'THM-app-cache-key',
  });

  private static readonly KEYS = {
    S1_CODE: 'user_s1_code',
    HOSES: 'hoses_data',
    LAST_SYNC: 'last_sync_timestamp',
    USER_DATA: 'user_data',
  } as const;

  // Store s1 in cache
  static setS1Code(s1Code: number): void {
    try {
      this.storage.set(this.KEYS.S1_CODE, s1Code);
      console.log('S1 code cached successfully:', s1Code);
    } catch (error) {
      console.error('Failed to cache S1 code:', error);
      throw error;
    }
  }

  // Get s1 from cache
  static getS1Code(): number | null {
    try {
      const s1Code = this.storage.getNumber(this.KEYS.S1_CODE);
      return s1Code ?? null;
    } catch (error) {
      console.error('Failed to get S1 code from cache:', error);
      return null;
    }
  }

  // store hoses in caches
  static setHoses(hoses: HoseData[]): void {
    try {
      const hosesJson = JSON.stringify(hoses);
      this.storage.set(this.KEYS.HOSES, hosesJson);
      this.storage.set(this.KEYS.LAST_SYNC, Date.now());
      console.log(`${hoses.length} hoses cached successfully`);
    } catch (error) {
      console.error('Failed to cache hoses data:', error);
      throw error;
    }
  }

  // get hoses from cache
  static getHoses(): HoseData[] {
    try {
      const hosesJson = this.storage.getString(this.KEYS.HOSES);
      if (!hosesJson) {
        return [];
      }
      return JSON.parse(hosesJson) as HoseData[];
    } catch (error) {
      console.error('Failed to get hoses from cache:', error);
      return [];
    }
  }

  // Update hose data in cache
  static updateHose(updatedHose: HoseData): void {
    try {
      const hoses = this.getHoses();
      const index = hoses.findIndex(
        (hose) => hose.assetId === updatedHose.assetId,
      );

      if (index !== -1) {
        hoses[index] = updatedHose;
        this.setHoses(hoses);
        console.log('Hose updated in cache:', updatedHose.assetId);
      } else {
        console.warn(
          'Hose not found in cache for update:',
          updatedHose.assetId,
        );
      }
    } catch (error) {
      console.error('Failed to update hose in cache:', error);
      throw error;
    }
  }

  // Add a new hose to cache
  static addHose(newHose: HoseData): void {
    try {
      const hoses = this.getHoses();
      hoses.push(newHose);
      this.setHoses(hoses);
      console.log('New hose added to cache:', newHose.assetId);
    } catch (error) {
      console.error('Failed to add hose to cache:', error);
      throw error;
    }
  }

  // Remove a hose from cache
  static removeHose(assetId: number): void {
    try {
      const hoses = this.getHoses();
      const filteredHoses = hoses.filter((hose) => hose.assetId !== assetId);
      this.setHoses(filteredHoses);
      console.log('Hose removed from cache:', assetId);
    } catch (error) {
      console.error('Failed to remove hose from cache:', error);
      throw error;
    }
  }

  // Store last sync time
  static getLastSyncTime(): Date | null {
    try {
      const timestamp = this.storage.getNumber(this.KEYS.LAST_SYNC);
      return timestamp ? new Date(timestamp) : null;
    } catch (error) {
      console.error('Failed to get last sync time:', error);
      return null;
    }
  }

  // Check if cache is stale based on last sync time
  static isCacheStale(maxAgeMinutes: number = 30): boolean {
    const lastSync = this.getLastSyncTime();
    if (!lastSync) return true;

    const now = new Date();
    const ageMinutes = (now.getTime() - lastSync.getTime()) / (1000 * 60);
    return ageMinutes > maxAgeMinutes;
  }

  // Clear all cache data
  static clearCache(): void {
    try {
      this.storage.clearAll();
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Failed to clear cache:', error);
      throw error;
    }
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): {
    s1Code: number | null;
    hosesCount: number;
    lastSync: Date | null;
    cacheSize: string;
  } {
    const s1Code = this.getS1Code();
    const hoses = this.getHoses();
    const lastSync = this.getLastSyncTime();

    return {
      s1Code,
      hosesCount: hoses.length,
      lastSync,
      cacheSize: 'N/A', // MMKV doesn't provide direct size info
    };
  }
}
