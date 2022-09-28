import * as types from "../types";
export const setLoaderPosition = (property, value) => {
    return{
        type: types.POSITION_SET_LOADER,
        property, value
    }
}
export const fetchPositionMasterData = (property, value) => {
    return{
        type: types.POSITION_MASTER_DATA,
        property, value
    }
}

export const handleStatePosition = (property, value) => {
    return {
        type: types.POSITION_HANDLE_STATE,
        property,
        value
    }
}

export const handleStateSearch = (property, value) => {
    return {
        type: types.POSITION_HANDLE_STATE_SEARCH,
        property,
        value
    }
}

export const handleStateForm = (property, value) => {
    return {
        type: types.POSITION_HANDLE_STATE_FORM,
        property,
        value
    }
}

export const initSearchPosition = () => {
    return {
        type: types.POSITION_CLEAR_STATE_SEARCH,
    }
}

export const initFormPosition = () => {
    return {
        type: types.POSITION_CLEAR_STATE_FORM,
    }
}

export const fetchSearch = (property, value) => {
    return {
        type: types.POSITION_FETCH_SEARCH,
        property,
        value
    }
}

export const getDetailForm = (value) => {
    return {
        type: types.POSITION_GET_DETAIL_FORM,
        value
    }
}

export const deletePosition = (value) => {
    return {
        type: types.POSITION_DELETE,
        value
    }
}

export const postForm = (history) => {
    return {
        type: types.POSITION_SUBMIT_FORM,
        history
    }
}