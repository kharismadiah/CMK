import * as types from "../types";

const actions = {
    handleState:(property, value) => {
        return({
            type: types.ASSIGNEE_TYPE_HANDLE_STATE,
            property,
            value
        })
    },
    fetchMasterData:() => {
        return({
            type: types.ASSIGNEE_TYPE_FETCH_MATER_DATA,
        })
    },
    handleStateSearch:(property, value) =>{
        return({
            type: types.ASSIGNEE_TYPE_HANDLE_STATE_SEARCH,
            property,
            value
        })
    },
    initStateFormSerach:() =>{
        return({
            type: types.ASSIGNEE_TYPE_CLEAR_FORM_SEARCH,
        })
    },
    fetchSearch:(data)=>{
        return({
            type: types.ASSIGNEE_TYPE_FETCH_SEARCH,
            data
        })
    },
    fetchListDel:(id, isInitial)=>{
        return({
            type: types.ASSIGNEE_TYPE_FETCH_DEL,
            id, isInitial
        })
    },
    handleStateForm:(property, value) =>{
        return({
            type: types.ASSIGNEE_TYPE_HANDLE_STATE_FORM,
            property,
            value
        })
    },
    initStateForm:() =>{
        return({
            type: types.ASSIGNEE_TYPE_CLEAR_FORM,
        })
    },
    fecthSubmitForm:(history)=>{
        return({
            type: types.ASSIGNEE_TYPE_FETCH_SUBMIT_FORM,
            history
        })
    },
    fecthGetDetail:(id)=>{
        return({
            type: types.ASSIGNEE_TYPE_FETCH_GET_DETAIL,
            id
        })
    },
    fetchPostUpdateSubmit:(history)=>{
        return({
            type: types.ASSIGNEE_TYPE_FETCH_UPDATE_FORM,
            history
        })
    }
}

export default actions;
