import { all, takeLatest, call, fork, put, select, take } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET, POSTBLOB_HEADER, GETBLOB } from '../../service/api'
import { Header } from '../../service/header'
import { messages } from '../../components/messageBox'
import _ from 'lodash'
import moment from 'moment'
// import { saveAs } from 'file-saver'
import axios from 'axios'
import { dropDownReportTypes } from './reducer'

const rootReportState = state => state.ReportAnalytics

/**
 * Fetch dropdown master data
 */
export function* getMasterData() {
    try {
        yield put({ type: types.REPORT_SET_LOADER, value: true })

        const resMasterData = yield call(GET, Config.BASE_URL + Endpoint.REPORT_ANALYTICS_MASTER_DATA, {
            headers: Header()
        })

        const filterUniqueData = (_arr, _id, _name) => {
            // if (Array.isArray(_arr) && _arr.length > 0) {
            //     let _filtredData = Array.from(new Set(_arr.map(a => a[_id]))).map(id => {
            //         return _arr.find(a => a[_id] === id)
            //     })
            //     if (_filtredData.length > 0) {
            //         return _filtredData.map(x => ({ ...x, id: x[_id], name: x[_name] }))
            //     } else {
            //         return []
            //     }
            // }
            // return []
        }

        if (resMasterData.Acknowledge === 1) {
            let data = {
                groupEventList: resMasterData.GroupEventList.map(x => ({
                    ...x,
                    id: x.GroupEventId,
                    name: x.GroupEventName
                })),
                eventList: resMasterData.EventList.map(x => ({ ...x, id: x.EventId, name: x.EventName })),
                branchList: resMasterData.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })),
                // branchList: filterUniqueData(resMasterData.BranchList, 'BranchId', 'BranchName'),
                positionList: resMasterData.PositionList.map(x => ({ ...x, id: x.PositionId, name: x.PositionName })),
                // positionList: filterUniqueData(resMasterData.PositionList, 'PositionId', 'PositionName'),
                vacancyList: resMasterData.VacancyList.map(x => ({ ...x, id: x.VacancyId, name: x.VacancyTitle })),
                // vacancyList: filterUniqueData(resMasterData.VacancyList, 'VacancyId', 'VacancyTitle'),
                atsPhaseList: resMasterData.ATSPhaseList.map(x => ({ ...x, id: x.ATSPhaseId, name: x.ATSPhaseName }))
                // atsPhaseList: filterUniqueData(resMasterData.ATSPhaseList, 'ATSPhaseId', 'ATSPhaseName')
            }
            yield put({ type: types.REPORT_MATER_DATA_SUCCESS, payload: data })
        } else {
            messages('Error', resMasterData.Message, 'error', false)
        }
        yield put({ type: types.REPORT_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.REPORT_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'error', false)
    }
}

/**
 * Export and Re-Export
 */
