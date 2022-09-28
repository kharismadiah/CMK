import * as types from "../types";
const actions = {
    setLoader: (data) => {
        return ({
            type: types.SET_LOADER,
            payload: data
        })
    },
    initFormSearchEmail: () => {
        return ({
            type: types.INIT_FORM_SEARCH_EMAIL
        })
    },
    initFormEmail: () => {
        return ({
            type: types.INIT_FORM_EMAIL
        })
    },
    initPagingEmail: () => {
        return ({
            type: types.INIT_PAGING_EMAIL
        })
    },
    handleStateEmail: (field, value) => {
        return ({
            type: types.HANDLE_STATE_EMAIL,
            field, value
        })
    },
    handleStateEmailForm: (field, value, data) => {
        return ({
            type: types.HANDLE_STATE_EMAIL_FORM,
            field, value, data
        })
    },
    getMasterDataGlobal: () => {
        return ({
            type: types.GET_MASTER_DATA_GLOBAL
        })
    },
    getEmailConfigList: (data, field) => {
        return ({
            type: types.GET_EMAIL_CONFIG_LIST,
            data, field
        })
    },
    getEmailDetails: (data) => {
        return {
            type: types.GET_EMAIL_DETAILS,
            data
        }
    },
    saveEmail: (data) => {
        return {
            type: types.SAVE_EMAIL,
            data
        }
    },
    updateEmail: (data) => {
        return {
            type: types.UPDATE_EMAIL,
            data
        }
    },
    deleteEmail: (data) => {
        return {
            type: types.DELETE_EMAIL,
            data
        }
    },
    setReadMore: (id, value) => {
        return {
            type: types.SET_READMORE,
            id, value
        }
    },
    fetchDisplayStatus: (id, displayStatus) => {
        return {
            type: types.EMAIL_CONFIG_FETCH_DISPLAYSTATUS,
            id, displayStatus
        }
    },
    getTriggerMasterData: () => {
        return ({
            type: types.GET_EMAIL_TRIGGER
        })
    },
    checkMultipleEmail: (id, displayStatus, activity, action, isFromMainTable, form, setTempStatus) => {
        return({
            type: types.CHECK_MULTIPLE_EMAIL_TEMPLATE,
            id, displayStatus, activity, action, isFromMainTable, form, setTempStatus
        })
    }
}

export default actions;