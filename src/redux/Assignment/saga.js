import { Header} from "../../service/header";
import { all, call, put, select } from "redux-saga/effects";
import { messages, success } from "../../components/messageBox"
import { takeEvery, takeLatest } from "redux-saga";
import { POST, GET } from "../../service/api";
import Endpoint from "../../service/endpoint";
import { push } from "react-router-redux";
import Config from "../../service/config";
import appAction from "./actions";
import {groupBy} from "../../helpers/utility";
import moment from 'moment';
import { sortArrayDropdown } from "../../helpers/sort-dropdown";

import {
  GET_ROLE_SUCCESS,
  GET_ROLE,
  GET_TOKEN,

  HANDLE_STATE_ASSIGNMENT,
  HANDLE_STATE_FORM_VACANCY_INFORMATION,

  GET_ASSIGMENT,
  GET_LOAD_FORM_ASSIGNMENT,
  GET_DETAILS_ASSIGNMENT,

  SET_ASSIGNMENT_LIST,
  SET_POSITION_LIST,
  SET_EMPLOYEE_STATUS_LIST,
  SET_APPLICATION_STATUS_LIST,
  SET_DETAILS_ASSIGNMENT,
  SET_VACANCY_INFORMATION_LIST,

  SUBMIT_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  FETCH_UPDTAE_STATUS_ASSIGNMENT,
  FETCH_FORM_DATA_ASSIGNMENT,
  SUCCESS_SET_DATA_ASSIGNMENT
} from "../types";

const getStateAssignment = state => state.Assignment;
const getStateLogin = state => state.Auth;
const { setLoader } = appAction;

export function* hitAssignment(data) {
  try {
    yield put(setLoader(true));
    const assignment = yield select(getStateAssignment);
    const login = yield select(getStateLogin);
    let value = data.data
    let field = data.field
    let body = {}
    if(field == "search"){
      body = login.listRoleName == "Hiring Manager" ? 
      {
        PTKNumber: assignment.ptkNumber,
        Position: assignment.position,
        Department: assignment.department,
        Division: assignment.division,
        HiringManager: assignment.HiringManager,
        VacancyName: assignment.VacancyName,
        PageNo: value,
        PageSize: 10,
      } : 
      {
        PositionId: assignment.position,
        PTKNumber: assignment.ptkNumber,
        Department: assignment.department,
        Division: assignment.division,
        TotalNeeds: assignment.totalNeeds,
        PTKDateFrom: assignment.dateFrom,
        PTKDateTo: assignment.dateTo,
        Branch: assignment.company,
        PTKAssignmentStatus: "",
        Function: assignment.function,
        Status: assignment.status,
        PageNo: value,
        PageSize: 10
      }
    }else {
      body = login.listRoleName == "Hiring Manager" ? 
      {
        PTKNumber: "",
        Position: "",
        Department: "",
        Division: "",
        HiringManager: "",
        VacancyName: "",
        PageNo: value,
        PageSize: 10
      }
      :
      {
        PositionId: "",
        PTKNumber: "",
        Department: "",
        Division: "",
        TotalNeeds: "",
        PTKDateFrom: "",
        PTKDateTo: "",
        Branch: "",
        PTKAssignmentStatus: "",
        Function: "",
        Status: "",
        PageNo: value,
        PageSize: 10
      }
    }

    const endPoint = login.listRoleName == "Hiring Manager" ? Endpoint.ASSIGNMENT_HM : Endpoint.ASSIGNMENT_LIST
    const response = yield call(POST, Config.API_ASSIGNMENT + endPoint, body, { headers: Header() });
    if (response.Acknowledge === 1) {
      let data =
        login.listRoleName == "Hiring Manager"
          ? groupBy(response.Data, "PTKAssignmentID")
          : response.PTKAssignmentList.map((x) => ({
                ...x,
                checked: false,
                UserHiringManager:x.UserHiringManager ? x.UserHiringManager : ''
              }));
      yield put({ type: SET_ASSIGNMENT_LIST, value: data});
      yield put({ type: HANDLE_STATE_ASSIGNMENT, field: 'gridAssignmentMaster', value: response.PTKAssignmentList });
      yield put({ type: HANDLE_STATE_ASSIGNMENT, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: GET_LOAD_FORM_ASSIGNMENT });
    } else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    console.log("function*hitAssignment -> error", error)
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong!", "info", false);
  }
}

