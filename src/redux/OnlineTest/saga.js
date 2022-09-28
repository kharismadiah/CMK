import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";
import moment from 'moment';

const getStateEvent = state => state.Event;

export function* getMasterData() {
  try {
    yield put({ type: types.EVENT_SET_LOADER, value: true})
    let body = {
        MasterData: [
          {
            ObjectName: "GroupEvent"
          },
          {
            ObjectName: "Media"
          }
        ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let data = {
        sourceGroupEvent: resMasterData.GroupEventList.map(x => ({...x, id: x.GroupEventId, name: x.GroupEventName})),
        sourceMedia: resMasterData.MediaList.map(x => ({...x, id: x.MediaId, name: x.MediaName})),
      }
      yield put({ type: types.EVENT_MATER_DATA_SUCCESS, payload: data})
      yield put({ type: types.EVENT_SET_LOADER, value: false})
    }else{
      yield put({ type: types.EVENT_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.EVENT_SET_LOADER, value: false})
  }
}


export default function* rootSaga() {
    yield all([]);
}
