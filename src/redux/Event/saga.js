import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";
import moment from 'moment';
import { DatabaseFilled } from "@ant-design/icons";

const getStateEvent = state => state.Event;
const getStateAuth = state => state.Auth;

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
      let groupEventAffcoFilter = resMasterData.GroupEventList.find(x => (x.GroupEventName.toLowerCase().includes("general")))
      let groupEventAffco = groupEventAffcoFilter ? [{ ...groupEventAffcoFilter, id: groupEventAffcoFilter.GroupEventId, name: groupEventAffcoFilter.GroupEventName }] : []
      let data = {
        sourceGroupEvent: resMasterData.GroupEventList.map(x => ({...x, id: x.GroupEventId, name: x.GroupEventName})),
        sourceGroupEventAffco: groupEventAffco,
        sourceMedia: resMasterData.MediaList.map(x => ({...x, id: x.MediaId, name: x.MediaName})),
      }
      yield put({ type: types.EVENT_MATER_DATA_SUCCESS, payload: data})
      yield put({ type: types.EVENT_HANDLE_STATE, property:"isDisabled", value: false})
      yield put({ type: types.EVENT_SET_LOADER, value: false})
    }else{
      yield put({ type: types.EVENT_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.EVENT_SET_LOADER, value: false})
  }
}

export function* fetchSearch(param) {
    try {
        yield put({ type: types.EVENT_SET_LOADER, value: true})
        let stateEvent = yield select(getStateEvent)

        yield put({ 
            type: types.EVENT_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
          })

        let body = {
            pageNo: param.data.pageNo,
            PageSize: param.data.pageSize,
            eventName: stateEvent.search.eventName,
            groupEventName: stateEvent.search.groupEvent,
            mediaName: stateEvent.search.media,
            startDate: stateEvent.search.startDate,
            endDate: stateEvent.search.endDate,
            description: stateEvent.search.description,
          }
        
        const response = yield call(POST, Config.BASE_URL + Endpoint.EVENT_LIST_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.EVENT_FETCH_SEARCH_SUCCESS, data: response})
            yield put({ type: types.EVENT_SET_LOADER, value: false})
        }else{
            yield put({ type: types.EVENT_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.EVENT_SET_LOADER, value: false})
    }
}

