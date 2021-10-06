import Types from "../types";

const types = Types()
export const filterReducer = (state = null, action) => {
    switch (action.type) {
        case types.keys.SET_FILTER:
            return {...state, filters: action.payload}
        case types.keys.GET_FILTER:
            return state
        default:
            return state
    }
}

export const toggleLeftPanel = (state = {visible: true}, action) => {
    switch (action.type) {
        case types.keys.TOGGLE_LEFT_PANE:
            return {...state,visible: action.payload}
        default:
            return state
    }
}