import { all, call, fork, put, select, take } from "redux-saga/effects";
import { messages, success } from "../../components/messageBox"
import appAction from "./actions";
import {
  GET_USER_LIST,
  GET_USER_DETAILS,
  GET_LOAD_USER,
  
  HANDLE_STATE_USER,
  HANDLE_STATE_FORM_USER,
  HANDLE_STATE_FORM_JOB_CODE,

  GET_USER_LIST_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_LOAD_USER_SUCCESS,
  GET_USER_SEARCH,
  GET_USER_SEARCH_SUCCESS,
  GET_REGION_COMPANY,
  GET_REGION_COMPANY_SUCCESS,

  DELETE_USER,
  CREATE_USER,
  UPDATE_USER,
  SUBMIT_USER,

  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS
} from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET } from "../../service/api";
import { clearToken, getToken } from "../../helpers/utility";
import { warning } from "../../helpers/alert/warning";
import { push } from "react-router-redux";
import { HeaderToken, Header } from "../../service/header";
import { takeEvery, takeLatest } from "redux-saga";
import moment from 'moment';

const getStateUser = state => state.User;
const getStateLogin = state => state.Auth;
const { setLoader } = appAction

export function* getUserList(data) {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let value = data.data
    let field = data.field
    let body = {}
    if(field == "search"){
      body = {
        "UserLogin":"",
        "Phone": user.phone,
        "Email": user.email,
        "Company":"",
        "Branch": user.branch,
        "FullName": user.fullName,
        "PageNo": value,
        "PageSize": 10
      }
    }else{
      body = {
        "UserLogin":"",
        "Phone":"",
        "Email":"",
        "Company":"",
        "Branch":"",
        "FullName":"",
        "PageNo": value,
        "PageSize": 10
      }
    }
    const response = yield call(POST, Config.API_USER + Endpoint.USER_LIST, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      yield put({type: HANDLE_STATE_USER, field:"userList", value: response.UserList });
      yield put({type: HANDLE_STATE_USER, field:"userListMaster", value: response.UserList });
      yield put({type: HANDLE_STATE_USER, field:"totalRows", value: response.TotalRows });
      yield put({type: HANDLE_STATE_USER, field:"totalRowsMaster", value: response.TotalRows });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getUserSearch(data) {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let value = data.data
    let field = data.field
    let body
    if(field == "search"){
      body = {}
    }else{
      body = {
        "UserLogin":"",
        "Phone": user.phone,
        "Email": user.email,
        "Company":"",
        "Branch": user.branch,
        "FullName": user.fullName,
        "PageNo": value,
        "PageSize": 10
      }
    }
    const response = yield call(POST, Config.API_USER + Endpoint.USER_LIST, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      yield put({type: HANDLE_STATE_USER, field:"userList", value: response.UserList });
      yield put({type: HANDLE_STATE_USER, field:"totalRows", value: response.TotalRows });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getUserListDetails(data) {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let userID = data.data
    let body = {
      "UserId": userID
    }
    const response = yield call(POST, Config.API_USER + Endpoint.USER_DETAILS_BY_ID, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      let roleName = user.roleList.find(obj => response.RoleName == obj.value)
      yield put({type: GET_USER_DETAILS_SUCCESS, value: response });
      yield put({type: HANDLE_STATE_FORM_USER, field:"roleName", value: roleName.id });
      yield put({type: HANDLE_STATE_FORM_JOB_CODE, field:"jobCode", value: response.JobCodeId });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getLoadUser() {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let body = {}
    const response = yield call(POST, Config.API_USER + Endpoint.LOAD_USER_CREATION, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      let list = response
      let i
      let dataCompanyList = []
      let dataJobCodeList = []
      let dataBranchList = []
      let dataRegionList = []
      let dataRoleList = []
      for(i = 0; i < list.CompanyList.length; i++) {
        let value = {}
        value = { "id": list.CompanyList[i].CompanyId, "value": list.CompanyList[i].CompanyName, "name": list.CompanyList[i].CompanyName }
        dataCompanyList.push(value)
      }
      for (i = 0; i < list.JobCodeList.length; i++) {
        let value = {}
        value = { "id": list.JobCodeList[i].JobKeyId, "value": list.JobCodeList[i].JobKeyDecription, "name": list.JobCodeList[i].JobKeyCode }
        dataJobCodeList.push(value)
      }
      for (i = 0; i < list.BranchList.length; i++) {
        let value = {}
        value = { "id": list.BranchList[i].BranchId, "value": list.BranchList[i].BranchCode, "name": list.BranchList[i].BranchName }
        dataBranchList.push(value)
      }
      for (i = 0; i < list.RegionList.length; i++) {
        let value = {}
        value = { "id": list.RegionList[i].RegionId, "value": list.RegionList[i].RegionCode, "name": list.RegionList[i].RegionName }
        dataRegionList.push(value)
      }
      for (i = 0; i < list.RoleList.length; i++) {
        let value = {}
        value = { "id": list.RoleList[i].RoleId, "value": list.RoleList[i].RoleName, "name": list.RoleList[i].RoleName }
        dataRoleList.push(value)
      }
      yield put({type: HANDLE_STATE_USER, field:"companyList", value: dataCompanyList });
      yield put({type: HANDLE_STATE_USER, field:"jobCodeList", value: dataJobCodeList });
      yield put({type: HANDLE_STATE_USER, field:"branchList", value: dataBranchList });
      yield put({type: HANDLE_STATE_USER, field:"regionList", value: dataRegionList });
      yield put({type: HANDLE_STATE_USER, field:"roleList", value: dataRoleList });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    // yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* submitUser(data) {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let form = user.formUser
    let value = data.data
    let history = data.history
    let link = ''
    let body = {}

    let roleName = user.roleList.find(obj => form.roleName == obj.id)

    if(value == "create") {
      link = Endpoint.CREATE_USER
      body = {
        "Email": form.email,
        "npk": form.npk,
        "CompanyId": form.companyId,
        "fullName": form.fullName,
        "JobCodeid": form.jobCodeId,
        "BranchId": form.branchId,
        "Phone": form.phone,
        "RoleName": roleName.value, //
        "regionId": form.regionId
      }
    }
    else if(value == "delete"){
      link = Endpoint.DELETE_USER_BY_ID
      body = {
        "email": user.email
      }
    }else if(value == "update"){
      link = Endpoint.UPDATE_USER
      body = {
        "UserProfileId": parseInt(user.userId),
        "Email": form.email,
        "npk": form.npk,
        "CompanyId": form.companyId,
        "fullName": form.fullName,
        "JobCodeid": form.jobCodeId,
        "BranchId": form.branchId,
        "Phone": form.phone,
        "RoleName": roleName.value, //
        "regionId": form.regionId
      }
    }
    const response = yield call(POST, Config.API_USER + link, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      if(user.isResetPass){
        yield call(resetPassword)
      }
      messages("Success", response.Message, "success", false);
      history.goBack()
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* deleteUser(){
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let body = {
      "email": user.emailDelete
    }
    const response = yield call(POST, Config.API_USER + Endpoint.DELETE_USER_BY_ID, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      messages("Success", response.Message, "success", false);
      yield put({type: GET_USER_LIST });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    // yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* resetPassword(){
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let body = {
      "email": user.formUser.email
    }
    const response = yield call(POST, Config.API_USER + Endpoint.RESET_PASSWORD, body, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      // messages("Success", response.Message, "success", false);
      yield put({ type: HANDLE_STATE_USER, field: "isResetPass", value: false});
    }else {
      yield put({ type: HANDLE_STATE_USER, field: "isResetPass", value: false});
      messages("Error", response.Message, "error", false);
    }
    // yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitRegionCompany(data) {
  try {
    yield put(setLoader(true));
    const user = yield select(getStateUser);
    let id = data.data
    let body = {}
    let i
    const response = yield call(GET, Config.BASE_URL + Endpoint.regionAndCompany + id, { headers: HeaderToken() });

    if (response.Acknowledge == 1) {
      yield put({ type: HANDLE_STATE_FORM_USER, field: "regionId", value: response.RegionList.RegionId});
      yield put({ type: HANDLE_STATE_FORM_USER, field: "companyId", value: response.CompanyList.CompanyId });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(GET_USER_LIST, getUserList),
    takeLatest(GET_USER_DETAILS, getUserListDetails),
    takeLatest(GET_LOAD_USER, getLoadUser),
    takeLatest(SUBMIT_USER, submitUser),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(GET_USER_SEARCH, getUserSearch),
    takeLatest(RESET_PASSWORD, resetPassword),
    takeLatest(GET_REGION_COMPANY, hitRegionCompany),
    
  ]);
}
