import * as types from "../types";

export const handleState = (property, value) => {
    return {
        type: types.EVENT_HANDLE_STATE,
        property,
        value
    }
}
export const handleStateAutoGenerate = (property, value) => {
    return{
        type:types.EVENT_HANDLE_STATE_AUTO_GENERATE,
        property,
        value
    }
}
export const handleStateSearch = (property, value) => {
    return {
        type: types.EVENT_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initClearSearch = () => {
    return {
        type: types.EVENT_INIT_CLEAR_SEARCH,
    }
}
export const fetchPostSearch = (data) => {
    return {
        type: types.EVENT_FETCH_SEARCH,
        data
    }
}
export const fetchDeleteList = (id) => {
    return {
        type: types.EVENT_FETCH_DELETE_LIST,
        id
    }
}
export const fetchGetMasterData = (id) => {
    return {
        type: types.EVENT_FETCH_MATER_DATA,
        id
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.EVENT_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const fetchSubmitForm = (history) => {
    return {
        type: types.EVENT_FETCH_SUBMIT_FORM,
        history
    }
}
export const initClearForm = () => {
    return {
        type: types.EVENT_INIT_CLEAR_FORM,
    }
}
export const fetchGetDetail = (id) => {
    return {
        type: types.EVENT_FETCH_GET_DETAIL,
        id
    }
}
export const fetchUpdateDetail = (id, history) => {
    return {
        type: types.EVENT_FETCH_UPDATE_DETAIL,
        id,
        history
    }
}
