import * as types from "../types";

export const handleStateSearch = (property, value) => {
    return {
        type: types.CONFIG_FILTER_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initStateSearch = () => {
    return {
        type: types.CONFIG_FILTER_INIT_STATE_SEARCH
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.CONFIG_FILTER_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const handleStateSource = (property, value) => {
    return {
        type: types.CONFIG_FILTER_HANDLE_STATE_SOURCE,
        property,
        value
    }
}
export const initStateForm = () => {
    return {
        type: types.CONFIG_FILTER_INIT_STATE_FORM
    }
}
export const fetchMasterData = () => {
    return {
        type: types.CONFIG_FILTER_FETCH_MASTER_DATA
    }
}
export const fetchSearch = (data) => {
    return {
        type: types.CONFIG_FILTER_FETCH_SEARCH,
        data
    }
}
export const fetchSubmit = (history) => {
    return {
        type: types.CONFIG_FILTER_FETCH_SUBMIT,
        history
    }
}
export const fetchDetail = (id) => {
    return {
        type: types.CONFIG_FILTER_FETCH_DETAIL,
        id
    }
}
export const fetchDelete = (id) => {
    return {
        type: types.CONFIG_FILTER_FETCH_DELETE,
        id
    }
}
export const fetchUpdate = (id, history) => {
    return {
        type: types.CONFIG_FILTER_FETCH_EDIT,
        id,
        history
    }
}