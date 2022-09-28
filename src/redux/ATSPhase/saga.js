import { all, takeLatest, call, fork, put, select, take } from "redux-saga/effects";
import { messages, success, deleteData } from "../../components/messageBox"

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE2 } from "../../service/api";
import { HeaderToken, Header, HeaderClient } from "../../service/header";


const getStateATSPhase = state => state.ATSPhase;

export function* fetchSearch(param) {
    try {
        yield put({ type: types.ATSPHASE_SET_LOADER, value: true})
        let stateATSPhase = yield select(getStateATSPhase)
        yield put({ 
            type: types.ATSPHASE_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })
        let body = {
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            atsPhaseCode: stateATSPhase.search.phaseCode,
            phase: stateATSPhase.search.phase,
            description: stateATSPhase.search.description,
            company: stateATSPhase.search.company,
            branch: stateATSPhase.search.branch
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_LIST_POST, body, { headers: Header() });

        if(response.Acknowledge === 1){
            yield put({ type: types.ATSPHASE_FETCH_SEARCH_SUCCESS, value: response.atsPhaseList})
            yield put({ type: types.ATSPHASE_HANDLE_STATE, property: 'totalRows', value: response.totalRecords });
        }
        yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
    } catch (error) {
        yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
    }
}

export function* postForm(params){
    try {
        yield put({ type: types.ATSPHASE_SET_LOADER, value: true})
        let stateATSPhase = yield select(getStateATSPhase)
        let body = {
            atsPhaseCode: stateATSPhase.formATSPhase.ATSPhaseCode,
            phase: stateATSPhase.formATSPhase.ATSPhase,
            description: stateATSPhase.formATSPhase.description,
        }
        if(!params.value){
            const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_CREATE_POST, body, { headers: Header() });
            if (response.Acknowledge == 1) {
                yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
                messages("Success", 'Data has been saved', "success", false);
                window.location.href = `${process.env.PUBLIC_URL}/dashboard/ATSPhase`
            }
        }else{
            const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_DETAIL_GET + params.value, body, { headers: Header() });
            if (response.Acknowledge == 1) {
                yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
                messages("Success", 'Data has been updated', "success", false);
                window.location.href = `${process.env.PUBLIC_URL}/dashboard/ATSPhase`
            }
        }
        messages("Success", 'Data has been updated', "success", false);
    } catch (error) {
        messages("Success", 'Data has been updated', "success", false);
    }
}

export function* getDetailForm(params){
    try {
        yield put({ type: types.ATSPHASE_SET_LOADER, value: true})
        const response = yield call(GET, Config.BASE_URL + Endpoint.ATS_PHASE_DETAIL_GET + params.value, { headers: Header() });

        if (response.Acknowledge == 1) {
            let _dataForm = {
                ATSPhaseCode: response.atsPhaseCode,
                ATSPhase: response.atsPhase,
                description: response.description,
              }
            yield put({ type: types.ATSPHASE_GET_DETAIL_FORM_SUCCESS, payload: _dataForm })
        }
        yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
    } catch (error) {
        yield put({ type: types.ATSPHASE_SET_LOADER, value:false})
    }
}

export function* deleteATSPhase(params){
    try {
        if(params.isInitial == 1){
            messages("Failed", 'Delete failed.The data that you want to delete is initial data', "warning", false);
        }else{
            yield put({ type: types.ATSPHASE_SET_LOADER, value: true})
            const response = yield call(DELETE2, Config.BASE_URL + Endpoint.ATS_PHASE_DEL + params.value, { headers: Header() });

            if (response.Acknowledge == 1) {
                messages("Success", response.Message, "success", false);
                yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
                window.location.href = `${process.env.PUBLIC_URL}/dashboard/ATSPhase`
            }
        }
        yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
    } catch (error) {
        yield put({ type: types.ATSPHASE_SET_LOADER, value: false})
    }
}



export default function* rootSaga() {
    yield all([
        takeLatest(types.ATSPHASE_FETCH_SEARCH, fetchSearch),
        takeLatest(types.ATSPHASE_SUBMIT_FORM, postForm),
        takeLatest(types.ATSPHASE_GET_DETAIL_FORM, getDetailForm),
        takeLatest(types.ATSPHASE_GET_DEL, deleteATSPhase),
    ]);
}
