import { mockedData } from '@/context/mocked';

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

export interface Hose extends Record<string, string | boolean | number> {
  id: string;
  name: string;
  position: string;
  condition: string;
  lastInspection: string;
  lastInspectionDate: string;
  nextInspection: string;
  nextInspectionDate: string;
  missingData: boolean;
  prodDate: string;
}

export interface Action {
  id: string;
  createdAt: string; // TODO: change to timestamp
  actionId: string;
  actionHoseIdList: Hose[];
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
export type SelectionActionsType = 'RFQ' | 'SCRAP' | 'CONTACT';

type ManyHosesSelection<T extends SelectionActionsType> = {
  type: T;
  ids: string[];
};
type SingleHoseSelection<T extends SelectionActionsType> = {
  type: T;
  id: string;
};
type ScrapSingleHoseSelection = SingleHoseSelection<'SCRAP'>;
type ContactSingleHoseSelection = SingleHoseSelection<'CONTACT'>;
type RFQSingleHoseSelection = SingleHoseSelection<'RFQ'>;
type ScrapMultiHosesSelection = ManyHosesSelection<'SCRAP'>;
type ContactMultiHosesSelection = ManyHosesSelection<'CONTACT'>;
type RFQMultiHosesSelection = ManyHosesSelection<'RFQ'>;
export type SingleSelection =
  | ScrapSingleHoseSelection
  | ContactSingleHoseSelection
  | RFQSingleHoseSelection;
export type MultiSelection =
  | ScrapMultiHosesSelection
  | ContactMultiHosesSelection
  | RFQMultiHosesSelection;
export type HoseSelection = SingleSelection | MultiSelection;

export const isMultiSelection = (
  selection: HoseSelection | null,
): selection is MultiSelection => !!selection && 'ids' in selection;

export const isSingleSelection = (
  selection: HoseSelection,
): selection is SingleSelection => !!selection && 'id' in selection;

interface DataState {
  // define data state properties
  // assignedUnits: {
  //   [unitId: string]: {
  //     unitName: string;
  //     hoses: Hose[];
  //   };
  // };
  hoses: Hose[];
  assignedUnits: {
    unitId: string;
    unitName: string;
  }[];
  workingUnitId: null | string;

  selection: HoseSelection | null;

  // selectedHoses: string[] | string;
  // selectedUnitId: null | string;
  // actions: {
  //   RFQ: ActionRFQ[];
  //   SCRAP: ActionSCRAP[];
  //   CONTACT: ActionCONTACT[];
  // };
  // aktiveDraft: null | (Omit<Action, 'status'> & { status: 'DRAFT' });
}

interface SettingsState {
  // define settings state properties
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
  // initial data state values
  hoses: [],
  assignedUnits: [],
  workingUnitId: null,
  selection: null,
};

const initialSettingsState: SettingsState = {
  // initial settings state values
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
