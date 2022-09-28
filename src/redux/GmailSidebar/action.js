import * as types from "../types";

export const handleState = (property, value) => {
    return {
        type: types.GMAIL_SIDEBAR_SET_LOADER,
        property,
        value
    }
}