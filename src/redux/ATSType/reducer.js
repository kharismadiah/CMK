import * as types from "../types";

const initState = {
    isLoading: false,
    isEdit: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search:{
        company: '',
        branch: '',
        atsTypeCode: '',
        atsTypeName: '',
        description: ''
    },
    sourceTable:[],
    formATSType:{
        atsTypeCode: '',
        atsType: '',
        description: ''
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.ATSTYPE_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.ATSTYPE_HANDLE_STATE:{
            return{
                ...state,
                [action.property]: action.value
            }
        }
        case types.ATSTYPE_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.ATSTYPE_INIT_CLEAR_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.ATSTYPE_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.ATSTypeList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.ATSTYPE_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.ATSTYPE_HANDLE_STATE_FORM: {
            return {
                ...state,
                formATSType:{
                    ...state.formATSType,
                    [action.property]: action.value
                }
            }
        }
        case types.ATSTYPE_INIT_CLEAR_FORM: {
            return {
                ...state,
                formATSType: {
                    ...initState.formATSType,
                }
            }
        }
        case types.ATSTYPE_FETCH_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formATSType: {
                    atsTypeCode: action.data.ATSTypeCode,
                    atsType: action.data.ATSTypeName,
                    description: action.data.Description
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}  