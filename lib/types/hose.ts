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
