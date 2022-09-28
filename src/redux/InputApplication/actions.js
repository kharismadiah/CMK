import * as types from "../types";

const actions = {
    setLoader: (data) => {
        return ({
            type: types.SET_INPUTAPP_LOADER,
            payload: data
        })
    },
    initFormSearchInputApp: () => {
        return({
            type: types.INIT_FORM_SEARCH_INPUTAPP
        })
    },
    initFormInputApp: () => {
        return({
            type: types.INIT_FORM_INPUTAPP
        })
    },
    initPagingInputApp: () => {
        return({
            type: types.INIT_PAGING_INPUTAPP
        })
    },
    initFormPersonalData:() => {
        return({
            type: types.INIT_FORM_PERSONAL
        })
    },
    initFormEducation:() => {
        return({
            type: types.INIT_FORM_EDUCATION
        })
    },
    initFormOrganization:() => {
        return({
            type: types.INIT_FORM_ORGANIZATION
        })
    },
    initFormJobExperience:() => {
        return({
            type: types.INIT_FORM_JOB_EXPERIENCE
        })
    },
    initFormInternship:() => {
        return({
            type: types.INIT_FORM_INTERNSHIP
        })
    },
    handleStateInputApp: (field, value) => {
        return({
            type: types.HANDLE_STATE_INPUTAPP,
            field, value
        })
    },
    handleStateInputAppForm: (field, value, data) => {
          return {
            type: types.HANDLE_STATE_INPUTAPP_FORM,
            field,
            value,
            data,
          };
    },
    getInputappList:(field, data)=>{
        return({
            type: types.GET_INPUTAPP_LIST,
            field, data
        })
    },
    getInputappDetails:(data)=>{
        return({
            type: types.GET_INPUTAPP_DETAILS,
            data
        })
    },
    getInputappMasterData:(data)=>{
        return({
            type: types.GET_INPUTAPP_MASTERDATA,
            data
        })
    },
    createInputapp:(data, field)=>{
        return({
            type: types.CREATE_APPLICATION,
            data, field
        })
    },
    handleStateGlobal: (property, value) => {
        return ({
            type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
            property, value
        })
    },
    getListEmailTemplate: () => {
        return {
            type: types.INPUT_APPLICATION_GET_LIST_EMAIL_TEMPLATE,
        }
    },
    resetEmailTemplateState: () => {
        return {
            type :types.INPUT_APPLICATION_RESET_EMAIL_TEMPLATE_STATE
        }
    },
    sendEmailNotification: (data) => {
        return {
            type: types.INPUT_APPLCIATION_SEND_EMAIL_NOTIFICATION,
            data
        }
    },
    handleStateModalEmail: (property, value) => {
        return {
            type: types.INPUT_APPLICATION_HANDLE_STATE_MODAL_EMAIL,
            property,
            value
        }
    },
    getEmailTemplateDetail: (data) => {
        return {
            type: types.INPUT_APPLICATION_GET_EMAIL_TEMPLATE,
            data
        }
    },
    getTriggerMasterData: () => {
        return {
            type: types.CANDIDATE_POOL_GET_TRIGGER_MASTER_DATA
        }
    }

}

export default actions;