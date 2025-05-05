export interface HoseData {
  description: string;
  prodDate: string;
  installedDate: string;
  criticality: number | string;
  hoseType: string;
  hoseLength: number | string;
  wp: number | string;
  ferrule1: string;
  ferrule2: string;
  insert1: string;
  insert2: string;
  genericHoseType: string;
  typeFittingEnd1: string;
  generalDimensionEnd1: string;
  genderEnd1: string;
  angleEnd1: string;
  materialQualityEnd1: string;
  typeFittingEnd2: string;
  genericDimensionEnd2: string;
  genderEnd2: string;
  angleEnd2: string;

  id?: string;
  RFid?: string;
  parentSystem?: number;
  s1Code?: number;
  s2Code?: number;
  equipmentSubunit?: string;
  otherInfo?: string;
  customerID?: string;
  customerEq?: string;
  system?: string;
  class?: string;
  status?: string;
  type?: string;
  pollutionExposure?: string;
  uvExposure?: string;
  hoseLengthInch?: number | string;
  wpPsi?: number | string;
  couplingOrientation?: number;
  pinpricked?: boolean;
  hoseMediumTemperature?: number | string;
  hoseStandard?: string;
  hoseFunction?: string;
  hoseWarranty?: string;
  hoseWarrantyComment?: string;
  materialQualityEnd2?: string;
  generalCommentPTC?: string;
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

  s1PlantVesselUnit?: string;
  S2Equipment?: string;

  missingData?: boolean;
  approved?: boolean;

  inspectionInterval?: string;
  nextInspection?: string;
  replacementInterval?: string;
  replacementDate?: string;
  drawingNumber?: string;
  positionNumber?: string;
  customerArticleNumber?: string;
  hoseCondition?: string;
  inspectedDate?: string;
  inspectedBy?: string;
  innerDiameter?: string;
}

export type GHD = Pick<
  HoseData,
  | 'description'
  | 'prodDate'
  | 'installedDate'
  | 'customerID'
  | 's1PlantVesselUnit'
  | 'S2Equipment'
  | 'equipmentSubunit'
  | 'otherInfo'
  | 'RFid'
  | 'hoseMediumTemperature'
  | 'hoseFunction'
  | 'pollutionExposure'
  | 'uvExposure'
>;

export type UHD = Pick<
  HoseData,
  | 'description'
  | 'wp'
  | 'hoseLength'
  | 'materialQualityEnd1'
  | 'typeFittingEnd1'
  | 'generalDimensionEnd1'
  | 'genderEnd1'
  | 'angleEnd1'
  | 'materialQualityEnd2'
  | 'genericDimensionEnd2'
  | 'typeFittingEnd2'
  | 'genderEnd2'
  | 'angleEnd2'
  | 'wpPsi'
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
  | 'prodDate'
  | 'criticality'
  | 'inspectedDate'
  | 'inspectedBy'
  | 'hoseCondition'
  | 'approved'
  | 'generalComment'
  | 'inspectionInterval'
  | 'nextInspection'
  | 'replacementInterval'
  | 'replacementDate'
  | 'drawingNumber'
  | 'positionNumber'
  | 'customerArticleNumber'
>;
