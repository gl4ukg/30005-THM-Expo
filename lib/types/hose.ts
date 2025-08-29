export interface HoseData {
  itemDescription: string;
  installedDate: string;
  criticality: number | string;
  hoseType: string;
  hoseLength_mm: number | string;
  wp_BAR: number | string;
  ferrule1: string;
  ferrule2: string;
  insert1: string;
  insert2: string;
  genericHoseType: string;
  typeFittingEnd1: string;
  genericDimensionEnd1: string | null;
  genderEnd1: string;
  angleEnd1: string;
  materialQualityEnd1: string;
  typeFittingEnd2: string;
  genericDimensionEnd2: string;
  genderEnd2: string;
  angleEnd2: string;
  assetId: number;

  productionDate?: string;

  hexagonId?: number;
  extSystemCode?: string;
  companyCode?: string;
  extDocSequenceId?: string;
  requestDate?: string;
  requestTime?: string;
  documentName?: string;
  methodName?: string;
  customerNumber?: string;
  customerOrderNumber?: number;
  tessOrderNumber?: string;
  tessAsOrderNumber?: string;
  organization?: string;
  department?: string;
  RFID?: string;
  s1Code?: number | null;
  s2Code?: number | null;
  equipmentSubunit?: string;
  hoseOtherInfo?: string;
  otherInfo?: string;
  customerID?: string;
  customerEq?: string;
  system?: string;
  class?: string;
  status?: string;
  type?: string;

  pollutionExposure?: string;
  uvExposure?: string;
  hoseLength_ft_in?: number | string;
  wp_PSI?: number | string;
  numberOfHoses?: number;
  customerArtNumber?: string;
  couplingOrientation?: number;
  pinpricked?: boolean;
  hoseMediumTemperature?: number | string;
  hoseStandard?: string;
  hoseFunction?: string;
  hoseWarranty?: string;
  hoseWarrantyComment?: string;
  materialQualityEnd2?: string | null;
  generalCommentPTC?: string | null;
  commentEnd1PTC?: string;
  commentEnd2PTC?: string;
  originalHoseComment?: string;
  additionalComment?: string;
  pressureTest?: string;
  testTime?: string;
  testMedium?: string;
  bendingRadius?: string;
  flushingMedia?: string;
  primarySystem?: string;
  generalComment?: string;
  additionalsAend1?: string;
  additionalsBend1?: string;
  additionalsCend1?: string;
  hoseReel?: string;
  spiralGuard?: string;
  hoseProtection?: string;
  additionalsAend2?: string;
  additionalsBend2?: string;
  additionalsCend2?: string;
  hookie?: string;
  whipCheck?: string;
  breakaway?: string;
  parentSystem?: string;
  cleaning?: string;
  flushingStandard?: string;
  customerFlushingMedia?: string;
  minimumTemperature: string;
  maximumTemperature: string;
  colorCode?: string;
  spareSetHose?: boolean;
  emergencyHoseLink?: string;
  emergencyHoseComment?: string;
  currentStatus?: string;

  S2Equipment?: string;

  missingData?: boolean;
  approved?: boolean;

  inspectionInterval?: string;
  nextInspection?: string;
  replacementInterval?: string;
  replacementDate?: string;
  drawingNumber?: string;
  posNumber?: string;
  artNumber?: string;
  hoseCondition?: string;
  inspectedDate?: string;
  inspector?: string;
  innerDiameter?: string;
}

export type GHD = Pick<
  HoseData,
  | 'itemDescription'
  | 'productionDate'
  | 'installedDate'
  | 'customerID'
  | 's1Code'
  | 'S2Equipment'
  | 'equipmentSubunit'
  | 'otherInfo'
  | 'RFID'
  | 'hoseMediumTemperature'
  | 'hoseFunction'
  | 'pollutionExposure'
  | 'uvExposure'
>;

export type UHD = Pick<
  HoseData,
  | 'itemDescription'
  | 'wp_BAR'
  | 'hoseLength_mm'
  | 'materialQualityEnd1'
  | 'typeFittingEnd1'
  | 'genericDimensionEnd1'
  | 'genderEnd1'
  | 'angleEnd1'
  | 'materialQualityEnd2'
  | 'genericDimensionEnd2'
  | 'typeFittingEnd2'
  | 'genderEnd2'
  | 'angleEnd2'
  | 'wp_PSI'
  | 'commentEnd1PTC'
  | 'commentEnd2PTC'
  | 'hoseStandard'
  | 'innerDiameter'
>;

export type TPN = Pick<
  HoseData,
  | 'hoseType'
  | 'ferrule1'
  | 'ferrule2'
  | 'insert1'
  | 'insert2'
  | 'additionalsAend1'
  | 'additionalsBend1'
  | 'additionalsCend1'
  | 'additionalsAend2'
  | 'additionalsBend2'
  | 'additionalsCend2'
  | 'spiralGuard'
  | 'hookie'
  | 'whipCheck'
  | 'hoseProtection'
  | 'breakaway'
>;

export type HID = Pick<
  HoseData,
  | 'productionDate'
  | 'criticality'
  | 'inspectedDate'
  | 'inspector'
  | 'hoseCondition'
  | 'approved'
  | 'generalComment'
  | 'inspectionInterval'
  | 'nextInspection'
  | 'replacementInterval'
  | 'replacementDate'
  | 'drawingNumber'
  | 'posNumber'
  | 'artNumber'
>;

