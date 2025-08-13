import {
  Action,
  ActionCONTACT,
  ActionRFQ,
  ActionSCRAP,
  AppState,
  AuthState,
  DataState,
  ActivityDraft,
  initialState,
  isMultiSelection,
  MultiSelection,
  SettingsState,
  SingleSelection,
  SingleSelectionActionsType,
  ActivityDone,
} from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { S1Item } from '@/services/api/asset';
import { createContext } from 'react';
import { updateHose } from '@/services/cache/cacheService';

export interface PartialFormData {
  comment?: string;
}
export interface PartialRFQFormData extends PartialFormData {
  rfq?: string | null;
}

export interface PartialSendMailFormData extends PartialFormData {
  subject?: string;
}

export interface PartialReplaceHoseFormData extends PartialFormData {
  replacementType?: string;
  replacementReasons?: string[];
  replacementImpacts?: string[];
  downtime?: string;
}

export interface TemporaryInspectionData {
  hoseId?: number;
  changes?: Partial<HoseData>;
}

export interface TemporaryRegistrationData {
  formData?: Partial<HoseData> & { showValidationErrors?: boolean };
}

export interface TemporaryHoseEditData {
  hoseId?: number;
  changes?: Partial<HoseData>;
}

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
  | ActionWithPayload<'LOGIN', Partial<AuthState['user']>>
  | ActionWithoutPayload<'LOGOUT'>
  | ActionWithPayload<'SET_TOKEN', string>
  | ActionWithPayload<'SET_LOGIN_LOADING', boolean>;
type DataAction =
  | ActionWithPayload<'SET_S1_CODE', string>
  | ActionWithPayload<'SET_S1_ITEMS', S1Item[]>
  | ActionWithPayload<'CHANGE_S1_SELECTION', string>
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
  | ActionWithPayload<'SET_LAST_UPDATE', 'error' | 'syncing' | 'synced'>
  | ActionWithPayload<'SET_CUSTOMER', { id: string; name: string }>
  | ActionWithPayload<'SAVE_HOSE_DATA', { hoseId: number; hoseData: any }>
  | ActionWithPayload<'REMOVE_HOSES', number[]>
  | ActionWithPayload<'SELECT_ONE_HOSE', SingleSelection>
  | ActionWithPayload<'START_MULTI_SELECTION', MultiSelection['type']>
  | ActionWithPayload<'ADD_HOSE_TO_EXISTING_MULTI_SELECTION', number>
  | ActionWithPayload<'TOGGLE_HOSE_MULTI_SELECTION', number>
  | ActionWithoutPayload<'FINISH_SELECTION'>
  | ActionWithPayload<'SELECT_MANY_HOSES_MULTI_SELECTION', number[]>
  | ActionWithoutPayload<'DESELECT_ALL_HOSES_MULTI_SELECTION'>
  | ActionWithPayload<'SET_HOSE_TEMPLATE', Partial<HoseData>>
  | ActionWithPayload<'SET_IS_CANCELABLE', boolean>
  | ActionWithPayload<'SET_TEMPORARY_CONTACT_FORM_DATA', PartialRFQFormData>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_CONTACT_FORM_DATA'>
  | ActionWithPayload<
      'SET_TEMPORARY_SEND_MAIL_FORM_DATA',
      PartialSendMailFormData
    >
  | ActionWithoutPayload<'CLEAR_TEMPORARY_SEND_MAIL_FORM_DATA'>
  | ActionWithPayload<
      'SET_TEMPORARY_REPLACE_HOSE_FORM_DATA',
      PartialReplaceHoseFormData
    >
  | ActionWithoutPayload<'CLEAR_TEMPORARY_REPLACE_HOSE_FORM_DATA'>
  | ActionWithPayload<'SET_TEMPORARY_INSPECTION_DATA', TemporaryInspectionData>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_INSPECTION_DATA'>
  | ActionWithPayload<
      'SET_TEMPORARY_REGISTRATION_DATA',
      TemporaryRegistrationData
    >
  | ActionWithPayload<'CREATE_DRAFT', Omit<ActivityDraft, 'modifiedAt'>>
  | ActionWithPayload<'REMOVE_DRAFT', number>
  | ActionWithPayload<'SAVE_DRAFT', Omit<ActivityDraft, 'modifiedAt'>>
  | ActionWithPayload<
      'ADD_HOSE_TO_DRAFT',
      {
        draftId: number;
        hoseId: number;
      }
    >
  | ActionWithPayload<'SET_ACTIVITIES_DONE', ActivityDone[]>
  | ActionWithPayload<'ADD_ACTIVITY_DONE', ActivityDone>
  | ActionWithPayload<
      'ACTIVITY_DONE_TIMESTAMP',
      { id: number; timestamp: number }
    >
  | ActionWithPayload<'ADD_NEW_HOSE', HoseData>
  | ActionWithPayload<'MOVE_DRAFT_TO_DONE', number>
  | ActionWithPayload<'SET_TIMESTAMP', { id: number; timestamp: number }>
  | ActionWithPayload<'REMOVE_FROM_DRAFT', number>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_REGISTRATION_DATA'>
  | ActionWithPayload<'SET_TEMPORARY_HOSE_EDIT_DATA', TemporaryHoseEditData>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_HOSE_EDIT_DATA'>
  | ActionWithoutPayload<'CLEAR_ALL_TEMPORARY_DATA'>
  | ActionWithPayload<'FINISH_SELECTION_AND_RESET', Partial<HoseData>>;

