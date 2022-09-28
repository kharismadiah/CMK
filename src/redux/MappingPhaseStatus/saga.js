import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getStateMappingPhaseStatus = state => state.MappingPhaseStatus;

export function* getMasterData() {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})
    let body = {
        MasterData: [
          {
            ObjectName: "ApplicantPhase"
          },
          {
            ObjectName : "ApplicantStatus"
          }
        ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let data = {
        applicantPhase: resMasterData.ApplicantPhaseList.map(x => ({ ...x, id:x.Id, name: x.ApplicantPhaseName })),
        applicantStatusName: resMasterData.ApplicantStatusList.map(x => ({ ...x, id: x.ApplicantStatusId, name: x.ApplicantStatusName })),
      }
      yield put({ type: types.MAPP_PHASE_STATUS_MASTER_DATA_SUCCESS, data})
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
    }else{
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export function* fetchSearch(param) {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})

    let stateMappingPhaseStatus = yield select(getStateMappingPhaseStatus)
    
    yield put({ 
      type: types.MAPP_PHASE_STATUS_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let {search} = stateMappingPhaseStatus

    let body = {
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      applicantPhaseName: search.applicantPhaseName,
      applicantStatusName: search.applicantStatusName
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.MAPP_PHASE_STATUS_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.MAPP_PHASE_STATUS_FETCH_SEARCH_SUCCESS, data: response})
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
    }else{
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export function* fetchDelete(param) {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})

    let stateMappingPhaseStatus = yield select(getStateMappingPhaseStatus)
    let {pageNo, pageSize, totalRows} = stateMappingPhaseStatus

    
    const response = yield call(DELETE, Config.BASE_URL + Endpoint.MAPP_PHASE_STATUS_DELETE_DEL+`?id=${param.id}`, {}, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
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
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export function* fetchDetail(param) {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})

    let body = {
      MasterData: [
        {
          ObjectName: "ApplicantPhase"
        },
        {
          ObjectName : "ApplicantStatus"
        }
      ]      
    }

    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let data = {
        applicantPhase: resMasterData.ApplicantPhaseList.map(x => ({ ...x, id:x.Id, name: x.ApplicantPhaseName })),
        applicantStatusName: resMasterData.ApplicantStatusList.map(x => ({ ...x, id: x.ApplicantStatusId, name: x.ApplicantStatusName })),
      }
      
      yield put({ type: types.MAPP_PHASE_STATUS_MASTER_DATA_SUCCESS, data})
      const response = yield call(GET, Config.BASE_URL + Endpoint.MAPP_PHASE_STATUS_DETAIL_POST+`?phaseStatusCode=${param.id}`, { headers: Header() });

      if(response.Acknowledge === 1){
        let dataParam = {
          applicantPhaseFlag: response.applicantPhaseId,
          applicantPhase: response.applicantPhaseId,
          listTable: response.applicantStatusList.map((x) => ({
            applicantPhaseStatusId: x.applicantPhaseStatusId,
            applicantStatusId: x.applicantStatusId,
            isComplete: x.isComplete,
            isNew: 0,
          }))
        }
        yield put({ type: types.MAPP_PHASE_STATUS_FETCH_DETAIL_SUCCESS, data: dataParam })
        yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      }else{
        yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
        messages("Error", response.Message, "error", false);
      }
    }else{
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export function* fetchSubmit(param) {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})
    
    let stateMappingPhaseStatus = yield select(getStateMappingPhaseStatus)
    let body = {
      applicantPhaseId: stateMappingPhaseStatus.form.applicantPhase,
      applicantStatusList: stateMappingPhaseStatus.form.listTable.map(x => ({ applicantStatusId: x.applicantStatusId, isComplete: x.isComplete }))
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.MAPP_PHASE_STATUS_SUBMIT_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export function* fetchUpdate(param) {
  try {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: true})

    let stateMappingPhaseStatus = yield select(getStateMappingPhaseStatus)
    let {form, source, sourceTable} = stateMappingPhaseStatus
    let body = {
      applicantPhaseId: form.applicantPhase,
      applicantPhaseStatusCode: source.applicantPhase.find((obj) => obj.Id === form.applicantPhase).ApplicantPhaseCode,
      applicantStatusList: form.listTable.map(x => ({ 
        applicantPhaseStatusId: x.applicantPhaseStatusId, //parseInt(param.id) => applicantPhaseId
        applicantStatusId: x.applicantStatusId,
        isComplete: x.isComplete, 
        isNew: x.isNew,
        isDeleted: 0
      }))
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.MAPP_PHASE_STATUS_UPDATE_POST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (error) {
    yield put({ type: types.MAPP_PHASE_STATUS_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_MASTER_DATA, getMasterData),
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_SEARCH, fetchSearch),
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_DELETE, fetchDelete),
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_DETAIL, fetchDetail),
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_SUBMIT, fetchSubmit),
      takeLatest(types.MAPP_PHASE_STATUS_FETCH_EDIT, fetchUpdate)
    ]);
}
