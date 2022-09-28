import { all, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getStateApplicantStatus = state => state.ApplicantStatus;

export function* fetchSearch(param) {
  try {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: true })

    let stateApplicantStatus = yield select(getStateApplicantStatus)

    yield put({
      type: types.APPLICANT_STATUS_HANDLE_STATE_PAGINATION,
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      totalRows: param.data.totalRows
    })

    let { search } = stateApplicantStatus

    let body = {
      pageNo: param.data.pageNo,
      pageSize: param.data.pageSize,
      applicantStatusCode: search.applicantStatusCode,
      applicantStatusName: search.applicantStatusName,
      applicantStatusNameEnglish: search.applicantStatusNameEnglish,
      applicantStatusDescription: search.applicantStatusDesc,
      applicantStatusDescriptionEnglish: search.applicantStatusDescEnglish
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_STATUS_LIST_POST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: types.APPLICANT_STATUS_FETCH_SEARCH_SUCCESS, data: response })
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
    } else {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
  }
}

export function* fetchSubmit(param) {
  try {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: true })

    let stateApplicantStatus = yield select(getStateApplicantStatus)
    let { form } = stateApplicantStatus
    let body = {
      applicantStatusName: form.applicantStatusName,
      applicantStatusNameEnglish: form.applicantStatusNameEnglish,
      applicantStatusDescription: form.applicantStatusDesc,
      applicantStatusDescriptionEnglish: form.applicantStatusDescEnglish
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_STATUS_SUBMIT_POST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    } else {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
  }
}

export function* fetchDetail(param) {
  try {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: true })

    const response = yield call(GET, Config.BASE_URL + Endpoint.APPLICANT_STATUS_DETAIL_POST + `?id=${param.id}`, { headers: Header() });
    if (response.Acknowledge === 1) {
      let data = {
        applicantStatusCode: response.ApplicantStatus.ApplicantStatusCode,
        applicantStatusName: response.ApplicantStatus.ApplicantStatusName,
        applicantStatusNameEnglish: response.ApplicantStatus.ApplicantStatusNameEnglish,
        applicantStatusDesc: response.ApplicantStatus.ApplicantStatusDescription,
        applicantStatusDescEnglish: response.ApplicantStatus.ApplicantStatusDescriptionEnglish
      }
      yield put({ type: types.APPLICANT_STATUS_FETCH_DETAIL_SUCCESS, data })
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
    } else {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Error", response.Message, "error", false); 
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
  }
}

export function* fetchEdit(param) {
  try {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: true })

    let stateApplicantStatus = yield select(getStateApplicantStatus)
    let { form } = stateApplicantStatus
    let body = {
      applicantStatusId: param.id,
      applicantStatusName: form.applicantStatusName,
      applicantStatusNameEnglish: form.applicantStatusNameEnglish,
      applicantStatusDescription: form.applicantStatusDesc,
      applicantStatusDescriptionEnglish: form.applicantStatusDescEnglish
    }

    const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_STATUS_UPDATE_POST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Info", response.Message, "info", false);
      param.history.goBack()
    } else {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
      messages("Error", response.Message, "error", false);
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
  }
}

export function* fetchDelete(param) {
  try {
    if (param.isInitial == 1) {
      messages("Failed", 'Delete failed.The data that you want to delete is initial data', "warning", false);
    } else {
      yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: true })

      let stateApplicantStatus = yield select(getStateApplicantStatus)
      let { pageNo, pageSize, totalRows } = stateApplicantStatus

      const response = yield call(DELETE, Config.BASE_URL + Endpoint.APPLICANT_STATUS_DELETE_DEL + `?id=${param.id}`, {}, { headers: Header() });

      if (response.Acknowledge === 1) {
        yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
        messages("Info", response.Message, "info", false);

        let data = {
          data: {
            pageNo,
            pageSize,
            totalRows
          }
        }
        yield call(fetchSearch, data)
      } else {
        yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
        messages("Error", response.Message, "error", false);
      }
    }
  } catch (err) {
    yield put({ type: types.APPLICANT_STATUS_SET_LOADER, value: false })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.APPLICANT_STATUS_FETCH_SEARCH, fetchSearch),
    takeLatest(types.APPLICANT_STATUS_FETCH_SUBMIT, fetchSubmit),
    takeLatest(types.APPLICANT_STATUS_FETCH_DETAIL, fetchDetail),
    takeLatest(types.APPLICANT_STATUS_FETCH_EDIT, fetchEdit),
    takeLatest(types.APPLICANT_STATUS_FETCH_DELETE, fetchDelete)
  ]);
}
