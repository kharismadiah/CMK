import * as types from "../types";

export const handleStateFilter = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER,
        property,
        value
    }
}
export const fetchResetFilter = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_RESET_FILTER,
    }
}
export const fetchFilter = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_FILTER,
    }
}
export const fetchSearchDashboard = (data) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DASHBOARD,
        data
    }
}
export const fetchMount = (id, userRole) => {
    console.log("fetchMount -> userRole", userRole)
    return {
        type: types.RECRUITMENT_PR_FETCH_MOUNT,
        id,
        userRole
    }
}
export const handleStateGlobal = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
        property,
        value
    }
}
export const resetStateFilter = () => {
    return {
        type: types.RECRUITMENT_PR_RESET_STATE_FILTER
    }
}