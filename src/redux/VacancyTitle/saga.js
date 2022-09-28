import { all, takeLatest, call, put } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

export function* fetchList(param) {
  try {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: true})
    const response = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_DASHBOARD_GET+`?id=${param.id}`, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.VACANCY_TITLE_FETCH_LIST_SUCCESS, data: response })
      let body = {
        "MasterData": [
            {
                "ObjectName": "OnlineTestType"
            },
        ]
      }
      const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

      if(resMasterData.Acknowledge === 1){
        let data = {
          onlineTypeTest: resMasterData.OnlineTestTypeList.map(x => ({ id: x.OnlineTestTypeId, name: x.OnlineTestTypeName }))
        }
        yield put({type: types.VACANCY_TITLE_FETCH_MASTER_DATA_SUCCESS, data})
        yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
      }else{
        yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
        messages("Error", resMasterData.Message, "error", false);
      }
    }else{
      yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  }catch (err) {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }
}

export function* fetchAstraOrNot(param) {
  try {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: true})

    let body = {
      vacancyId: param.id,
      onlineTestTypeId: param.onlineTestTypeId
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_DASHBOARD_POST_UPDATE_ONLINE_TEST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
      param.history.push(`${param.id}/onlineTest/${param.phaseId}`)
    }else{
      yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  }catch (err) {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }
}

export function* fetchTestTool(param) {
  try {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: true})

    let body = {
      vacancyId: param.id,
      onlineTestTypeId: param.onlineTestTypeId
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_DASHBOARD_POST_TEST_TOOL, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      let data = {
        testToolList: response.TestToolList,
        totalTools: response.TotalTools,
        cutOffName: response.CutOffName
      }
      yield put({type: types.VACANCY_TITLE_FETCH_MASTER_DATA_SUCCESS, data})
      // param.history.push(`${param.id}/onlineTest/${param.phaseId}`)
    }else{
      messages("Error", response.Message, "error", false);
    }
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }catch (err) {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }
}

export function* fetchCutOffList(param) {
  try {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: true})

    // let body = {
    //   vacancyId: param.id,
    //   onlineTestTypeId: param.onlineTestTypeId
    // }
    const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_DASHBOARD_POST_TEST_TOOL, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      let data = {
        testToolList: response.TestToolList,
        totalTools: response.TotalTools,
        // cutOffName: response.CutOffName,
        cutOffListOT: []
      }
      yield put({type: types.VACANCY_TITLE_FETCH_MASTER_DATA_SUCCESS, data})
      // param.history.push(`${param.id}/onlineTest/${param.phaseId}`)
    }else{
      messages("Error", response.Message, "error", false);
    }
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }catch (err) {
    yield put({ type: types.VACANCY_TITLE_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.VACANCY_TITLE_FETCH_LIST, fetchList),
      takeLatest(types.VACANCY_TITLE_FETCH_ASTRA_OR_NOT, fetchAstraOrNot),
      takeLatest(types.VACANCY_TITLE_FETCH_TEST_TOOL, fetchTestTool),
      takeLatest(types.VACANCY_TITLE_FETCH_CUTOFF_LIST ,fetchCutOffList)
    ]);
}
