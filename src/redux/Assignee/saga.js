import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE_POST } from "../../service/api";
import { Header } from "../../service/header";
import { sortArrayDropdown } from "../../helpers/sort-dropdown";
const getStateAssignee = state => state.Assignee;

export function* getMasterData() {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
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
      yield put({ type: types.ASSIGNEE_MATER_DATA_SUCCESS, payload: data})

      const res = yield call(GET, Config.BASE_URL + Endpoint.USERPROFILE_LIST_GET, {headers: Header()});
      if(res.Acknowledge === 1){
        let listOfUsers = sortArrayDropdown(res.UsersList, 'Name');
        console.log("listOfUsers", listOfUsers)
        let dataRes = {
          userProfile: Array.isArray(listOfUsers) && listOfUsers.length > 0
            ? listOfUsers.map(x => ({...x, id: x.UserProfileId, name: x.Name}))
            : res.UsersList.map(x => ({...x, id: x.UserProfileId, name: x.Name}))
        }
        yield put({type: types.ASSIGNEE_FETCH_USERPROFILE_LIST_SUCCESS, value:dataRes})
      }
    }
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  } catch (err) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  }
}

export function* postSearch(param) {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
    let stateAssignee = yield select(getStateAssignee)
    let { assigneeType, username } = stateAssignee.formSearch

    yield put({ 
      type: types.ASSIGNEE_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let body = {
      PageNo: param.data.pageNo,
      PageSize: param.data.pageSize,
      UserName: username,
      AssigneeType: assigneeType
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_FETCH_SEARCH_SUCCESS, value: response})
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false })
  } catch (error) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  }
}

export function* deleteList(param) {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
    let stateAssignee = yield select(getStateAssignee)
    let { pageNo, pageSize, totalRows } = stateAssignee
    
    let body = {
      AssigneeId : param.id
    }
    const response = yield call(DELETE_POST, Config.BASE_URL + Endpoint.ASSIGNEE_DEL_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      messages("Info", response.Message, "info", true);
      let data = {
        data: {
          pageNo: 1,
          pageSize: 10,
          totalRows: 10
        }
      }
      yield call(postSearch, data)
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }else{
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  }
}

export function* getDetail(param) {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
    let stateAssignee = yield select(getStateAssignee)

    let bodyMaster = {
      MasterData: [
        {
          ObjectName: "AssigneeType"
        }
      ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, bodyMaster, { headers: Header() })
    
    if(resMasterData.Acknowledge == 1){
      let data = {
        assigneeTypeList: resMasterData.AssigneeTypeList.map(x => ({...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName}))
      }
      yield put({ type: types.ASSIGNEE_MATER_DATA_SUCCESS, payload: data})
      const res = yield call(GET, Config.BASE_URL + Endpoint.USERPROFILE_LIST_GET, {headers: Header()});
      if(res.Acknowledge === 1){
        let listOfUsers = sortArrayDropdown(res.UsersList, 'Name');
        let dataRes = {
          userProfile: Array.isArray(listOfUsers) && listOfUsers.length > 0
            ? listOfUsers.map(x => ({...x, id: x.UserProfileId, name: x.Name}))
            : res.UsersList.map(x => ({...x, id: x.UserProfileId, name: x.Name}))
        }
        yield put({type: types.ASSIGNEE_FETCH_USERPROFILE_LIST_SUCCESS, value:dataRes})

        let body = {
          AssigneeId: param.id
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_GET_POST, body, { headers: Header() });
  
        if(response.Acknowledge === 1){
          let mapDataRes = {
            assigneeId: response.AssigneeId,
            assigneeCode: response.assigneeCode,
            assigneeTypeId: response.AssigneeTypeId,
            assigneeType: response.assigneeType,
            userProfileId: response.UserProfileId,
            userName: response.UserName,
            name: response.UserName,
            email: response.Email
          }
          yield put({ type: types.ASSIGNEE_GET_DETAIL_SUCCESS, payload: mapDataRes })
          yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
        }else{
          yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
        }
      }
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  }
}

export function* postForm(param) {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
    let stateAssignee = yield select(getStateAssignee)
    let { assigneeTypeId, name, email } = stateAssignee.formAssignee

    let body = {
      AssigneeTypeId: assigneeTypeId,
      // Name: name,
      Email: email,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_CREATE_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (error) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
    messages("Error", error.Message, "error", false);
  }
}

export function* postUpdate(param) {
  try {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: true})
    let stateAssignee = yield select(getStateAssignee)
    let { assigneeId, assigneeTypeId, email } = stateAssignee.formAssignee

    let body = {
      assigneeId: assigneeId,
      AssigneeTypeId: assigneeTypeId,
      Email: email,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ASSIGNEE_UPDATE_POST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ASSIGNEE_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.ASSIGNEE_FETCH_MATER_DATA, getMasterData),
    takeLatest(types.ASSIGNEE_FETCH_SEARCH, postSearch),
    takeLatest(types.ASSIGNEE_FETCH_DEL, deleteList),
    takeLatest(types.ASSIGNEE_FETCH_GET_DETAIL, getDetail),
    takeLatest(types.ASSIGNEE_FETCH_SUBMIT_FORM, postForm),
    takeLatest(types.ASSIGNEE_FETCH_UPDATE_FORM, postUpdate),
  ]);
}