export interface HoseHeader {
  hoseLineId: number;
  assetId: number;
  extSystemCode: string;
  companyCode: string;
  extDocSequenceId: string;
  requestDate: string;
  requestTime: string;
  documentName: string;
  methodName: string;
  customerNumber: string;
  otherInfo: string;
  customerOrderNumber: string;
  tessOrderNumber: string;
  tessAsOrderNumber: string;
  organization: string;
  department: string;
}

export interface S1Id {
  s1Id: number;
  s1Code: string;
  s1Name: string;
  customerId: number;
}

export interface S2Id {
  s2Id: number;
  s2Code: string;
  s2Name: string;
  s1Id: number;
}

export interface GenericHoseType {
  genericHoseTypeId: number;
  genericHoseTypeName: string;
}

export interface HoseLine {
  hoseLineId: number;
  assetId: number;
  hexagonId: string;
  itemDescription: string;
  rfid: string;
  state: string;
  classOrg: string;
  parentSystemId: number;
  s1Id: S1Id;
  s2Id: S2Id;
  equipmentSubunit: string;
  customerId: number | number;
  customerEq: string;
  system: string;
  productionDate: string;
  installedDate: string;
  numberOfHoses: string;
  genericHoseTypeId: GenericHoseType;
  generalCommentPtc: string;
  originalHoseComment: string;
  additionalComment: string;
  primarySystem: string;
  hoseReel: string;
  spiralGuard: string;
  hoseProtection: string;
  hookie: string;
  whipcheck: string;
  breakaway: string;
  currentStatus: string;
}

type DescriptiveField<IdKey extends string, NameKey extends string> = {
  [K in IdKey]: number;
} & {
  [K in NameKey]: string;
};

export type ClassId = DescriptiveField<'classId', 'className'>;
export type StatusId = DescriptiveField<'statusId', 'status'>;
export type TypeId = DescriptiveField<'typeId', 'typeName'>;
export type HoseTypeId = DescriptiveField<'hoseTypeId', 'hoseTypeName'>;
export type HoseDimensionId = DescriptiveField<
  'hoseDimensionId',
  'hoseDimension'
>;
export type CouplingOrientationId = DescriptiveField<
  'couplingOrientationId',
  'orientationCode'
>;

export interface HoseDataDetails {
  hoseLineId: number;
  assetId: number;
  classId: ClassId;
  statusId: StatusId;
  typeId: TypeId;
  hoseTypeId: HoseTypeId;
  hoselengthMm: number;
  hoselengthFtIn: string;
  wpBar: number;
  wpPsi: number;
  ferrule1: string;
  ferrule2: string;
  insert1: string;
  insert2: string;
  hoseDimensionId: HoseDimensionId;
  hoseOtherInfo: string;
  couplingOrientationId: CouplingOrientationId;
  pinPricked: boolean;
  hoseMediumTemperature: string;
  hoseFunction: string;
  hoseWarranty: string;
  hoseWarrantyComment: string;
}

export interface CriticalityId {
  criticalityId: number;
  criticalityName: string;
}

export interface FlushingMediaId {
  flushingMediaId: number;
  flushingMediaName: string;
}

export interface CustomerData {
  hoseLineId: number;
  assetId: number;
  drawingNumber: string;
  posNumber: string;
  artNumber: string;
  customerArtNumber: string;
  criticalityId: CriticalityId;
  pollutionExposure: string;
  uxExposure: string;
  cleaning: string;
  flushingStandard: string;
  flushingMediaId: FlushingMediaId;
  minimumTemperature: string;
  maximumTemperature: string;
  colorId: number;
  spareSetHose: boolean;
  emergencyHoseLink: string;
  emergencyHoseComment: string;
  partNumberUpdatesNeeded: boolean;
}

export interface Testing {
  hoseLineId: number;
  assetId: number;
  testTime: string;
  testMediumStats: string;
  pressureTestStatus: string;
  bendingRadius: string;
  thirdPartySharing: string;
}

export interface MaintenanceDetails {
  hoseLineId: number;
  assetId: number;
  inspectedDate: string;
  inspector: string;
  hoseCondition: string;
  approved: boolean;
  inspectionComment: string;
  nextInspectionDate: string;
  pressureTestDate: string;
  pressureTestOnInterval: boolean;
  nextPressureTest: string;
  nextHoseReplacement: string;
}

export interface TypeFittingEndId {
  typeFittingEndId: number;
  fittingEnd: string;
  genericDimensionEndId: number;
}

export interface GenericDimensionEndId {
  genericDimensionEndId: number;
  genericDimensionName: string;
}

export interface HoseFitting {
  hoseLineId: number;
  assetId: number;
  fittingType: number;
  typeFittingEndId: TypeFittingEndId;
  genericDimensionEndId: GenericDimensionEndId;
  genderEnd: string;
  angleEnd: string;
  materialQualityEnd: string;
  commentEndPtc: string;
}

export interface Additionals {
  hoseLineId: number;
  assetId: number;
  aEnd1: string;
  bEnd1: string;
  cEnd1: string;
  dEnd1: string;
  eEnd1: string;
  fEnd1: string;
  gend1: string;
  hend1: string;
  aend2: string;
  bend2: string;
  cend2: string;
  dend2: string;
  eend2: string;
  fend2: string;
  gend2: string;
  hend2: string;
}

export interface Hose {
  hoseHeader: HoseHeader;
  hoseLine: HoseLine;
  hoseData: HoseDataDetails;
  customerData: CustomerData;
  testing: Testing;
  maintenanceDetails: MaintenanceDetails;
  hoseFitting1: HoseFitting;
  hoseFitting2: HoseFitting;
  additionals: Additionals;
}

export type HoseApiResponse = Hose;
