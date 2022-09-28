import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, PUT } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getApplicantPhase = state => state.ApplicantPhase;

export function* fetchSearch(param) {
  try {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: true})

    let stateApplicantPhase = yield select(getApplicantPhase)
    
    yield put({ 
      type: types.APPLICANT_PHASE_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let {search} = stateApplicantPhase

    let body = {
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      applicantPhaseCode: search.applicantPhaseCode,
      applicantPhaseName: search.applicantPhaseName,
      applicantPhaseNameEnglish: search.applicantPhaseNameEnglish,
      applicantPhaseDescription: search.applicantPhaseDesc,
      applicantPhaseDescriptionEnglish: search.applicantPhaseDescEnglish
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_PHASE_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.APPLICANT_PHASE_FETCH_SEARCH_SUCCESS, value: response})
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
  }
}

export function* fetchDetail(param) {
  try {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: true})
    
    const response = yield call(GET, Config.BASE_URL + Endpoint.APPLICANT_PAHSE_DETAIL_POST+`?id=${param.id}`, { headers: Header() });

    if(response.Acknowledge === 1){
      let data = {
        applicantPhaseCode: response.applicantPhaseCode,
        applicantPhaseName: response.applicantPhaseName,
        applicantPhaseNameEnglish: response.applicantPhaseNameEnglish,
        applicantPhaseDesc: response.applicantPhaseDescription,
        applicantPhaseDescEnglish: response.applicantPhaseDescriptionEnglish,
      }
      yield put({ type: types.APPLICANT_PHASE_FETCH_DETAIL_SUCCESS, data})
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
  }
}

export function* fetchSubmit(param) {
  try {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: true})

    let stateApplicantPhase = yield select(getApplicantPhase)

    let body = {
      applicantPhaseName: stateApplicantPhase.form.applicantPhaseName,
      applicantPhaseNameEnglish: stateApplicantPhase.form.applicantPhaseNameEnglish,
      applicantPhaseDescription: stateApplicantPhase.form.applicantPhaseDesc,
      applicantPhaseDescriptionEnglish: stateApplicantPhase.form.applicantPhaseDescEnglish
    }
    
    const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_PHASE_SUBMIT_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
  }
}

export function* fetchEdit(param) {
  try {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: true})

    let stateApplicantPhase = yield select(getApplicantPhase)

    let body = {
      applicantPhaseId: param.id,
      applicantPhaseName: stateApplicantPhase.form.applicantPhaseName,
      applicantPhaseNameEnglish: stateApplicantPhase.form.applicantPhaseNameEnglish,
      applicantPhaseDescription: stateApplicantPhase.form.applicantPhaseDesc,
      applicantPhaseDescriptionEnglish: stateApplicantPhase.form.applicantPhaseDescEnglish
    }
    
    const response = yield call(PUT, Config.BASE_URL + Endpoint.APPLICANT_PHASE_UPDATE_PUT, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
  }
}

export function* fetchDelete(param) {
  try {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: true})

    let stateApplicantPhase = yield select(getApplicantPhase)
    let {pageNo, pageSize, totalRows} = stateApplicantPhase
    
    const response = yield call(DELETE, Config.BASE_URL + Endpoint.APPLICANT_PHASE_DELETE_DEL+`?id=${param.id}`, {}, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
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
      yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_PHASE_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.APPLICANT_PHASE_FETCH_SEARCH, fetchSearch),
      takeLatest(types.APPLICANT_PHASE_FETCH_DETAIL, fetchDetail),
      takeLatest(types.APPLICANT_PHASE_FETCH_SUBMIT, fetchSubmit),
      takeLatest(types.APPLICANT_PHASE_FETCH_EDIT, fetchEdit),
      takeLatest(types.APPLICANT_PHASE_FETCH_DELETE, fetchDelete)
    ]);
}
