import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    TotalApplicants: 0,
    listData:[],
    source: {
        onlineTypeTest: [],
        testToolList: [],
        totalTools: 0,
        cutOff: '',
        cutOffListOT: []
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.VACANCY_TITLE_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.VACANCY_TITLE_FETCH_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.data.PhaseList,
                TotalApplicants: action.data.TotalApplicants
            }
        }
        case types.VACANCY_TITLE_FETCH_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.VACANCY_TITLE_FETCH_TEST_TOOL_SUCCESS:{
            return{
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.VACANCY_TITLE_HANDLE_CHANGE_CUTOFF: {
            return {
                ...state,
                source: {
                    ...state.source,
                    cutOff: action.value
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}  