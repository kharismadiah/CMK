import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST } from '../../service/api'
import Swal from 'sweetalert2'
import axios from 'axios'
import { messages } from '../../components/messageBox'
import { Header } from '../../service/header'

const getStateConfigCandidatePool = state => state.ConfigCandidatePool

export function* fetchSearch(param) {
    try {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: true })
        let stateConfigCandidatePool = yield select(getStateConfigCandidatePool)
        let { search } = stateConfigCandidatePool
        yield put({
            type: types.CFG_CANDIDATE_POOL_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let body = {
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            DurationLimit: search.durationLimit,
            QuotaFreshGrad: search.quotaFreshGrad,
            QuotaProfessional: search.quotaProfessional,
            MaxExtend: search.maxExtend,
            Status: search.status ? 1 : 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_LIST_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.CFG_CANDIDATE_POOL_FETCH_SEARCH_SUCCESS, data: response })
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchSubmit(param) {
    try {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: true })

        let stateConfigCandidatePool = yield select(getStateConfigCandidatePool)
        let { form } = stateConfigCandidatePool

        let body = {
            Status: form.status ? 1 : 0,
            DurationLimit: form.durationLimit,
            FailedDuration: form.failedDuration,
            QuotaCandidateFreshGraduate: form.quotaCandidateFreshGraduate,
            QuotaCandidateProfessional: form.quotaCandidateProfessional,

            ConfirmExpFreshGrad: form.confirmExpFreshGraduate,
            ConfirmExpProfessional: form.confirmExpProfessional,
            ConfirmExtendFreshGrad: form.confirmExtendFreshGraduate,
            ConfirmExtendProfessional: form.confirmExtendProfessional,

            PeriodProcessFreshGraduate: form.periodProcessFreshGraduate,
            PeriodProcessProfessional: form.periodProcessProfessional,
            PeriodExtendFreshGraduate: form.periodExtendFreshGraduate,
            PeriodExtendProfessional: form.periodExtendProfessional,

            MaxExtend: form.maxExtend,
            ConfirmMaxExtend: form.confirmMaxExtend,
            DeactivateOther: false
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_CREATE_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            param.history.goBack()
        } else {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            if (response.IsDuplicate) {
                messages('Error', response.Message, 'error', false)
            } else {
                Swal.queue([
                    {
                        title: 'Success',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        text: response.Message,
                        type: 'info',
                        showLoaderOnConfirm: true,
                        showCancelButton: true,
                        preConfirm: () => {
                            return axios({
                                method: 'post',
                                url: Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_CREATE_POST,
                                headers: Header(),
                                data: {
                                    ...body,
                                    DeactivateOther: true
                                }
                            })
                                .then(response => {
                                    return response.data
                                })
                                .catch(err => {
                                    return err
                                })
                        }
                    }
                ]).then(data => {
                    if (data.dismiss !== 'cancel') {
                        if (data.value[0].Acknowledge === 1) {
                            messages('Info', data.value[0].Message, 'info', false)
                            param.history.goBack()
                        } else {
                            messages('Error', data.value[0].Message, 'error', false)
                        }
                    }
                })
            }
        }
    } catch (err) {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchDetail(param) {
    try {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: true })
        let body = {
            configCandidatePoolId: param.id
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_DETAILS_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                configCandidatePoolId: response.ConfigCandidatePoolId,
                configCode: response.ConfigPoolCode,
                status: response.Status,

                durationLimit: response.DurationLimit,
                quotaCandidateFreshGraduate: response.QuotaCandidateFreshGraduate,
                quotaCandidateProfessional: response.QuotaCandidateProfessional,

                confirmExpFreshGraduate: response.ConfirmExpFreshGrad,
                confirmExpProfessional: response.ConfirmExpProfessional,

                confirmExtendFreshGraduate: response.ConfirmExtendFreshGrad,
                confirmExtendProfessional: response.ConfirmExtendProfessional,

                periodProcessFreshGraduate: response.PeriodProcessFreshGraduate,
                periodProcessProfessional: response.PeriodProcessProfessional,
                periodExtendFreshGraduate: response.PeriodExtendFreshGraduate,
                periodExtendProfessional: response.PeriodExtendProfessional,

                maxExtend: response.MaxExtend,
                confirmMaxExtend: response.ConfirmMaxExtend,
                failedDuration: response.FailedDuration
            }
            yield put({ type: types.CFG_CANDIDATE_POOL_FETCH_DETAIL_SUCCESS, data })
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchEdit(param) {
    try {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: true })

        let stateConfigCandidatePool = yield select(getStateConfigCandidatePool)
        let { form } = stateConfigCandidatePool
        let body = {
            configCandidatePoolId: parseInt(param.id, 10),

            Status: form.status ? 1 : 0,
            DurationLimit: form.durationLimit,
            FailedDuration: form.failedDuration,
            QuotaCandidateFreshGraduate: form.quotaCandidateFreshGraduate,
            QuotaCandidateProfessional: form.quotaCandidateProfessional,

            ConfirmExpFreshGrad: form.confirmExpFreshGraduate,
            ConfirmExpProfessional: form.confirmExpProfessional,
            ConfirmExtendFreshGrad: form.confirmExtendFreshGraduate,
            ConfirmExtendProfessional: form.confirmExtendProfessional,

            PeriodProcessFreshGraduate: form.periodProcessFreshGraduate,
            PeriodProcessProfessional: form.periodProcessProfessional,
            PeriodExtendFreshGraduate: form.periodExtendFreshGraduate,
            PeriodExtendProfessional: form.periodExtendProfessional,

            MaxExtend: form.maxExtend,
            ConfirmMaxExtend: form.confirmMaxExtend,
            DeactivateOther: false
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_UPDATE_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            param.history.goBack()
        } else {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            if (response.IsDuplicate) {
                messages('Error', response.Message, 'error', false)
            } else {
                Swal.queue([
                    {
                        title: 'Success',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        text: response.Message,
                        type: 'info',
                        showLoaderOnConfirm: true,
                        showCancelButton: true,
                        preConfirm: () => {
                            return axios({
                                method: 'post',
                                url: Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_UPDATE_POST,
                                headers: Header(),
                                data: {
                                    ...body,
                                    DeactivateOther: true
                                }
                            })
                                .then(response => {
                                    return response.data
                                })
                                .catch(err => {
                                    return err
                                })
                        }
                    }
                ]).then(data => {
                    if (data.dismiss !== 'cancel') {
                        if (data.value[0].Acknowledge === 1) {
                            messages('Info', data.value[0].Message, 'info', false)
                            param.history.goBack()
                        } else {
                            messages('Error', data.value[0].Message, 'error', false)
                        }
                    }
                })
            }
        }
    } catch (err) {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchDelete(param) {
    try {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: true })
        let stateConfigCandidatePool = yield select(getStateConfigCandidatePool)
        let { pageNo, pageSize, totalRows } = stateConfigCandidatePool

        let body = {
            configCandidatePoolId: param.id
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CFG_CANDIDATE_POOL_DELETE_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)

            let data = {
                data: {
                    pageNo,
                    pageSize,
                    totalRows
                }
            }
            yield call(fetchSearch, data)
        } else {
            yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.CFG_CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.CFG_CANDIDATE_POOL_FETCH_SEARCH, fetchSearch),
        takeLatest(types.CFG_CANDIDATE_POOL_FETCH_SUBMIT, fetchSubmit),
        takeLatest(types.CFG_CANDIDATE_POOL_FETCH_DETAIL, fetchDetail),
        takeLatest(types.CFG_CANDIDATE_POOL_FETCH_EDIT, fetchEdit),
        takeLatest(types.CFG_CANDIDATE_POOL_FETCH_DELETE, fetchDelete)
    ])
}
