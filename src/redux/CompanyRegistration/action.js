import * as types from "../types";

export const handleStateSearch = (property, value) => {
    return {
        type: types.COMPANY_RGST_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const iniStateSearch = () => {
    return {
        type: types.COMPANY_RGST_INIT_STATE_SEARCH,
    }
}
export const fetchSearch = (data) => {
    return {
        type: types.COMPANY_RGST_FETCH_SEARCH,
        data
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.COMPANY_RGST_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const initStateForm = () => {
    return {
        type: types.COMPANY_RGST_INIT_STATE_FORM
    }
}
export const fetchMasterData = () => {
    return {
        type: types.COMPANY_RGST_FETCH_MASTER_DATA
    }
}
export const fetchDetail = (id) => {
    return {
        type: types.COMPANY_RGST_FETCH_GET_DETAIL,
        id
    }
}
export const fetchDelete = (id) => {
    return {
        type: types.COMPANY_RGST_FETCH_DETELE,
        id
    }
}
export const fetchSubmit = (history) => {
    return {
        type: types.COMPANY_RGST_FETCH_SUBMIT,
        history
    }
}
export const fetchUpdate = (history) => {
    return {
        type: types.COMPANY_RGST_FETCH_UPDATE,
        history
    }
}