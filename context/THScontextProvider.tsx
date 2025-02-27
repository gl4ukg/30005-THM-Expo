import { THSInitialState, THSStateType } from '@/context/THSInitialState';
import { Action, THSReducer } from '@/context/THSReducer';
import React, { createContext,type Dispatch, useContext, useReducer } from 'react';

type THSContextType = {
    state: THSStateType;
    dispatch: Dispatch<Action>;
  };

export const THSContext = createContext<THSContextType | undefined>(undefined);
 const THSContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(THSReducer, THSInitialState);

    return (
        <THSContext.Provider value={{ state, dispatch }}>
            {children}
        </THSContext.Provider>
    );
};

 const useTHSContext = () => {
    const context = useContext(THSContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a THSContextProvider')
      }
    return context;
}

export { THSContextProvider, useTHSContext };