import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getStateGeneralFilter = state => state.ConfigGeneralFilter;

export function* getMasterData() {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})
    let body = {
        MasterData: [
          {
            ObjectName: "GroupEvent"
          },
          {
            ObjectName: "Event"
          },
          {
            ObjectName: "GeneralFilter"
          },
        ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let groupEventAffcoFilter = resMasterData.GroupEventList.filter(x => (x.GroupEventName.toLowerCase().includes("general") || (x.GroupEventName.toLowerCase().includes("virtue"))))
      let groupEventAffco = groupEventAffcoFilter.map((x) => ({ ...x, id: x.GroupEventId, name: x.GroupEventName }))
      let data = {
        generalFilter: resMasterData.GeneralFilterList.map(x => ({ ...x, id:x.GeneralFilterID, name: x.GeneralFilterName })),
        groupEvent: resMasterData.GroupEventList.map(x => ({ ...x, id:x.GroupEventId, name: x.GroupEventName})),
        groupEventListAffco: groupEventAffco,
        event: resMasterData.EventList.map(x => ({ ...x, id:x.EventId, name: x.EventDescription + " - " + x.EventName})),
      }
      yield put({ type: types.CONFIG_FILTER_MASTER_DATA_SUCCESS, data: data})
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
    }else{
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export function* fetchSearch(param) {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})

    let stateGeneralFilter = yield select(getStateGeneralFilter)
    
    yield put({ 
      type: types.CONFIG_FILTER_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let body = {
      GeneralFilter: stateGeneralFilter.search.generalFilter,
      GroupEvent: stateGeneralFilter.search.groupEvent,
      Event: stateGeneralFilter.search.event,
      PageNo: param.data.pageNo,
      PageSize: param.data.pageSize
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.GF_CONFIG_LIST_POST, body, { headers: Header() })

    if(response.Acknowledge === 1){
      yield put({ type: types.CONFIG_FILTER_FETCH_SEARCH_SUCCESS, data: response })
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
    }else{
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export function* fetchSubmit(param) {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})

    let stateGeneralFilter = yield select(getStateGeneralFilter)
    
    let body = {
      GeneralFilter: stateGeneralFilter.form.generalFilter,
      GroupEvent: stateGeneralFilter.form.groupEvent,
      Event: stateGeneralFilter.form.event
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.GF_CONFIG_SUBMIT_POST, body, { headers: Header() })

    if(response.Acknowledge === 1){
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export function* fetchDetail(param) {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})

    let body = {
      MasterData: [
        {
          ObjectName: "GroupEvent"
        },
        {
          ObjectName: "Event"
        },
        {
          ObjectName: "GeneralFilter"
        },
      ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let groupEventAffcoFilter = resMasterData.GroupEventList.filter(x => (x.GroupEventName.toLowerCase().includes("general") || (x.GroupEventName.toLowerCase().includes("virtue"))))
      let groupEventAffco = groupEventAffcoFilter.map((x) => ({ ...x, id: x.GroupEventId, name: x.GroupEventName }))
      let data = {
        generalFilter: resMasterData.GeneralFilterList.map(x => ({ ...x, id:x.GeneralFilterID, name: x.GeneralFilterName })),
        groupEvent: resMasterData.GroupEventList.map(x => ({ ...x, id:x.GroupEventId, name: x.GroupEventName})),
        groupEventListAffco: groupEventAffco,
        event: resMasterData.EventList.map(x => ({ ...x, id:x.EventId, name:x.EventName})),
      }
      yield put({ type: types.CONFIG_FILTER_MASTER_DATA_SUCCESS, data})

      const response = yield call(GET, Config.BASE_URL + Endpoint.GF_CONFIG_DETAIL_GET+`?id=${param.id}`, { headers: Header() })
      if(response.Acknowledge === 1){
        let eventList = resMasterData.EventList.filter((obj) => obj.GroupEventId == response.GroupEventId)
        let eventListFilter = eventList.map((x) => ({ ...x, id: x.EventId, name: x.EventDescription +  " - " +  x.EventName}))
        let data = {
          generalFilterCode: response.ConfigCode,
          generalFilter: response.GeneralFilterId,
          groupEvent: response.GroupEventId,
          event: response.EventId
        }
        yield put({ type: types.CONFIG_FILTER_FETCH_DETAIL_SUCCESS, data})
        yield put({ type: types.CONFIG_FILTER_HANDLE_STATE_SOURCE, property: "eventFilter", value: eventListFilter })
        yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      }else{
        yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
        messages("Error", response.Message, "error", false);
      }
    }else{
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export function* fetchDelete(param) {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})

    let stateGeneralFilter = yield select(getStateGeneralFilter)
    let {pageNo, pageSize, totalRows} = stateGeneralFilter

    const response = yield call(DELETE, Config.BASE_URL + Endpoint.GF_CONFIG_DELETE_DEL+`?id=${param.id}`, {}, { headers: Header() })
    if(response.Acknowledge === 1){
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
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export function* fetchEdit(param) {
  try {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: true})

    let stateGeneralFilter = yield select(getStateGeneralFilter)
    
    let body = {
      GeneralFilter: stateGeneralFilter.form.generalFilter,
      GroupEvent: stateGeneralFilter.form.groupEvent,
      Event: stateGeneralFilter.form.event
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.GF_CONFIG_UPDATE_POST+`?id=${param.id}`, body, { headers: Header() })
    if(response.Acknowledge === 1){
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (err) {
    yield put({ type: types.CONFIG_FILTER_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.CONFIG_FILTER_FETCH_MASTER_DATA, getMasterData),
      takeLatest(types.CONFIG_FILTER_FETCH_SEARCH, fetchSearch),
      takeLatest(types.CONFIG_FILTER_FETCH_SUBMIT, fetchSubmit),
      takeLatest(types.CONFIG_FILTER_FETCH_DETAIL, fetchDetail),
      takeLatest(types.CONFIG_FILTER_FETCH_DELETE, fetchDelete),
      takeLatest(types.CONFIG_FILTER_FETCH_EDIT, fetchEdit)
    ]);
}
