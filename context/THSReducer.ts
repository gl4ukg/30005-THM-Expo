import { THSInitialState, THSStateType } from "@/context/THSInitialState"

interface ActionWithPayload<T extends string, Payload> {
    type: T
    payload: Payload
}

interface ActionWithoutPayload<T extends string> {
    type: T
}

export type SetUserAction = ActionWithPayload<"SET_USER", THSStateType["user"]>   

export type ResetAction = ActionWithoutPayload<"RESET_USER">
export type ResetUnits = ActionWithoutPayload<"RESET_UNITS">
export type SetUnits = ActionWithPayload<"SET_UNITS", THSStateType["units"]["availableUnits"]>
export type AddUnit = ActionWithPayload<"ADD_UNIT", THSStateType["units"]["availableUnits"][0]>
export type RemoveUnit = ActionWithPayload<"REMOVE_UNIT", THSStateType["units"]["availableUnits"][0]["id"]>
export type SetChosenUnit = ActionWithPayload<"SET_CHOSEN_UNIT", THSStateType["units"]["chosenUnitId"]>



export type Action = SetUserAction | ResetAction | SetUnits | SetChosenUnit | ResetUnits | AddUnit | RemoveUnit

export const THSReducer = (state: THSStateType, action: Action): THSStateType => {
    
    switch (action.type) {
        case 'SET_USER':{
            console.log("SET_USER", action.payload)
            return ({
                ...state,
                user: action.payload
            })
        }
        case 'RESET_USER':{
            console.log("RESET_USER")
            console.log({
                ...state, 
                user: null
            })
            return ({
                ...state, 
                user: null
            })
        }
        case 'SET_UNITS':{
            return ({
                ...state,
                units: {
                    ...state.units,
                    availableUnits: action.payload
                }
            })
        }
        case 'SET_CHOSEN_UNIT':{
            return ({
                ...state,
                units: {
                    ...state.units,
                    chosenUnitId: action.payload
                }
            })
        }
        case 'RESET_UNITS':{
            return ({
                ...state,
                units: {
                    ...state.units,
                    chosenUnitId: null,
                    availableUnits: []
                }
            })
        }
        case 'ADD_UNIT':{
            return ({
                ...state,
                units: {
                    ...state.units,
                    availableUnits: [...state.units.availableUnits, action.payload]
                }
            })
        }
        case 'REMOVE_UNIT':{
            return ({
                ...state,
                units: {
                    ...state.units,
                    availableUnits: state.units.availableUnits.filter(unit => unit.id !== action.payload)
                }
            })
        }
    }

}