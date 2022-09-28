import {
  all,
  takeLatest,
  call,
  fork,
  put,
  select,
  take,
} from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET } from "../../service/api";
import { Header } from "../../service/header";
import { messages,OLIntegrationRequestSuccess } from "../../components/messageBox";
import { arrayOf } from "prop-types";

const getStateListOLIntegrationLog = (state) => state.OLIntegrationLog;

export function* getMasterData() {
  try {
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true });
    // let stateListOLIntegrationLog = yield select(getStateListOLIntegrationLog)
    let body = {};
    const resMasterData = yield call(
      POST, 
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_MASTER_DATA,
      body, 
      {headers: Header(),
    });

    if (resMasterData.Acknowledge === 1) {
      let data = {
        company:resMasterData.CompanyList.map(x=>({ ...x, id: x.CompanyId, name: x.CompanyName})),
        eventName:resMasterData.EventList.map(x=>({ ...x, id: x.EventId, name: x.EventName})),
        groupEvent:resMasterData.GroupEventList.map(x=>({ ...x, id: x.GroupEventId, name: x.GroupEventName})),
        position:resMasterData.PositionList.map(x=>({ ...x, id: x.PositionId, name: x.PositionName})),
        vacancy:resMasterData.VacancyList.map(x=>({ ...x, id: x.VacancyId, name: x.PositionTitleName})),
      }
      
      // let dummyData = []
      // for (let i=0; i<65; i++) {
      //   dummyData = [...dummyData, {GroupEventName : `group event name ${i+1}`, ApplicantEmail:i%2===0? "ervan@gmail.com":"bagong@yopmail.com" }]
      // }

      // yield put({
      //   type: types.OL_INTEGRATION_FETCH_SHOW_SUCCESS,
      //   payload: dummyData,
      // });

      // yield put ({
      //   type: types.OL_INTEGRATION_HANDLE_STATE_PAGINATION,
      //   pageNo: stateListOLIntegrationLog.pageNo,
      //   pageSize: stateListOLIntegrationLog.pageSize,
      //   totalRows: dummyData.length
      // })

      yield put({
        type: types.OL_INTEGRATION_MATER_DATA_SUCCESS,
        payload: data,
      });
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
  }
}

export function* fetchShowData(action) {
  try {
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true });
    let stateListOLIntegrationLog = yield select(getStateListOLIntegrationLog)
    let body = action.value;
    const response = yield call(
      POST,
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_DATA,
      body,
      { headers: Header() }
    );
    if (response.Acknowledge === 1) {
      yield put({
        type: types.OL_INTEGRATION_FETCH_SHOW_SUCCESS,
        payload: response.OLIntegrationLogList,
      });
      yield put ({
          type: types.OL_INTEGRATION_HANDLE_STATE_PAGINATION,
          pageNo: 1,
          pageSize: stateListOLIntegrationLog.pageSize,
          totalRows: response.OLIntegrationLogList.length
        })
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Sorry ", "No data available at a moment for selected vacancy", "warning", false)
    }
  } catch (err) {
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
  }
}

export function* searchApplicationData(action){
  try {
    let stateListOLIntegrationLog = yield select(getStateListOLIntegrationLog)
    const searchParam = action.searchParam;
    //zero param, return data to initial
    if(Object.values(searchParam).every(x => x === null || x === '')) return;
    
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true });
    let newList = [];
    action.tableData.forEach(row => {
      let checkList = [];
      checkList.push(searchParam.applicantEmail ? row.ApplicantEmail.toLowerCase().startsWith(searchParam.applicantEmail.toLowerCase()) : true);
      checkList.push(searchParam.status ? row.OLResultStatusName.toLowerCase().startsWith(searchParam.status.toLowerCase()) : true);
      //message error not yet implemented
      checkList.push(true); //checkList.push(searchParam.messageError ? row.MessageError.startsWith(searchParam.messageError) : true);
      if(checkList.every(x => x === true)) newList.push(row);
    })
    yield put({type: types.OL_INTEGRATION_FETCH_SEARCH_SUCCESS, data: newList});
    yield put ({
      type: types.OL_INTEGRATION_HANDLE_STATE_PAGINATION,
      pageNo: newList.length === 0
              ? 1
              : stateListOLIntegrationLog.pageNo > newList.length/stateListOLIntegrationLog.pageSize
                  ? Math.ceil(newList.length/stateListOLIntegrationLog.pageSize)
                  : stateListOLIntegrationLog.pageNo,
      pageSize: stateListOLIntegrationLog.pageSize,
      totalRows: newList.length
    })
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
  } catch (err) {
    console.log(err)
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
  }
}

