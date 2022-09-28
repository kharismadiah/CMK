import * as types from "../types";

const actions = {
    setLoader: (data) => {
        return ({
            type: types.SET_UPLOADAPP_LOADER,
            payload: data
        })
    },
    initFormUploadApp: () => {
        return ({
            type: types.INIT_FORM_UPLOADAPP
        })
    },
    handleStateUploadApp: (field, value) => {
        return ({
            type: types.HANDLE_STATE_UPLOADAPP,
            field, value
        })
    },
    getMasterData: () => {
        return({
            type: types.GET_UPLOADAPP_MASTERDATA
        })
    },
    downloadTemplate: () => {
        return({
            type: types.DOWNLOAD_UPLOADAPP
        })
    },
    uploadApplication:() => {
        return({
            type: types.UPLOAD_UPLOADAPP
        })
    },
    handleStateGlobal: (property, value) => {
        return ({
            type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL,
            property, value
        })
    },
    getListEmailTemplate: () => {
        return {
            type: types.UPLOAD_APPLICATION_GET_LIST_EMAIL_TEMPLATE,
        }
    },
    resetEmailTemplateState: () => {
        return {
            type :types.UPLOAD_APPLICATION_RESET_EMAIL_TEMPLATE_STATE
        }
    },
    sendEmailNotification: () => {
        return {
            type: types.UPLOAD_APPLICATION_SEND_EMAIL_NOTIFICATION,
        }
    },
    handleStateModalEmail: (property, value) => {
        return {
            type: types.UPLOAD_APPLICATION_HANDLE_STATE_MODAL_EMAIL,
            property,
            value
        }
    },
    getEmailTemplateDetail: () => {
        return {
            type: types.UPLOAD_APPLICATION_GET_EMAIL_TEMPLATE
        }
    },
    handleStateEmailTemplateModal: (property, value) => {
        return {
            type: types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY,
            property, value
        }
    }
}

export default actions;