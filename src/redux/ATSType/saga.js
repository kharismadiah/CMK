import { all, takeLatest, call, put, select } from "redux-saga/effects";
import moment from 'moment'

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, DELETE2 } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getStateATSType = state => state.ATSType;

export function* fetchSearch(param) {
    try {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: true})

        let stateATSType = yield select(getStateATSType)

        yield put({ 
            type: types.ATSTYPE_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
          })
        let body = {
            PageNo: param.data.pageNo,
            PageSize: param.data.pageSize,
            atsTypeCode: stateATSType.search.atsTypeCode,
            atsTypeName: stateATSType.search.atsTypeName,
            description: stateATSType.search.description,
            companyName: stateATSType.search.company,
            branchName: stateATSType.search.branch
        }
        
        const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_TYPE_LIST_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.ATSTYPE_FETCH_SEARCH_SUCCESS, data: response})
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
        }else{
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }

    } catch (error) {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
    }
}

export function* fetchSubmitForm(param) {
    try {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: true})

        let stateATSType = yield select(getStateATSType)
        let tahun = moment().format('YYYY')

        let body = {
            ATSTypeName: stateATSType.formATSType.atsType,
            ATSTypeCode: `ATSTC${tahun.substring(2, 4)}`,
            Description: stateATSType.formATSType.description
          }
        
        const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_TYPE_SAVE_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Info", response.Message, "info", false);
            param.history.goBack()
        }else{
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }

    } catch (error) {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
    }
}

export function* fetchGetDetail(param) {
    try {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: true})

        const response = yield call(GET, Config.BASE_URL + Endpoint.ATS_TYPE_DETAIL_GET+`?id=${param.id}`, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.ATSTYPE_FETCH_GET_DETAIL_SUCCESS, data: response})
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
        }else{
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }

    } catch (error) {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
    }
}

export function* fetchUpdateDetail(param) {
    try {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: true})

        let stateATSType = yield select(getStateATSType)

        let body = {
            ATSTypeName: stateATSType.formATSType.atsType,
            ATSTypeCode: stateATSType.formATSType.atsTypeCode,
            Description: stateATSType.formATSType.description
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_TYPE_UPDATE_POST+`?id=${param.id}`, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Info", response.Message, "info", false);
            param.history.goBack()
        }else{
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }

    } catch (error) {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
    }
}

export function* fetchDeleteList(param) {
    try {
        let stateATSType = yield select(getStateATSType)
        let {pageNo, pageSize, totalRows} = stateATSType
        if(param.isInitial == 1){
            messages("Failed", 'Delete failed.The data that you want to delete is initial data', "warning", false);
        }else{
            yield put({ type: types.ATSTYPE_SET_LOADER, value: true})
            const response = yield call(DELETE2, Config.BASE_URL + Endpoint.ATS_TYPE_DELETE_LIST+ param.id, { headers: Header() });
            // const response = yield call(DELETE2, Config.BASE_URL + Endpoint.ATS_PHASE_DEL + params.value, { headers: Header() });
            if(response.Acknowledge === 1){
                yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
                messages("Info", response.Message, "info", false);
                let data = {
                    data: {
                        pageNo,
                        pageSize,
                        totalRows
                    }
                }
                yield call(fetchSearch, data)
            }else{
                yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
                messages("Error", response.Message, "error", false);
            }
            yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
        }
    } catch (error) {
        yield put({ type: types.ATSTYPE_SET_LOADER, value: false})
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.ATSTYPE_FETCH_SEARCH, fetchSearch),
        takeLatest(types.ATSTYPE_FETCH_SUBMIT_FORM, fetchSubmitForm),
        takeLatest(types.ATSTYPE_FETCH_GET_DETAIL, fetchGetDetail),
        takeLatest(types.ATSTYPE_FETCH_UPDATE_DETAIL, fetchUpdateDetail),
        takeLatest(types.ATSTYPE_FETCH_DELETE_LIST, fetchDeleteList),
    ]);
}
