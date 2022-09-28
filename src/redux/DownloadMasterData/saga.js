import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { saveAs } from 'file-saver';

import { POST, POSTBLOB } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getDownloadMasterData = state => state.DownloadMasterData;

export function* fetchMasterData() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      const response = yield call(POST, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_SOURCE_POST, {}, { headers: Header() });

      if(response.Acknowledge == 1){
          let masterData = response.downloadMasterTablesList.map(x => ({ id: x.tabelId, name: x.tabelName }))
          yield put({ type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS, property: 'masterData', value: masterData})
          yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
      }else{
        yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchPosition() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      const response = yield call(POST, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_POSITION_POST, {}, { headers: Header() });

      if(response.Acknowledge == 1){
          let position = response.positionList.map(x => ({ id: x.positionId, name: x.positionName }))
          yield put({ type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS, property: 'name', value: position})
          yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
      }else{
        yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchGroupEvent() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      const response = yield call(POST, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_GROUP_EVENT_POST, {}, { headers: Header() });

      if(response.Acknowledge == 1){
          let groupEvent = response.groupEventList.map(x => ({ id: x.groupEventId, name: x.groupEventName }))
          yield put({ type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS, property: 'groupEvent', value: groupEvent})
          yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
      }else{
        yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchEventList(param) {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      
      let body ={
        GroupEventIdList: param.id
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_EVENT_LIST_POST, body, { headers: Header() });

      if(response.Acknowledge == 1){
          let groupEventName = response.eventList.map(x => ({ id: x.eventId, name: x.eventName }))
          yield put({ type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS, property: 'groupEventName', value: groupEventName})
          yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
      }else{
        yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchVacancyList(param) {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      let body ={
        eventIdList: param.id
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_VACANCY_LIST_POST, body, { headers: Header() });
      debugger
      if(response.Acknowledge == 1){
          let title = response.vacancyList.map(x => ({ ...x, id: x.vacancyId, name: x.vacancyTitle }))
          yield put({ type: types.DOWN_MASTER_DATA_FETCH_MASTER_DATA_SUCCESS, property: 'title', value: title})
          yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
      }else{
        yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchDownMasterEvent() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      
      let stateDownMasterData = yield select(getDownloadMasterData)
      let body ={
        masterDataType: 'event',
        masterDataIdList: stateDownMasterData.field.groupEventName
      }
      const response = yield call(POSTBLOB, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_DOWN_MASTER_POST, body, { headers: Header() });
      var blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Event.xlsx");
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })

  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchDownMasterPosition() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      
      let stateDownMasterData = yield select(getDownloadMasterData)
      let body ={
        masterDataType: 'position',
        masterDataIdList: [stateDownMasterData.field.name]
      }
      const response = yield call(POSTBLOB, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_DOWN_MASTER_POST, body, { headers: Header() });
      var blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Position.xlsx");
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export function* fetchDownMasterVacancy() {
  try {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: true })
      
      let stateDownMasterData = yield select(getDownloadMasterData)
      let body ={
        masterDataType: 'vacancy',
        masterDataIdList: stateDownMasterData.field.title
      }

      const response = yield call(POSTBLOB, Config.BASE_URL + Endpoint.DWN_MASTER_DATA_DOWN_MASTER_POST, body, { headers: Header() });
      var blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Vacancy.xlsx");
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  } catch (err) {
      yield put({ type: types.DOWN_MASTER_DATA_SET_LOADER, value: false })
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.DOWN_MASTER_DATA_FETCH_MASTER_DATA, fetchMasterData),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_POSITION, fetchPosition),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_GROUP_EVENT, fetchGroupEvent),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_EVENT_LIST, fetchEventList),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_VACANCY_LIST, fetchVacancyList),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_DOWN_POSITION, fetchDownMasterPosition),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_DOWN_EVENT, fetchDownMasterEvent),
      takeLatest(types.DOWN_MASTER_DATA_FETCH_DOWN_VACANCY, fetchDownMasterVacancy)
    ]);
}
