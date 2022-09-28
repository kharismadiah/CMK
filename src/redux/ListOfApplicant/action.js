import * as types from '../types'

export const fetchGetMasterData = () => {
    return {
        type: types.APPLICANT_FETCH_MATER_DATA
    }
}
export const handleState = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE,
        property,
        value
    }
}
export const onClearStateSearch = () => {
    return {
        type: types.APPLICANT_CLEAR_SEARCH
    }
}
export const fetchGetData = data => {
    return {
        type: types.APPLICANT_FETCH_GET_LIST,
        data
    }
}
export const fetchGetDetail = id => {
    return {
        type: types.APPLICANT_FETCH_GET_DETAIL,
        id
    }
}
export const handleStateGlobal = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE_GLOBAL,
        property,
        value
    }
}
export const fetchPostTag = () => {
    return {
        type: types.APPLICANT_FETCH_TAG
    }
}
export const fetchPostRelease = () => {
    return {
        type: types.APPLICANT_FETCH_RELEASE
    }
}
export const fetchPostInvited = () => {
    return {
        type: types.APPLICANT_FETCH_INVITED
    }
}
export const handleSearchVacancy = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE_SERACH,
        property,
        value
    }
}
export const onClearActiveVacancy = () => {
    return {
        type: types.APPLICANT_CLEAR_ACTIVE_VACANCY
    }
}
export const fetchGetDataActiveVacancy = data => {
    return {
        type: types.APPLICANT_FETCH_GET_ACTIVE_VACANCY,
        data
    }
}
export const fetchGetDetailsActiveVacancy = id => {
    return {
        type: types.APPLICANT_FETCH_DETAILS_ACTIVE_VACANCY,
        id
    }
}
export const handleStateEmail = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE_EMAIL,
        property,
        value
    }
}
export const initStateDetailResume = (property, value) => {
    return {
        type: types.APPLICANT_CLEAR_STATE_DETAIL_RESUME
    }
}
export const fetchInviteToJoinEmailRedactional = (property, value) => {
    return {
        type: types.APPLICANT_FETCH_EMAIL_REDACTIONAL,
        property,
        value
    }
}
export const fetchSendInvitationEmail = (property, value) => {
    return {
        type: types.APPLICANT_FETCH_SEND_INVITATION_EMAIL,
        property,
        value
    }
}

export const handleStateFilterApp = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE_APP_FILTER,
        property,
        value
    }
}

export const handleStateFilterInv = (property, value) => {
    return {
        type: types.APPLICANT_HANDLE_STATE_INV_FILTER,
        property,
        value
    }
}

export const resetFilterInv = () => {
    return {
        type: types.APPLICANT_RESET_FILTER_INV,
    }
}
export const resetFilterApp = () => {
    return {
        type: types.APPLICANT_RESET_FILTER_APP,
    }
}

export const checkInviteToJoin = () => {
    return {
        type: types.APPLICANT_CHECK_INVITE_TO_JOIN
    }
}

export const resetStateEmailModal = () => {
    return {
        type: types.APPLICANT_RESET_STATE_EMAIL_MODAL
    }
}
export const getListEmailTemplate = () => {
    return {
        type: types.APPLICANT_GET_LIST_EMAIL_TEMPLATE,
    }
}

export const resetEmailTemplateState = () => {
    return {
        type :types.APPLICANT_RESET_EMAIL_TEMPLATE_STATE
    }
}

export const getTriggerMasterData = () => {
    return {
        type : types.APPLICANT_GET_TRIGGER_MASTER_DATA
    }
}

export const fetchDownloadFlk = (applicantId) => {
    return {
        type: types.APPLICANT_FETCH_DOWNLOAD_FLK,
        applicantId
    }
}