import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, DELETE_POST } from "../../service/api";
import { Header } from "../../service/header";

const getStateAssigneeType = state => state.AssigneeType;

export function* getMasterData() {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})
    let body = {
        MasterData: [
          {
            ObjectName: "AssigneeType"
          }
        ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })
    
    if(resMasterData.Acknowledge == 1){
      let data = {
        assigneeTypeList: resMasterData.AssigneeTypeList.map(x => ({...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName}))
      }
      yield put({ type: types.ASSIGNEE_TYPE_MATER_DATA_SUCCESS, payload: data})
    }
    
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  } catch (err) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  }
}

export function* postSearch(param) {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})
    let stateAssigneeType = yield select(getStateAssigneeType)
    let { formSearch } = stateAssigneeType

    yield put({ 
      type: types.ASSIGNEE_TYPE_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let body = {
      PageNo: param.data.pageNo,
      PageSize: param.data.pageSize,
      AssigneeTypeName: formSearch.name,
      AssigneeTypeDescription: formSearch.description
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_TYPE_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_TYPE_FETCH_SEARCH_SUCCESS, value: response})
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false })
  } catch (error) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  }
}

export function* deleteList(param) {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})
    let body = {
      AssigneeTypeId : param.id
    }
    const response = yield call(DELETE_POST, Config.BASE_URL + Endpoint.ASSIGNEE_TYPE_DEL_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      messages("Info", response.Message, "info", false);

      let data = {
        data: {
          pageNo: 1,
          pageSize: 10,
          totalRows: 10
        }
      }
      yield call(postSearch, data)
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }else{
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  }
}

export function* getDetail(param) {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})

    let body = {
      AssigneeTypeId: param.id
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_TYPE_GET_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      let mapDataRes = {
        assigneeTypeId: response.AssigneeTypeId,
        assigneeTypeCode: response.AssigneeTypeCode,
        name: response.AssigneeTypeName,
        description: response.AssigneeTypeDescription
      }
      yield put({ type: types.ASSIGNEE_TYPE_GET_DETAIL_SUCCESS, payload: mapDataRes })
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  }
}

export function* postForm(param) {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})
    let stateAssigneeType = yield select(getStateAssigneeType)
    let { assigneeTypeCode, name, description } = stateAssigneeType.formAssigneeType

    let body = {
      AssigneeTypeName: name,
      AssigneeTypeDescription: description,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_TYPE_CREATE_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
    messages("Error", error.Message, "error", false);
  }
}

export function* postUpdate(param) {
  try {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: true})

    let stateAssigneeType = yield select(getStateAssigneeType)
    let { assigneeTypeId, assigneeTypeCode, name, description } = stateAssigneeType.formAssigneeType

    let body = {
      AssigneeTypeId: assigneeTypeId,
      AssigneeTypeName: name,
      AssigneeTypeDescription: description,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_TYPE_UPDATE_POST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (error) {
    yield put({ type: types.ASSIGNEE_TYPE_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.ASSIGNEE_TYPE_FETCH_MATER_DATA, getMasterData),
    takeLatest(types.ASSIGNEE_TYPE_FETCH_SEARCH, postSearch),
    takeLatest(types.ASSIGNEE_TYPE_FETCH_DEL, deleteList),
    takeLatest(types.ASSIGNEE_TYPE_FETCH_GET_DETAIL, getDetail),
    takeLatest(types.ASSIGNEE_TYPE_FETCH_SUBMIT_FORM, postForm),
    takeLatest(types.ASSIGNEE_TYPE_FETCH_UPDATE_FORM, postUpdate)
  ]);
}

