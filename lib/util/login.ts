import { loginCacheService } from '@/services/cache/loginCacheService';

const baseUrl: string | undefined = process.env.EXPO_PUBLIC_API_BASE_URL;
export const login = async (username: string, password: string) => {
  if (!baseUrl) {
    throw new Error('API_URL is not defined');
  }
  const { setApiKey } = loginCacheService;
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
      throw new Error('Invalid username or password');
    } else if (response.status === 404) {
      throw new Error('User not found');
    } else if (response.status === 200) {
      const cookie = response.headers.get('Set-Cookie');
      if (cookie) {
        const token = parseAuthCookie(cookie);
        if (!token) {
          throw new Error('Failed to parse authentication cookie');
        }
        const { accessToken, expiresDate } = token;
        setApiKey(accessToken, expiresDate);
        // get user data
        const user = await getUserData();
        return user;
      }
    } else {
      throw new Error('Login failed with status: ' + response.status);
    }
  } catch (error) {
    throw error;
  }
};

const parseAuthCookie = (
  cookieString: string,
): { accessToken: string; expiresDate: string } | null => {
  // 1. Extract access token
  const tokenMatch = cookieString.match(/accessToken=([^;]+)/);
  if (!tokenMatch) return null;
  // 2. Extract expiration date
  const expiresMatch = cookieString.match(/Expires=([^;]+)/);
  if (!expiresMatch) return null;
  // 3. Parse and format expiration date
  const expiresDate = new Date(expiresMatch[1]);
  if (isNaN(expiresDate.getTime())) return null;

  return {
    accessToken: tokenMatch[1],
    expiresDate: expiresDate.toISOString(),
  };
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: number;
  defaultAddressId: number;
  defaultWarehouseId: string;
  assortmentIds: number[];
  customerNumbers: string[];
  orgNumbers: string[];
};

const getUserData = async () => {
  const { getApiKey } = loginCacheService;
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('Api key not found');
    }
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accessToken: apiKey,
      },
    });

    if (response.status === 200) {
      const userData: User[] = await response.json();
      // console.log('userData', userData)
      return userData.length > 0 ? userData[0] : null;
    } else {
      throw new Error('Failed to get user data');
    }
  } catch (error) {
    throw new Error('Error getting user data:');
  }
};
