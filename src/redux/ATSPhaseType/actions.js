import {
    ATSPHASETYPE_FETCH_MATER_DATA,
    ATSPHASETYPE_HANDLE_STATE_SEARCH,
    ATSPHASETYPE_CLEAR_FORM_SEARCH,
    ATSPHASETYPE_FETCH_SEARCH,
    ATSPHASETYPE_FETCH_DEL,
    ATSPHASETYPE_HANDLE_STATE_FORM,
    ATSPHASETYPE_CLEAR_FORM,
    ATSPHASETYPE_FETCH_SUBMIT_FORM,
    ATSPHASETYPE_FETCH_GET_DETAIL,
    ATSPHASETYPE_FETCH_UPDATE_FORM,
    ATSPHASETYPE_HANDLE_STATE,
    ATSPHASETYPE_HANDLE_STATE_PAGINATION
} from "../types";
import * as types from "../types";

const actions = {
    handleState: (property, value) => {
        return ({
            type: ATSPHASETYPE_HANDLE_STATE,
            property,
            value
        })
    },
    fetchMasterData: () => {
        return ({
            type: ATSPHASETYPE_FETCH_MATER_DATA,
        })
    },
    handleStateSearch: (property, value) => {
        return ({
            type: ATSPHASETYPE_HANDLE_STATE_SEARCH,
            property,
            value
        })
    },
    initStateFormSerach: () => {
        return ({
            type: ATSPHASETYPE_CLEAR_FORM_SEARCH,
        })
    },
    fetchSerach: (data) => {
        return ({
            type: ATSPHASETYPE_FETCH_SEARCH,
            data
        })
    },
    fetchListDel: (atsPhasetypeCode, isInitial) => {
        return ({
            type: ATSPHASETYPE_FETCH_DEL,
            atsPhasetypeCode, isInitial
        })
    },
    handleStateForm: (property, value) => {
        return ({
            type: ATSPHASETYPE_HANDLE_STATE_FORM,
            property,
            value
        })
    },
    initStateForm: () => {
        return ({
            type: ATSPHASETYPE_CLEAR_FORM,
        })
    },
    fecthSubmitForm: (history) => {
        return ({
            type: ATSPHASETYPE_FETCH_SUBMIT_FORM,
            history
        })
    },
    fecthGetDetail: (code) => {
        return ({
            type: ATSPHASETYPE_FETCH_GET_DETAIL,
            code
        })
    },
    fetchPostUpdateSubmit: (history) => {
        return ({
            type: ATSPHASETYPE_FETCH_UPDATE_FORM,
            history
        })
    },
    setPage: (pageNo, pageSize, totalRows) => {
        return ({
            type: ATSPHASETYPE_HANDLE_STATE_PAGINATION,
            pageNo,
            pageSize,
            totalRows
        })
    }
}

export default actions;
