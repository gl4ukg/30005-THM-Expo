import { MMKV } from 'react-native-mmkv';
import { HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';

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
    S1_ITEMS: 'user_s1_items',
    HOSES: 'hoses_data',
    LAST_SYNC: 'last_sync_timestamp',
    USER_DATA: 'user_data',
  } as const;

  // Store s1 in cache
  static setS1Code(s1Code: string): void {
    try {
      this.storage.set(this.KEYS.S1_CODE, s1Code);
      console.log('S1 code cached successfully:', s1Code);
    } catch (error) {
      console.error('Failed to cache S1 code:', error);
      throw error;
    }
  }

  // Get s1 from cache
  static getS1Code(): string | null {
    try {
      const s1Code = this.storage.getString(this.KEYS.S1_CODE);
      return s1Code ?? null;
    } catch (error) {
      console.error('Failed to get S1 code from cache:', error);
      return null;
    }
  }

  static setS1Items(s1Items: S1Item[]): void {
    try {
      const s1ItemsJson = JSON.stringify(s1Items);
      this.storage.set(this.KEYS.S1_ITEMS, s1ItemsJson);
      console.log(`${s1Items.length} S1 items cached successfully`);
    } catch (error) {
      console.error('Failed to cache S1 items:', error);
      throw error;
    }
  }

  static getS1Items(): S1Item[] {
    try {
      const s1ItemsJson = this.storage.getString(this.KEYS.S1_ITEMS);
      if (s1ItemsJson) {
        return JSON.parse(s1ItemsJson);
      }
      return [];
    } catch (error) {
      console.error('Failed to get S1 items from cache:', error);
      return [];
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
  // default 1 day
  static isCacheStale(maxAgeMinutes: number = 1440): boolean {
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

  static getCacheStats(): {
    s1Code: string | null;
    s1ItemsCount: number;
    hosesCount: number;
    lastSync: Date | null;
    cacheSize: string;
  } {
    const s1Code = this.getS1Code();
    const s1Items = this.getS1Items();
    const hoses = this.getHoses();
    const lastSync = this.getLastSyncTime();

    return {
      s1Code,
      s1ItemsCount: s1Items.length,
      hosesCount: hoses.length,
      lastSync,
      cacheSize: 'N/A', // MMKV doesn't provide direct size info
    };
  }
}
