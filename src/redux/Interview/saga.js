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
    yield put({ type: types.INTERVIEW_SET_LOADER, value: true })
    let body = {
      MasterData: [
        {
          ObjectName: "FailedCauses"
        },
        {
          ObjectName: "FailedCausesDetail"
        },
      ]
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if (resMasterData.Acknowledge === 1) {
      let data = {
        FailedCauses: resMasterData.FailedCausesList.map(x => ({ ...x, id: x.Id, name: x.Name })),
        FailedCausesDetail: resMasterData.FailedCausesDetailList.map(x => ({ ...x, id: x.Id, name: x.Name })),
      }
      yield put({ type: types.INTERVIEW_MATER_DATA_SUCCESS, payload: data })
      yield put({ type: types.INTERVIEW_SET_LOADER, value: false })
    } else {
      yield put({ type: types.INTERVIEW_SET_LOADER, value: false })
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.INTERVIEW_SET_LOADER, value: false })
  }
}


export default function* rootSaga() {
  yield all([takeLatest(types.INTERVIEW_FETCH_MATER_DATA, getMasterData)]);
}
