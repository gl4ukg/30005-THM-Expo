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
    // Asset API operations
    api: assetApi,

    // Cache operations
    cache: cacheService,

    // Data service operations (high-level business logic)
    data: dataService,
  };
};

// Individual service hooks are also available for more granular usage:
// - useAssetApi() from '@/services/api/asset'
// - useCacheService() from '@/services/cache/cacheService'
// - useDataService() from '@/services/data/dataService'

export { useAssetApi, useCacheService, useDataService };
