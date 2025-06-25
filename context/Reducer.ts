import { ActivityType } from '@/components/dashboard/activitiesList.tsx/activity';
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
} from '@/context/state';
import { HoseData } from '@/lib/types/hose';
import { act, createContext } from 'react';

export interface PartialFormData {
  comment?: string;
  name?: string;
  email?: string;
  phone?: string;
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
  | ActionWithPayload<'LOGIN', AuthState['user']>
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
  | ActionWithPayload<'SAVE_DRAFT', Omit<ActivityDraft, 'modifiedAt'>>
  | ActionWithPayload<
      'ADD_HOSE_TO_DRAFT',
      {
        draftId: number;
        hoseId: number;
      }
    >
  | ActionWithPayload<'MOVE_DRAFT_TO_DONE', number>
  | ActionWithPayload<'REMOVE_FROM_DRAFT', number>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_REGISTRATION_DATA'>
  | ActionWithPayload<'SET_TEMPORARY_HOSE_EDIT_DATA', TemporaryHoseEditData>
  | ActionWithoutPayload<'CLEAR_TEMPORARY_HOSE_EDIT_DATA'>
  | ActionWithoutPayload<'CLEAR_ALL_TEMPORARY_DATA'>
  | ActionWithPayload<'FINISH_SELECTION_AND_RESET', Partial<HoseData>>;

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
    case 'SET_IS_CANCELABLE':
      return {
        ...state,
        isCancelable: action.payload,
      };

    case 'CREATE_DRAFT': {
      const newDraft = {
        ...action.payload,
        status: 'draft',
        modifiedAt: new Date(),
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
                modifiedAt: new Date(),
              } as ActivityDraft;
            }
            return draft;
          })
        : [
            ...state.drafts,
            { ...action.payload, modifiedAt: new Date() } as ActivityDraft,
          ];
      return {
        ...state,
        drafts,
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
              modifiedAt: new Date(),
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
              { ...draft, status: 'done', modifiedAt: new Date() },
            ]
          : state.done,
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
