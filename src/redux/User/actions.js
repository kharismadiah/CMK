import { 
    SET_LOADER,
    
    INIT_FORM_SEARCH_USER,
    INIT_FORM_USER,

    HANDLE_STATE_USER,
    HANDLE_STATE_FORM_USER,
    HANDLE_STATE_FORM_JOB_CODE,

    GET_USER_LIST,
    GET_USER_DETAILS,
    GET_LOAD_USER,
    GET_USER_SEARCH,
    GET_REGION_COMPANY,

    DELETE_USER,
    CREATE_USER,
    UPDATE_USER,
    SUBMIT_USER,

    RESET_PASSWORD
 } from "../types";


const actions = {
    setLoader:(data) =>{
        return ({
            type: SET_LOADER,
            payload: data
        })
    },
    initFormSearchUser: () =>{
        return({
            type: INIT_FORM_SEARCH_USER
        })
    },
    initFormUser: () =>{
        return({
            type: INIT_FORM_USER
        })
    },
    handleStateUser: (field, value) => {
        return ({
            type: HANDLE_STATE_USER,
            field,
            value
        })
    },
    handleStateFormUser:(field, value) => {
        return({
            type: HANDLE_STATE_FORM_USER,
            field,
            value
        })
    },
    handleStateFormJobCode:(field, value) => {
        return({
            type: HANDLE_STATE_FORM_JOB_CODE,
            field,
            value
        })
    },
    getUserList:(data, field) => {
        return({
            type: GET_USER_LIST,
            data, field
        })
    },
    getUserDetails:(data) => {
        return({
            type: GET_USER_DETAILS,
            data
        })
    },
    getLoadUser:()=>{
        return({
            type: GET_LOAD_USER
        })
    },
    getUserSearch:(data, field)=>{
        return({
            type: GET_USER_SEARCH,
            data, field
        })
    },
    getRegionCompany:(data)=>{
        return({
            type: GET_REGION_COMPANY,
            data
        })
    },
    submitUser:(data, history)=>{
        return({
            type: SUBMIT_USER,
            data, history
        })
    },
    deleteUser:()=>{
        return({
            type: DELETE_USER
        })
    },
    resetPassword:()=>{
        return({
            type: RESET_PASSWORD
        })
    }
    // createUser:(data) => {
    //     return({
    //         type: CREATE_USER
    //     })
    // },
    // updateUser:(data) => {
    //     return({
    //         type: UPDATE_USER
    //     })
    // }
}

export default actions;
