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

interface Hose extends Record<string, string | boolean | number> {
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
export type ActionsType = 'RFQ' | 'SCRAP' | 'CONTACT';
interface DataState {
  // define data state properties
  assignedUnits: {
    [unitId: string]: {
      unitName: string;
      hoses: Hose[];
    };
  };
  selectedUnitId: null | string;
  actions: {
    RFQ: ActionRFQ[];
    SCRAP: ActionSCRAP[];
    CONTACT: ActionCONTACT[];
  };
  aktiveDraft: null | (Omit<Action, 'status'> & { status: 'DRAFT' });
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
  assignedUnits: {
    testPrinces: {
      unitName: 'Test Princes',
      hoses: mockedData as any,
    },
  },
  selectedUnitId: 'testPrinces',
  actions: {
    RFQ: [
      {
        id: '3027725',
        createdAt: '311224',
        actionId: '1',
        actionHoseIdList: [],
        status: 'DRAFT',
        position: 'Test Princes',
        pressureTested: false,
        type: 'RFQ',
      },
      {
        id: '3027122',
        createdAt: '311224',
        actionId: '1',
        actionHoseIdList: [],
        status: 'SENDT',
        position: 'Test Princes',
        pressureTested: true,
        type: 'RFQ',
      },
    ],
    SCRAP: [],
    CONTACT: [],
  },
  aktiveDraft: null,
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
