import * as types from "../types"

const actions = {
    initStateForm:() => {
        return({
            type: types.HOW_TO_APPLY_INIT_STATE
        })
    },
    handleState: (property, value) => {
        return({
            type: types.HOW_TO_APPLY_HANDLE_STATE,
            property, value
        })
    },
    handleStateForm: (property, subProperty, value) => {
        return({
            type: types.HOW_TO_APPLY_HANDLE_STATE_FORM,
            property, subProperty, value
        })
    },
    fetchMaintain:(data) => {
        return({
            type: types.HOW_TO_APPLY_FETCH_MAINTAIN,
            data
        })
    },
    fetchGetDetailVideo:(id)=>{
        return({
            type: types.HOW_TO_APPLY_GET_DETAIL_VIDEO,
            id
        })
    },
    fetchGetDetailImage:(id)=>{
        return({
            type: types.HOW_TO_APPLY_GET_DETAIL_IMAGE,
            id
        })
    },
    fetchGetDetail:(id)=>{
        return({
            type: types.HOW_TO_APPLY_GET_DETAIL,
            id
        })
    },
    fetchSubmit:(history, dataType)=>{
        return({
            type: types.HOW_TO_APPLY_POST_SUBMIT,
            history, dataType
        })
    },
    fetchDefaultType:(dataType)=>{
        return({
            type: types.HOW_TO_APPLY_POST_DEFAULT,
            dataType
        })
    }
}

export default actions;