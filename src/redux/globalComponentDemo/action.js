import * as types from '../../constants/ActionType'

export const setLoader = (value) => {
    return ({
        type: types.SET_LOADER,
        value
    })
}

export const handleState = (field, value, form) => {
    return ({
        type: types.HANDLE_STATE_DEMO,
        field,
        value,
        form
    })
}

export const action = {
    setLoader,
    handleState
}