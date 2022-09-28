import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 0,

    search:{
        phaseCode: '',
        phase: '',
        description: '',
        company:'',
        branch:''
    },
    sourceList:[],
    formATSPhase:{
        ATSPhaseCode: '',
        ATSPhase: '',
        description: ''
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.ATSPHASE_SET_LOADER:{
            return{
                ...state,
                isLoading: action.value
            }
        }
        case types.ATSPHASE_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.ATSPHASE_HANDLE_STATE: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.ATSPHASE_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                listATSPhase : action.value
            }
        }
        case types.ATSPHASE_CLEAR_FORM_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.ATSPHASE_HANDLE_STATE_FORM: {
            return {
                ...state,
                formATSPhase: {
                    ...state.formATSPhase,
                    [action.property]: action.value
                }
            }
        }
        case types.ATSPHASE_CLEAR_STATE_FORM: {
            return {
                ...state,
                formATSPhase: {
                    ...initState.formATSPhase
                }
            }
        }
        case types.ATSPHASE_GET_DETAIL_FORM_SUCCESS: {
            return {
              ...state,
              formATSPhase: {
                ...action.payload
              }
            }
          }
        case types.ATSPHASE_HANDLE_STATE_PAGINATION:{
            return{
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        default:
            return {
                ...state
            }
    }
}  