export function* hitLoadAssignmentForm() {
  try {
    yield put(setLoader(true));
    const assignment = yield select(getStateAssignment);
    const login = yield select(getStateLogin);

    let body = {
      "UserLogin": ""
    }
    const response = yield call(POST, Config.API_ASSIGNMENT + Endpoint.LOAD_ASSIGNMENT, body, { headers: Header() });

    if (response.Acknowledge == 1) {
      let listOfEmployeeStatus = sortArrayDropdown(response.EmployeeStatusList, 'EmployeeStatusName');
      yield put({ type: SET_POSITION_LIST, value: response.PositionList });
      yield put({ type: SET_EMPLOYEE_STATUS_LIST, value: listOfEmployeeStatus });
      yield put({ type: SET_APPLICATION_STATUS_LIST, value: response.ApplicationStatusList });
      yield put({ type: SET_VACANCY_INFORMATION_LIST, value: response.VacancyList });
      // yield put({ type: HANDLE_STATE_FORM_VACANCY_INFORMATION, field: 'gridVacancyInformation', value: data.PTKAssignmentList.VacancyInformation });
    } else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Error", "info", false);
  }
}

export function* hitDetailsAssignment(value) {
  try {
    yield put(setLoader(true));
    let assignment = yield select(getStateAssignment);
    let form = assignment.formAssignment
    let id = value.data

    yield call (fetchMasterData)
    let data = yield call(GET, Config.API_ASSIGNMENT + Endpoint.DETAIL_ASSIGNMENT + id, { headers: Header() });

    if (data.Acknowledge == 1) {
      yield put({ type: SET_DETAILS_ASSIGNMENT, value: data });
      yield put({ type: HANDLE_STATE_ASSIGNMENT, field: "editVacancyInformationGrid", value: data.VacancyInformaion });
      yield put({ type: HANDLE_STATE_ASSIGNMENT, field: "editVacancyInformationAPI", value: data.VacancyInformaion });
      yield put({ type: HANDLE_STATE_ASSIGNMENT, field: "ptkAssignmentId", value: data.PTKAssignmentID });
    }
    else {
      messages("Error", data.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong!", "info", false);
  }
}

export function* submitAssignment(value) {
  try {
    yield put(setLoader(true));
    const assignment = yield select(getStateAssignment);
    let form = assignment.formAssignment
    let from = value.data
    let link = ''
    let body = {}
    let _fulfillDate, positionId, employeeStatus, applicationStatus

    _fulfillDate = moment(form.fullfillDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    const PTKDate = moment(form.ptkDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let tempCreate = [], tempUpdate = []
    assignment.addVacancyInformationGrid.map(obj => {
      tempCreate.push({
        "VacancyCode": obj.VacancyCode,
        "PTKFulfillment": obj.PTKFulfillment,
      })
    })
    assignment.editVacancyInformationGrid.map(obj => {
      tempUpdate.push({
        "VacancyCode": obj.VacancyCode,
        "PTKFulfillment": obj.PTKFulfillment,
      })
    })
    const deptName = assignment.HRList.find(x => x.id === form.deptHead)
    if (from == "create") {
      link = Endpoint.SUBMIT_ASSIGNMENT
      body = {
        "PTKNumber": form.ptkNumber,
        "DeptHeadName": deptName ? deptName.Name : "",
        "PositionId": form.position, //angka
        "TotalNeeds": parseInt(form.totalNeeds), //angka
        "Golongan": form.golongan,
        "FulfillmentDate": _fulfillDate,
        "Department": form.department,
        "EmployeeStatus": form.employeeStatus,
        "Division": form.division,
        "ApplicationStatus": form.applicationStatus,
        "HiringManagerId": form.deptHead,
        "PTKDate": PTKDate,
        "BranchId": form.company,
        "Function": form.function,
        "VacancyInformation": tempCreate, //assignment.addVacancyInformationAPI
      }
    } else if (from == "update") {
      link = Endpoint.UPDATE_ASSIGNMENT
      body = {
        "PTKAssignmentID": assignment.ptkAssignmentId,
        "PTKNumber": form.ptkNumber,
        "DeptHeadName": deptName ? deptName.Name : "",
        "PositionId": form.position,
        "TotalNeeds": form.totalNeeds,
        "Golongan": form.golongan,
        "FulfillmentDate": _fulfillDate,
        "Department": form.department,
        "EmployeeStatus": form.employeeStatus,
        "Division": form.division,
        "ApplicationStatus": form.applicationStatus,
        "HiringManagerId": form.deptHead,
        "PTKDate": PTKDate,
        "BranchId": form.company,
        "Function": form.function,
        "VacancyInformation": tempUpdate //assignment.editVacancyInformationAPI
      }
    }
    const response = yield call(POST, Config.API_ASSIGNMENT + link, body, { headers: Header() });

    if (response.Acknowledge == 1) {
      value.history.goBack()
      messages("Success", response.Message, "success", true);
    } else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));

  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Error", "info", false);
  }
}

export function* updateAssignment() {
  try {
    yield put(setLoader(true));
    const assignment = yield select(getStateAssignment);
    const login = yield select(getStateLogin);
    let form = assignment.formAssignment
    let _fulfillDate = moment(form.fullfillDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let positionId = assignment.positionList.find(obj => form.position === obj.value)
    let employeeStatus = assignment.employeeStatusList.find(obj => form.employeeStatus === obj.value)
    let applicationStatus = assignment.applicationStatusList.find(obj => form.applicationStatus === obj.value)
    let body = {
      "PTKAssignmentID": assignment.ptkAssignmentId,
      "PTKNumber": form.ptkNumber,
      "DeptHeadName": form.deptHead,
      "PositionId": positionId.id,
      "TotalNeeds": form.totalNeeds,
      "Golongan": form.golongan,
      "FulfillmentDate": _fulfillDate,
      "Department": form.department,
      "EmployeeStatus": employeeStatus.id,
      "Division": form.division,
      "ApplicationStatus": applicationStatus.id,
      "VacancyInformation": [{
        "VacancyCode": form.vacancyCode,
        "PTKFulfillment": form.ptkFullfillment
      }]
    }
    const data = yield call(POST, Config.API_ASSIGNMENT + Endpoint.UPDATE_ASSIGNMENT, body, { headers: Header() });
    if (data.Acknowledge == 1) {
      messages("Success", 'Data has been updated', "success", false);
    }
    else {
      messages("Error", data.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* updateStatusAssigment({StatusId}) {
  try {
    yield put(setLoader(true));
    const assignment = yield select(getStateAssignment);
    let list = assignment.gridAssignment
    let body = {
      PTKAssignmentId: list.filter(x => x.checked === true).map(x => x.PTKAssignmentID),
      StatusId
    }
    const data = yield call(POST, Config.API_ASSIGNMENT + Endpoint.UPDATE_STATUS_ASSIGNMENT, body, { headers: Header() });
    if (data.Acknowledge == 1) {
      messages("Success", 'Data has been updated', "success", false);
      yield call (hitAssignment, { data:1, field: "clear" })
    }
    else {
      messages("Error", data.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* fetchMasterData() {
  try {
    let bodyMasterData = {
      MasterData: [{"ObjectName": "Branch"},]
    }
    const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, bodyMasterData, { headers: Header() });
    const resFuction = yield call(POST, Config.BASE_URL + Endpoint.PTK_FUNCTION, {}, { headers: Header() });
    const resHR = yield call(GET, Config.BASE_URL + Endpoint.HR_LIST, { headers: Header() });
    if (resMasterData.Acknowledge == 1 && resFuction.Acknowledge == 1 && resHR.Acknowledge === 1) {
      const data = {
        companyList: resMasterData.BranchList.map(x => ({...x, id: x.BranchId, name: x.BranchName})),
        functionList: resFuction.Data.map(x => ({...x, id: x.PTKFunctionID, name: x.FunctionName})),
        HRList: resHR.UsersList.map(x => ({...x, id: x.UserProfileId, name: x.Name + " <" + x.Email + ">"}))
      }
      yield put({type: SUCCESS_SET_DATA_ASSIGNMENT, data})
      yield put({ type: GET_LOAD_FORM_ASSIGNMENT });
    } else {
      resMasterData.Message && messages("Error", resMasterData.Message, "error", false);
      resFuction.Message && messages("Error", resFuction.Message, "error", false);
      resHR.Message && messages("Error", resHR.Message, "error", false);
    }
  } catch (error) {
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* fetchFormData() {
  try {
    yield put(setLoader(true));
    yield call(fetchMasterData)
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}



export default function* rootSaga() {
  yield all([
    // takeLatest(GET_TOKEN, getTokens),
    takeLatest(GET_ASSIGMENT, hitAssignment),
    takeLatest(GET_LOAD_FORM_ASSIGNMENT, hitLoadAssignmentForm),
    takeLatest(GET_DETAILS_ASSIGNMENT, hitDetailsAssignment),
    takeLatest(SUBMIT_ASSIGNMENT, submitAssignment),
    takeLatest(UPDATE_ASSIGNMENT, updateAssignment),
    takeLatest(FETCH_UPDTAE_STATUS_ASSIGNMENT, updateStatusAssigment),
    takeLatest(FETCH_FORM_DATA_ASSIGNMENT, fetchFormData),
  ]);
}
