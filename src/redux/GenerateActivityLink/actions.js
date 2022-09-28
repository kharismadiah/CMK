import * as types from '../types'

const actions = {
    setLoader: data => {
        return {
            type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER,
            payload: data
        }
    },
    getGenerateActivityLinkMasterData: data => {
        return {
            type: types.FETCH_GENERATE_ACTIVITY_LINK_MASTER_DATA_REQUESTED,
            data
        }
    },
    setFormInputGenerateActivityLink: (property, value) => {
        return {
            type: types.SET_FORM_INPUT_GENERATE_ACTIVITY_LINK,
            property,
            value
        }
    },
    createGenerateActivityLink: history => {
        return {
            type: types.CREATE_GENERATE_ACTIVITY_LINK_REQUESTTED,
            history
        }
    },
    resetInputGenerateActivityLink: () => {
        return {
            type: types.RESET_INPUT_GENERATE_ACTIVITY_LINK
        }
    },
    setFilterGenerateActivityLinkMasterData: (property, values) => {
        return {
            type: types.SET_FILTER_GENERATE_ACTIVITY_LINK_MASTER_DATA,
            property,
            values
        }
    },
    setFileNameGenerateActivityLink: (fieldName, value) => {
        return {
            type: types.SET_FILENAME_GENERATE_ACTIVITY_LINK,
            fieldName,
            value
        }
    }
}

export default actions
