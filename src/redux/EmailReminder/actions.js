import * as types from "../types";

const actions = {
    handleState: (property, value) => {
        return ({
            type: types.EMAIL_REMINDER_HANDLE_STATE,
            property,
            value
        })
    },
    fetchMasterData: () => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_MATER_DATA,
        })
    },
    handleStateSearch: (property, value) => {
        return ({
            type: types.EMAIL_REMINDER_HANDLE_STATE_SEARCH,
            property,
            value
        })
    },
    initStateFormSerach: () => {
        return ({
            type: types.EMAIL_REMINDER_CLEAR_FORM_SEARCH,
        })
    },
    fetchSerach: (data) => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_SEARCH,
            data
        })
    },
    fetchListDel: (id) => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_DEL,
            id
        })
    },
    handleStateForm: (property, value) => {
        return ({
            type: types.EMAIL_REMINDER_HANDLE_STATE_FORM,
            property,
            value
        })
    },
    initStateForm: () => {
        return ({
            type: types.EMAIL_REMINDER_CLEAR_FORM,
        })
    },
    fecthSubmitForm: (history) => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_SUBMIT_FORM,
            history
        })
    },
    fecthGetDetail: (code) => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_GET_DETAIL,
            code
        })
    },
    fetchPostUpdateSubmit: (history) => {
        return ({
            type: types.EMAIL_REMINDER_FETCH_UPDATE_FORM,
            history
        })
    }
}

export default actions;
