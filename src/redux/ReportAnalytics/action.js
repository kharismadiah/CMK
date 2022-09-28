import * as types from '../types'

export const handleState = (property, value) => {
    return {
        type: types.REPORT_HANDLE_STATE,
        property,
        value
    }
}

export const fetchMasterData = () => {
    return {
        type: types.REPORT_FETCH_MASTER_DATA
    }
}

export const onClearSearch = () => {
    return {
        type: types.REPORT_CLEAR_SEARCH
    }
}

export const fetchExport = (reexport = false, criteria = null) => {
    /**
     * reexport dan criteria hanya akan di kirim saat Re-Export
     */
    return {
        type: types.REPORT_FETCH_EXPORT,
        reexport,
        criteria
    }
}

export const fetchReExport = () => {
    return {
        type: types.REPORT_FETCH_REEXPORT
    }
}

export const fetchDownloadURL = historyId => {
    return {
        type: types.REPORT_FETCH_DOWNLOAD,
        historyId
    }
}

export const fetchHistoryTable = (params, enablePreload = true) => {
    return {
        type: types.REPORT_FETCH_FORM_HISTORY,
        params,
        enablePreload
    }
}

export const setFilteredSourceReportAnalytics = (property, values) => {
    return {
        type: types.SET_FILTERED_SOURCE_REPORT_ANALYTICS,
        property,
        values
    }
}
export const setObjectFileNamesReportAnalytics = (property, value) => {
    return {
        type: types.SET_OBJECT_FILE_NAMES_REPORT_ANALYTICS,
        property,
        value
    }
}

export const setReportFetchExportSuccess = value => ({
    type: types.REPORT_FETCH_EXPORT_SUCCESS,
    value
})

export const reportHandlePaginationState = (pageNo = 1, pageSize = 10) => ({
    type: types.REPORT_HANDLE_STATE_PAGINATION,
    pageNo,
    pageSize
})
