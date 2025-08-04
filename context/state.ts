import { HID, HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';
import {
  PartialReplaceHoseFormData,
  PartialRFQFormData,
  PartialSendMailFormData,
} from './Reducer';
import { Activity } from '@/components/dashboard/activitiesList/activity';

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
    phoneNumber?: number;
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
  lastUpdateStatus?: 'error' | 'syncing' | 'synced';
  s1Code: string | null;
  s1Items: S1Item[];
  // define data state properties
  hoses: HoseData[];
  customer: {
    id: string;
    name: string;
  };
  selection: HoseSelection | null;
  hoseTemplate?: Partial<HoseData>;
  isCancelable: boolean;
  drafts: ActivityDraft[];
  done: ActivityDone[];
  editedHoses: Partial<HoseData>[];
}

interface DraftAction extends Activity {
  type: 'RFQ' | 'SCRAP' | 'CONTACT';
  status: 'draft';
  formData: PartialRFQFormData;
}
interface DraftSendMail extends Activity {
  type: 'CONTACT_SUPPORT';
  status: 'draft';
  formData: PartialSendMailFormData;
}
interface DraftReplaceHose extends Activity {
  type: 'REPLACE_HOSE';
  status: 'draft';
  formData: PartialReplaceHoseFormData;
}
interface DraftRegisterHose extends Activity {
  type: 'REGISTER_HOSE';
  status: 'draft';
  formData: Partial<HoseData>;
}
interface DraftInspectHose extends Activity {
  type: 'INSPECT';
  status: 'draft';
  formData: Partial<HID>;
}

export type ActivityDraft =
  | DraftAction
  | DraftSendMail
  | DraftReplaceHose
  | DraftRegisterHose
  | DraftInspectHose;

export type ActivityDone = Omit<ActivityDraft, 'status'> & {
  status: 'done';
};

interface SettingsState {
  // define settings state properties
  connectionType: 'wifi' | 'mobile' | null;
  appInfo: {
    version: string;
    environment: string;
    webServiceEndpoint: string;
  };
  isMenuOpen: boolean;
}

// Define initial states for each slice of the app state
const initialAuthState: AuthState = {
  // initial auth state values
  user: {
    email: 'slange_mester@tess.no ',
    name: 'Ole Slange Mester',
    phoneNumber: 12345678,
    id: '223949MOB',
  },
  isLoingLoading: false,
  token: null,
};

const initialDataState: DataState = {
  isLoading: false,
  lastUpdate: null,
  s1Code: null,
  s1Items: [],
  customer: { id: '223949', name: 'CUSTOMER WEB DEMO (Main)' },
  // initial data state values
  hoses: [],
  selection: null,
  hoseTemplate: undefined,
  isCancelable: false,
  drafts: [
    {
      id: 191818,
      type: 'SCRAP',
      status: 'draft',
      selectedIds: [27, 30],
      modifiedAt: new Date(),
      formData: {
        comment: 'test',
      },
    },
    {
      id: 191819,
      type: 'RFQ',
      status: 'draft',
      selectedIds: [27],
      formData: {},
      modifiedAt: new Date('2016-07-29T20:23:01.804Z'),
    },
    {
      id: 191820,
      type: 'REPLACE_HOSE',
      status: 'draft',
      selectedIds: [27],
      modifiedAt: new Date('2016-07-19T20:25:01.804Z'),
      formData: {
        comment: 'test',
        replacementImpacts: ['test'],
        replacementReasons: ['test'],
        replacementType: 'Unplanned',
        downtime: '100',
      },
    },
  ],
  done: [
    {
      id: 153819,
      type: 'RFQ',
      status: 'done',
      selectedIds: [27],
      modifiedAt: new Date('2016-07-19T20:21:01.804Z'),
      formData: {},
    },
    {
      id: 391821,
      type: 'REPLACE_HOSE',
      status: 'done',
      selectedIds: [27],
      modifiedAt: new Date('2017-07-29T20:23:01.804Z'),
      formData: {
        comment: 'test',
        replacementImpacts: ['test'],
        replacementReasons: ['test'],
        replacementType: 'Unplanned',
        downtime: '100',
      },
    },
  ],
  editedHoses: [],
};

const initialSettingsState: SettingsState = {
  // initial settings state values
  connectionType: null,
  appInfo: {
    version: '1.0.0',
    environment: 'DEV',
    webServiceEndpoint: 'http://localhost:3000',
  },
  isMenuOpen: false,
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
