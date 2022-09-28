import * as types from "../types";

export const handleState = (property, value) => {
    return {
        type: types.ATSTYPE_HANDLE_STATE,
        property,
        value
    }
}
export const handleStateSearch = (property, value) => {
    return {
        type: types.ATSTYPE_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initClearSearch = () => {
    return {
        type: types.ATSTYPE_INIT_CLEAR_SEARCH,
    }
}
export const fetchPostSearch = (data) => {
    return {
        type: types.ATSTYPE_FETCH_SEARCH,
        data
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.ATSTYPE_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const fetchPostData = (history) => {
    return {
        type: types.ATSTYPE_FETCH_SUBMIT_FORM,
        history
    }
}
export const initClearForm = () => {
    return {
        type: types.ATSTYPE_INIT_CLEAR_FORM,
    }
}
export const fetchGetDetail = (id) => {
    return {
        type: types.ATSTYPE_FETCH_GET_DETAIL,
        id
    }
}
export const fetchDeleteList = (id, isInitial) => {
    return {
        type: types.ATSTYPE_FETCH_DELETE_LIST,
        id, isInitial
    }
}
export const fetchUpdateDetail = (id,history) => {
    return {
        type: types.ATSTYPE_FETCH_UPDATE_DETAIL,
        id,
        history
    }
}