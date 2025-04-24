export type HoseData = {
  id: string;
  missingData?: boolean;
  description: string;
  prodDate: string;
  customerId: string;
  s1PlantVesselUnit: string;
  S2Equipment: string;
  equipmentSubunit: string;
  otherInfo: string;
  RFid: string;
  hoseMediumTemperature: string;
  hoseFunction: string;
  pollutionExposure: string;
  uvExposure: string;
  installationDate: string;
  hoseStandard: string;
  innerDiameter: string;
  totalLength: string;
  wpBar: string;
  wpPsi: string;
  materialQuality: string;
  typeFitting: string;
  innerDiameter2: string;
  gender: string;
  angle: string;
  commentEnd: string;
  materialQuality2: string;
  typeFitting2: string;
  commentEnd2: string;
  gender2: string;
  angle2: string;
  hoseType: string;
  ferrule1: string;
  ferrule2: string;
  insert1: string;
  insert2: string;
  addAEnd1: string;
  addBEnd1: string;
  addCEnd1: string;
  addAEnd2: string;
  addBEnd2: string;
  addCEnd2: string;
  spiralGuard: string;
  hookie: string;
  whipcheck: string;
  hoseProtection: string;
  breakAwayWeakLink: string;
  inspectedDate: string;
  inspectedBy: string;
  hoseCondition: string;
  approved: string;
  comment: string;
  criticality: string;
  inspectionInterval: string;
  nextInspection: string;
  replacementInterval: string;
  replacementDate: string;
  drawingNumber: string;
  positionNumber: string;
  customerArticleNumber: string;
};

export type GHD = Pick<
  HoseData,
  | 'description'
  | 'prodDate'
  | 'customerId'
  | 's1PlantVesselUnit'
  | 'S2Equipment'
  | 'equipmentSubunit'
  | 'otherInfo'
  | 'RFid'
  | 'hoseMediumTemperature'
  | 'hoseFunction'
  | 'pollutionExposure'
  | 'uvExposure'
  | 'installationDate'
>;

export type UHD = Pick<
  HoseData,
  | 'hoseStandard'
  | 'innerDiameter'
  | 'totalLength'
  | 'description'
  | 'wpBar'
  | 'wpPsi'
  | 'materialQuality'
  | 'typeFitting'
  | 'innerDiameter'
  | 'gender'
  | 'angle'
  | 'commentEnd'
  | 'materialQuality2'
  | 'innerDiameter2'
  | 'typeFitting2'
  | 'commentEnd2'
  | 'gender2'
  | 'angle2'
>;

export type TPN = Pick<
  HoseData,
  | 'hoseType'
  | 'ferrule1'
  | 'ferrule2'
  | 'insert1'
  | 'insert2'
  | 'addAEnd1'
  | 'addBEnd1'
  | 'addCEnd1'
  | 'addAEnd2'
  | 'addBEnd2'
  | 'addCEnd2'
  | 'spiralGuard'
  | 'hookie'
  | 'whipcheck'
  | 'hoseProtection'
  | 'breakAwayWeakLink'
>;

export type HID = Pick<
  HoseData,
  | 'inspectedDate'
  | 'inspectedBy'
  | 'hoseCondition'
  | 'approved'
  | 'comment'
  | 'prodDate'
  | 'criticality'
  | 'inspectionInterval'
  | 'nextInspection'
  | 'replacementInterval'
  | 'replacementDate'
  | 'drawingNumber'
  | 'positionNumber'
  | 'customerArticleNumber'
>;
