import * as types from "../types";

const actions = {
    handleState:(property, value) => {
        return({
            type: types.ASSIGNEE_HANDLE_STATE,
            property,
            value
        })
    },
    initStateSearch:() => {
        return({
            type: types.ASSIGNEE_INIT_STATE_SEARCH
        })
    },
    fetchMasterData:() => {
        return({
            type: types.ASSIGNEE_FETCH_MATER_DATA,
        })
    },
    handleStateSearch:(property, value) =>{
        return({
            type: types.ASSIGNEE_HANDLE_STATE_SEARCH,
            property,
            value
        })
    },
    initStateFormSerach:() =>{
        return({
            type: types.ASSIGNEE_CLEAR_FORM_SEARCH,
        })
    },
    fetchSearch:(data)=>{
        return({
            type: types.ASSIGNEE_FETCH_SEARCH,
            data
        })
    },
    fetchListDel:(id)=>{
        return({
            type: types.ASSIGNEE_FETCH_DEL,
            id
        })
    },
    handleStateForm:(property, value) =>{
        return({
            type: types.ASSIGNEE_HANDLE_STATE_FORM,
            property,
            value
        })
    },
    initStateForm:() =>{
        return({
            type: types.ASSIGNEE_CLEAR_FORM,
        })
    },
    fecthSubmitForm:(history)=>{
        return({
            type: types.ASSIGNEE_FETCH_SUBMIT_FORM,
            history
        })
    },
    fecthGetDetail:(id)=>{
        return({
            type: types.ASSIGNEE_FETCH_GET_DETAIL,
            id
        })
    },
    fetchPostUpdateSubmit:(history)=>{
        return({
            type: types.ASSIGNEE_FETCH_UPDATE_FORM,
            history
        })
    },
}

export default actions;
