import { all, call, fork, put, select, take } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
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

const getStateEmailReminder = state => state.EmailReminder;

export function* getMasterData() {
    try {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let body = {
            "MasterData": [
                {
                    "ObjectName": "GroupEvent"
                },
                {
                    "ObjectName": "Branch"
                },
                {
                    "ObjectName": "AssigneeType"
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

        if(resMasterData.Acknowledge == 1){
            let masterData = {
                Channel: resMasterData.GroupEventList.map(x => ({ ...x, id: x.GroupEventId, name: x.GroupEventName })), // Channel = groupEventList
                Company: resMasterData.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })), // Company = BranchList
                To: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })), // to = assigneetypeList
                Cc: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // cc = assigneetypeList
            }
            yield put({ type: types.EMAIL_REMINDER_MATER_DATA_SUCCESS, payload: masterData})
        }
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    }
}

export function* postSearch(param) {
    try {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let stateEmailReminder = yield select(getStateEmailReminder)

        yield put({
            type: types.EMAIL_REMINDER_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })
        let { formSearch } = stateEmailReminder

        let body = {
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            activity: formSearch.activity,
            description: formSearch.description,
            company: formSearch.company,
            subject: formSearch.subject,
            status: formSearch.status ? 1 : 0,
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.EMAIL_REMINDER_LIST_POST, body, { headers: Header() });

        if (response.Acknowledge === 1) {
            yield put({ type: types.EMAIL_REMINDER_FETCH_SEARCH_SUCCESS, value: response })
            yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
        } else {
            yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
            messages("Error", response.Message, "error", false);
        }
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    }
}

export function* deleteList(param) {
    try {
        let stateEmailReminder = yield select(getStateEmailReminder)
        let { pageNo, pageSize, totalRows } = stateEmailReminder

        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let body = {
            emailReminderId: param.id
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.EMAIL_REMINDER_DELETE_POST, body, { headers: Header() });

        if(response.Acknowledge === 1){
            yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
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
            yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
            messages("Error", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    }
}

export function* getDetail(param) {
    try {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let stateEmailReminder = yield select(getStateEmailReminder)

        let body = {
            "MasterData": [
                {
                    "ObjectName": "GroupEvent"
                },
                {
                    "ObjectName": "Branch"
                },
                {
                    "ObjectName": "AssigneeType"
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })
        if (resMasterData.Acknowledge == 1) {
            let masterData = {
                Channel: resMasterData.GroupEventList.map(x => ({ ...x, id: x.GroupEventId, name: x.GroupEventName })), // Channel = groupEventList
                Company: resMasterData.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })), // Company = BranchList
                To: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })), // to = assigneetypeList
                Cc: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // cc = assigneetypeList
            }
            yield put({ type: types.EMAIL_REMINDER_MATER_DATA_SUCCESS, payload: masterData })

            let body = {
                emailReminderId: param.code
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.EMAIL_REMINDER_DETAILS_POST, body, { headers: Header() });

            if (response.Acknowledge === 1) {
                let data = {
                    emailReminderId: response.EmailReminderId,
                    activity: response.Activity,
                    companyId: response.CompanyId,
                    senderEmail: response.SenderEmail,
                    firstReminder: response.FirstReminder,
                    secondReminder: response.SecondReminder,
                    thirdReminder: response.ThirdReminder,
                    description: response.Description,
                    condition: response.Condition,
                    to: response.To != "" ? parseInt(response.To) : "",
                    cc: response.Cc != "" ? parseInt(response.Cc) : "",
                    subject: response.Subject,
                    body: response.Body,
                    signature: response.Signature,
                    status: response.Status
                }
                
                yield put({ type: types.EMAIL_REMINDER_GET_DETAIL_SUCCESS, payload: data })
                yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
            } else {
                yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
                messages("Error", response.Message, "error", false);
            }
        }else{
            yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
        }
    } catch (error) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    }
}

export function* postForm(param) {
    try {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let stateEmailReminder = yield select(getStateEmailReminder)
        let { formEmailReminder } = stateEmailReminder

        let body = {
            Activity: formEmailReminder.activity,
            CompanyId: formEmailReminder.companyId,
            SenderEmail: formEmailReminder.senderEmail,
            FirstReminder: formEmailReminder.firstReminder,
            SecondReminder: formEmailReminder.secondReminder,
            ThirdReminder: formEmailReminder.thirdReminder,
            Description: formEmailReminder.description,
            Condition: formEmailReminder.condition,
            To: formEmailReminder.to,
            Cc: formEmailReminder.cc,
            Subject: formEmailReminder.subject,
            Body: formEmailReminder.body,
            Signature: formEmailReminder.signature,
            Status: formEmailReminder.status ? 1 : 0
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.EMAIL_REMINDER_CREATE_POST, body, { headers: Header() });

        if(response.Acknowledge === 1){
          yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
          messages("Info", response.Message, "info", false);
          param.history.goBack()
        }else{
          yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
        messages("Error", error.Message, "error", false);
    }
}

export function* postUpdate(param) {
    try {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: true })
        let stateEmailReminder = yield select(getStateEmailReminder)
        let { formEmailReminder } = stateEmailReminder

        let body = {
            EmailReminderId: formEmailReminder.emailReminderId,
            Activity: formEmailReminder.activity,
            CompanyId: formEmailReminder.companyId,
            SenderEmail: formEmailReminder.senderEmail,
            FirstReminder: formEmailReminder.firstReminder,
            SecondReminder: formEmailReminder.secondReminder,
            ThirdReminder: formEmailReminder.thirdReminder,
            Description: formEmailReminder.description,
            Condition: formEmailReminder.condition,
            To: formEmailReminder.to,
            Cc: formEmailReminder.cc,
            Subject: formEmailReminder.subject,
            Body: formEmailReminder.body,
            Signature: formEmailReminder.signature,
            Status: formEmailReminder.status ? 1 : 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.EMAIL_REMINDER_UPDATE_POST, body, { headers: Header() });

        if(response.Acknowledge === 1){
          yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
          messages("Info", response.Message, "info", false);
          param.history.goBack()
        }else{
          yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false})
          messages("Error", response.Message, "error", false);
        }

    } catch (error) {
        yield put({ type: types.EMAIL_REMINDER_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.EMAIL_REMINDER_FETCH_MATER_DATA, getMasterData),
        takeLatest(types.EMAIL_REMINDER_FETCH_SEARCH, postSearch),
        takeLatest(types.EMAIL_REMINDER_FETCH_DEL, deleteList),
        takeLatest(types.EMAIL_REMINDER_FETCH_GET_DETAIL, getDetail),
        takeLatest(types.EMAIL_REMINDER_FETCH_SUBMIT_FORM, postForm),
        takeLatest(types.EMAIL_REMINDER_FETCH_UPDATE_FORM, postUpdate)
    ]);
}

