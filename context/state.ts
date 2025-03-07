export const THSInitialState = {
  user: null,
  units: {
    availableUnits: [],
    chosenUnitId: null,
  },
};

export type THSStateType = {
  user: null | {
    email: string;
    name: string;
    id: string;
  };
  units: {
    availableUnits: {
      name: string;
      id: string;
      hoses: any[];
    }[];
    chosenUnitId: string | null;
  };
};

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

interface DataState {
  // define data state properties
}

interface SettingsState {
  // define settings state properties
}

// Define initial states for each slice of the app state
const initialAuthState: AuthState = {
  // initial auth state values
  user: null,
  isLoggingIn: false,
  token: null,
};

const initialDataState: DataState = {
  // initial data state values
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
