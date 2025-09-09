import { APIHose, HoseData } from '@/lib/types/hose';
import { transformHoseDataForAPI, apiCall, BASE_URL } from './util';
import { useCallback } from 'react';

export interface S1Item {
  S1Id: number;
  S1Code: string;
  S1Name: string;
  S2Id: number;
  S2Code: string;
  S2Name: string | null;
}

export interface S2Item {
  S2Id: number;
  S2Code: string;
  S2Name: string | null;
}
export interface TransformedS1 {
  S1Id: number;
  S1Code: string;
  S1Name: string;
  S2: S2Item[];
}

export interface GetS1Response {
  s1Items: TransformedS1[];
  selectedS1Code: string;
}

export interface GetAllHosesByUserResponse {
  hoses: HoseData[];
  total: number;
}
const transformS1Array = (items: S1Item[]): TransformedS1[] => {
  if (!Array.isArray(items)) {
    console.error('items is not an array');
    return [];
  }

  if (items.length === 0) {
    return [];
  }

  const s1Objects: { [key: string]: TransformedS1 } = {};

  items.forEach((item) => {
    if (typeof item.S1Code !== 'string') return;
    if (!s1Objects[item.S1Code]) {
      s1Objects[item.S1Code] = {
        S1Id: item.S1Id,
        S1Code: item.S1Code,
        S1Name: item.S1Name,
        S2: [],
      };
    }
    s1Objects[item.S1Code].S2.push({
      S2Id: item.S2Id,
      S2Code: item.S2Code,
      S2Name: item.S2Name,
    });
  });

  const transformedItems = Object.values(s1Objects);
  return transformedItems;
};
// API functions - Handles all HTTP requests to the backend
export const getS1 = async (): Promise<GetS1Response> => {
  const response = await apiCall<{ data: S1Item[] }>('/asset/getS1', 'GET');
  if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
    return {
      s1Items: [],
      selectedS1Code: '',
    };
  }
  const transformedResponse = transformS1Array(response.data);
  // Use the first S1 item's code as the selected one
  return {
    s1Items: transformedResponse,
    selectedS1Code: transformedResponse[0]?.S1Code,
  };
};

export const getS1Hoses = async (s1Code: string): Promise<APIHose[]> => {
  const endpoint = `/asset/getHose?s1Code=${s1Code}&pageSize=10000`;
  const response = await apiCall<{ data: APIHose[] }>(endpoint, 'GET');
  return response.data.length ? response.data : [];
};

export const getHose = async (s1Code: string): Promise<APIHose[]> => {
  const endpoint = `/asset/getHose?s1Code=${s1Code}&pageSize=10000`;
  const response = await apiCall<{ data: APIHose[] }>(endpoint, 'GET');

  return response.data.length ? response.data : [];
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
  hosesData: APIHose[];
}> => {
  // First get S1 data
  const s1Data = await getS1();
  // Then get hoses using the first S1 code
  const hosesData = await getS1Hoses(s1Data.selectedS1Code);

  return { s1Data, hosesData };
};

export const useAssetApi = () => {
  const getS1Data = useCallback(async () => {
    return await getS1();
  }, []);

  const getHosesByUser = useCallback(async (s1Code: string) => {
    return await getHose(s1Code);
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