export function* fetchDeleteList(param) {
    try {
        yield put({ type: types.EVENT_SET_LOADER, value: true})

        let stateATSType = yield select(getStateEvent)
        let {pageNo, pageSize, totalRows} = stateATSType

        const response = yield call(DELETE, Config.BASE_URL + Endpoint.EVENT_DELETE_LIST+`?id=${param.id}`, {}, { headers: Header() });
        
        if(response.Acknowledge === 1){
            yield put({ type: types.EVENT_SET_LOADER, value: false})
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
            yield put({ type: types.EVENT_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.EVENT_SET_LOADER, value: false})
    }
}

export function* fetSubmitForm(param) {
  try {
      yield put({ type: types.EVENT_SET_LOADER, value: true})

      let stateATSType = yield select(getStateEvent)
      let stateAuth = yield select(getStateAuth)

      let resultFil
      if(stateAuth.roleName == "ho" || stateAuth.roleName == "aiho"){
        resultFil = stateATSType.sourceGroupEvent.filter(x => x.GroupEventId == stateATSType.formEvent.groupNameEvent && (x.GroupEventName.toUpperCase() == 'VIRTUE' || x.GroupEventCode.toUpperCase() == 'VRT' || x.GroupEventCode.toUpperCase() == 'VIRTUE'))
      }else{
        resultFil = stateATSType.sourceGroupEventAffco.filter(x => x.GroupEventId == stateATSType.formEvent.groupNameEvent && (x.GroupEventName.toUpperCase() == 'VIRTUE' || x.GroupEventCode.toUpperCase() == 'VRT' || x.GroupEventCode.toUpperCase() == 'VIRTUE'))
      }

      let {pageNo, pageSize, totalRows, formEvent, sourceGroupEvent, sourceMedia} = stateATSType

      let GroupEventCode = sourceGroupEvent.find(x => x.id == formEvent.groupNameEvent)
      let MediaCode = sourceMedia.find(x => x.id == formEvent.mediaName)
      let startDate = formEvent.startDate.replace(/[/]/g, "")

      let body = {
        groupEventId: stateATSType.formEvent.groupNameEvent,
        mediaId: stateATSType.formEvent.mediaName,
        eventName: GroupEventCode.GroupEventCode + "/" + MediaCode.MediaCode +"/"+ startDate,
        eventDescription: stateATSType.formEvent.eventDescription,
        startDate: stateATSType.formEvent.startDate,
        endDate: stateATSType.formEvent.endDate,
        maxApplyLimit: stateATSType.formEvent.maxVacancyApplied,
        applyActiveDate: resultFil.length != 0 ? moment(stateATSType.formEvent.startDateApply).format("DD/MM/YYYY") : null
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.EVENT_SAVE_POST, body, { headers: Header() });
      
      if(response.Acknowledge === 1){
          yield put({ type: types.EVENT_SET_LOADER, value: false})
          messages("Info", response.Message, "info", false);
          param.history.goBack()
          let data = {
                  data: {
                      pageNo,
                      pageSize,
                      totalRows
                  }
            }
          yield call(fetchSearch, data)
      }else{
          yield put({ type: types.EVENT_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
      }
  } catch (error) {
      yield put({ type: types.EVENT_SET_LOADER, value: false})
  }
}

export function* fetchGetDetail(param) {
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
      let groupEventAffcoFilter = resMasterData.GroupEventList.find(x => (x.GroupEventName.toLowerCase().includes("general")))
      let groupEventAffco = groupEventAffcoFilter ? [{ ...groupEventAffcoFilter, id: groupEventAffcoFilter.GroupEventId, name: groupEventAffcoFilter.GroupEventName }] : []
      let data = {
        sourceGroupEvent: resMasterData.GroupEventList.map(x => ({...x, id: x.GroupEventId, name: x.GroupEventName})),
        sourceGroupEventAffco: groupEventAffco,
        sourceMedia: resMasterData.MediaList.map(x => ({...x, id: x.MediaId, name: x.MediaName})),
      }
      yield put({ type: types.EVENT_MATER_DATA_SUCCESS, payload: data})

      const response = yield call(GET, Config.BASE_URL + Endpoint.EVENT_DETAIL_GET+`?id=${param.id}`, { headers: Header() });
      
      if(response.Acknowledge === 1){
          let date  = moment(response.Event.StartDate, "DD/MM/YYYY")
          let now = moment()
          let isDate = now.diff(date)
          if(isDate < 0){
            yield put({ type: types.EVENT_HANDLE_STATE, property:"isDisabled", value: false})
          }else{yield put({ type: types.EVENT_HANDLE_STATE, property:"isDisabled", value: true})}
          yield put({ type: types.EVENT_FETCH_GET_DETAIL_SUCCESS, data: response.Event})
          yield put({ type: types.EVENT_SET_LOADER, value: false})
      }else{
          yield put({ type: types.EVENT_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
      }
    }else{
      yield put({ type: types.EVENT_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (error) {
      yield put({ type: types.EVENT_SET_LOADER, value: false})
  }
}

export function* postUpdate(param) {
  try {
    yield put({ type: types.EVENT_SET_LOADER, value: true})

    let stateEvent = yield select(getStateEvent)
    let stateAuth = yield select(getStateAuth)

    let resultFil
    if(stateAuth.roleName == "ho" || stateAuth.roleName == "aiho"){
      resultFil = stateEvent.sourceGroupEvent.filter(x => x.GroupEventId == stateEvent.formEvent.groupNameEvent && (x.GroupEventName.toUpperCase() == 'VIRTUE' || x.GroupEventCode.toUpperCase() == 'VRT' || x.GroupEventCode.toUpperCase() == 'VIRTUE'))
    }else{
      resultFil = stateEvent.sourceGroupEventAffco.filter(x => x.GroupEventId == stateEvent.formEvent.groupNameEvent && (x.GroupEventName.toUpperCase() == 'VIRTUE' || x.GroupEventCode.toUpperCase() == 'VRT' || x.GroupEventCode.toUpperCase() == 'VIRTUE'))
    }

    let body = {
      EventId: param.id,
      groupEventId : stateEvent.formEvent.groupNameEvent,
      mediaId : stateEvent.formEvent.mediaName,
      eventName : stateEvent.formEvent.eventName,
      eventDescription : stateEvent.formEvent.eventDescription,
      startDate : moment(stateEvent.formEvent.startDate, "DD/MM/YYYY").format("DD/MM/YYYY"),
      endDate : moment(stateEvent.formEvent.endDate, "DD/MM/YYYY").format("DD/MM/YYYY"),
      maxApplyLimit : stateEvent.formEvent.maxVacancyApplied,
      applyActiveDate: resultFil.length != 0 ? moment(stateEvent.formEvent.startDateApply, "DD/MM/YYYY").format("DD/MM/YYYY") : null
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.EVENT_UPDATE_POST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.EVENT_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.EVENT_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.EVENT_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.EVENT_FETCH_SEARCH, fetchSearch),
      takeLatest(types.EVENT_FETCH_DELETE_LIST, fetchDeleteList),
      takeLatest(types.EVENT_FETCH_MATER_DATA, getMasterData),
      takeLatest(types.EVENT_FETCH_SUBMIT_FORM, fetSubmitForm),
      takeLatest(types.EVENT_FETCH_GET_DETAIL, fetchGetDetail),
      takeLatest(types.EVENT_FETCH_UPDATE_DETAIL, postUpdate),
    ]);
}
