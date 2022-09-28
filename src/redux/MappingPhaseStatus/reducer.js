import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        applicantPhaseName: '',
        applicantStatusName: '',
    },
    sourceTable: [],
    form: {
        applicantPhaseFlag: '',
        applicantPhase: '',
        listTable: []
    },
    source: {
        applicantPhase: [],
        applicantStatusName: [],
        isComplete: [
            {
                id: 0,
                name: 'No'
            },
            {
                id: 1,
                name: 'Yes'
            }
        ]
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.WORKMAPEXP_STATUS_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.MAPP_PHASE_STATUS_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.MAPP_PHASE_STATUS_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.MAPP_PHASE_STATUS_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.MAPP_PHASE_STATUS_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    applicantPhase: '',
                    listTable: []
                }
            }
        }
        case types.MAPP_PHASE_STATUS_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.MAPP_PHASE_STATUS_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.MAPP_PHASE_STATUS_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.applicantPhaseStatusMappingList,
                totalRows: action.data.totalRecords
            }
        }
        case types.MAPP_PHASE_STATUS_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                form: action.data
            }
        }
        default:
            return {
                ...state
            }
    }
}  