import { HoseData } from '@/lib/types/hose';

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
  };
  isLoingLoading: boolean;
  token: null | string;
}

export interface Action {
  id: string;
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
  ids: string[];
};
type SingleHoseSelection<T extends SingleSelectionActionsType> = {
  type: T;
  id: string;
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
  // define data state properties
  hoses: HoseData[];
  assignedUnits: {
    unitId: string;
    unitName: string;
  }[];
  workingUnitId: null | string;
  selection: HoseSelection | null;
  hoseTemplate?: Partial<HoseData>;
}

interface SettingsState {
  // define settings state properties
  connectionType: 'wifi' | 'mobile' | null;
}

// Define initial states for each slice of the app state
const initialAuthState: AuthState = {
  // initial auth state values
  user: {
    email: 'use@e.mail',
    name: 'User',
    id: 'id',
  },
  isLoingLoading: false,
  token: null,
};

const initialDataState: DataState = {
  isLoading: false,
  // initial data state values
  hoses: [],
  assignedUnits: [
    { unitId: '1', unitName: 'Test Princess' },
    { unitId: '2', unitName: 'Test Prince' },
  ],
  workingUnitId: '1',
  selection: null,
  hoseTemplate: undefined,
};

const initialSettingsState: SettingsState = {
  // initial settings state values
  connectionType: null,
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
