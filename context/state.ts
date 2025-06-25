import { HoseData } from '@/lib/types/hose';
import {
  PartialReplaceHoseFormData,
  PartialRFQFormData,
  PartialSendMailFormData,
  TemporaryInspectionData,
  TemporaryRegistrationData,
  TemporaryHoseEditData,
} from './Reducer';
import { Activity } from '@/components/dashboard/activitiesList.tsx/activity';

interface AppState {
  auth: AuthState;
  data: DataState;
  settings: SettingsState;
}

// Define your state interfaces
interface AuthState {
  // define auth state properties
  user: null | {
    email: string;
    name: string;
    id: string;
    phoneNumber?: string;
    customerNumbers?: string[];
  };
  isLoingLoading: boolean;
  token: null | string;
}

export interface Action {
  id: number;
  createdAt: string; // TODO: change to timestamp
  actionId: string;
  actionHoseIdList: HoseData[];
  status: 'DRAFT' | 'SENDT';
  position: string;
}
export type ActionRFQ = Action & {
  pressureTested: boolean;
  type: 'RFQ';
};
export interface ActionSCRAP extends Action {
  type: 'SCRAP';
}

export interface ActionCONTACT extends Action {
  type: 'CONTACT';
}
export type SingleSelectionActionsType =
  | 'RFQ'
  | 'SCRAP'
  | 'CONTACT'
  | 'INSPECT'
  | 'EDIT';

export type MultiSelectionActionsType =
  | 'RFQ'
  | 'SCRAP'
  | 'CONTACT'
  | 'CONTACT_SUPPORT'
  | 'REPLACE_HOSE';

type MultiHosesSelection<T extends MultiSelectionActionsType> = {
  type: T;
  ids: number[];
};
type SingleHoseSelection<T extends SingleSelectionActionsType> = {
  type: T;
  id: number;
};
type ScrapSingleHoseSelection = SingleHoseSelection<'SCRAP'>;
type ContactSingleHoseSelection = SingleHoseSelection<'CONTACT'>;
type RFQSingleHoseSelection = SingleHoseSelection<'RFQ'>;
type InspectSingleHoseSelection = SingleHoseSelection<'INSPECT'>;
type EditSingleHoseSelection = SingleHoseSelection<'EDIT'>;
type ScrapMultiHosesSelection = MultiHosesSelection<'SCRAP'>;
type ContactMultiHosesSelection = MultiHosesSelection<'CONTACT'>;
type ContactSupportMultiHosesSelection = MultiHosesSelection<'CONTACT_SUPPORT'>;
type RFQMultiHosesSelection = MultiHosesSelection<'RFQ'>;
type ReplaceMultiHosesSelection = MultiHosesSelection<'REPLACE_HOSE'>;
export type SingleSelection =
  | ScrapSingleHoseSelection
  | ContactSingleHoseSelection
  | RFQSingleHoseSelection
  | InspectSingleHoseSelection
  | EditSingleHoseSelection;
export type MultiSelection =
  | ScrapMultiHosesSelection
  | ContactMultiHosesSelection
  | RFQMultiHosesSelection
  | ContactSupportMultiHosesSelection
  | ReplaceMultiHosesSelection;
export type HoseSelection = SingleSelection | MultiSelection;

export const isMultiSelection = (
  selection: HoseSelection | null,
): selection is MultiSelection => !!selection && 'ids' in selection;

export const isSingleSelection = (
  selection: HoseSelection | null,
): selection is SingleSelection => !!selection && 'id' in selection;

interface DataState {
  isLoading: boolean;
  lastUpdate: null | Date;
  // define data state properties
  hoses: HoseData[];
  assignedUnits: {
    unitId: string;
    unitName: string;
  }[];
  customer: {
    id: string;
    name: string;
  };
  workingUnitId: null | string;
  selection: HoseSelection | null;
  hoseTemplate?: Partial<HoseData>;
  isCancelable: boolean;
  temporaryContactFormData?: PartialRFQFormData | null;
  temporarySendMailFormData?: PartialSendMailFormData | null;
  temporaryReplaceHoseFormData?: PartialReplaceHoseFormData | null;
  temporaryInspectionData?: TemporaryInspectionData | null;
  temporaryRegistrationData?: TemporaryRegistrationData | null;
  temporaryHoseEditData?: TemporaryHoseEditData | null;
  drafts: (Activity & {
    formData: PartialRFQFormData | PartialSendMailFormData | Partial<HoseData>;
  })[];
  done: any[];
}

interface SettingsState {
  // define settings state properties
  connectionType: 'wifi' | 'mobile' | null;
  appInfo: {
    version: string;
    environment: string;
    webServiceEndpoint: string;
  };
}

// Define initial states for each slice of the app state
const initialAuthState: AuthState = {
  // initial auth state values
  user: {
    email: 'slange_mester@tess.no ',
    name: 'Ole Slange Mester',
    id: '223949MOB',
  },
  isLoingLoading: false,
  token: null,
};

const initialDataState: DataState = {
  isLoading: false,
  lastUpdate: new Date(),
  customer: { id: '223949', name: 'CUSTOMER WEB DEMO (Main)' },
  // initial data state values
  hoses: [],
  assignedUnits: [
    { unitId: '1203108', unitName: 'Test Princess' },
    { unitId: '2406216', unitName: 'Test Prince' },
  ],
  workingUnitId: '1203108',
  selection: null,
  hoseTemplate: undefined,
  isCancelable: false,
  temporaryContactFormData: null,
  temporarySendMailFormData: null,
  temporaryReplaceHoseFormData: null,
  temporaryInspectionData: null,
  temporaryRegistrationData: null,
  drafts: [
    {
      id: 191818,
      type: 'SCRAP',
      status: 'draft',
      selectedIds: [27, 30],
      formData: {
        comment: 'test',
        email: 'slange_mester@tess.no',
        name: 'Ole Slange Mester',
        phone: '123123123',
      },
    },
    {
      id: 191819,
      type: 'RFQ',
      status: 'done',
      selectedIds: [27],
      formData: {},
    },
    {
      id: 191820,
      type: 'REPLACE_HOSE',
      status: 'done',
      selectedIds: [27],
      formData: {
        comment: 'test',
        email: 'slange_mester@tess.no',
        name: 'Ole Slange Mester',
        phone: '123123123',
        replacementImpacts: ['test'],
        replacementReasons: ['test'],
        replacementType: 'Unplanned',
        downtime: '100',
      },
    },
  ],
  done: [],
};

const initialSettingsState: SettingsState = {
  // initial settings state values
  connectionType: null,
  appInfo: {
    version: '1.0.0',
    environment: 'DEV',
    webServiceEndpoint: 'http://localhost:3000',
  },
};

const initialState: AppState = {
  auth: initialAuthState,
  data: initialDataState,
  settings: initialSettingsState,
};

export {
  initialState,
  initialAuthState,
  initialDataState,
  initialSettingsState,
  type AppState,
  type AuthState,
  type DataState,
  type SettingsState,
};