export function* fetchCheck(action){
  try{
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true});
    let body = action.value;

    const response = yield call(
      POST, 
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_RECHECK,
      body, 
      { headers: Header() },
      );
      
    if (response.Acknowledge === 1) {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      OLIntegrationRequestSuccess("check", response.Message, null, action.successAction)
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Error", response.Message, "warning", false);
    }
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  } catch(err) {
    console.log(err)
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  }
}

export function* fetchCheckAll(action){
  try{
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true});
    let vacancyList = action.tableData[0].VacancyId;
    console.log(vacancyList)
    let applicantList = [];
    action.tableData.forEach(row => 
      { 
        if(row.OLResultStatusId === 5){
          applicantList.push(row.ApplicantId)
        } 
      }) 
    // check if there's exist an OL Result Status: Error Result
    if(applicantList.length<1){//if no such status found:
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages(
        "Re-Check Failed",
        "Candidate's with OL Result Status = 'Result Error' not found",
        "error",
        false 
        )
      return;
    }

    let body = {
      VacancyId: vacancyList,
      ApplicantList: [],
    }
    //else
    const response = yield call(
      POST, 
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_RECHECK,
      body, 
      { headers: Header() },
      );

    if (response.Acknowledge === 1) {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      OLIntegrationRequestSuccess("check", response.Message, null, action.successAction)
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Error", response.Message, "warning", false);
    }
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  } catch(err) {
    console.log(err)
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  }
}

export function* fetchGenerate(action){
try{
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true});
    let body = action.value

    // console.log("=====> hasil body",body)
    const response = yield call(
      POST, 
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_REGENERATE_FAILED,
      body, 
      { headers: Header() },
      );

    if (response.Acknowledge === 1) {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      OLIntegrationRequestSuccess("generate", response.Message, null, action.successAction)
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Error", response.Message, "warning", false);
    }
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  } catch(err) {
    console.log(err)
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  }
}

export function* fetchGenerateAll(action){
  try{
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: true});
    let vacancyList = action.tableData[0].VacancyId;
    console.log(vacancyList)
    let applicantList = [];
    action.tableData.forEach(row => 
      { 
        if(row.OLResultStatusId === 4){
          applicantList.push(row.ApplicantId)
        } 
      }) 
    // check if there's exist an OL Result Status: Error Result
    if(applicantList.length<1){ //if no such status found:
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages(
        "Re-Generate Result",
        "Candidate's with OL Result Status = 'Failed Generate' not found",
        "error",
        false 
        )
      return;
    }
    
    let body = {
      VacancyId: vacancyList,
      ApplicantList: [],
    }
    const response = yield call(
      POST, 
      Config.BASE_URL + Endpoint.OLINTEGRATIONLOG_FETCH_REGENERATE_FAILED,
      body, 
      { headers: Header() },
      );

    if (response.Acknowledge === 1) {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      OLIntegrationRequestSuccess("generate", response.Message, null, action.successAction)
    } else {
      yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false });
      messages("Error", response.Message, "warning", false);
    }
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  } catch(err) {
    console.log(err)
    yield put({ type: types.OL_INTEGRATION_SET_LOADER, value: false});
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.OL_INTEGRATION_FETCH_MATER_DATA, getMasterData),
    takeLatest(types.OL_INTEGRATION_FETCH_SHOW, fetchShowData),
    takeLatest(types.OL_INTEGRATION_FETCH_SEARCH, searchApplicationData),
    takeLatest(types.OL_INTEGRATION_FETCH_RECHECK, fetchCheck),
    takeLatest(types.OL_INTEGRATION_FETCH_RECHECK_ALL, fetchCheckAll),
    takeLatest(types.OL_INTEGRATION_FETCH_REGENERATE_FAILED, fetchGenerate),
    takeLatest(types.OL_INTEGRATION_FETCH_REGENERATE_FAILED_ALL, fetchGenerateAll),
    // SAGA
    // OL_INTEGRATION_FETCH_MATER_DATA
    // OL_INTEGRATION_FETCH_SHOW
    // OL_INTEGRATION_FETCH_SEARCH
    // OL_INTEGRATION_FETCH_RECHECK
    // OL_INTEGRATION_FETCH_RECHECK_ALL
    // OL_INTEGRATION_FETCH_REGENERATE_FAILED
    // OL_INTEGRATION_FETCH_REGENERATE_FAILED_ALL
  ]);
}
