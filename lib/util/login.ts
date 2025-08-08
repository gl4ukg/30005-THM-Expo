import { AuthState } from '@/context/state';
import {
  deleteFromStore,
  getFromStore,
  saveInStore,
} from '@/lib/util/secureStore';

export const login = async (username: string, password: string) => {
  const url: string | undefined = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!url) {
    throw new Error('API_URL is not defined');
  }
  try {
    const response = await fetch(`${url}/login`, {
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
      let userData: AuthState['user'] = null;
      if (cookie) {
        // cookie 'accessToken=abc.def.ghi; Path=/; HttpOnly; Secure; SameSite=None'
        await saveCookie(cookie);
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
const saveCookie = async (cookie: string) => {
  try {
    await saveInStore('cookie', cookie);
  } catch (error) {
    console.error('Error saving cookie:', error);
  }
};

const getCookie = async () => {
  try {
    const cookie = await getFromStore('cookie');
    return cookie;
  } catch (error) {
    console.error('Error getting cookie:', error);
  }
};

const removeCookie = async () => {
  try {
    await deleteFromStore('cookie');
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
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
  try {
    const cookie = await getCookie();
    console.log('cookie', cookie);
    if (!cookie) {
      throw new Error('Cookie not found');
    }
    const accessToken = cookie.split(';')[0].split('=')[1];
    console.log('accessToken', accessToken);
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accessToken: accessToken,
        },
      },
    );

    if (response.status === 200) {
      const userData: User[] = await response.json();
      console.log('userData', userData);
      return userData.length > 0 ? userData[0] : null;
    } else {
      throw new Error('Failed to get user data');
    }
  } catch (error) {
    throw new Error('Error getting user data:');
  }
};