export function* fetchExport({ reexport, criteria }) {
    // reexport & criteria will be filled only for re-export, otherwise undefined
    const state = yield select(rootReportState)

    let params = {
        // reset params to the default values.
        pageNo: 1 /* state.pageNo */,
        pageSize: 10 /* state.pageSize */
    }

    const findReportType = _name => {
        const findItem = dropDownReportTypes.find(element => element.name === _name)
        if (findItem) {
            return findItem.id
        } else {
            return null
        }
    }

    const isPeriod = () => {
        if (criteria) {
            if (criteria.DownloadType === 'Period' || state.search.downloadType === 'Period') return true
            else return false
        } else {
            return state.search.downloadType === 'Period' ? true : false
        }
    }

    try {
        yield put({ type: types.REPORT_SET_LOADER, value: true })
        // the payloads
        let body = {}

        if (reexport) {
            body = {
                historyId: criteria.historyId
            }
        }

        /** Export type Event */
        if (!isPeriod()) {
            body = {
                ...body,
                downloadType: 'Event',
                reportType: reexport && criteria ? criteria.reportType : state.search.reportType,
                groupEventId: reexport && criteria ? criteria.groupEventId : state.search.groupEventId,
                eventId: reexport && criteria ? criteria.eventId : state.search.eventId,
                companyId: reexport && criteria ? criteria.companyId : state.search.branchId,
                positionId: reexport && criteria ? criteria.positionId : state.search.positionId,
                vacancyId: reexport && criteria ? criteria.vacancyId : state.search.vacancyId,
                atsPhaseId: reexport && criteria ? criteria.atsPhaseId : state.search.atsPhaseId,
                startDate: '01/01/1900', // default startDate value for downloadType "Event"
                endDate: moment(new Date()).format('MM/DD/YYYY'), // default endDate value for downloadType "Event"
                reexport: reexport ? 1 : null
            }
        } /** Export type Period */ else {
            body = {
                ...body,
                downloadType: 'Period',
                reportType: reexport && criteria ? criteria.reportType : state.search.reportType,
                startDate: reexport && criteria ? criteria.startDate : state.search.periodStarDate,
                endDate: reexport && criteria ? criteria.endDate : state.search.periodEndDate,
                reexport: reexport ? 1 : null
            }
        }

        console.log('✅ Request body ->', body)

        const res = yield call(POST, Config.BASE_URL + Endpoint.REPORT_EXPORT_POST, body, { headers: Header() })
        if (res.Acknowledge === 1) {
            //Report Avaibale
            if (reexport) {
                messages('Success', /*res.Message */ `Re-Export success, please redownload file.`, 'success', false)
            } else {
                messages(
                    'Good',
                    /*res.Message */ `Wait a moment, we are preparing your file.
                You can track your file progress in history table below and download it by clicking the URL one the status "Complete"`,
                    'success',
                    false
                )
            }
            // trigger state to refetch data.
            yield put({ type: types.REPORT_FETCH_EXPORT_SUCCESS, value: true })
        } else if (res.Acknowledge === 0) {
            if (res.Message === 'Data not found.') {
                //Report not available
                messages(
                    'Sorry',
                    /*res.Message */ `No data available at a moment for selected report.`,
                    'warning',
                    false
                )
            } else {
                messages('Error', res.Message, 'error', false)
            }

            // trigger state to refetch data.
            yield put({ type: types.REPORT_FETCH_EXPORT_SUCCESS, value: true })
        } else {
            messages('Error', res.Message, 'error', false)
        }
        yield put({ type: types.REPORT_SET_LOADER, value: false })
    } catch (error) {
        console.log('❌❌ error', error)
        yield put({ type: types.REPORT_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* fetchReExport() {
    try {
        yield put({ type: types.REPORT_SET_LOADER, value: true })
        let body = {}
        const res = yield call(POST, Config.BASE_URL + Endpoint.REPORT_REEXPORT_POST, body, { headers: Header() })
        if (res.Acknowledge === 1) {
            messages('Success', res.Message, 'success', false)
        } else {
            messages('Error', res.Message, 'error', false)
        }
        yield put({ type: types.REPORT_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.REPORT_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

/**
 * Fetch information & download files.
 * @param {historyId: number} params
 */
export function* fetchDownloadURL(params) {
    const { historyId } = params
    try {
        yield put({ type: types.REPORT_SET_LOADER, value: true })
        // let body = {}
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.REPORT_FETCH_INFO_DOWNLOAD,
            { HistoryId: historyId },
            { headers: Header() }
        )

        // Check info file download file.
        if (/* response.Acknowledge === 1  && */ Array.isArray(response.Data) && response.Data.length > 0) {
            let files = response.Data
            files.forEach(file => {
                axios
                    .get(file.URL, {
                        responseType: 'blob'
                    })
                    .then(res => {
                        console.log('-->>>res', res)
                        const blob = new Blob([res.data], {
                            encoding: 'UTF-8'
                            // type: 'application/pdf',
                        })
                        const link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = file.FileName
                        link.click()
                    })
            })
        } else {
            messages('Info', 'Oops, something wrong !', 'info', false)
        }

        yield put({ type: types.REPORT_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.REPORT_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

/**
 * Fetch history table data.
 */
export function* getHistoryData({ params, enablePreload }) {
    try {
        yield put({ type: types.REPORT_SET_HISTORY_TABLE_LOADER, value: true /* enablePreload */ })

        /** Set pagination state */
        yield put({
            type: types.REPORT_HANDLE_STATE_PAGINATION,
            pageNo: params.pageNo,
            pageSize: params.pageSize
        })

        const body = {
            pageNo: params.pageNo,
            pageSize: params.pageSize
        }
        const res = yield call(POST, Config.BASE_URL + Endpoint.REPORT_FORM_HISTORY_POST, body, { headers: Header() })
        if (res.Acknowledge === 1 && Array.isArray(res.Datas)) {
            console.log('✅✅✅✅✅ res', res)
            let data = {
                totalRecords: res.TotalRecords,
                sourceFilter: {
                    // source filter
                    downloadType: _.uniqBy(res.Datas, 'DownloadType').map(x => ({
                        id: x.DownloadType,
                        name: x.DownloadType
                    })),
                    reportType: _.uniqBy(res.Datas, 'ReportAnalyticsTypeName').map(x => ({
                        id: x.ReportAnalyticsTypeName,
                        name: x.ReportAnalyticsTypeName
                    })),
                    pic: _.uniqBy(res.Datas, 'PIC').map(x => ({
                        id: x.PIC,
                        name: x.PIC
                    })),
                    exportDate: _.uniqBy(res.Datas, 'ExportDate').map(x => ({
                        id: x.ExportDate,
                        name: moment(x.ExportDate).format('DD/MM/YYYY HH:mm:ss')
                    })),
                    platform: _.uniqBy(res.Datas, 'GroupEventName').map(x => ({
                        id: x.GroupEventName,
                        name: x.GroupEventName
                    })),
                    sourcingChannel: _.uniqBy(res.Datas, 'EventName').map(x => ({
                        id: x.EventName,
                        name: x.EventName
                    })),
                    company: _.uniqBy(res.Datas, 'CompanyName').map(x => ({
                        id: x.CompanyId,
                        name: x.CompanyName
                    })),
                    position: _.uniqBy(res.Datas, 'PositionName').map(x => ({
                        id: x.PositionName,
                        name: x.PositionName
                    })),
                    vacancy: _.uniqBy(res.Datas, 'VacancyCode').map(x => ({
                        id: x.VacancyCode,
                        name: x.VacancyCode
                    })),
                    atsPhase: _.uniqBy(res.Datas, 'AtsPhaseName').map(x => ({
                        id: x.AtsPhaseName,
                        name: x.AtsPhaseName
                    })),
                    status: _.uniqBy(res.Datas, 'Status').map(x => ({
                        id: x.Status,
                        name: x.Status
                    })),
                    period: _.uniqBy(res.Datas, 'PeriodStart').map(x => ({
                        id: x.PeriodStart + '-' + x.PeriodEnd,
                        name: x.PeriodStart + '-' + x.PeriodEnd
                    }))
                },
                tableList: res.Datas.map(x => ({ ...x, Period: x.PeriodStart + '-' + x.PeriodEnd }))
            }
            yield put({ type: types.REPORT_FETCH_FORM_HISTORY_SUCCESS, data })
            yield put({ type: types.REPORT_SET_HISTORY_TABLE_LOADER, value: false })

            /** Don't set pagination right here. */
            // yield put({
            //     type: types.REPORT_HANDLE_STATE_PAGINATION,
            //     pageNo: res.PageNo || 1,
            //     pageSize: res.Count || 10
            // })
        } else {
            messages('Error', res.Message, 'error', false)
            yield put({ type: types.REPORT_SET_HISTORY_TABLE_LOADER, value: false })
        }
    } catch (e) {
        yield put({ type: types.REPORT_SET_HISTORY_TABLE_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.REPORT_FETCH_MASTER_DATA, getMasterData),
        takeLatest(types.REPORT_FETCH_EXPORT, fetchExport),
        takeLatest(types.REPORT_FETCH_REEXPORT, fetchReExport),
        takeLatest(types.REPORT_FETCH_DOWNLOAD, fetchDownloadURL),
        takeLatest(types.REPORT_FETCH_FORM_HISTORY, getHistoryData)
    ])
}
