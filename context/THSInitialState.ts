export const THSInitialState = {
    user: null,
    units: {
        availableUnits: [],
        chosenUnitId: null
    }
} 

export type THSStateType = {
    user: null | {
        email: string,
        name: string, 
        id: string, 
    },
    units: {
        availableUnits: {
            name: string, 
            id: string,
            hoses: any[]
        }[],
        chosenUnitId: string | null
    }
}