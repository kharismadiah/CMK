import * as types from "../types";

export const handleStateSort = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_SORT,
        property,
        value
    }
}
export const handleStateFilter = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_FILTER,
        property,
        value
    }
}
export const handleStateListData = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_LIST_DATA,
        property,
        value
    }
}
export const handleStateModalDetail = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_DETAIL,
        property,
        value
    }
}
export const handleStateModalParam = (data) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_DETAIL_PARAM,
        data
    }
}
export const handleStateModalEmail = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_EMAIL,
        property,
        value
    }
}
export const handleStateModalAction = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_ACTION,
        property,
        value
    }
}
export const handleStateModalPool = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_POOL,
        property,
        value
    }
}
export const initStateEmailModal = () => {
    return {
        type: types.INTERVIEW_TEST_CREAR_STATE_MODAL_EMAIL,
    }
}
export const handleStateModalInterviewTest = (property, value) => {
    return {
        type: types.INTERVIEW_TEST_HANDLE_STATE_MODAL_INTERVIEW_TEST,
        property,
        value
    }
}
export const getMasterDataInterview = () => {
    return {
        type: types.INTERVIEW_FETCH_MATER_DATA,
    }
}