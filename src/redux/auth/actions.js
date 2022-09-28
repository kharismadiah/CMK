import * as types from "../types";

const actions = {
    setLoader:(payload)=>{
        return({
            type: types.IS_LOADING,
            payload
        })
    },
    handleStateLogin:(field, value)=>{
        return({
            type: types.HANDLE_STATE_LOGIN,
            field,
            value
        })
    },
    logout : () => {
        return ({
            type: types.LOGOUT
        })
    },
    checkAuthorization : () => {
        return ({
            type: types.CHECK_AUTHORIZATION
        })
    },
    login : (data) => {
        return ({
            type: types.LOGIN_REQUEST,
            data
        })
    },
    getTokenSama : (uid, key) => {
        return ({
            type: types.GET_TOKEN,
            uid,
            key
        })
    }
}
export default actions;