import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search:{
        generalFilter: '',
        groupEvent: '',
        event: '',
    },
    sourceTable:[],
    form:{
        generalFilterCode: '',
        generalFilter: '',
        groupEvent: '',
        event: ''
    },
    source:{
        generalFilter:[],
        groupEvent:[],
        groupEventListAffco: [],
        event: [],
        eventFilter:[],
    },
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.CONFIG_FILTER_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.CONFIG_FILTER_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.CONFIG_FILTER_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.CONFIG_FILTER_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.CONFIG_FILTER_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        } 
        case types.CONFIG_FILTER_HANDLE_STATE_SOURCE: {
            return {
                ...state,
                source: {
                    ...state.source,
                    [action.property]: action.value
                }
            }
        }
        case types.CONFIG_FILTER_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form,
                }
            }
        }
        case types.CONFIG_FILTER_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.CONFIG_FILTER_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.GeneralFilterConfigList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.CONFIG_FILTER_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                form:{
                    ...state.form,
                    ...action.data
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}  