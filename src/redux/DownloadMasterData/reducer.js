import * as types from "../types";

const initState = {
    isLoading: false,
    field: {
        masterData: '',
        name: '',
        groupEvent: [],
        groupEventName: [],
        eventName: [],
        title: []
    },
    source: {
        masterData: [],
        name: [],
        groupEvent: [],
        groupEventName: [],
        title: []
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.DOWN_MASTER_DATA_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.DOWN_MASTER_DATA_HANDLE_STATE: {
            return {
                ...state,
                field: {
                    ...state.field,
                    [action.property]: action.value
                }
            }
        }
        case types.DOWN_MASTER_DATA_INIT_STATE_SEARCH: {
            return {
                ...state,
                field: {
                    ...initState.field
                }
            }
        }
        case types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    [action.property]: action.value
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}  