import * as types from "../types";

export const handleStateField = (property, value) => {
    return {
        type: types.DOWN_MASTER_DATA_HANDLE_STATE,
        property,
        value
    }
}
export const iniStateField = () => {
    return {
        type: types.DOWN_MASTER_DATA_INIT_STATE_SEARCH,
    }
}
export const fetchPostion = () => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_POSITION
    }
}
export const fetchGroupEvent = () => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_GROUP_EVENT
    }
}
export const fetchEventList = (id) => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_EVENT_LIST,
        id
    }
}
export const fetchVacancyList = (id) => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_VACANCY_LIST,
        id
    }
}
export const fetchDownloadEvent = () => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_DOWN_EVENT
    }
}
export const fetchDownloadPosition = () => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_DOWN_POSITION
    }
}
export const fetchDownloadVacancy = () => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_DOWN_VACANCY
    }
}
export const fetchMasterData = (value) => {
    return {
        type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA,
        value
    }
}