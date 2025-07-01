import { HoseData } from '@/lib/types/hose';
import { getFromStore } from '@/lib/util/secureStore';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://30011-proxyapi-cuafeua6bha7ckby.norwayeast-01.azurewebsites.net';

export interface S1Item {
  S1Id: number;
  S1Code: string;
  S1Name: string;
  S2Id: number;
  S2Code: string;
  S2Name: string | null;
  dimensionId: number;
  dimensionType: string;
}

export interface GetS1Response {
  s1Items: S1Item[];
  selectedS1Code: string;
}

export interface GetAllHosesByUserResponse {
  hoses: HoseData[];
  total: number;
}

// API Layer - Handles all HTTP requests to the backend
export class AssetApi {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    // Get authentication token from stored cookie
    let authHeaders = {};
    try {
      const cookie = await getFromStore('cookie');
      if (cookie) {
        const accessToken = cookie.split(';')[0].split('=')[1];
        authHeaders = {
          accessToken: accessToken,
        };
      } else {
        console.warn('No authentication cookie found');
      }
    } catch (error) {
      console.error('Failed to get authentication token:', error);
    }

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...authHeaders,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      console.log('Making API request to:', url);
      console.log('Request headers:', config.headers);

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  static async getS1(): Promise<GetS1Response> {
    try {
      const response = await this.request<S1Item[]>('/asset/getS1');

      if (!Array.isArray(response) || response.length === 0) {
        throw new Error('No S1 items found in response');
      }

      // Use the first S1 item's code as the selected one
      const selectedS1Code = response[0].S1Code;

      console.log('Retrieved S1 items:', response.length);
      console.log('Selected S1 Code:', selectedS1Code);

      return {
        s1Items: response,
        selectedS1Code: selectedS1Code,
      };
    } catch (error) {
      console.error('getS1 failed:', error);
      throw error;
    }
  }

  static async getAllHosesByUser(
    s1Code: string,
  ): Promise<GetAllHosesByUserResponse> {
    try {
      const endpoint = `/asset/getAllHosesByUser?s1Code=${s1Code}`;
      console.log('Making API call to:', `${BASE_URL}${endpoint}`);

      const response = await this.request<GetAllHosesByUserResponse>(endpoint);
      return response;
    } catch (error) {
      console.error('getAllHosesByUser failed:', error);
      throw error;
    }
  }

  // Convenience method to get S1 data and automatically fetch hoses for the first S1 item
  static async getS1AndHoses(): Promise<{
    s1Data: GetS1Response;
    hosesData: GetAllHosesByUserResponse;
  }> {
    try {
      console.log('Getting S1 data and hoses...');

      // First get S1 data
      const s1Data = await this.getS1();

      // Then get hoses using the first S1 code
      const hosesData = await this.getAllHosesByUser(s1Data.selectedS1Code);

      console.log('Successfully retrieved S1 data and hoses');
      return { s1Data, hosesData };
    } catch (error) {
      console.error('getS1AndHoses failed:', error);
      throw error;
    }
  }
}
