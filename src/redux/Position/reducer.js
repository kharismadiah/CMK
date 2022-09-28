import * as types from "../types";

const initState = {
    isLoading: false,
    isEdit: false,

    pageNo: 1,
    pageSize: 10,
    totalRows: 10,

    listPosition: [],
    listGrade: [],
    listPositionLevel: [],
    searchPosition: {
        positionCode: "",
        positionName: "",
        grade: "",
        level: ""
      },
    formPosition: {
        positionId: "",
        positionCode: "",
        positionName: "",
        positionDesc: "",
        grade: "",
        level: ""
      }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.POSITION_SET_LOADER:{
            return{
                ...state,
                isLoading: action.value
            }
        }
        case types.POSITION_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                searchPosition: {
                    ...state.searchPosition,
                    [action.property]: action.value
                }
            }
        }
        case types.POSITION_CLEAR_STATE_SEARCH: {
            return {
                ...state,
                searchPosition: {
                    ...initState.searchPosition
                  }
            }
        }
        case types.POSITION_CLEAR_STATE_FORM: {
            return {
                ...state,
                formPosition: {
                    ...initState.formPosition
                  }
            }
        }
        case types.POSITION_HANDLE_STATE_FORM: {
            return {
                ...state,
                formPosition: {
                    ...state.formPosition,
                    [action.property]: action.value
                }
            }
        }
        case types.POSITION_HANDLE_STATE: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.POSITION_HANDLE_PAGINATION:{
            return{
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.POSITION_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                listPosition : action.value
            }
        }
        case types.POSITION_GET_DETAIL_FORM_SUCCESS: {
            return {
                ...state,
                formPosition: {
                    ...action.payload
                }
            }
        }
        case types.POSITION_MASTER_DATA_SUCCESS:{
            return{
                ...state,
                listGrade: action.value.sourceGradeList,
                listPositionLevel: action.value.sourceJobTitleList
            }
        }
        default:
            return {
                ...state
            }
    }
}  