import { all, call, fork, put, select, take } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
import appAction from "./actions";
import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, DELETE_BODY } from "../../service/api";
import { clearToken, getToken } from "../../helpers/utility";
import { warning } from "../../helpers/alert/warning";
import { push } from "react-router-redux";
import { HeaderToken, Header, HeaderClient } from "../../service/header";
import { takeEvery, takeLatest } from "redux-saga";
import moment from 'moment';
import { getRole } from '../../service/header';
import { sortArrayDropdown} from '../../helpers/sort-dropdown'

const getStateATSPhaseType = state => state.ATSPhaseType;

export function* getMasterData() {
  try {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})
    let body = {
        MasterData: [
          {
            ObjectName: "ATSPhase"
          },
          {
            ObjectName: "ATSType"
          },
          {
            ObjectName : "ApplicantPhase"
          }
        ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })
    
    if(resMasterData.Acknowledge == 1){
      // const resApplicantPhaseList = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_PHASE_LIST_POST, body, { headers: Header() })
      let listOfPhaseType = sortArrayDropdown(resMasterData.ATSTypeList, 'ATSTypeName')
      
      let data
      // if(resApplicantPhaseList.Acknowledge == 1){
        data = {
          phaseTypeList: Array.isArray(listOfPhaseType) && listOfPhaseType.length > 0
            ? listOfPhaseType.map(x => ({...x, id: x.Id, name: x.ATSTypeName}))
            : resMasterData.ATSTypeList.map(x => ({...x, id: x.Id, name: x.ATSTypeName})),
          sourceATSPhase: resMasterData.ATSPhaseList.map(x => ({...x, name: x.atsPhase})),
          sourceApplicantPhase: resMasterData.ApplicantPhaseList.map(x => ({...x, id:x.Id, name: x.ApplicantPhaseName})),
        }
      yield put({ type: types.ATSPHASETYPE_MATER_DATA_SUCCESS, payload: data})
    }
    
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  } catch (err) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  }
}

export function* postSearch(param) {
  try {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})
    let stateATSPhaseType = yield select(getStateATSPhaseType)

    yield put({ 
      type: types.ATSPHASETYPE_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })
    
    let {formSearch} = stateATSPhaseType

    let body = {
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      atsPhaseCode: formSearch.phaseTypeCode,
      atsPhaseType: formSearch.phaseType,
      description: formSearch.description
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_LIST_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ATSPHASETYPE_FETCH_SEARCH_SUCCESS, value: response})
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
    }else{
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }
    
  } catch (error) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  }
}

export function* deleteList(param) {
  try {
    let stateATSPhaseType = yield select(getStateATSPhaseType)
    let {pageNo, pageSize, totalRows} = stateATSPhaseType
    
    if(param.isInitial){
      messages("Failed", 'Delete failed.The data that you want to delete is initial data', "warning", false);
    }else{
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})
      let body = {
        atsPhaseTypeCode : param.atsPhasetypeCode
      }
      const response = yield call(DELETE_BODY, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_LIST_DEL, body, { headers: Header() });

      if(response.Acknowledge === 1){
        yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
        messages("Info", response.Message, "info", false);

        let data = {
          data: {
            pageNo,
            pageSize,
            totalRows
          }
        }
        
        yield call(postSearch, data)
      }else{
        yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
        messages("Error", response.Message, "error", false);
      }
    }
  } catch (error) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  }
}

export function* getDetail(param) {
  try {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})

    let body = {
      MasterData: [
        {
          ObjectName: "ATSPhase"
        },
        {
          ObjectName: "ATSType"
        },
        {
          ObjectName : "ApplicantPhase"
        }
      ]      
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

    if(resMasterData.Acknowledge === 1){
      let data = {
        phaseTypeList: resMasterData.ATSTypeList.map(x => ({...x, id: x.Id, name: x.ATSTypeName})),
        sourceATSPhase: resMasterData.ATSPhaseList.map(x => ({...x, name: x.atsPhase})),
        sourceApplicantPhase: resMasterData.ApplicantPhaseList.map(x => ({...x, id:x.Id, name: x.ApplicantPhaseName})),
      }
      yield put({ type: types.ATSPHASETYPE_MATER_DATA_SUCCESS, payload: data})
      let body = {
        atsPhaseTypeCode: param.code
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_DETAIL_POST, body, { headers: Header() });

      if(response.Acknowledge === 1){
        let mapDataRes = {
          phaseTypeCode: response.atsPhaseTypeCode,
          phaseType: response.atsPhaseTypeId,
          description: response.description,
          atsPhase: response.applicantPhaseList.map(x => ({phase: x.phase, atsPhase: x.atsPhaseId, applicantPhase: x.applicantPhaseId}))
        }
        let sourcePhase = response.applicantPhaseList.map((x, idx) =>({id:idx+1, name:idx+1}))
        yield put({ type: types.ATSPHASETYPE_HANDLE_STATE, property:"sourcePhase", value: sourcePhase })
        yield put({ type: types.ATSPHASETYPE_GET_DETAIL_SUCCESS, payload: mapDataRes })
        yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      }else{
        yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
        messages("Error", response.Message, "error", false);
      }
    }else{
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (error) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  }
}

export function* postForm(param) {
  try {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})
    let stateATSPhaseType = yield select(getStateATSPhaseType)
    let {phaseTypeCode, phaseType, description, atsPhase} = stateATSPhaseType.formATSPhaseType

    let body = {
      atsTypeId: phaseType,
      description: description,
      applicantPhaseList: atsPhase.map(x => ({ phase: x.phase, atsPhaseId: x.atsPhase, applicantPhaseId: x.applicantPhase}))
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_SAVE_POST, body, { headers: Header() });

    if(response.Acknowledge === 1){
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (error) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
    messages("Error", error.Message, "error", false);
  }
}

export function* postUpdate(param) {
  try {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})

    let stateATSPhaseType = yield select(getStateATSPhaseType)
    let {phaseTypeCode, phaseType, description, atsPhase} = stateATSPhaseType.formATSPhaseType

    let body = {
      atsPhaseTypeCode: phaseTypeCode,
      atsTypeId: phaseType,
      description: description,
      applicantPhaseList: atsPhase.map(x => ({ phase: x.phase, atsPhaseId: x.atsPhase, applicantPhaseId: x.applicantPhase}))
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_UPDATE_POST, body, { headers: Header() });
    
    if(response.Acknowledge === 1){
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    }else{
      yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
      messages("Error", response.Message, "error", false);
    }

  } catch (error) {
    yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: false})
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.ATSPHASETYPE_FETCH_MATER_DATA, getMasterData),
    takeLatest(types.ATSPHASETYPE_FETCH_SEARCH, postSearch),
    takeLatest(types.ATSPHASETYPE_FETCH_DEL, deleteList),
    takeLatest(types.ATSPHASETYPE_FETCH_GET_DETAIL, getDetail),
    takeLatest(types.ATSPHASETYPE_FETCH_SUBMIT_FORM, postForm),
    takeLatest(types.ATSPHASETYPE_FETCH_UPDATE_FORM, postUpdate)
  ]);
}

