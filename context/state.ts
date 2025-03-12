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
  isLoggingIn: boolean;
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
type ActionsType = 'RFQ' | 'SCRAP' | 'CONTACT';
interface Action {
  type: ActionsType;
  createdAt: string; // TODO: change to timestamp
  actionId: string;
  actionHoseList: Hose[];
  status: 'DRAFT' | 'SENDT';
}
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
    [T in ActionsType]: Action[];
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
  isLoggingIn: false,
  token: null,
};

const initialDataState: DataState = {
  // initial data state values
  assignedUnits: {},
  selectedUnitId: null,
  actions: {
    RFQ: [],
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
