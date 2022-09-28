import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search:{
        applicantPhaseCode: '',
        applicantPhaseName: '',
        applicantPhaseNameEnglish: '',
        applicantPhaseDesc: '',
        applicantPhaseDescEnglish: '',
    },
    sourceTable:[],
    form:{
        applicantPhaseCode: '',
        applicantPhaseName: '',
        applicantPhaseNameEnglish: '',
        applicantPhaseDesc: '',
        applicantPhaseDescEnglish: '',
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.APPLICANT_PHASE_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.APPLICANT_PHASE_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_PHASE_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.APPLICANT_PHASE_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_PHASE_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form,
                },
                search:{
                    ...initState.search
                }
            }
        }
        case types.APPLICANT_PHASE_HANDLE_STATE_PAGINATION:{
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.APPLICANT_PHASE_FETCH_SEARCH_SUCCESS:{
            return {
                ...state,
                sourceTable: action.value.applicantPhaseList,
                totalRows: action.value.totalRecords
            }
        }
        case types.APPLICANT_PHASE_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                form:{
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