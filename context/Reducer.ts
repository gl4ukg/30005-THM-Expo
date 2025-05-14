import {
  Action,
  ActionCONTACT,
  ActionRFQ,
  ActionSCRAP,
  AppState,
  AuthState,
  DataState,
  initialState,
  isMultiSelection,
  MultiSelection,
  SettingsState,
  SingleSelection,
  SingleSelectionActionsType,
} from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { createContext } from 'react';

interface ActionWithPayload<T extends string, Payload> {
  type: T;
  payload: Payload;
}

interface ActionWithoutPayload<T extends string> {
  type: T;
}

type ReducerMapObject<S = any, A = any> = {
  [K in keyof S]: React.Reducer<S[K], A>;
};

export function combineReducers<S, A>(
  reducers: ReducerMapObject<S, A>,
): React.Reducer<S, A> {
  return (prevState: S, action: A): S => {
    // Get all the keys from the reducers object
    const reducerKeys = Object.keys(reducers) as Array<keyof S>;

    // Initialize nextState as a shallow copy of prevState
    const nextState = { ...prevState };

    let hasChanged = false;

    // Loop through all reducers
    for (const key of reducerKeys) {
      const reducer = reducers[key];
      const previousStateForKey = prevState[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    // If nothing changed, return the original state
    return hasChanged ? nextState : prevState;
  };
}

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
  | ActionWithPayload<'SET_HOSE_DATA', HoseData[]>
  | ActionWithPayload<'SET_DATA_LOADING', boolean>
  | ActionWithPayload<'SAVE_HOSE_DATA', { hoseId: number; hoseData: any }>
  | ActionWithPayload<'SELECT_ONE_HOSE', SingleSelection>
  | ActionWithPayload<'START_MULTI_SELECTION', MultiSelection['type']>
  | ActionWithPayload<'ADD_HOSE_TO_EXISTING_MULTI_SELECTION', number>
  | ActionWithPayload<'TOGGLE_HOSE_MULTI_SELECTION', number>
  | ActionWithoutPayload<'FINISH_SELECTION'>
  | ActionWithPayload<'SELECT_MANY_HOSES_MULTI_SELECTION', number[]>
  | ActionWithoutPayload<'DESELECT_ALL_HOSES_MULTI_SELECTION'>
  | ActionWithPayload<'SET_HOSE_TEMPLATE', Partial<HoseData>>;
type SettingsAction =
  // | ActionWithPayload<'UPDATE_SETTINGS', any>
  ActionWithPayload<'UPDATE_CONNECTION_TYPE', 'wifi' | 'mobile' | null>;

// Reducers for each slice of the app state (these should be defined elsewhere)
const authReducer = (state: AuthState, action: AppAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN', action.payload);
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

const dataReducer = (state: DataState, action: AppAction): DataState => {
  switch (action.type) {
    case 'SET_DATA_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
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
      console.log('SAVE_HOSE_DATA', action.payload.hoseId),
        action.payload.hoseData.installationDate;
      if (action.payload.hoseId === undefined) {
        console.error('hoseId is undefined', action.payload.hoseId);
        return state;
      }
      return {
        ...state,

        hoses: state.hoses.map((hose) => {
          if (hose.assetId === action.payload.hoseId) {
            return {
              ...hose,
              ...action.payload.hoseData,
            };
          }
          return hose;
        }),
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
    case 'ADD_HOSE_TO_EXISTING_MULTI_SELECTION': {
      if (!isMultiSelection(state.selection)) return state;
      if (state.selection.ids.includes(action.payload)) return state;
      return {
        ...state,
        selection: {
          ...state.selection,
          ids: [...state.selection.ids, action.payload],
        } as MultiSelection,
      };
    }
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
    case 'SET_HOSE_TEMPLATE':
      return {
        ...state,
        hoseTemplate: action.payload,
      };
    default: {
      // console.error('Unknown action type:', action.type);
      return state;
    }
  }
};

const settingReducer = (
  state: SettingsState,
  action: AppAction,
): SettingsState => {
  switch (action.type) {
    // case 'UPDATE_SETTINGS':
    //   return state;
    case 'UPDATE_CONNECTION_TYPE':
      console.log('UPDATE_CONNECTION_TYPE', action.payload);
      return {
        ...state,
        connectionType: action.payload,
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
});

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export {
  AppAction,
  AppContext,
  AuthAction,
  DataAction,
  rootReducer,
  SettingsAction,
};
