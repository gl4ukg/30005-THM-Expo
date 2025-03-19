import {
  Action,
  ActionCONTACT,
  ActionRFQ,
  ActionSCRAP,
  ActionsType,
  AppState,
  AuthState,
  DataState,
  initialState,
  SettingsState,
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
  | ActionWithPayload<'SET_DATA', any>
  | ActionWithPayload<'SET_SELECTED_UNIT', string>
  | ActionWithPayload<'REMOVE_ACTION', { id: string; actionType: ActionsType }>
  | ActionWithPayload<
      'ADD_ACTION',
      {
        action: Action & (ActionRFQ | ActionCONTACT | ActionSCRAP);
        actionType: ActionsType;
      }
    >;
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
    case 'SET_DATA':
      return {
        ...state,
        assignedUnits: action.payload,
      };
    case 'SET_SELECTED_UNIT':
      return {
        ...state,
        selectedUnitId: action.payload,
      };
    case 'REMOVE_ACTION':
      return {
        ...state,
        actions: {
          ...state.actions,
          [action.payload.actionType]: state.actions[
            action.payload.actionType
          ].filter((a) => a.id === action.payload.id),
        },
      };
    default:
      return state;
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
} as any);

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

// {

// export type SetUserAction = ActionWithPayload<'SET_USER', THSStateType['user']>;

// export type ResetAction = ActionWithoutPayload<'RESET_USER'>;
// export type ResetUnits = ActionWithoutPayload<'RESET_UNITS'>;
// export type SetUnits = ActionWithPayload<
//   'SET_UNITS',
//   THSStateType['units']['availableUnits']
// >;
// export type AddUnit = ActionWithPayload<
//   'ADD_UNIT',
//   THSStateType['units']['availableUnits'][0]
// >;
// export type RemoveUnit = ActionWithPayload<
//   'REMOVE_UNIT',
//   THSStateType['units']['availableUnits'][0]['id']
// >;
// export type SetChosenUnit = ActionWithPayload<
//   'SET_CHOSEN_UNIT',
//   THSStateType['units']['chosenUnitId']
// >;

// export type Action =
//   | SetUserAction
//   | ResetAction
//   | SetUnits
//   | SetChosenUnit
//   | ResetUnits
//   | AddUnit
//   | RemoveUnit;

// export const THSReducer = (
//   state: THSStateType,
//   action: Action,
// ): THSStateType => {
//   switch (action.type) {
//     case 'SET_USER': {
//       console.log('SET_USER', action.payload);
//       return {
//         ...state,
//         user: action.payload,
//       };
//     }
//     case 'RESET_USER': {
//       console.log('RESET_USER');
//       console.log({
//         ...state,
//         user: null,
//       });
//       return {
//         ...state,
//         user: null,
//       };
//     }
//     case 'SET_UNITS': {
//       return {
//         ...state,
//         units: {
//           ...state.units,
//           availableUnits: action.payload,
//         },
//       };
//     }
//     case 'SET_CHOSEN_UNIT': {
//       return {
//         ...state,
//         units: {
//           ...state.units,
//           chosenUnitId: action.payload,
//         },
//       };
//     }
//     case 'RESET_UNITS': {
//       return {
//         ...state,
//         units: {
//           ...state.units,
//           chosenUnitId: null,
//           availableUnits: [],
//         },
//       };
//     }
//     case 'ADD_UNIT': {
//       return {
//         ...state,
//         units: {
//           ...state.units,
//           availableUnits: [...state.units.availableUnits, action.payload],
//         },
//       };
//     }
//     case 'REMOVE_UNIT': {
//       return {
//         ...state,
//         units: {
//           ...state.units,
//           availableUnits: state.units.availableUnits.filter(
//             (unit) => unit.id !== action.payload,
//           ),
//         },
//       };
//     }
//   }
// };

// }
