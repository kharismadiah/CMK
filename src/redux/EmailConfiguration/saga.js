import { all, call, put, select } from 'redux-saga/effects'
import { messages } from '../../components/messageBox'
import appAction from './actions'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, POST_CONFIRM, GET, PUT, DELETE } from '../../service/api'
import { Header } from '../../service/header'
import { takeLatest } from 'redux-saga'
import * as types from '../types'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const getStateEmailConfiguration = state => state.EmailConfiguration
const getStateLogin = state => state.Auth
const { setLoader } = appAction

export function* emailConfigurationList(data) {
    try {
        yield put(setLoader(true))
        const email = yield select(getStateEmailConfiguration)
        let field = data.field
        let body = {}

        if (field == 'search') {
            body = {
                CompanyName: email.company,
                Channel: email.channel,
                Activity: email.activity,
                Action: email.action,
                Subject: email.subject,
                Body: email.body,
                PageNo: email.pageNo,
                PageSize: 10
            }
        } else {
            body = {
                CompanyName: '',
                Channel: '',
                Activity: '',
                Action: '',
                Subject: '',
                Body: '',
                PageNo: 1,
                PageSize: 10
            }
        }
        let regex = new RegExp(/\w>(.*?)</, 'ig')
        const response = yield call(POST, Config.BASE_URL + Endpoint.LIST_EMAIL, body, { headers: Header() })
        if (response.Acknowledge == 1) {
            console.log(response.EmailConfigurationList)
            let tempEmailConfigurationList = []
            response.EmailConfigurationList.forEach(function(obj) {
                let tempSubject = obj.Subject.replace(/(\r\n|\n|\r)/gm,"")
                    let tempBox = []
                    let tempHasil = tempSubject.match(regex)
                    if (tempHasil !== null) {
                        tempHasil.forEach((x)=>{tempBox = [...tempBox, x.substring(2, x.length-1)]})
                        tempEmailConfigurationList = [...tempEmailConfigurationList, {...obj, Subject: tempBox.join(" ")}]
                    } else tempEmailConfigurationList = [...tempEmailConfigurationList, {...obj}]
                obj['readMore'] = false
            })
            yield put({
                type: types.HANDLE_STATE_EMAIL,
                field: 'emailConfigurationList',
                value: tempEmailConfigurationList
            })
            yield put({ type: types.HANDLE_STATE_EMAIL, field: 'totalRows', value: response.TotalRecords })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitMasterDataGlobal() {
    try {
        yield put(setLoader(true))
        let body = {
            MasterData: [
                {
                    ObjectName: 'GroupEvent'
                },
                {
                    ObjectName: 'Branch'
                },
                {
                    ObjectName: 'AssigneeType'
                }
            ]
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, body, { headers: Header() })
        const response2 = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() })

        if (response.Acknowledge == 1) {
            let masterData = {
                activityList: response2.Data.map(x => ({ ...x, id: x.EmailActivityId, name: x.ActivityName })),
                channelList: response.GroupEventList.map(x => ({ ...x, id: x.GroupEventId, name: x.GroupEventName })), // Channel = groupEventList
                companyList: response.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })), // Company = BranchList
                to: response.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })), // to = assigneetypeList
                cc: response.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // cc = assigneetypeList
                // triggerRemark : response.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // non cc and to = assigneetypeList
            }
            yield put({ type: types.SET_EMAIL_MASTERDATA, payload: masterData })
            let data = {
                field: ''
            }
            yield call(emailConfigurationList, data)
            // yield put({ type: types.GET_EMAIL_CONFIG_LIST });
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitEmailDetails(data) {
    try {
        yield put(setLoader(true))
        let id = data.data
        let from = location.pathname.includes('copy')
        let bodyMasterData = {
            MasterData: [
                {
                    ObjectName: 'GroupEvent'
                },
                {
                    ObjectName: 'Branch'
                },
                {
                    ObjectName: 'AssigneeType'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, bodyMasterData, {
            headers: Header()
        })
        const response2 = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() })

        if (resMasterData.Acknowledge == 1 && response2.Acknowledge == 1) {
            let masterData = {
                activityList: response2.Data.map(x => ({ ...x, id: x.EmailActivityId, name: x.ActivityName })),
                channelList: resMasterData.GroupEventList.map(x => ({
                    ...x,
                    id: x.GroupEventId,
                    name: x.GroupEventName
                })), // Channel = groupEventList
                companyList: resMasterData.BranchList.map(x => ({ ...x, id: x.BranchId, name: x.BranchName })), // Company = BranchList
                to: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })), // to = assigneetypeList
                cc: resMasterData.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // cc = assigneetypeList
                // triggerRemark : response.AssigneeTypeList.map(x => ({ ...x, id: x.AssigneeTypeId, name: x.AssigneeTypeName })) // non cc and to = assigneetypeList
            }
            yield put({ type: types.SET_EMAIL_MASTERDATA, payload: masterData })
            const resDetails = yield call(GET, Config.BASE_URL + Endpoint.GET_DEL_EMAIL + 'id=' + id, {
                headers: Header()
            })
            if (resDetails.Acknowledge == 1) {
                if (from) {
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'activity',
                        value: resDetails.EmailActivityId
                    })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'action', value: resDetails.Action })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'additionalLogic',
                        value: resDetails.AdditionalLogic
                    })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'status', value: 0 }) //default value for copy new tempalte
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'channel', value: resDetails.ChannelId })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'description',
                        value: resDetails.Description
                    })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'senderEmail',
                        value: resDetails.SenderEmail
                    })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'to', value: resDetails.ToList })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'cc', value: resDetails.CcList })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'subject', value: resDetails.Subject })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'body', value: resDetails.Body })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'signature', value: resDetails.Signature })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'activityName',
                        value: resDetails.Activity
                    })
                } else {
                    yield put({
                        type: types.HANDLE_STATE_EMAIL,
                        field: 'emailConfigId',
                        value: resDetails.EmailConfigId
                    })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'activity',
                        value: resDetails.EmailActivityId
                    })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'channel', value: resDetails.ChannelId })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'action', value: resDetails.Action })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'company', value: resDetails.CompanyId })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'additionalLogic',
                        value: resDetails.AdditionalLogic
                    })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'description',
                        value: resDetails.Description
                    })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'senderEmail',
                        value: resDetails.SenderEmail
                    })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'to', value: resDetails.ToList })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'cc', value: resDetails.CcList })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'subject', value: resDetails.Subject })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'body', value: resDetails.Body })
                    yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'signature', value: resDetails.Signature })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'status',
                        value: resDetails.Status ? 1 : 0
                    })
                    yield put({
                        type: types.HANDLE_STATE_EMAIL_FORM,
                        field: 'activityName',
                        value: resDetails.Activity
                    })

                    // yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'description', value: resDetails.Description});
                }

                // yield call(hitTriggerMasterData)
            } else {
                messages('Error', resDetails.Message, 'error', false)
            }
        } else {
            messages('Error', resMasterData.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* saveEmail(data) {
    try {
        yield put(setLoader(true))
        const email = yield select(getStateEmailConfiguration)
        let from = data.data
        
        let bodyEmailTemplate = email.formEmailConfiguration.body , signatureEmailTemplate = email.formEmailConfiguration.signature

        let regexTable = new RegExp(/<table>/, 'ig'), regexTr = new RegExp (/<tr>/, 'ig'), regexTd = new RegExp (/<td>/,'ig')
            let tempBody = bodyEmailTemplate.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                            .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)
            let tempSignature = signatureEmailTemplate.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                            .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)
        let body

        if (from == 'create') {
            body = {
                emailActivityId: email.formEmailConfiguration.activity,
                activity: email.activityList.find(x => x.EmailActivityId === email.formEmailConfiguration.activity)
                    .ActivityName,
                action: email.formEmailConfiguration.action,
                companyId: email.formEmailConfiguration.company,
                senderEmail: email.formEmailConfiguration.senderEmail,
                toList: email.formEmailConfiguration.to,
                subject: email.formEmailConfiguration.subject,
                body: tempBody,
                signature: tempSignature,
                status: email.formEmailConfiguration.status ? 1 : 0, //Harus ID, bukan bool
                channelId: email.formEmailConfiguration.channel,
                additionalLogic: email.formEmailConfiguration.additionalLogic,
                ccList: email.formEmailConfiguration.cc === '' ? 0 : email.formEmailConfiguration.cc,
                description: email.formEmailConfiguration.description
            }
            var response = yield call(POST, Config.BASE_URL + Endpoint.SAVE_EMAIL, body, { headers: Header() })
        } else if (from == 'update') {
            body = {
                EmailConfigurationId: email.emailConfigId,
                EmailActivityId: email.formEmailConfiguration.activity,
                Activity: email.activityList.find(x => x.EmailActivityId === email.formEmailConfiguration.activity)
                    .ActivityName,
                Action: email.formEmailConfiguration.action,
                CompanyId: email.formEmailConfiguration.company,
                SenderEmail: email.formEmailConfiguration.senderEmail,
                ToList: email.formEmailConfiguration.to,
                Subject: email.formEmailConfiguration.subject,
                Body: tempBody,
                Signature: tempSignature,
                Status: email.formEmailConfiguration.status ? 1 : 0, //Harus ID, bukan bool
                ChannelId: email.formEmailConfiguration.channel,
                AdditionalLogic: email.formEmailConfiguration.additionalLogic,
                CcList: email.formEmailConfiguration.cc === '' ? 0 : email.formEmailConfiguration.cc,
                Description: email.formEmailConfiguration.description
            }
           var response = yield call(PUT, Config.BASE_URL + Endpoint.UPDATE_EMAIL, body, { headers: Header() })
        }

        if (response.Acknowledge == 1) {
            messages('Success', 'Data has been saved', 'success', false)
            setTimeout(() => {window.location.href = `${process.env.PUBLIC_URL}/dashboard/EmailConfiguration`}, 1500)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* deleteEmail(data) {
    try {
        yield put(setLoader(true))
        const email = yield select(getStateEmailConfiguration)
        let id = email.emailConfigId
        let body = {}

        const response = yield call(DELETE, Config.BASE_URL + Endpoint.GET_DEL_EMAIL + 'id=' + id, body, {
            headers: Header()
        })

        if (response.Acknowledge == 1) {
            messages('Success', response.Message, 'success', false)
            let data = {
                field: ''
            }
            yield call(emailConfigurationList, data)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* fetchDisplayStatus(param) {
    try {
        yield put(setLoader(true))
        let title
        let text
        let type
        let body = {
            emailConfigId: param.id,
            displayStatus: param.displayStatus === 1 ? 0 : 1,
            IsMultiple: param.isMultiple
        }

        title = 'Confirmation'
        type = 'info'

        if (param.popUpType ==='deactivate') {
            text = 'Are you sure to deactivate this email template?'
        } if (param.popUpType === 'activateIsMultipleTrue') {
            text = 'There are active template for this action, if you activate this template, it will appear in option when you want to do action. Are you sure want to activate template ?'
        }
        else if (param.popUpType === 'activateIsMultipleFalse') {   
            text = 'Are you sure to activate this template? If any template with same company, action, trigger and receiver active, it will be inactive'
        }
 
        if (param.popUpType === 'directSave') {
            var response = yield call (
                POST, Config.BASE_URL + Endpoint.UPDATE_STATUS, body,
                { headers: Header() }
            )
        } else {
            var response = yield call(
                POST_CONFIRM,
                Config.BASE_URL + Endpoint.UPDATE_STATUS,
                body,
                { headers: Header() },
                title,
                text,
                type
            )
        }
        if (response) {
            if (response.Acknowledge == 1) {
                messages('Success', response.Message, 'success', false)
                let data = {
                    field: ''
                }
                yield call(emailConfigurationList, data)
            } else {
                messages('Error', response.Message, 'error', false)
            }
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        console.log(error)
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitTriggerMasterData() {
    try {
        yield put(setLoader(true))
        const email = yield select(getStateEmailConfiguration)
        let body = {
            EmailActivityId: email.formEmailConfiguration.activity
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({
                type: types.SET_EMAIL_TRIGGER,
                triggerList: response.Data.map(x => ({
                    id: x.EmailTriggerId,
                    triggerName: x.Remarks,
                    value: x.TriggerName
                }))
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* checkMultipleEmailTemplate(param) {
    try {
        yield put(setLoader(true))
        let body = {
            Activity: param.activity,
            Action: param.action,
            EmailActivityId: 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_MULTIPLE_EMAIL_TEMPLATE, body, {
            headers: Header()
        })

        if (response.Acknowledge == 1) {
            if (param.isFromMainTable) {
               if (response.IsMultiple && !param.displayStatus && !response.IsEmpty) 
                    yield call(fetchDisplayStatus, { id: param.id, displayStatus: param.displayStatus, popUpType: 'activateIsMultipleTrue', isMultiple:true })
               else if (!response.IsMultiple && !param.displayStatus && !response.IsEmpty){
                    yield call(fetchDisplayStatus, { id: param.id, displayStatus: param.displayStatus, popUpType: 'activateIsMultipleFalse', isMultiple:false })
               } else if (param.displayStatus) {
                    yield call(fetchDisplayStatus, { id: param.id, displayStatus: param.displayStatus, popUpType: 'deactivate', isMultiple:response.IsMultiple })
               } else if (!param.displayStatus && response.IsEmpty){
                    yield call(fetchDisplayStatus, { id: param.id, displayStatus: param.displayStatus, popUpType: 'directSave', isMultiple:response.IsMultiple })
               }
            } else {
                if (response.IsMultiple && !response.IsEmpty) {  
                    yield put({ type: types.HANDLE_STATE_EMAIL, field: 'popUpType', value: 'activateIsMultipleTrue' })
                }
               else if (!response.IsMultiple && !response.IsEmpty){
                    yield put({ type: types.HANDLE_STATE_EMAIL, field: 'popUpType', value: 'activateIsMultipleFalse' })
               } else if (response.IsEmpty){
                    yield put({ type: types.HANDLE_STATE_EMAIL, field: 'popUpType', value: 'directSave' })
               } 
            }
        } else {
            messages('Error', response.Message, 'error', false)
            if (!param.isFromMainTable) {
                param.setTempStatus(false)
                param.form.resetFields(['status'])
                yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'status', value: false })
            }
        }
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        messages('Info', 'Oops, something wrong !', 'info', false)
        if (!param.isFromMainTable) {
            param.setTempStatus(false)
            param.form.resetFields(['status'])
            yield put({ type: types.HANDLE_STATE_EMAIL_FORM, field: 'status', value: false })
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.GET_EMAIL_CONFIG_LIST, emailConfigurationList),
        takeLatest(types.GET_MASTER_DATA_GLOBAL, hitMasterDataGlobal),
        takeLatest(types.GET_EMAIL_DETAILS, hitEmailDetails),
        takeLatest(types.SAVE_EMAIL, saveEmail),
        takeLatest(types.DELETE_EMAIL, deleteEmail),
        takeLatest(types.EMAIL_CONFIG_FETCH_DISPLAYSTATUS, fetchDisplayStatus),
        takeLatest(types.GET_EMAIL_TRIGGER, hitTriggerMasterData),
        takeLatest(types.CHECK_MULTIPLE_EMAIL_TEMPLATE, checkMultipleEmailTemplate)
    ])
}
