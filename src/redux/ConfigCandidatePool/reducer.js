import * as types from '../types'

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        durationLimit: '',
        quotaFreshGrad: '',
        quotaProfessional: '',
        maxExtend: '',
        status: false
    },
    sourceTable: [],
    form: {
        configCandidatePoolId: '',
        configCode: '',
        status: '',
        durationLimit: '',
        failedDuration: '',
        quotaCandidateFreshGraduate: '',
        quotaCandidateProfessional: '',
        confirmExpFreshGraduate: '',
        confirmExpProfessional: '',
        confirmExtendFreshGraduate: '',
        confirmExtendProfessional: '',
        periodProcessFreshGraduate: '',
        periodProcessProfessional: '',
        periodExtendFreshGraduate: '',
        periodExtendProfessional: '',
        maxExtend: '',
        confirmMaxExtend: ''
    }
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.CFG_CANDIDATE_POOL_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.CFG_CANDIDATE_POOL_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.CFG_CANDIDATE_POOL_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.CFG_CANDIDATE_POOL_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.CFG_CANDIDATE_POOL_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form
                }
            }
        }
        case types.CFG_CANDIDATE_POOL_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }

        case types.CFG_CANDIDATE_POOL_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.ConfigCandidatePoolList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.CFG_CANDIDATE_POOL_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                form: {
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
