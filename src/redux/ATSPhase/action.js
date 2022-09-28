import * as types from "../types";

export const handleStateSearch = (property, value) => {
    return {
        type: types.ATSPHASE_HANDLE_STATE_SEARCH,
        property,
        value
    }
}

export const handleState = (property, value) => {
    return {
        type: types.ATSPHASE_HANDLE_STATE,
        property,
        value
    }
}

export const initStateFormSerach = () => {
    return {
        type: types.ATSPHASE_CLEAR_FORM_SEARCH,
    }
}

export const fetchSearch = (data) => {
    return {
        type: types.ATSPHASE_FETCH_SEARCH,
        data
    }
}

export const handleStateForm = (property, value) => {
    return {
        type: types.ATSPHASE_HANDLE_STATE_FORM,
        property,
        value
    }
}

export const initStateForm = () => {
    return {
        type: types.ATSPHASE_CLEAR_STATE_FORM,
    }
}

export const getDetailForm = (value) => {
    return {
        type: types.ATSPHASE_GET_DETAIL_FORM,
        value
    }
}

export const deleteATSPhase = (value, isInitial) => {
    return {
        type: types.ATSPHASE_GET_DEL,
        value,
        isInitial
    }
}

export const postForm = (value) => {
    return {
        type: types.ATSPHASE_SUBMIT_FORM,
        value
    }
}
