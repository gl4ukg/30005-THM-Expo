import { HoseData } from '@/lib/types/hose';
import { convertToISOFormat, formatDate } from '@/lib/util/formatDate';
import { getFromStore } from '@/lib/util/secureStore';

// Base URL for all API requests
export const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://30011-proxyapi-cuafeua6bha7ckby.norwayeast-01.azurewebsites.net';

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

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
    console.log('Request method:', config.method || 'GET');
    if (config.body) {
      console.log('Request body:', config.body);
    }

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

export async function apiCall<T>(
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

    const response = await apiRequest<T>(endpoint, config);
    console.log(`API Success: ${methodName}`);
    return response;
  } catch (error) {
    console.error(`API Error: ${methodName}`, error);
    throw error;
  }
}

export interface RegisterHoseRequest {
  documentControl: {
    extSystemCode: string;
    companyCode: string;
    extDocSequenceId: string;
    requestDate: string;
    requestTime: string;
    documentName: string;
    methodName: string;
  };
  registerHoseHeader: {
    customerNumber: string;
    otherInfo: string;
    customerOrderNumber: number;
    tessOrderNumber: number;
    tessAsOrderNumber: number;
    organization: string;
    department: string;
  };
  registerHoseLines: Array<{
    hexagonId: number;
    itemDescription: string;
    RFID: string;
    parentSystem: number;
    s1Code: number;
    s2Code: number;
    equipmentSubunit: string;
    otherInfo: string;
    customerID: string;
    customerEq: string;
    system: string;
    productionDate: string;
    installedDate: string;
    class: string;
    status: string;
    type: string;
    hoseType: string;
    hoseLength_mm: number;
    hoseLength_ft_in: string;
    wp_BAR: number;
    wp_PSI: number;
    numberOfHoses: number;
    ferrule1: string;
    ferrule2: string;
    insert1: string;
    insert2: string;
    couplingOrientation: number;
    pinpricked: boolean;
    hoseMediumTemperature: number;
    hoseFunction: string;
    hoseWarranty: string;
    hoseWarrantyComment: string;
    genericHoseType: string;
    typeFittingEnd1: string;
    genericDimensionEnd1: string;
    genderEnd1: string;
    angleEnd1: string;
    materialQualityEnd1: string;
    typeFittingEnd2: string;
    genericDimensionEnd2: string;
    genderEnd2: string;
    angleEnd2: string;
    materialQualityEnd2: string;
    generalCommentPTC: string;
    commentEnd1PTC: string;
    commentEnd2PTC: string;
    originalHoseComment: string;
    additionalComment: string;
    pressureTest: string;
    testTime: string;
    testMedium: string;
    bendingRadius: string;
    flushingMedia: string;
    primarySystem: string;
    additionalsAend1: string;
    additionalsBend1: string;
    additionalsCend1: string;
    hoseReel: string;
    spiralGuard: string;
    hoseProtection: string;
    additionalsAend2: string;
    additionalsBend2: string;
    additionalsCend2: string;
    hookie: string;
    whipCheck: string;
    breakaway: string;
    maintenanceDetails: {
      inspectedDate: string;
      inspector: string;
      hoseCondition: string;
      approved: boolean;
    };
    customerData: {
      drawingNumber: string;
      posNumber: string;
      artNumber: string;
      customerArtNumber: string;
      criticality: string;
      pollutionExposure: string;
      uvExposure: string;
      cleaning: string;
      flushingStandard: string;
      flushingMedia: string;
      minimumTemperature: string;
      maximumTemperature: string;
      colorCode: string;
      spareSetHose: boolean;
      emergencyHoseLink: string;
      emergencyHoseComment: string;
    };
  }>;
}

