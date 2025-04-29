import { HoseData } from '@/lib/types/hose';

const createDefaultRequiredFields = (): Pick<
  HoseData,
  | 'description'
  | 'prodDate'
  | 'installedDate'
  | 'criticality'
  | 'hoseType'
  | 'hoseLength'
  | 'wp'
  | 'ferrule1'
  | 'ferrule2'
  | 'insert1'
  | 'insert2'
  | 'genericHoseType'
  | 'typeFittingEnd1'
  | 'generalDimensionEnd1'
  | 'genderEnd1'
  | 'angleEnd1'
  | 'materialQualityEnd1'
  | 'typeFittingEnd2'
  | 'genericDimensionEnd2'
  | 'genderEnd2'
  | 'angleEnd2'
> => ({
  description: 'Default Description',
  prodDate: new Date().toISOString(),
  installedDate: new Date().toISOString(),
  criticality: 3,
  hoseType: 'Default Hose Type',
  hoseLength: '',
  wp: '',
  ferrule1: 'Default Ferrule 1',
  ferrule2: 'Default Ferrule 2',
  insert1: 'Default Insert 1',
  insert2: 'Default Insert 2',
  genericHoseType: 'Default Generic Type',
  typeFittingEnd1: 'Default Type Fitting 1',
  generalDimensionEnd1: 'Default Dimension 1',
  genderEnd1: 'Default Gender 1',
  angleEnd1: 'Default Angle 1',
  materialQualityEnd1: 'Default Material 1',
  typeFittingEnd2: 'Default Type Fitting 2',
  genericDimensionEnd2: 'Default Dimension 2',
  genderEnd2: 'Default Gender 2',
  angleEnd2: 'Default Angle 2',
});

export const mockedData: HoseData[] = [
  {
    ...createDefaultRequiredFields(),
    id: '1244951',
    description: 'Hydraulic hose for heavy machinery',
    prodDate: '2022-01-01T00:00:00.000Z',
    installedDate: '2022-02-01T00:00:00.000Z',
    customerID: 'CUST-1234',
    hoseType: 'Hydraulic',
    s1PlantVesselUnit: 'S1-123 Pump-Manifold Block P1 starboard',
    S2Equipment: 'S2-456',
    equipmentSubunit: 'E1-789',
    otherInfo: 'High-pressure hose',
    RFid: 'RFID-1234',
    hoseMediumTemperature: '150°C',
    hoseFunction: 'Hydraulic fluid transfer',

    generalDimensionEnd1: '1.5 inches',
    hoseLength: '20 feet',
    missingData: true,
    wp: '250 bar',
    wpPsi: '3625 psi',
    materialQualityEnd1: 'High-quality rubber',
    typeFittingEnd1: 'JIC 37° flare',
    genericDimensionEnd2: '1.25 inches',
    genderEnd1: 'Male',
    angleEnd1: '90°',
    commentEnd1PTC: 'End 1 comment',
    materialQualityEnd2: 'High-quality rubber',
    typeFittingEnd2: 'JIC 37° flare',
    genderEnd2: 'Female',
    angleEnd2: '90°',
    commentEnd2PTC: 'End 2 comment',
  },
  {
    ...createDefaultRequiredFields(),
    id: '1154917',
    description: 'Another hydraulic hose',
    prodDate: '2022-01-15T00:00:00.000Z',
    installedDate: '2022-02-15T00:00:00.000Z',
    customerID: 'CUST-1234',
    hoseType: 'Hydraulic',
    s1PlantVesselUnit: 'S1-123 Pump-Manifold Block P2 port',
    S2Equipment: 'S2-457',
    RFid: 'RFID-5678',

    wp: '210 bar',
    materialQualityEnd1: 'Synthetic rubber',
    typeFittingEnd1: 'BSP',
    generalDimensionEnd1: '1 inch',
    genderEnd1: 'Male',
    angleEnd1: '0°',
    materialQualityEnd2: 'Synthetic rubber',
    typeFittingEnd2: 'BSP',
    genericDimensionEnd2: '1 inch',
    genderEnd2: 'Female',
    angleEnd2: '0°',
  },
  {
    ...createDefaultRequiredFields(),
    id: '1',
    description: 'Test Hose 1',
  },
  {
    ...createDefaultRequiredFields(),
    id: '2',
    description: 'Industrial hose for chemical transfer',
    prodDate: '2022-02-01T00:00:00.000Z',
    installedDate: '2022-03-01T00:00:00.000Z',
    customerID: 'CUST-5678',
    hoseType: 'Industrial',
    s1PlantVesselUnit: 'S1-901',
    S2Equipment: 'S2-234',
    equipmentSubunit: 'E1-567',
    otherInfo: 'Chemical-resistant hose',
    RFid: 'RFID-ABCD',
    hoseMediumTemperature: '100°C',
    hoseFunction: 'Chemical transfer',

    generalDimensionEnd1: '2 inches',
    hoseLength: '30 feet',
    wp: '150 bar',
    wpPsi: '2175 psi',
    materialQualityEnd1: 'High-quality PTFE',
    typeFittingEnd1: 'NPT',
    genericDimensionEnd2: '1.75 inches',
    genderEnd1: 'Male',
    angleEnd1: '45°',
    commentEnd1PTC: 'End 1 comment',
    materialQualityEnd2: 'High-quality PTFE',
    typeFittingEnd2: 'NPT',
    genderEnd2: 'Female',
    angleEnd2: '45°',
    commentEnd2PTC: 'End 2 comment',
  },
].map((hose) => hose as HoseData);
