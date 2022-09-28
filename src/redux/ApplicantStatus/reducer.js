import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search:{
        applicantStatusCode: '',
        applicantStatusName: '',
        applicantStatusNameEnglish: '',
        applicantStatusDesc: '',
        applicantStatusDescEnglish: '',
    },
    sourceTable:[],
    form:{
        applicantStatusCode: '',
        applicantStatusName: '',
        applicantStatusNameEnglish: '',
        applicantStatusDesc: '',
        applicantStatusDescEnglish: '',
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.APPLICANT_STATUS_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.APPLICANT_STATUS_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_STATUS_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.APPLICANT_STATUS_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_STATUS_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form,
                }
            }
        }
        case types.APPLICANT_STATUS_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.APPLICANT_STATUS_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.applicantStatusList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.APPLICANT_STATUS_FETCH_DETAIL_SUCCESS: {
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