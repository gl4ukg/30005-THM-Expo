import { HoseData } from '@/lib/types/hose';
import { transformHoseDataForAPI, apiCall, BASE_URL } from './util';
import { useCallback } from 'react';

export interface S1Item {
  S1Id: number;
  S1Code: number;
  S1Name: string;
  S2Id: number;
  S2Code: string;
  S2Name: string | null;
  dimensionId: number;
  dimensionType: string;
}

export interface GetS1Response {
  s1Items: S1Item[];
  selectedS1Code: number;
}

export interface GetAllHosesByUserResponse {
  hoses: HoseData[];
  total: number;
}

// API functions - Handles all HTTP requests to the backend
export const getS1 = async (): Promise<GetS1Response> => {
  const response = await apiCall<S1Item[]>('/asset/getS1', 'GET');

  if (!Array.isArray(response) || response.length === 0) {
    // throw new Error('No S1 items found in response');
    return {
      s1Items: [
        {
          S1Code: 1203108,
          S1Name: 'S1',
          S2Code: 'S2',
          S2Name: 'S2',
          S2Id: 0,
          S1Id: 0,
          dimensionId: 0,
          dimensionType: '',
        },
        {
          S1Code: 111,
          S1Name: 'S111',
          S2Code: 'S2',
          S2Name: 'S2',
          S2Id: 0,
          S1Id: 0,
          dimensionId: 0,
          dimensionType: '',
        },
      ],
      selectedS1Code: 1203108,
    };
  }
  // Use the first S1 item's code as the selected one
  return {
    s1Items: response,
    selectedS1Code: response[0].S1Code,
  };
};

export const getAllHosesByS1 = async (s1Code: number): Promise<HoseData[]> => {
  const endpoint = `/asset/getAllHosesByUser?s1Code=${s1Code}`;
  const response = await apiCall<HoseData[]>(endpoint, 'GET');
  return response.length ? response : [];
};

export const registerHose = async (
  hoseData: HoseData,
  customerNumber?: string,
): Promise<HoseData> => {
  // Transform the flat hose data to API expected format
  const requestData = transformHoseDataForAPI(hoseData, customerNumber);

  return apiCall<HoseData>('/asset/registerHose', 'POST', requestData);
};

export const getS1AndHoses = async (): Promise<{
  s1Data: GetS1Response;
  hosesData: HoseData[];
}> => {
  console.log('Getting S1 data and hoses...');

  // First get S1 data
  const s1Data = await getS1();

  // Then get hoses using the first S1 code
  const hosesData = await getAllHosesByS1(s1Data.selectedS1Code);

  console.log('Successfully retrieved S1 data and hoses');
  return { s1Data, hosesData };
};

export const useAssetApi = () => {
  const getS1Data = useCallback(async () => {
    return await getS1();
  }, []);

  const getHosesByUser = useCallback(async (s1Code: number) => {
    return await getAllHosesByS1(s1Code);
  }, []);

  const registerNewHose = useCallback(
    async (hoseData: HoseData, customerNumber?: string) => {
      return await registerHose(hoseData, customerNumber);
    },
    [],
  );

  const getS1AndHosesData = useCallback(async () => {
    return await getS1AndHoses();
  }, []);

  return {
    getS1Data,
    getHosesByUser,
    registerNewHose,
    getS1AndHosesData,
  };
};
