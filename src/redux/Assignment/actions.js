import {
    GET_ROLE,
    GET_TOKEN,

    SET_LOADER,

    INIT_FORM_SEARCH,
    INIT_FORM_ASSIGNMENT,
    INIT_FORM_VAC_INFO,

    HANDLE_STATE_ASSIGNMENT,
    HANDLE_STATE_FORM_ASSIGNMENT,
    HANDLE_STATE_FORM_VACANCY_INFORMATION,
    HANDLE_STATE_ADD_VAC_INFO,
    HANDLE_DELETE_VAC_INFO,
    HANDLE_EDIT_VACANCY_INFO,
    HANDLE_UPDATE_VACANCY_INFO,

    GET_ASSIGMENT,
    GET_ASSIGMENT_SEARCH,
    GET_LOAD_FORM_ASSIGNMENT,
    GET_DETAILS_ASSIGNMENT,
    GET_VACANCY_INFORMATION,

    SUBMIT_ASSIGNMENT,
    UPDATE_ASSIGNMENT,
    FETCH_UPDTAE_STATUS_ASSIGNMENT,
    FETCH_FORM_DATA_ASSIGNMENT,
    VACANCY_TITLE_FETCH_LIST
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
    initFormSearch: () => {
        return ({
            type: INIT_FORM_SEARCH
        })
    },
    initFormAssignment: () => {
        return ({
            type: INIT_FORM_ASSIGNMENT
        })
    },
    initFormVacInfo:() =>{
        return({
            type: INIT_FORM_VAC_INFO
        })
    },
    handleStateAssignment: (field, value) => {
        return ({
            type: HANDLE_STATE_ASSIGNMENT,
            field,
            value
        })
    },
    handleStateFormAssignment: (field, value, data) => {
        return ({
            type: HANDLE_STATE_FORM_ASSIGNMENT,
            field,
            value,
            data
        })
    },
    handleStateFormVacancyInformation: (field, value, data) => {
        return ({
            type: HANDLE_STATE_FORM_VACANCY_INFORMATION,
            field,
            value,
            data
        })
    },
    handleStateAddVacInfo: (field, value, data) => {
        return ({
            type: HANDLE_STATE_ADD_VAC_INFO,
            field,
            value,
            data
        })
    },
    handleDeleteVacInfo:(field, value, data) => {
        return({
            type: HANDLE_DELETE_VAC_INFO,
            field, value, data
        })
    },
    handleEditVacInfo:(field, value, data) => {
        return({
            type: HANDLE_EDIT_VACANCY_INFO,
            field, value, data
        })
    },
    handleUpdateVacInfo:(field, value, data) => {
        return({
            type: HANDLE_UPDATE_VACANCY_INFO,
            field, value, data
        })
    },
    getAssignment: (data, field) => {
        return {
            type: GET_ASSIGMENT,
            data, field
        }
    },
    
    getVacancyList: (id) => {
        return {
          type: VACANCY_TITLE_FETCH_LIST,
          id,
        };
    },
    
    getAssignmentSearch: (filter) => {
        return {
            type: GET_ASSIGMENT_SEARCH,
            filter
        }
    },
    getFormAssignment: () => {
        return {
            type: GET_LOAD_FORM_ASSIGNMENT
        }
    },
    getDetailsAssignment: (data) => {
        return {
            type: GET_DETAILS_ASSIGNMENT,
            data
        }
    },
    getVacancyInformation: (filter) => {
        return {
            type: GET_VACANCY_INFORMATION,
            filter
        }
    },
    submitAssignment: (data, history) => {
        return {
            type: SUBMIT_ASSIGNMENT,
            data, history
        }
    },
    updateAssignment: () => {
        return {
            type: UPDATE_ASSIGNMENT
        }
    },
    fetchUpdateStatus: (StatusId) => {
        return {
            type: FETCH_UPDTAE_STATUS_ASSIGNMENT,
            StatusId
        }
    },
    fetchDataForm: () => {
        return {
            type: FETCH_FORM_DATA_ASSIGNMENT
        }
    },
    // approveAssignment: (data) => {
    //     return {
    //         type: APPROVE_ASSIGNMENT,
    //         data
    //     }
    // }
}

export default actions;
