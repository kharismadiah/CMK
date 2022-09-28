import * as types from "../types";

export const handleStateSearch = (property, value) => {
    return {
        type: types.APPLICANT_STATUS_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initStateSearch = () => {
    return {
        type: types.APPLICANT_STATUS_INIT_STATE_SEARCH
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.APPLICANT_STATUS_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const initStateForm = () => {
    return {
        type: types.APPLICANT_STATUS_INIT_STATE_FORM
    }
}
export const fetchSearch = (data) => {
    return {
        type: types.APPLICANT_STATUS_FETCH_SEARCH,
        data
    }
}
export const fetchSubmit = (history) => {
    return {
        type: types.APPLICANT_STATUS_FETCH_SUBMIT,
        history
    }
}
export const fetchDetail = (id) => {
    return {
        type: types.APPLICANT_STATUS_FETCH_DETAIL,
        id
    }
}
export const fetchEdit = (id, history) => {
    return {
        type: types.APPLICANT_STATUS_FETCH_EDIT,
        id,
        history
    }
}
export const fetchDelete = (id, isInitial) => {
    return {
        type: types.APPLICANT_STATUS_FETCH_DELETE,
        id, isInitial
    }
}