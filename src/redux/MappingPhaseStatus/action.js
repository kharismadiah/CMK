import * as types from "../types";

export const handleStateSearch = (property, value) => {
    return {
        type: types.MAPP_PHASE_STATUS_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initStateSearch = () => {
    return {
        type: types.MAPP_PHASE_STATUS_INIT_STATE_SEARCH
    }
}
export const handleStateForm = (property, value) => {
    return {
        type: types.MAPP_PHASE_STATUS_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const initStateForm = () => {
    return {
        type: types.MAPP_PHASE_STATUS_INIT_STATE_FORM
    }
}


export const fetchMasterData = () => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_MASTER_DATA
    }
}
export const fetchSearch = (data) => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_SEARCH,
        data
    }
}
export const fetchDelete = (id) => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_DELETE,
        id
    }
}
export const fetchDetail = (id, history) => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_DETAIL,
        id,
        history
    }
}
export const fetchSubmit = (history) => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_SUBMIT,
        history
    }
}
export const fetchEdit = (id, history) => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_EDIT,
        id,
        history
    }
}