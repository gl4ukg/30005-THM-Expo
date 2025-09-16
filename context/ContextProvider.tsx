import { AppState, initialState } from '@/context/state';
import { AppAction, AppContext, rootReducer } from '@/context/Reducer';
import React, { useContext, useReducer } from 'react';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(
    rootReducer,
    initialState,
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useContext must be used within a ContextProvider');
  }
  return context;
};

export { ContextProvider, useAppContext };
