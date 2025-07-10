import { useAssetApi } from '@/services/api/asset';
import { useCacheService } from '@/services/cache/cacheService';
import { useDataService } from '@/services/data/dataService';

/**
 * Consolidated hook that provides access to all service operations
 * This is a convenience hook that combines asset API, cache service, and data service
 */
export const useServices = () => {
  const assetApi = useAssetApi();
  const cacheService = useCacheService();
  const dataService = useDataService();

  return {
    api: assetApi,
    cache: cacheService,
    data: dataService,
  };
};

export { useAssetApi, useCacheService, useDataService };
