import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox";
import { Header } from "../../service/header";

const getStateRecruitmentProcess = (state) => state.RecruitmentProcess;

export function* fetchFilter() {
  try {
    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true });

    let stateRecruitmentProcess = yield select(getStateRecruitmentProcess);
    let body = {
      searchCriteria: stateRecruitmentProcess.filterVacancyList.serach,
      filterType: "Vacancy",
      vacancyId: 0,
    };
    if (stateRecruitmentProcess.ptkId != undefined) {
      body["ptkAssignmentId"] = stateRecruitmentProcess.ptkId
      var endpoint = Endpoint.RECRUITMENT_FILTER_POST_PTK
    } else {
      var endpoint = Endpoint.RECRUITMENT_FILTER_POST
    }

    const response = yield call(
      POST,
      Config.BASE_URL + endpoint,
      body,
      { headers: Header() }
    );


    if (response.Acknowledge === 1) {
      let data = {
        company: response.filterList.companyList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        branch: response.filterList.branchList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        groupEventList: response.filterList.groupEventList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false
        })),
        eventList: response.filterList.eventList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        positionList: response.filterList.positionList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        activityList: response.filterList.mediaList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        vacancyStatus: response.filterList.vacancyStatusList.map((x) => ({
          ...x,
          name: x.filterName,
          selected: false,
        })),
        yoeYearFrom: null,
        yoeMonthFrom: null,
        yoeYearTo: null,
        yoeMonthTo: null,
      };

      yield put({ type: types.RECRUITMENT_PR_FETCH_FILTER_SUCCESS, data });
      yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
    } else {
      yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
  }
}

export function* fetchResetFilter() {
  try {
    let stateRecruitmentProcess = yield select(getStateRecruitmentProcess);
    let param = {
      data: {
        // pageNo: stateRecruitmentProcess.pageNo,
        // pageSize: stateRecruitmentProcess.pageSize,
        pageNo: 1,
        pageSize: 5,
        totalRows: stateRecruitmentProcess.totalRows
      }
    };
    yield put ({ type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL, property:'isHome' , value: true})
    yield call(fetchFilter);
    yield call(fetchDahsboard, param);
  } catch (err) {
  }
}

export function* fetchDahsboard(param) {
  try {
    let stateRecruitmentProcess = yield select(getStateRecruitmentProcess);
    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true });
    yield put({
      type: types.RECRUITMENT_PR_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows,
    });
    console.log(
      "function*fetchDahsboard -> stateRecruitmentProcess",
      stateRecruitmentProcess
    );
    let {
      company,
      branch,
      vacancyStatus,
      groupEventList,
      eventList,
      yoeYearFrom,
      yoeMonthFrom,
      yoeYearTo,
      yoeMonthTo,
      positionList,
      activityList
    } = stateRecruitmentProcess.filterVacancyList;
    let urlEndPoint = "";
    let body = {
      searchCriteria: "",
      companyIdList: company
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      branchIdList: branch
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      eventList: eventList
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      groupEventList: groupEventList
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      vacancyType: vacancyStatus
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      YoeYearFrom: yoeYearFrom,
      YoeMonthFrom: yoeMonthFrom,
      YoeYearTo: yoeYearTo,
      YoeMonthTo: yoeMonthTo,
      pageNo: param.data.pageNo === 1 || param.data.pageNo === 2 || !stateRecruitmentProcess.isHome ?  
              param.data.pageNo : 2*param.data.pageNo - 2,
      pageSize: param.data.pageSize,
      mediaList: activityList
        .filter((x) => x.selected === true)
        .map((x) => x.filterId),
      positionList: positionList
        .filter((x) => x.selected === true)
        .map((x) => x.filterId)
    };
    if (param.userRole == "Hiring Manager" || stateRecruitmentProcess.ptkId !==null) {
      // body["ptkAssignmentId"] = param.ptkID;
      body["ptkAssignmentId"] = stateRecruitmentProcess.ptkId;
      urlEndPoint = Endpoint.RECRUITMENT_DASHBOARD_POST_VACANCYLIST_PTK;
    } else {
      urlEndPoint = Endpoint.RECRUITMENT_DASHBOARD_POST;
    }
    const response = yield call(POST, Config.BASE_URL + urlEndPoint, body, {
      headers: Header(),
    });
    
    if (stateRecruitmentProcess.isHome && body.pageNo !== 1) 
        var response2 = yield call(POST, Config.BASE_URL + urlEndPoint, {...body, pageNo: body.pageNo+1}, {headers: Header()});

    if (response.Acknowledge === 1 && (stateRecruitmentProcess.isHome && body.pageNo !== 1)? response2.Acknowledge === 1 : true) {
      yield put({
        type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER,
        property: "serach",
        value: "",
      });
      yield put({
        type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER,
        property: "visible",
        value: false,
      });
      yield put({
        type: types.RECRUITMENT_PR_FETCH_DASHBOARD_SUCCESS,
        data: stateRecruitmentProcess.isHome && body.pageNo !== 1 ? 
              {...response, vacancyList : [...response.vacancyList, ...response2.vacancyList]}: response
      });
      yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
    } else {
      yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
    }
  } catch (err) {
    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false });
  }
}

export function* fetchMount(param) {
  console.log("function*fetchMount -> param", param);
  try {
    let stateRecruitmentProcess = yield select(getStateRecruitmentProcess);
    let data = {
      data: {
        pageNo: stateRecruitmentProcess.pageNo,
        pageSize: stateRecruitmentProcess.pageSize,
          // pageNo: 1,
          // pageSize: 5,
          totalRows: stateRecruitmentProcess.totalRows,
      },
      isPTK: param.id !== undefined ? true : false,
      ptkID: param.id == undefined ? "" : param.id,
      userRole: param.userRole,
    };
    yield call(fetchDahsboard, data);
  } catch (err) {}
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.RECRUITMENT_PR_FETCH_FILTER, fetchFilter),
    takeLatest(types.RECRUITMENT_PR_FETCH_RESET_FILTER, fetchResetFilter),
    takeLatest(types.RECRUITMENT_PR_FETCH_DASHBOARD, fetchDahsboard),
    takeLatest(types.RECRUITMENT_PR_FETCH_MOUNT, fetchMount),
  ]);
}