export const transformHoseDataForAPI = (
  hoseData: HoseData,
  customerNumber?: string,
): RegisterHoseRequest => {
  const resolvedCustomerNumber =
    customerNumber || hoseData.customerNumber || '';

  return {
    documentControl: {
      extSystemCode: hoseData.extSystemCode || 'XX',
      companyCode: hoseData.companyCode || 'XX',
      extDocSequenceId: hoseData.extDocSequenceId || '1234567890',
      requestDate: hoseData.requestDate
        ? convertToISOFormat(hoseData.requestDate)
        : new Date().toISOString().split('T')[0],
      requestTime:
        hoseData.requestTime || new Date().toTimeString().split(' ')[0],
      documentName: hoseData.documentName || 'ASSETS',
      methodName: hoseData.methodName || 'registerHose',
    },
    registerHoseHeader: {
      customerNumber: resolvedCustomerNumber,
      otherInfo: hoseData.otherInfo || 'string',
      customerOrderNumber: hoseData.customerOrderNumber || 0,
      tessOrderNumber: Number(hoseData.tessOrderNumber) || 0,
      tessAsOrderNumber: Number(hoseData.tessAsOrderNumber) || 0,
      organization: hoseData.organization || 'string',
      department: hoseData.department || 'string',
    },
    registerHoseLines: [
      {
        hexagonId: hoseData.hexagonId || 123,
        itemDescription: hoseData.itemDescription || 'string',
        RFID: hoseData.RFID || 'string',
        parentSystem: Number(hoseData.parentSystem) || 0,
        s1Code: Number(hoseData.s1Code) || 0,
        s2Code: hoseData.s2Code ? Number(hoseData.s2Code) : 0,
        equipmentSubunit: hoseData.equipmentSubunit || 'string',
        otherInfo: hoseData.hoseOtherInfo || 'string',
        customerID: hoseData.customerID || 'string',
        customerEq: hoseData.customerEq || 'string',
        system: hoseData.system || 'string',
        productionDate: hoseData.productionDate
          ? convertToISOFormat(hoseData.productionDate)
          : 'string',
        installedDate: hoseData.installedDate
          ? convertToISOFormat(hoseData.installedDate)
          : 'string',
        class: hoseData.class || 'string',
        status: hoseData.status || 'string',
        type: hoseData.type || 'string',
        hoseType: hoseData.hoseType || 'string',
        hoseLength_mm: Number(hoseData.hoseLength_mm) || 0,
        hoseLength_ft_in: String(hoseData.hoseLength_ft_in || 'string'),
        wp_BAR: Number(hoseData.wp_BAR) || 0,
        wp_PSI: Number(hoseData.wp_PSI) || 0,
        numberOfHoses: Number(hoseData.numberOfHoses) || 0,
        ferrule1: hoseData.ferrule1 || 'string',
        ferrule2: hoseData.ferrule2 || 'string',
        insert1: hoseData.insert1 || 'string',
        insert2: hoseData.insert2 || 'string',
        couplingOrientation: Number(hoseData.couplingOrientation) || 0,
        pinpricked: Boolean(hoseData.pinpricked),
        hoseMediumTemperature: Number(hoseData.hoseMediumTemperature) || 0,
        hoseFunction: hoseData.hoseFunction || 'string',
        hoseWarranty: hoseData.hoseWarranty || 'string',
        hoseWarrantyComment: hoseData.hoseWarrantyComment || 'string',
        genericHoseType: hoseData.genericHoseType || 'string',
        typeFittingEnd1: hoseData.typeFittingEnd1 || 'string',
        genericDimensionEnd1: hoseData.genericDimensionEnd1 || 'string',
        genderEnd1: hoseData.genderEnd1 || 'string',
        angleEnd1: hoseData.angleEnd1 || 'string',
        materialQualityEnd1: hoseData.materialQualityEnd1 || 'string',
        typeFittingEnd2: hoseData.typeFittingEnd2 || 'string',
        genericDimensionEnd2: hoseData.genericDimensionEnd2 || 'string',
        genderEnd2: hoseData.genderEnd2 || 'string',
        angleEnd2: hoseData.angleEnd2 || 'string',
        materialQualityEnd2: hoseData.materialQualityEnd2 || 'string',
        generalCommentPTC: hoseData.generalCommentPTC || 'string',
        commentEnd1PTC: hoseData.commentEnd1PTC || 'string',
        commentEnd2PTC: hoseData.commentEnd2PTC || 'string',
        originalHoseComment: hoseData.originalHoseComment || 'string',
        additionalComment: hoseData.additionalComment || 'string',
        pressureTest: hoseData.pressureTest || 'string',
        testTime: hoseData.testTime || 'string',
        testMedium: hoseData.testMedium || 'string',
        bendingRadius: hoseData.bendingRadius || 'string',
        flushingMedia: hoseData.flushingMedia || 'string',
        primarySystem: hoseData.primarySystem || 'string',
        additionalsAend1: hoseData.additionalsAend1 || 'string',
        additionalsBend1: hoseData.additionalsBend1 || 'string',
        additionalsCend1: hoseData.additionalsCend1 || 'string',
        hoseReel: hoseData.hoseReel || 'string',
        spiralGuard: hoseData.spiralGuard || 'string',
        hoseProtection: hoseData.hoseProtection || 'string',
        additionalsAend2: hoseData.additionalsAend2 || 'string',
        additionalsBend2: hoseData.additionalsBend2 || 'string',
        additionalsCend2: hoseData.additionalsCend2 || 'string',
        hookie: hoseData.hookie || 'string',
        whipCheck: hoseData.whipCheck || 'string',
        breakaway: hoseData.breakaway || 'string',
        maintenanceDetails: {
          inspectedDate: hoseData.inspectedDate
            ? convertToISOFormat(hoseData.inspectedDate)
            : 'string',
          inspector: hoseData.inspector || 'string',
          hoseCondition: hoseData.hoseCondition || 'string',
          approved: Boolean(hoseData.approved),
        },
        customerData: {
          drawingNumber: hoseData.drawingNumber || 'string',
          posNumber: hoseData.posNumber || 'string',
          artNumber: hoseData.artNumber || 'string',
          customerArtNumber: hoseData.customerArtNumber || 'string',
          criticality: String(hoseData.criticality || 'string'),
          pollutionExposure: hoseData.pollutionExposure || 'string',
          uvExposure: hoseData.uvExposure || 'string',
          cleaning: hoseData.cleaning || 'string',
          flushingStandard: hoseData.flushingStandard || 'string',
          flushingMedia: hoseData.customerFlushingMedia || 'string',
          minimumTemperature: hoseData.minimumTemperature || 'string',
          maximumTemperature: hoseData.maximumTemperature || 'string',
          colorCode: hoseData.colorCode || 'string',
          spareSetHose: Boolean(hoseData.spareSetHose),
          emergencyHoseLink: hoseData.emergencyHoseLink || '',
          emergencyHoseComment: hoseData.emergencyHoseComment || 'string',
        },
      },
    ],
  };
};
