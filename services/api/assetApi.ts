import { HoseData } from '@/lib/types/hose';
import { getFromStore } from '@/lib/util/secureStore';
import { transformHoseDataForAPI } from './util';

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
      console.log('Request method:', config.method);
      console.log('Request body:', config.body);

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

  private static async apiCall<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    options: RequestInit = {},
  ): Promise<T> {
    const methodName = `${method} ${endpoint}`;

    try {
      console.log(`API Call: ${methodName}`);
      if (data) {
        console.log(`API Call Data:`, data);
      }

      const config: RequestInit = {
        method,
        ...options,
      };

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
        console.log(`API Call Body:`, config.body);
      }

      const response = await this.request<T>(endpoint, config);
      console.log(`API Success: ${methodName}`);
      return response;
    } catch (error) {
      console.error(`API Error: ${methodName}`, error);
      throw error;
    }
  }

  /**
   * Transforms flat HoseData into the API expected format
   */

  static async getS1(): Promise<GetS1Response> {
    const response = await this.apiCall<S1Item[]>('/asset/getS1');

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
  }

  static async getAllHosesByUser(
    s1Code: string,
  ): Promise<GetAllHosesByUserResponse> {
    const endpoint = `/asset/getAllHosesByUser?s1Code=${s1Code}`;
    return this.apiCall<GetAllHosesByUserResponse>(endpoint);
  }

  static async registerHose(hoseData: HoseData): Promise<HoseData> {
    console.log('Registering hose with data:', hoseData);
    console.log('HoseData keys:', Object.keys(hoseData));

    // Transform the flat hose data to API expected format
    const requestData = transformHoseDataForAPI(hoseData);

    console.log(
      'Transformed API payload:',
      JSON.stringify(requestData, null, 2),
    );

    return this.apiCall<HoseData>('/asset/registerHose', 'POST', requestData);
  }

  static async getS1AndHoses(): Promise<{
    s1Data: GetS1Response;
    hosesData: GetAllHosesByUserResponse;
  }> {
    console.log('Getting S1 data and hoses...');

    // First get S1 data
    const s1Data = await this.getS1();

    // Then get hoses using the first S1 code
    const hosesData = await this.getAllHosesByUser(s1Data.selectedS1Code);

    console.log('Successfully retrieved S1 data and hoses');
    return { s1Data, hosesData };
  }
}
