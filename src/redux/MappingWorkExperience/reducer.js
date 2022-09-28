import * as types from '../types'

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        workExpRange: '',
        category: ''
    },
    sourceTable: [],
    form: {
        YearsOfExperienceId: 0,
        YoeMonthFrom: '',
        YoeYearFrom: '',
        YoeYearTo: '',
        YoeMonthTo: '',
        YoeCategoryName: '',
        YoeCategoryId: '',
        TotalRows: ''
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
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.MAPP_PHASE_STATUS_SET_LOADER: {
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
                    ...initState.search
                }
            }
        }
        case types.MAPPINGWORKEXP_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.MAPPINGWORKEXP_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    YearsOfExperienceId: '',
                    YoeMonthFrom: '',
                    YoeYearFrom: '',
                    YoeYearTo: '',
                    YoeMonthTo: '',
                    YoeCategoryName: ''
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
        case types.WORKMAPEXP_STATUS_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }
        case types.WORKING_MAPPING_EXP_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data,
                totalRows: action.data.length
            }
        }
        case types.WORKING_MAPPING_EXP_DETAILS_SUCCESS: {
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
