import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    data: [1,2.3,4,5,6,7,8]
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.GMAIL_SIDEBAR_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        default:
            return {
                ...state
            }
    }
}  