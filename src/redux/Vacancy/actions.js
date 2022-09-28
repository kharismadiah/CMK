import {
    SET_LOADER,
    INIT_STATE_VACANCY,
    INIT_FORM_SEARCH,
    INIT_FORM_SEARCH_APPROVAL,
    INIT_FORM_SEARCH_DRAFT,
    INIT_FORM_SEARCH_CLOSED,
    INIT_FORM_SEARCH_REVISION,
    INIT_FORM_SEARCH_ARCHIVED,
    INIT_FORM_VACANCY,
    INIT_PAGING,

    HANDLE_STATE_VACANCY,
    HANDLE_STATE_VACANCY_STATUS,
    HANDLE_STATE_EVENT_NAME,
    HANDLE_STATE_POSITION,
    HANDLE_STATE_FORM_VACANCY,
    HANDLE_CANDIDATE_TYPE,

    GET_ACTIVE_VACANCY,
    GET_ACTIVE_VACANCY_SEARCH,
    GET_REVISION_VACANCY,
    GET_REVISION_VACANCY_SEARCH,
    GET_APPROVAL_VACANCY,
    GET_APPROVAL_VACANCY_SEARCH,
    GET_DRAFT_VACANCY,
    GET_DRAFT_VACANCY_SEARCH,
    GET_CLOSED_VACANCY,
    GET_CLOSED_VACANCY_SEARCH,
    GET_ARCHIVED_VACANCY,
    GET_ARCHIVED_VACANCY_SEARCH,
    GET_LOAD_FORM_VACANCY,
    GET_LOAD_FORM_VACANCY2,
    GET_DETAILS_VACANCY,
    GET_DETAILS_ATS_PHASE_TYPE,

    GET_EVENT_CREATE_LOAD,

    GET_ROLE,
    GET_TOKEN,

    SUBMIT_VACANCY,
    DRAFT_VACANCY,
    APPROVE_VACANCY,
    UPDATE_VACANCY,
    UPDATE_DRAFT_VACANCY,
    DELETE_VACANCY,
    HANDLE_STATE_COMPANY,
    CLOSE_VACANCY
} from "../types";

const actions = {
    getRole: () => {
        return ({
            type: GET_ROLE
        })
    },
    getToken: () => {
        return ({
            type: GET_TOKEN
        })
    },
    setLoader: (data) => {
        return ({
            type: SET_LOADER,
            payload: data
        })
    },
    initStateVacancy: () => {
        return ({
            type: INIT_STATE_VACANCY
        })
    },
    initFormSearch: () => {
        return ({
            type: INIT_FORM_SEARCH
        })
    },
    initFormSearchApproval: () => {
        return ({
            type: INIT_FORM_SEARCH_APPROVAL
        })
    },
    initFormSearchDraft: () => {
        return ({
            type: INIT_FORM_SEARCH_DRAFT
        })
    },
    initFormSearchClosed: () => {
        return ({
            type: INIT_FORM_SEARCH_CLOSED
        })
    },
    initFormSearchRevision: () => {
        return ({
            type: INIT_FORM_SEARCH_REVISION
        })
    },
    initFormSearchArchived: () => {
        return ({
            type: INIT_FORM_SEARCH_ARCHIVED
        })
    },
    initFormVacancy: () => {
        return ({
            type: INIT_FORM_VACANCY
        })
    },
    initPaging: () => {
        return ({
            type: INIT_PAGING
        })
    },
    handleStateVacancy: (field, value) => {
        return ({
            type: HANDLE_STATE_VACANCY,
            field,
            value
        })
    },
    handleStateFormVac: (field, value, data) => {
        return ({
            type: HANDLE_STATE_FORM_VACANCY,
            field,
            value,
            data
        })
    },
    handleStateVacancyStatus: (field, value, data) => {
        return ({
            type: HANDLE_STATE_VACANCY_STATUS,
            field,
            value,
            data
        })
    },
    handleStateEventName: (field, value, data) => {
        return ({
            type: HANDLE_STATE_EVENT_NAME,
            field,
            value,
            data
        })
    },
    handleStatePosition: (field, value, data) => {
        return ({
            type: HANDLE_STATE_POSITION,
            field, value, data
        })
    },
    handleStateCompany: (field, value, data) => {
        return ({
            type: HANDLE_STATE_COMPANY,
            field, value, data
        })
    },
    handleCandidateType: (value) => {
        return ({
            type: HANDLE_CANDIDATE_TYPE,
            value
        })
    },
    getActiveVacancy: (data, field) => {
        return {
            type: GET_ACTIVE_VACANCY,
            data,
            field
        }
    },
    getActiveVacancySearch: (filter) => {
        return {
            type: GET_ACTIVE_VACANCY_SEARCH,
            filter
        }
    },
    getRevisionVacancy: (data, field) => {
        return {
            type: GET_REVISION_VACANCY,
            data, field
        }
    },
    getRevisionVacancySearch: (filter) => {
        return {
            type: GET_REVISION_VACANCY_SEARCH,
            filter
        }
    },
    getApprovalVacancy: (data, field) => {
        return {
            type: GET_APPROVAL_VACANCY,
            data, field
        }
    },
    getApprovalVacancySearch: (filter) => {
        return {
            type: GET_APPROVAL_VACANCY_SEARCH,
            filter
        }
    },
    getDraftVacancy: (data, field) => {
        return {
            type: GET_DRAFT_VACANCY,
            data, field
        }
    },
    getDraftVacancySearch: (filter) => {
        return {
            type: GET_DRAFT_VACANCY_SEARCH,
            filter
        }
    },
    getClosedVacancy: (data, field) => {
        return {
            type: GET_CLOSED_VACANCY,
            data, field
        }
    },
    getClosedVacancySearch: (filter) => {
        return {
            type: GET_CLOSED_VACANCY_SEARCH,
            filter
        }
    },
    getArchivedVacancy: (data, field) => {
        return {
            type: GET_ARCHIVED_VACANCY,
            data, field
        }
    },
    getArchivedVacancySearch: (filter) => {
        return {
            type: GET_ARCHIVED_VACANCY_SEARCH,
            filter
        }
    },
    getFormVacancy: () => {
        return {
            type: GET_LOAD_FORM_VACANCY
        }
    },
    getFormVacancy2: () => {
        return {
            type: GET_LOAD_FORM_VACANCY2
        }
    },
    getDetailsVacancy: (data) => {
        return {
            type: GET_DETAILS_VACANCY,
            data
        }
    },
    getAtsPhaseType: (data) => {
        return {
            type: GET_DETAILS_ATS_PHASE_TYPE,
            data
        }
    },
    getEventCreateLoad: () => {
        return {
            type: GET_EVENT_CREATE_LOAD,
        }
    },
    submitVacancy: (data, history) => {
        return {
            type: SUBMIT_VACANCY,
            data, history
        }
    },
    draftVacancy: (history) => {
        return {
            type: DRAFT_VACANCY,
            history
        }
    },
    updateVacancy: () => {
        return {
            type: UPDATE_VACANCY
        }
    },
    updateDraftVacancy: (data, history) => {
        return {
            type: UPDATE_DRAFT_VACANCY,
            data, history
        }
    },
    approveVacancy: (data, history) => {
        return {
            type: APPROVE_VACANCY,
            data, history
        }
    },
    deleteVacancy: (data) => {
        return {
            type: DELETE_VACANCY,
            data
        }
    },
    closeVacancy: (data) => {
        return {
            type: CLOSE_VACANCY,
            data
        }
    },
}

export default actions;
