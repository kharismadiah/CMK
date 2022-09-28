import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        company: '',
        description: '',
        date: null,
        to: null
    },
    form: {
        cbtCompanyId: null,
        company: '',
        startDate: null,
        endDate: null,
        present: false,
        notes: '',
        notesHistory: ''
    },
    listTable:[],
    source: {
        company: []
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.COMPANY_RGST_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.COMPANY_RGST_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.COMPANY_RGST_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.COMPANY_RGST_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.COMPANY_RGST_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                listTable: action.data.CBTcompanyList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.COMPANY_RGST_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.COMPANY_RGST_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form
                }
            }
        }
        case types.COMPANY_RGST_FETCH_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    company: action.payload.Company
                }
            }
        }
        case types.COMPANY_RGST_FETCH_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                form: {
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