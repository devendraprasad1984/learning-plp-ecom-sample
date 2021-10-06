const keys = {
    SET_FILTER: 'SET_FILTER',
    GET_FILTER: 'GET_FILTER',
    TOGGLE_LEFT_PANE: 'TOGGLE_LEFT_PANE',
}

export default function Types() {
    return {
        keys,
        setFilterToStore: (payload) => {
            return {
                type: keys.SET_FILTER
                , payload
            }
        }, getFilterFromStore: () => {
            return {
                type: keys.GET_FILTER
            }
        }
        , toggleLeftPanel: (payload) => {
            return {
                type: keys.TOGGLE_LEFT_PANE
                ,payload
            }
        }

    }
}