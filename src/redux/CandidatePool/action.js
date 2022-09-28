import * as types from '../types'

export const fetchGetMasterData = () => {
    return {
        type: types.CANDIDATE_POOL_FETCH_MASTER_DATA
    }
}
export const handleStateSearch = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_SEARCH,
        property,
        value
    }
}
export const initStateSearch = () => {
    return {
        type: types.CANDIDATE_POOL_INIT_STATE_SEARCH
    }
}
export const handleStateGlobal = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
        property,
        value
    }
}
export const fetchGetData = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_LIST,
        data
    }
}
export const fetchTestTypeReqCandidate = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_LIST_TESTTYPE,
        data
    }
}
export const fetchRequestAndGenerateList = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_REQUEST_AND_GENERATE_LIST,
        data
    }
}
export const fetchGetDetail = id => {
    return {
        type: types.CANDIDATE_POOL_FETCH_GET_DETAIL,
        id
    }
}
export const handleSearchVacancy = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_SERACH,
        property,
        value
    }
}
export const onClearActiveVacancy = () => {
    return {
        type: types.CANDIDATE_POOL_CLEAR_ACTIVE_VACANCY
    }
}
export const fetchGetDataActiveVacancy = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_GET_ACTIVE_VACANCY,
        data
    }
}
export const fetchGetDetailsActiveVacancy = id => {
    return {
        type: types.CANDIDATE_POOL_FETCH_DETAILS_ACTIVE_VACANCY,
        id
    }
}
export const handleStateEmail = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_EMAIL,
        property,
        value
    }
}
export const initStateDetailResume = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_CLEAR_STATE_DETAIL_RESUME
    }
}
export const fetchInviteToJoinEmailRedactional = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_FETCH_EMAIL_REDACTIONAL,
        property,
        value
    }
}
export const fetchSendInvitationEmail = () => {
    return {
        type: types.CANDIDATE_POOL_FETCH_SEND_INVITATION_EMAIL
    }
}
export const fetchTabInvited = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_TAB_INVITED,
        data
    }
}
export const handleStateFilterInvited = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_INVITED_FILTER,
        property,
        value
    }
}
export const handleStateFilterEducation = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_EDUCATION_FILTER,
        property,
        value
    }
}
export const handleStateFilterOrg = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_ORG_FILTER,
        property,
        value
    }
}
export const handleStateFilterJob = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_JOB_FILTER,
        property,
        value
    }
}
export const handleStateFilterInvt = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_INVT_FILTER,
        property,
        value
    }
}
export const handleStateFilterApp = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_APP_FILTER,
        property,
        value
    }
}
export const resetFilterInvited = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_INVITED
    }
}
export const resetFilterEducation = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_EDUCATION
    }
}
export const resetFilterOrg = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_ORG
    }
}
export const resetFilterJob = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_JOB
    }
}
export const resetFilterInvt = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_INVIT
    }
}
export const resetFilterApp = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_FILTER_APP
    }
}
export const fetchExtendInvited = () => {
    return {
        type: types.CANDIDATE_POOL_FETCH_EXTEND_INVITED
    }
}
export const fetchDownloadFlk = applicantId => {
    return {
        type: types.CANDIDATE_POOL_FETCH_DOWNLOAD_FLK,
        applicantId
    }
}
export const handleStateRuqest = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_REQUEST_LIST,
        property,
        value
    }
}
export const fetchTestType = applicantId => {
    return {
        type: types.CANDIDATE_POOL_FETCH_REQUEST,
        applicantId
    }
}
export const fetchTestTool = () => {
    return {
        type: types.CANDIDATE_POOL_FETCH_LIST_TESTTOOL
    }
}
export const fetchRequestList = data => {
    return {
        type: types.CANDIDATE_POOL_FETCH_REQUEST_LIST,
        data
    }
}
export const fetchUploadResult = () => {
    return {
        type: types.CANDIDATE_POOL_FETCH_UPLOAD_RESULT
    }
}
export const getListEmailTemplate = () => {
    return {
        type: types.CANDIDATE_POOL_GET_LIST_EMAIL_TEMPLATE
    }
}

export const resetEmailTemplateState = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_EMAIL_TEMPLATE_STATE
    }
}
export const changeTabkey = activeKey => {
    return {
        type: types.CANDIDATE_POOL_CHANGE_TAB_KEY,
        activeKey
    }
}

export const checkInviteToJoin = () => {
    return {
        type: types.CANDIDATE_POOL_CHECK_INVITE_TO_JOIN
    }
}

export const resetTabInvited145 = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_TAB_INVITED_1_4_5
    }
}

export const resetTabInvited23 = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_TAB_INVITED_2_3
    }
}

export const resetStateEmailModal = () => {
    return {
        type: types.CANDIDATE_POOL_RESET_STATE_EMAIL_MODAL
    }
}
export const getTriggerMasterData = () => {
    return {
        type: types.CANDIDATE_POOL_GET_TRIGGER_MASTER_DATA
    }
}

export const submitRequestCandidate = () => {
    return {
        type: types.CANDIDATE_POOL_SUBMIT_REQUEST_CANDIDATE
    }
}

export const requestApproval = data => {
    ///APRROVE REJECT FILE REQUEST
    return {
        type: types.CANDIDATE_POOL_REQUEST_APPROVAL,
        data
    }
}

export const handleStateSearchHistory = (property, value) => {
    return {
        type: types.CANDIDATE_POOL_HANDLE_STATE_SEARCH_HISTORY,
        property, value
    }
}

export const initStateSearchHistory = () => {
    return {
        type: types.CANDIDATE_POOL_INIT_STATE_SEARCH_HISTORY
    }
}

export const getHistoryList = (data) => {
    return {
        type: types.CANDIDATE_POOL_FETCH_HISTORY_lIST,
        data
    }
}

export const uploadPdfResult = (data) => {
    return {
        type: types.CANDIDATE_POOL_UPLOAD_PDF_RESULT,
        data
    }
}

export const regenerateRequest = (requestId) => {
    return {
        type: types.CANDIDATE_POOL_REGENERATE_REQUEST,
        requestId
    }
}