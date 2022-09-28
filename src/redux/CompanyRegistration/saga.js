import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, PUT } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";
import moment from 'moment'

const getCompanyRgst = state => state.CompanyRegistration;

export function* fetchMasterdata() {
  try {
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true })
      let body = {
          "MasterData": [
              {
                  "ObjectName": "CBTCompany"
              }
          ]
      }
      const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

      if(resMasterData.Acknowledge == 1){
          let masterData = {
              Company: resMasterData.CBTcompanyList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })),
          }
          yield put({ type: types.COMPANY_RGST_FETCH_MASTER_DATA_SUCCESS, payload: masterData})
      }
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false })
  } catch (err) {
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false })
  }
}

export function* fetchSearch(param) {
  try {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true})

    let stateCompanyRgst = yield select(getCompanyRgst)
    
    yield put({ 
      type: types.COMPANY_RGST_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let {company, description, date, to} = stateCompanyRgst.search

    let body = {
      PageNo: param.data.pageNo,
      PageSize: param.data.pageSize,
      CompanyName: company,
      Description: description,
      StartDate: date,
      EndDate: to,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.COMPANY_RGST_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.COMPANY_RGST_FETCH_SEARCH_SUCCESS, data: response})
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
    }else{
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
  }
}

export function* fetchGetDetail(param) {
  try {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true})

    let bodyMasterData = {
      "MasterData": [
          {
              "ObjectName": "Branch"
          }
      ]
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, bodyMasterData, { headers: Header() })
    if(resMasterData.Acknowledge == 1){
      let masterData = {
        Company: resMasterData.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })),
      }
      let body = {
        CompanyCBTId: parseInt(param.id)
      }
      
      const response = yield call(POST, Config.BASE_URL + Endpoint.COMPANY_RGST_DETAIL_POST, body, { headers: Header() });

      if(response.Acknowledge === 1){
        let data = {
          company: response.BranchID,
          startDate: moment(response.StateDate, "DD/MM/YYYY"),
          endDate: moment(response.EndDate, "DD/MM/YYYY"),
          notes: response.Notes,
          notesHistory: response.NotesHistory,
          cbtCompanyId: response.cbtCompanyId
        }
        yield put({ type: types.COMPANY_RGST_FETCH_MASTER_DATA_SUCCESS, payload: masterData})
        yield put({ type: types.COMPANY_RGST_FETCH_GET_DETAIL_SUCCESS, data})
        yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      }else{
        yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
        messages("Error", response.Message, "error", false);
      }
    }else{
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
  }
}

export function* fecthSubmit(param) {
  try {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true})

    let stateCompanyRgst = yield select(getCompanyRgst)
    let {company, startDate, endDate, notes} = stateCompanyRgst.form

    let body = {
      BranchID: company,
      startDate: startDate,
      endDate: moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY"),
      Description: notes
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.COMPANY_RGST_CREATE_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
  }
}

export function* fetchUpdate(param) {
  try {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true})

    let stateCompanyRgst = yield select(getCompanyRgst)
    let {cbtCompanyId, startDate, endDate, notes } = stateCompanyRgst.form

    let body = {
      CompanyCBTId: cbtCompanyId,
      StartDate: moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"),
      EndDate: moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY"),
      Description: notes,
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.COMPANY_RGST_UPDATE_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
  }
}

export function* fetchDelete(param) {
  try {
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: true })

      let stateCompanyRgst = yield select(getCompanyRgst)
      let { pageNo, pageSize, totalRows } = stateCompanyRgst
      let body = {
        CompanyCBTId: param.id
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.COMPANY_RGST_DELETE, body, { headers: Header() });

      if(response.Acknowledge === 1){
          yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
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
          yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
      }
  } catch (error) {
      yield put({ type: types.COMPANY_RGST_SET_LOADER, value: false })
  }
}

export default function* rootSaga() {
    yield all([
      takeLatest(types.COMPANY_RGST_FETCH_SEARCH, fetchSearch),
      takeLatest(types.COMPANY_RGST_FETCH_MASTER_DATA, fetchMasterdata),
      takeLatest(types.COMPANY_RGST_FETCH_GET_DETAIL, fetchGetDetail),
      takeLatest(types.COMPANY_RGST_FETCH_SUBMIT, fecthSubmit),
      takeLatest(types.COMPANY_RGST_FETCH_UPDATE, fetchUpdate),
      takeLatest(types.COMPANY_RGST_FETCH_DETELE, fetchDelete)
    ]);
}
