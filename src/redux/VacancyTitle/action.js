import * as types from "../types";

export const handleState = (property, value) => {
    return {
        type: types.EVENT_HANDLE_STATE,
        property,
        value
    }
}
export const fetchList = (id) => {
    return {
        type: types.VACANCY_TITLE_FETCH_LIST,
        id
    }
}
export const fetchAstraOrNot = (id, phaseId, onlineTestTypeId, history) => {
    return {
        type: types.VACANCY_TITLE_FETCH_ASTRA_OR_NOT,
        id,
        phaseId,
        onlineTestTypeId,
        history
    }
}

export const fetchTestTool = (id, onlineTestTypeId) => {
    return{
        type: types.VACANCY_TITLE_FETCH_TEST_TOOL,
        id, onlineTestTypeId
    }
}

export const vacancyTitle_handleChangeCutOff = (value) => {
    return {
        type: types.VACANCY_TITLE_HANDLE_CHANGE_CUTOFF,
        value
    }
}

export const fetchCutOff = (id, onlineTestTypeId) => {
    return{
        type: types.VACANCY_TITLE_FETCH_CUTOFF_LIST,
        id, onlineTestTypeId
    }
}