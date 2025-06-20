import { HoseData } from '@/lib/types/hose';
import { getFromStore } from '@/lib/util/secureStore';

const BASE_URL =
  'https://30011-proxyapi-cuafeua6bha7ckby.norwayeast-01.azurewebsites.net';

export interface GetS1Response {
  s1Code: number;
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
        console.log('Using access token for API request');
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
      // hard coded s1 with hoses
      return { s1Code: 1203108 };

      // TODO: Uncomment when API s1 is available
      // const response = await this.request<GetS1Response>('/asset/getS1');
      // console.log('Raw S1 API response:', response);
      //
      // // Validate the response structure
      // if (typeof response !== 'object' || response === null) {
      //   throw new Error('Invalid S1 response: expected object');
      // }
      //
      // if (typeof response.s1Code !== 'number') {
      //   console.error('Invalid s1Code in response:', response);
      //   throw new Error(
      //     `Invalid s1Code: expected number, got ${typeof response.s1Code}`,
      //   );
      // }
      //
      // return response;
    } catch (error) {
      console.error('getS1 failed:', error);
      throw error;
    }
  }

  static async getAllHosesByUser(
    s1Code: number,
  ): Promise<GetAllHosesByUserResponse> {
    try {
      const endpoint = `/asset/getAllHosesByUser?s1Code=${s1Code}`;
      const fullUrl = `${BASE_URL}${endpoint}`;
      console.log('Making API call to:', fullUrl);

      const response = await this.request<GetAllHosesByUserResponse>(endpoint);

      return response;
    } catch (error) {
      console.error('getAllHosesByUser failed:', error);
      throw error;
    }
  }
}
