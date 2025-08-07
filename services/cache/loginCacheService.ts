import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'app-cache',
  encryptionKey: 'THM-app-cache-key',
});

const CACHE_KEYS = {
  USER_NAME: 'user_name',
  USER_ID: 'user_id',
  USER_EMAIL: 'user_email',
  API_KEY: 'api_token',
  API_KEY_EXPIRATION: 'api_token_expiration',
} as const;

const clearLoginCache = (): void => {
  try {
    storage.clearAll();
    console.log('Login cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear login cache:', error);
    throw error;
  }
};

const setLoginCache = (user: Record<'name' | 'id' | 'email', string>): void => {
  try {
    storage.set(CACHE_KEYS.USER_NAME, user.name);
    storage.set(CACHE_KEYS.USER_ID, user.id);
    storage.set(CACHE_KEYS.USER_EMAIL, user.email);
  } catch (error) {
    console.error('Failed to set login cache:', error);
    throw error;
  }
};

const getLoginCache = (): {
  userName: string;
  userId: string;
  userEmail: string;
} => {
  try {
    const userName = storage.getString(CACHE_KEYS.USER_NAME) ?? '';
    const userId = storage.getString(CACHE_KEYS.USER_ID) ?? '';
    const userEmail = storage.getString(CACHE_KEYS.USER_EMAIL) ?? '';
    return {
      userName,
      userId,
      userEmail,
    };
  } catch (error) {
    console.error('Failed to get login cache:', error);
    return {
      userName: '',
      userId: '',
      userEmail: '',
    };
  }
};

const getApiKey = (): string | null => {
  try {
    const apiKeyExpiration =
      storage.getString(CACHE_KEYS.API_KEY_EXPIRATION) ?? '';
    if (apiKeyExpiration && new Date(apiKeyExpiration) < new Date()) {
      clearLoginCache();
      return null;
    }
    const apiKey = storage.getString(CACHE_KEYS.API_KEY) ?? '';
    return apiKey;
  } catch (error) {
    console.error('Failed to get API key:', error);
    return null;
  }
};

const setApiKey = (apiKey: string, apiKeyExpiration: string): void => {
  try {
    storage.set(CACHE_KEYS.API_KEY, apiKey);
    storage.set(CACHE_KEYS.API_KEY_EXPIRATION, apiKeyExpiration);
  } catch (error) {
    console.error('Failed to set API key:', error);
    throw error;
  }
};

export const loginCacheService = {
  clearLoginCache,
  setLoginCache,
  getLoginCache,
  getApiKey,
  setApiKey,
};
