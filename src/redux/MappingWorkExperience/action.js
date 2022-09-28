import * as types from '../types'

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
        type: types.MAPPINGWORKEXP_HANDLE_STATE_FORM,
        property,
        value
    }
}
export const initStateForm = () => {
    return {
        type: types.MAPPINGWORKEXP_INIT_STATE_FORM
    }
}

export const fetchMasterData = () => {
    return {
        type: types.MAPP_PHASE_STATUS_FETCH_MASTER_DATA
    }
}
export const fetchData = data => {
    return {
        type: types.WORKING_MAPPING_EXP_FETCH_DATA,
        data
    }
}
export const fetchDelete = id => {
    return {
        type: types.WORKING_MAPPING_EXP_DELETE,
        id
    }
}

export const fetchSubmit = (id, history) => {
    return {
        type: types.WORKING_MAPPING_CREATE_UPDATE_DATA,
        id,
        history
    }
}
export const fetchDetail = id => {
    return {
        type: types.WORKING_MAPPING_EXP_DETAILS,
        id
    }
}
