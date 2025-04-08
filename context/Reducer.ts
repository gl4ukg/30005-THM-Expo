import {
  Action,
  ActionCONTACT,
  ActionRFQ,
  ActionSCRAP,
  SingleSelectionActionsType,
  AppState,
  AuthState,
  DataState,
  Hose,
  HoseSelection,
  initialState,
  SettingsState,
  SingleSelection,
  MultiSelection,
  isMultiSelection,
} from '@/context/state';
import { createContext } from 'react';

interface ActionWithPayload<T extends string, Payload> {
  type: T;
  payload: Payload;
}

interface ActionWithoutPayload<T extends string> {
  type: T;
}

const combineReducers = <T extends Record<string, any>>(reducers: {
  [key: string]: (state: T[keyof T], action: any) => T[keyof T];
}) => {
  return (state: T = {} as T, action: any) => {
    const newState: any = {};

    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        newState[key] = reducers[key](state[key], action);
      }
    }

    return newState as T;
  };
};

type AuthAction =
  | ActionWithPayload<'LOGIN', { email: string; id: string; name: string }>
  | ActionWithoutPayload<'LOGOUT'>
  | ActionWithPayload<'SET_TOKEN', string>
  | ActionWithPayload<'SET_LOGIN_LOADING', boolean>;
type DataAction =
  | ActionWithPayload<'SET_ASSIGNED_UNITS', DataState['assignedUnits']>
  | ActionWithPayload<'SET_WORKING_UNIT', string>
  | ActionWithPayload<
      'REMOVE_ACTION',
      { id: string; actionType: SingleSelectionActionsType }
    >
  | ActionWithPayload<
      'ADD_ACTION',
      {
        action: Action & (ActionRFQ | ActionCONTACT | ActionSCRAP);
        actionType: SingleSelectionActionsType;
      }
    >
  | ActionWithPayload<'SET_HOSE_DATA', Hose[]>
  | ActionWithPayload<'SAVE_HOSE_DATA', { hoseId: string; hoseData: any }>
  | ActionWithPayload<'SELECT_ONE_HOSE', SingleSelection>
  | ActionWithPayload<'START_MULTI_SELECTION', MultiSelection['type']>
  | ActionWithPayload<'TOGGLE_HOSE_MULTI_SELECTION', string>
  | ActionWithoutPayload<'FINISH_SELECTION'>
  | ActionWithPayload<'SELECT_MANY_HOSES_MULTI_SELECTION', string[]>
  | ActionWithoutPayload<'DESELECT_ALL_HOSES_MULTI_SELECTION'>;
type SettingsAction = ActionWithPayload<'UPDATE_SETTINGS', any>;

// Reducers for each slice of the app state (these should be defined elsewhere)
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_LOGIN_LOADING':
      return {
        ...state,
        isLoingLoading: action.payload,
      };
    default:
      return state;
  }
};

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_ASSIGNED_UNITS':
      return {
        ...state,
        assignedUnits: action.payload,
      };
    case 'SET_WORKING_UNIT':
      return {
        ...state,
        workingUnitId: action.payload,
      };
    case 'SET_HOSE_DATA':
      return {
        ...state,
        hoses: action.payload,
      };
    case 'SAVE_HOSE_DATA':
      return {
        ...state,
        assignedUnits: Array.isArray(state.assignedUnits)
          ? state.assignedUnits.reduce((acc: any, hose: any) => {
              const hoseId = hose.id;
              acc[hoseId] =
                hose.id === action.payload.hoseId
                  ? { ...hose, ...action.payload.hoseData }
                  : hose;
              return acc;
            }, {})
          : state.assignedUnits,
      };
    case 'START_MULTI_SELECTION':
      return {
        ...state,
        selection: {
          type: action.payload,
          ids: [],
        } as MultiSelection,
      };
    case 'SELECT_ONE_HOSE':
      return {
        ...state,
        selection: action.payload,
      };
    case 'TOGGLE_HOSE_MULTI_SELECTION':
      const selection = state.selection;
      if (isMultiSelection(selection)) {
        let selectedIds = selection.ids;
        if (selectedIds.includes(action.payload)) {
          selectedIds = selectedIds.filter((id) => id !== action.payload);
        } else {
          selectedIds.push(action.payload);
        }
        return {
          ...state,
          selection: {
            ...state.selection,
            ids: selectedIds,
          } as MultiSelection,
        };
      }
    case 'SELECT_MANY_HOSES_MULTI_SELECTION':
      return {
        ...state,
        selection: {
          ...state.selection,
          ids: action.payload,
        } as MultiSelection,
      };
    case 'DESELECT_ALL_HOSES_MULTI_SELECTION':
      return {
        ...state,
        selection: {
          ...state.selection,
          ids: [],
        } as MultiSelection,
      };

    case 'FINISH_SELECTION':
      return {
        ...state,
        selection: null,
      };
    default: {
      // console.error('Unknown action type:', action.type);
      return state;
    }
  }
};

const settingReducer = (
  state: SettingsState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        /*update setting*/
      };
    default:
      return state;
  }
};

type AppAction = AuthAction | DataAction | SettingsAction;

const rootReducer: React.Reducer<AppState, AppAction> = combineReducers({
  auth: authReducer,
  data: dataReducer,
  settings: settingReducer,
}) as any; // TODO

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export {
  AppContext,
  AppAction,
  AuthAction,
  DataAction,
  SettingsAction,
  rootReducer,
};
