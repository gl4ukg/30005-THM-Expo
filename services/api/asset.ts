import { HoseData } from '@/lib/types/hose';
import { transformHoseDataForAPI, apiCall, BASE_URL } from './util';

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
  static async getS1(): Promise<GetS1Response> {
    const response = await apiCall<S1Item[]>('/asset/getS1');

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
    return apiCall<GetAllHosesByUserResponse>(endpoint);
  }

  static async registerHose(
    hoseData: HoseData,
    customerNumber?: string,
  ): Promise<HoseData> {
    console.log('Registering hose with data:', hoseData);
    console.log('HoseData keys:', Object.keys(hoseData));
    console.log('Customer number provided:', customerNumber);

    // Transform the flat hose data to API expected format
    const requestData = transformHoseDataForAPI(hoseData, customerNumber);

    console.log(
      'Transformed API payload:',
      JSON.stringify(requestData, null, 2),
    );

    return apiCall<HoseData>('/asset/registerHose', 'POST', requestData);
  }

  static async getS1AndHoses(): Promise<{
    s1Data: GetS1Response;
    hosesData: GetAllHosesByUserResponse;
  }> {
    console.log('Getting S1 data and hoses...');

    // First get S1 data
    const s1Data = await AssetApi.getS1();

    // Then get hoses using the first S1 code
    const hosesData = await AssetApi.getAllHosesByUser(s1Data.selectedS1Code);

    console.log('Successfully retrieved S1 data and hoses');
    return { s1Data, hosesData };
  }
}