type SettingsAction =
  // | ActionWithPayload<'UPDATE_SETTINGS', any>
  | ActionWithPayload<'UPDATE_CONNECTION_TYPE', 'wifi' | 'mobile' | null>
  | ActionWithPayload<'SET_INTERNET_REACHABLE', boolean>
  | ActionWithPayload<'SET_IS_MENU_OPEN', boolean>;

// Reducers for each slice of the app state (these should be defined elsewhere)
const authReducer = (state: AuthState, action: AppAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          name: action.payload?.name || '',
          email: action.payload?.email || '',
          id: action.payload?.id || '',
          phoneNumber: action.payload?.phoneNumber,
          customerNumbers: action.payload?.customerNumbers,
        },
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
        isLogingLoading: action.payload,
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
        lastUpdateStatus: action.payload ? 'syncing' : state.lastUpdateStatus,
      };
    case 'SET_LAST_UPDATE':
      return {
        ...state,
        lastUpdate:
          action.payload === 'error'
            ? null
            : action.payload === 'synced'
              ? new Date()
              : null,
        lastUpdateStatus: action.payload,
      };
    case 'SET_S1_CODE':
      return {
        ...state,
        s1Code: action.payload,
      };
    case 'SET_S1_ITEMS':
      return {
        ...state,
        s1Items: action.payload,
      };
    case 'CHANGE_S1_SELECTION':
      return {
        ...state,
        s1Code: action.payload,
        isLoading: true,
      };
    case 'SET_HOSE_DATA':
      return {
        ...state,
        hoses: action.payload,
      };
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
      };
    case 'ADD_NEW_HOSE':
      return {
        ...state,
        hoses: [...state.hoses, action.payload],
      };
    case 'SAVE_HOSE_DATA':
      if (action.payload.hoseId === undefined) {
        console.error('hoseId is undefined', action.payload.hoseId);
        return state;
      }
      // On submit, when the hose is to be saved, update the cache to persist the changes
      const updatedHoses = state.hoses.map((hose) =>
        hose.assetId === action.payload.hoseId
          ? {
              ...hose,
              ...action.payload.hoseData,
            }
          : hose,
      );
      return {
        ...state,
        hoses: updatedHoses,
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
    case 'SET_IS_CANCELABLE':
      return {
        ...state,
        isCancelable: action.payload,
      };

    case 'CREATE_DRAFT': {
      const newDraft = {
        ...action.payload,
        status: 'draft',
        modifiedAt: new Date().toISOString(),
      } as ActivityDraft;
      return {
        ...state,
        drafts: [...state.drafts, newDraft],
      };
    }
    case 'SAVE_DRAFT': {
      const drafts = state.drafts.find(
        (draft) => draft.id === action.payload.id,
      )
        ? state.drafts.map((draft) => {
            if (draft.id === action.payload.id) {
              return {
                ...action.payload,
                modifiedAt: new Date().toISOString(),
              } as ActivityDraft;
            }
            return draft;
          })
        : [
            ...state.drafts,
            {
              ...action.payload,
              modifiedAt: new Date().toISOString(),
            } as ActivityDraft,
          ];
      return {
        ...state,
        drafts,
      };
    }
    case 'REMOVE_DRAFT': {
      return {
        ...state,
        drafts: state.drafts.filter((draft) => draft.id !== action.payload),
      };
    }
    case 'ADD_HOSE_TO_DRAFT': {
      const { draftId, hoseId } = action.payload;
      const draft = state.drafts.find((draft) => draft.id === draftId);
      if (!draft) return state;
      return {
        ...state,
        drafts: state.drafts.map((draft) => {
          if (draft.id === draftId) {
            return {
              ...draft,
              modifiedAt: new Date().toISOString(),
              selectedIds: draft.selectedIds.includes(hoseId)
                ? draft.selectedIds
                : [...draft.selectedIds, hoseId],
            };
          }
          return draft;
        }),
      };
    }
    case 'REMOVE_FROM_DRAFT': {
      return {
        ...state,
        drafts: [
          ...state.drafts.filter((draft) => draft.id !== action.payload),
        ],
      };
    }
    case 'MOVE_DRAFT_TO_DONE': {
      const draft = state.drafts.find((draft) => draft.id === action.payload);

      return {
        ...state,
        drafts: [
          ...state.drafts.filter((draft) => draft.id !== action.payload),
        ],
        done: draft
          ? [
              ...state.done,
              {
                ...draft,
                status: 'done',
                modifiedAt: new Date().toISOString(),
              },
            ]
          : state.done,
      };
    }
    case 'SET_TIMESTAMP': {
      const done = state.done.find((d) => d.id === action.payload.id);
      if (!done) return state;
      return {
        ...state,
        done: state.done.map((d) => {
          if (d.id === action.payload.id) {
            return {
              ...d,
              syncingTimestamp: action.payload.timestamp,
            };
          }
          return d;
        }),
      };
    }

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
      return {
        ...state,
        connectionType: action.payload,
      };
    case 'SET_INTERNET_REACHABLE':
      return {
        ...state,
        internetReachable: action.payload,
      };
    case 'SET_IS_MENU_OPEN':
      return {
        ...state,
        isMenuOpen: action.payload,
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
