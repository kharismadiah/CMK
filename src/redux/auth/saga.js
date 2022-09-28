import { all, call, put, takeLatest, select } from "redux-saga/effects";
import * as types from "../types";
import { messages, success } from "../../components/messageBox"
import { HeaderToken, Header, HeaderClient } from "../../service/header";
import Config from "../../service/config";
import { POST, GET } from "../../service/api";
import { clearToken, getToken } from "../../helpers/utility";
import { warning } from "../../helpers/alert/warning";
import { getRole } from '../../service/header';
import {Cookie} from '../../service/header';

import appAction from "./actions";
const getStateAuth = state => state.Auth;
const { setLoader } = appAction

export function* Login() {
  try {
    yield put(setLoader(true));
    const login = yield select(getLoginState);
    let body = Services.Auth_SAMA.getBody(
      login.form.userName,
      login.form.password
    );
    let getbodyMaster = Services.Auth_SAMA.getbodyMaster();

    const data = yield call(
      POST,
      Config.API_LOGIN,
      body,
      Services.Auth_SAMA.getHeader()
    );

    if (data.access_token) {
      const dataMaster = yield call(
        POST,
        Config.API_MASTER,
        getbodyMaster,
        LoginHeader(data.access_token)
      );
      const UserProfile = yield call(
        GET,
        Config.GET_USER_PROFILE + `?request.userName=${login.form.userName}`,
        LoginHeader(data.access_token)
      );
      const Menu = yield call(
        GET,
        Config.GET_MENU + `?request.userName=${login.form.userName}`,
        LoginHeader(data.access_token)
      );

      if (dataMaster.acknowledge == 1) {
        cookies.set('Token', data.access_token, { expires: new Date(Date.now() + data.expires_in * 1000), path: '/' });
        // localStorage.setItem("Token", data.access_token);
        localStorage.setItem("MasterData", JSON.stringify(dataMaster));
        localStorage.setItem("Menu", JSON.stringify(Menu.userMenus));
        LocalStore.set("MasterData", dataMaster);
        LocalStore.set("Menu", Menu.userMenus);
        yield put({ type: GET_MENU_SUCCESS, payload: Menu.userMenus });
      } else {
        swals({
          title: "Login Fail",
          text: "Incorrect Username or Password !",
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "Ya"
        }).then(function (confirm) {
          actionLogout();
        });
      }
      localStorage.setItem("UserData", JSON.stringify(UserProfile));
      yield put(setLoader(false));
      yield put(doLoginSuccess(data.access_token));
    }
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getTokens(data) {
  try {
    yield put(setLoader(true));
    const roles = getRole()
    let value = data.data
    // let body = {"CompanySource":"AIHO","UserName":"mansyur@ai.astra.co.id","Password":"123"} 
    let companySource = value.username == "william.keles3@yopmail.com" ? "TSO" : "AIHO"
    let body = {
      "CompanySource": companySource,
      "UserName":value.username,
      "Password":value.password
    }
    yield put({type: types.HANDLE_STATE_LOGIN, field:"username", value: value.username });
    const response = yield call(POST, Config.POST_TOKEN, body, {headers: HeaderClient()});
    
    if(response.Acknowledge == 1){
      document.cookie = `ahs_id=${response.AccessToken};expires=${response.Expire_in}; path=/;`;
      document.cookie = `role_name=${response.RoleName.toLowerCase()};expires=${response.Expire_in}; path=/;`;
      document.cookie = `role_desc=${response.RoleDescription.toLowerCase()};expires=${response.Expire_in}; path=/;`;
      document.cookie = `list_role_name=${response.ListRoleName};expires=${response.Expire_in}; path=/;`;
      window.location.href = `${process.env.PUBLIC_URL}/dashboard`
      messages("Info", "Login Success", "info", false);
    }else{
      messages("Info", "Login Failed", "info", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* logout() {
  try {
    yield put(setLoader(true));
    const auth = yield select(getStateAuth)
    let companySource = auth.username == "william.keles3@yopmail.com" ? "TSO" : "AIHO"
    let body = {
      "CompanySource":companySource,
      "UserName": auth.username,
      "Password": "123"}
    let link = "https://hrappsdev.astra.co.id/astrahrportalauthwebapi/api/Login?unlock=true"
    const response = yield call(POST, link, body, {headers: HeaderClient()});
    if(response.Acknowledge == 1){
      localStorage.clear();
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      yield put({type: types.HANDLE_STATE_LOGIN, field:"roleName", value: '' });
      window.location.href = `${process.env.PUBLIC_URL}/`
      // messages("Success", 'Logout success', "success", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

function* loginSuccess(value) {
  try {
    if (value.token !== undefined) {
      yield localStorage.setItem("idToken", value.token);
      yield localStorage.setItem("profile", value.profile);
      yield put({
        type: types.LOGIN_SUCCESS,
        token: value.token,
        profile: value.profile,
        loginData: {
          role: value.role,
          companyCode: value.companyCode,
          mainDealerCode: value.mainDealerCode,
          dealerCode: value.dealerCode,
          area: value.area
        }
      });
      // window.location.href = '/auth/eventManagement'
      window.location.href = "/auth";
    } else {
      console.log("token undefined");
      warning("Token Undefined");
    }
    yield put({
      type: types.IS_LOADING,
      payload: false
    });
  } catch (error) {
    console.log("error ", error);
    yield put({
      message: "Error"
    });
  }
}

function* checkAuthorization() {
  const token = getToken().get("idToken");
  const profile = getToken().get("profile");
  if (token) {
    yield put({
      type: types.LOGIN_SUCCESS,
      token,
      profile
    });
  }
}

export default function* rootSaga() {
  yield all([
    // takeLatest(GET_TOKEN, getTokenSama),
    takeLatest(types.LOGIN_REQUEST, getTokens),
    takeLatest(types.LOGOUT, logout),
    takeLatest(types.CHECK_AUTHORIZATION, checkAuthorization)
  ]);
}
