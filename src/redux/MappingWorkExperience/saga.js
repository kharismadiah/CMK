import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET, DELETE } from '../../service/api'
import { messages } from '../../components/messageBox'
import { Header, HeaderToken } from '../../service/header'

const getStateMappingWorkExperience = state => state.MappingWorkExperience

export function* getMasterData() {
    try {
        yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true })
        let body = {
            MasterData: [
                {
                    ObjectName: 'ApplicantPhase'
                },
                {
                    ObjectName: 'ApplicantStatus'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, {
            headers: Header()
        })

        if (resMasterData.Acknowledge === 1) {
            let data = {
                applicantPhase: resMasterData.ApplicantPhaseList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.ApplicantPhaseName
                })),
                applicantStatusName: resMasterData.ApplicantStatusList.map(x => ({
                    ...x,
                    id: x.ApplicantStatusId,
                    name: x.ApplicantStatusName
                }))
            }
            yield put({ type: types.MAPP_PHASE_STATUS_MASTER_DATA_SUCCESS, data })
            yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
        } else {
            yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
    }
}

export function* fetchData(param) {
    try {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: true })

        let stateMappingWorkExperience = yield select(getStateMappingWorkExperience)

        yield put({
            type: types.WORKMAPEXP_STATUS_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let body = {
            YearsOfExperienceId: stateMappingWorkExperience.form.YearsOfExperienceId,
            YoeMonthFrom: stateMappingWorkExperience.form.YoeMonthFrom,
            YoeYearTo: stateMappingWorkExperience.form.YoeYearTo,
            YoeMonthTo: stateMappingWorkExperience.form.YoeMonthTo,
            YoeCategoryName: stateMappingWorkExperience.form.YoeCategoryName
        }
        const response = yield call(
            POST,
            Config.BASE_URL_ASTRA_CAREER + Endpoint.WORKING_MAPPING_EXP_FETCH_LIST_POST,
            body,
            { headers: HeaderToken() }
        )

        if (response) {
            yield put({
                type: types.WORKING_MAPPING_EXP_FETCH_DATA_SUCCESS,
                data: response
            })
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
        } else {
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
            messages('Error', response.message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
        messages('Error', response.message, 'error', false)
    }
}

export function* fetchDelete(param) {
    try {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: true })

        let stateMappingWorkExperience = yield select(getStateMappingWorkExperience)
        let { pageNo, pageSize, totalRows } = stateMappingWorkExperience //BE belum ngirimin pageNo, pageSize, totalRows
        const body = { YearsOfExperienceId: param.id }
        const response = yield call(POST, Config.BASE_URL_ASTRA_CAREER + Endpoint.WORKING_MAPPING_EXP_DELETE, body, {
            headers: HeaderToken()
        })

        if (response.isSuccess) {
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
            messages('Successfully', response.message, 'success', false)

            let data = {
                data: {
                    pageNo,
                    pageSize,
                    totalRows
                }
            }
            yield call(fetchData, data)
        } else {
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
            messages('Error', response.message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
        messages('Error', response.message, 'error', false)
    }
}

export function* fetchSubmit(param) {
    try {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: true })

        let stateMappingWorkExperience = yield select(getStateMappingWorkExperience)
        let body = {
            YearsOfExperienceId: param.id == undefined ? 0 : parseInt(param.id),
            YoeYearFrom: parseInt(stateMappingWorkExperience.form.YoeYearFrom),
            YoeMonthFrom: parseInt(stateMappingWorkExperience.form.YoeMonthFrom),
            YoeYearTo: parseInt(stateMappingWorkExperience.form.YoeYearTo),
            YoeMonthTo: parseInt(stateMappingWorkExperience.form.YoeMonthTo),
            YoeCategoryName: stateMappingWorkExperience.form.YoeCategoryName
        }
        debugger
        const response = yield call(
            POST,
            Config.BASE_URL_ASTRA_CAREER + Endpoint.WORKING_MAPPING_EXP_SUBMIT_POST,
            body,
            { headers: HeaderToken() }
        )

        if (response.isSuccess) {
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
            messages('Successfully', response.message, 'success', false)
            param.history.goBack()
        } else {
            yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
            messages('Error', response.message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: false })
        messages('Error', err, 'error', false)
    }
}

export function* fetchDetail(param) {
    try {
        yield put({ type: types.WORKMAPEXP_STATUS_SET_LOADER, value: true })
        console.log('🚀 ~ file: saga.js ~ line 174 ~ function*fetchDetail ~ param', param)

        let body = {
            YearsOfExperienceId: param.id
        }

        const response = yield call(
            POST,
            Config.BASE_URL_ASTRA_CAREER + Endpoint.WORKING_MAPPING_EXP_DETAIL_GET,
            body,
            { headers: HeaderToken() }
        )

        if (response) {
            const [yearFrom, yearTo] = [Math.floor(response.yoeFrom / 12), Math.floor(response.yoeTo / 12)]
            const [monthFrom, monthTo] = [response.yoeFrom - yearFrom * 12, response.yoeTo - yearTo * 12]

            let dataParam = {
                YearsOfExperienceId: response.yearsOfExperienceId,
                YoeYearFrom: yearFrom,
                YoeMonthFrom: monthFrom,
                YoeYearTo: yearTo,
                YoeMonthTo: monthTo,
                YoeCategoryName: response.yoeCategoryName,
                YoeCategoryId: response.yoeCategoryId,
                TotalRows: response.rowStatus
            }
            yield put({
                type: types.WORKING_MAPPING_EXP_DETAILS_SUCCESS,
                data: dataParam
            })
            yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
        } else {
            yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
            messages('Error', response.message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false })
        messages('Info', err, 'info', false)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.WORKING_MAPPING_EXP_FETCH_DATA, fetchData),
        takeLatest(types.WORKING_MAPPING_EXP_DELETE, fetchDelete),
        takeLatest(types.WORKING_MAPPING_CREATE_UPDATE_DATA, fetchSubmit),
        takeLatest(types.WORKING_MAPPING_EXP_DETAILS, fetchDetail)
    ])
}
