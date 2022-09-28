import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET, DELETE, GETBLOB, POSTBLOB, POSTBLOB_HEADER } from '../../service/api'
import { messages, messageTokenExpired, messageInternalErrorFLK } from '../../components/messageBox'
import {
    Header,
    HeaderMultipart,
    HeaderMultipartFile,
    HeaderNonToken,
    HeaderToken,
    HeaderFLKBatch
} from '../../service/header'
import moment from 'moment'
import { saveAs } from 'file-saver'
import 'sweetalert2/dist/sweetalert2.min.css'
import { Cookie } from '../../service/header'
import {
    MappingViewFLK,
    dataDummy,
    CheckHobby,
    ReqHobby,
    MappSosialActivity,
    MappSosialActivityOther,
    MappCity,
    ReqSosialActivity,
    ReqCity,
    MappActivityPriority,
    ReqFacility,
    ReqJobPriority
} from './util'
import { createFLKFormFileName } from '../../helpers/flk-form'

const getStateRecruitmentPhase = state => state.RecruitmentPhase
const getStateVacancyTitle = state => state.VacancyTitle

export function* fetchFilter(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let stateVacancyTitle = yield select(getStateVacancyTitle)

        let body = {
            searchCriteria: stateRecruitmentPhase.filter.search,
            filterType: param.typeFilter,
            vacancyId: parseInt(param.vacancyId),
            atsPhaseId: parseInt(param.PhaseId)
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_FILTER_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                sort: {
                    valueSort: response.sortList.length !== 0 ? response.sortList[0] : '',
                    listSort: response.sortList
                },
                filter: {
                    major:
                        response.filterList.majorList === undefined
                            ? []
                            : response.filterList.majorList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    pengalaman:
                        response.filterList.experienceList === undefined
                            ? []
                            : response.filterList.experienceList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    reference:
                        response.filterList.referenceList === undefined
                            ? []
                            : response.filterList.referenceList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    universitas:
                        response.filterList.universityList === undefined
                            ? []
                            : response.filterList.universityList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    status:
                        response.filterList.statusList === undefined
                            ? []
                            : response.filterList.statusList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    branch:
                        response.filterList.branchList === undefined
                            ? []
                            : response.filterList.branchList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    company:
                        response.filterList.companyList === undefined
                            ? []
                            : response.filterList.companyList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    event:
                        response.filterList.eventList === undefined
                            ? []
                            : response.filterList.eventList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    groupEvent:
                        response.filterList.groupEventList === undefined
                            ? []
                            : response.filterList.groupEventList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    vacancyStatus:
                        response.filterList.vacancyStatusList === undefined
                            ? []
                            : response.filterList.vacancyStatusList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    gpaMin: null,
                    gpaMax: null,
                    onlineTestResult:
                        response.filterList.onlineTestResultList === undefined
                            ? []
                            : response.filterList.onlineTestResultList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    autogeneralfilterstatuslist:
                        response.filterList.autogeneralfilterstatuslist === undefined
                            ? []
                            : response.filterList.autogeneralfilterstatuslist.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),
                    olResultStatusList:
                        response.filterList.olResultStatusList === undefined
                            ? []
                            : response.filterList.olResultStatusList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              })),

                    yoeYearFrom: null,
                    yoeMonthFrom: null,
                    yoeYearTo: null,
                    yoeMonthTo: null,
                    emailStatusList:
                        response.filterList.emailStatusList === undefined
                            ? []
                            : response.filterList.emailStatusList.map(x => ({
                                  ...x,
                                  name: x.filterName,
                                  selected: false
                              }))
                }
            }
            if (
                stateVacancyTitle.listData
                    .find(x => x.AtsPhaseId === parseInt(param.PhaseId))
                    .AtsPhaseName.toLowerCase()
                    .includes('online test')
            ) {
                console.log('online test cek')
                yield put({
                    type: types.RECRUITMENT_PR_FETCH_FILTER_PHASE_SUCCESS,
                    data: {
                        sort: data.sort,
                        filter: {
                            ...data.filter,
                            status: data.filter.status.filter(
                                x =>
                                    x.name !== 'Completed - Pass' &&
                                    x.name !== 'Completed - Failed' &&
                                    x.name !== 'Completed'
                            )
                        }
                    }
                })
            } else {
                yield put({
                    type: types.RECRUITMENT_PR_FETCH_FILTER_PHASE_SUCCESS,
                    data
                })
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchList(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let {
            major,
            pengalaman,
            reference,
            universitas,
            status,
            gpaMin,
            gpaMax,
            onlineTestResult,
            olResultStatusList,
            autogeneralfilterstatuslist,
            yoeYearFrom,
            yoeMonthFrom,
            yoeYearTo,
            yoeMonthTo,
            emailStatusList
        } = stateRecruitmentPhase.filter
        let { sortType, valueSort } = stateRecruitmentPhase.sort
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_PAGINATION_PHASE,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })
        let ExperientList = pengalaman.filter(x => x.selected === true)
        // let gpaList = gpa.filter((x) => x.selected === true);

        let body = {
            VacancyId: parseInt(param.data.VacancyId),
            PhaseId: parseInt(param.data.PhaseId),
            cbtType: stateRecruitmentPhase.cbtType,
            MajorIdList: major.filter(x => x.selected === true).map(x => x.filterId),
            ExperienceRangeIdList: ExperientList.length !== 0 ? ExperientList.map(x => x.name) : [],
            // ExperienceRangeId: pengalaman.filter(x => x.selected === true).map(x => x.name),
            ReferenceIdList: reference.filter(x => x.selected === true).map(x => x.filterId),
            UniversityIdList: universitas.filter(x => x.selected === true).map(x => x.filterId),
            StatusIdList: status.filter(x => x.selected === true).map(x => x.filterId),
            GPAMin: gpaMin ? gpaMin.toString() : '', // gpaList.length !== 0 ? gpaList[0].min : 0,
            GPAMax: gpaMax ? gpaMax.toString() : '', //gpaList.length !== 0 ? gpaList[gpaList.length - 1].max : 0,
            OnlineTestIdList: onlineTestResult.filter(x => x.selected === true).map(x => x.filterId),
            SortExpression: valueSort,
            SortBy: sortType,
            SearchCriteria: param.data.SearchCriteria,
            PageNo: param.data.pageNo,
            PageSize: param.data.pageSize,
            AutoGFStatusIdList: autogeneralfilterstatuslist.filter(x => x.selected === true).map(x => x.filterId),
            OLResultStatusIdList:
                olResultStatusList.length !== 0
                    ? olResultStatusList.filter(x => x.selected === true).map(x => x.filterId)
                    : [],

            YoeYearFrom: yoeYearFrom,
            YoeMonthFrom: yoeMonthFrom,
            YoeYearTo: yoeYearTo,
            YoeMonthTo: yoeMonthTo,
            EmailStatusIdList: emailStatusList.filter(x => x.selected === true).map(x => x.filterId)
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_LIST_POST, body, {
            headers: Header()
        })

        const response2 = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() })

        if (response.Acknowledge === 1 && response2.Acknowledge === 1) {
            console.log('function*fetchList -> response', response)
            let data = {
                ApplicantList: response.ApplicantList.map(x => ({
                    ...x,
                    checked: false
                })),
                TotalApplicants: response.TotalApplicants,
                vacancyId: parseInt(param.data.VacancyId),
                vacancyName: response.VacancyDetails.VacancyTitle,
                PhaseName: response.VacancyDetails.PhaseName,
                CompanyName: response.VacancyDetails.CompanyName,
                atsPhaseId: parseInt(param.data.PhaseId),
                modalUploadTestResult: {
                    PhaseName: response.hasOwnProperty('VacancyDetails') ? response.VacancyDetails.PhaseName : '',
                    eventName: response.hasOwnProperty('VacancyDetails') ? response.VacancyDetails.EventName : '',
                    position: response.hasOwnProperty('VacancyDetails') ? response.VacancyDetails.PositionName : '',
                    vacancyTitle: response.hasOwnProperty('VacancyDetails') ? response.VacancyDetails.VacancyTitle : '',
                    company: response.hasOwnProperty('VacancyDetails') ? response.VacancyDetails.CompanyName : ''
                },
                IsEnableNotifyHR: response.IsEnableNotifyHR
            }
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                property: 'activityList',
                value: response2.Data.map(x => ({ ...x, id: x.EmailActivityId, name: x.ActivityName }))
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_SORT_PHASE,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER_PHASE,
                property: 'visible',
                value: false
            })
            yield put({ type: types.RECRUITMENT_PR_FETCH_LIST_SUCCESS, data })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchMount(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        // yield call(fetchFilter, param)
        let data = {
            data: {
                VacancyId: param.vacancyId,
                PhaseId: param.PhaseId,
                SearchCriteria: '',
                pageNo: stateRecruitmentPhase.pageNo,
                pageSize: stateRecruitmentPhase.pageSize,
                totalRows: stateRecruitmentPhase.totalRows
            }
        }
        yield call(fetchList, data)
    } catch (err) {}
}

export function* fetchResetFilter(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER_PHASE,
            property: 'search',
            value: ''
        })
        yield call(fetchFilter, param)
        let data = {
            data: {
                VacancyId: param.vacancyId,
                PhaseId: param.PhaseId,
                SearchCriteria: '',
                pageNo: stateRecruitmentPhase.pageNo,
                pageSize: stateRecruitmentPhase.pageSize,
                totalRows: stateRecruitmentPhase.totalRows
            }
        }
        yield call(fetchList, data)
    } catch (err) {}
}

export function* fetchEmailRedactional() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        const body = {
            Activity:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.activity
                    : '',
            Action:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.action
                    : '',
            EmailDetailsId: stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({
                type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE_SUCCESS,
                data
            })
            yield call(hitTriggerMasterData)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchEmailRedactionalDate(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        const body = {
            Activity:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.activity
                    : '',
            Action:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.action
                    : '',
            EmailDetailsId: stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })

        // let body = {
        //     Activity: param.Activity,
        //     Action: param.Action
        // }
        // const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_REDACTION_POST, body, {
        //     headers: Header()
        // })

        if (response.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({
                type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_DATE_PAHSE_SUCCESS,
                data
            })
            yield call(hitTriggerMasterData)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitEmail(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmail
        let isInvitationOnlineTest = param.param

        let bodyInvitation = {
            Phaseid: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'Online test',
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    applicantId: x.ApplicantId,
                    applicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                subject: subject,
                body: body,
                signature: signature
            }
        }
        let link = ''
        if (isInvitationOnlineTest) {
            link = 'api/v2/recruitmentprocess/applicant/sendemail'
            const responseInv = yield call(POST, Config.BASE_URL + link, bodyInvitation, { headers: Header() })
            if (responseInv.Acknowledge) {
                let dataParam = {
                    data: {
                        pageNo: stateRecruitmentPhase.pageNo,
                        pageSize: stateRecruitmentPhase.pageSize,
                        totalRows: stateRecruitmentPhase.totalRows,
                        SearchCriteria: '',
                        VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                        PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                    }
                }
                yield call(fetchList, dataParam)
                messages('Info', responseInv.Message, 'info', false)
            } else {
                messages('Info', responseInv.Message, 'info', false)
            }
        }
        if (stateRecruitmentPhase.modalAction.checked) {
            let bodyAction = {
                actionName: stateRecruitmentPhase.modalAction.actionName,
                applicantList: stateRecruitmentPhase.formList.listData
                    .filter(x => x.checked === true)
                    .map(x => ({
                        applicantId: x.ApplicantId,
                        applicationId: x.ApplicationId
                    })),
                atsPhaseId: stateRecruitmentPhase.formList.atsPhaseId,
                vacancyId: stateRecruitmentPhase.formList.vacancyId,
                sendEmail: true,
                emailTemplate: {
                    EmailDetailsId: EmailConfigId,
                    Subject: subject,
                    Body: body,
                    Signature: signature
                }
            }
            const responseAction = yield call(
                POST,
                Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_ACTION_POST,
                bodyAction,
                { headers: Header() }
            )

            if (responseAction.Acknowledge === 1) {
                if (stateRecruitmentPhase.modalCancelCandidate.isHire) {
                    //jika pass dan hire candidate
                    let paramHire = {
                        atsPhaseId: stateRecruitmentPhase.formList.atsPhaseId,
                        vacancyId: stateRecruitmentPhase.formList.vacancyId
                    }
                    yield call(fetchHireCandidate, paramHire)

                    let dataParam = {
                        data: {
                            pageNo: stateRecruitmentPhase.pageNo,
                            pageSize: stateRecruitmentPhase.pageSize,
                            totalRows: stateRecruitmentPhase.totalRows,
                            SearchCriteria: '',
                            VacancyId: parseInt(param.vacancyId),
                            PhaseId: parseInt(param.atsPhaseId)
                        }
                    }
                    yield call(fetchList, dataParam)
                } else {
                    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                    yield put({
                        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                        property: 'visible',
                        value: false
                    })
                    yield put({
                        type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
                        property: 'checked',
                        value: false
                    })
                    messages('Info', responseAction.Message, 'info', false)
                }
                let dataParam = {
                    data: {
                        pageNo: stateRecruitmentPhase.pageNo,
                        pageSize: stateRecruitmentPhase.pageSize,
                        totalRows: stateRecruitmentPhase.totalRows,
                        SearchCriteria: '',
                        VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                        PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                    }
                }
                yield call(fetchList, dataParam)
            } else {
                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                    property: 'visible',
                    value: false
                })
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
                    property: 'checked',
                    value: false
                })
                messages('Info', responseAction.Message, 'info', false)
            }
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
                property: 'checked',
                value: false
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            //messages('Info', responseAction.Message, 'info', false)
        }
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
            property: 'selectedEmailTemplateId',
            value: null
        })
        yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE, property: 'action', value: '' })
        yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE, property: 'activity', value: '' })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fecthSubmitEmailInvited({ from }) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { subject, body, signature } = stateRecruitmentPhase.modalEmail
        let applicantList = []

        if (from === 'ATS Phase - Invited') {
            applicantList = stateRecruitmentPhase.applicantListToSendEmailInvitation.map(x => ({
                applicantId: x.ApplicantId,
                applicationId: x.ApplicationId
            }))
        } else {
            applicantList = stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    applicantId: x.ApplicantId,
                    applicationId: x.ApplicationId
                }))
        }

        let bodyReq = {
            Phaseid: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'Invited',
            vacancyCode: stateRecruitmentPhase.formList.listData.filter(x => x.checked === true)[0].VacancyCode,
            applicantList: applicantList,
            emailTemplate: {
                subject: subject,
                body: body,
                signature: signature
            }
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_SUBMIT_POST, bodyReq, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
            property: 'selectedEmailTemplateId',
            value: null
        })
        yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE, property: 'action', value: '' })
        yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE, property: 'activity', value: '' })

        // reset applicant list to send email invitation
        yield put({ type: types.SET_ATS_INVITED_APPLICANT_LIST_TO_SEND_EMAIL_INVITATION, applicantList: [] })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })

        // reset applicant list to send email invitation
        yield put({ type: types.SET_ATS_INVITED_APPLICANT_LIST_TO_SEND_EMAIL_INVITATION, applicantList: [] })
    }
}

export function* fetchSubmitReference() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { ApplicantId, ApplicationId } = stateRecruitmentPhase.modal.PersonalData
        let { referenceName, referenceTitle, referenceCompany, ReferencePhone } = stateRecruitmentPhase.reference
        let bodyReq = {
            applicantId: ApplicantId,
            referenceList: [
                {
                    referenceName,
                    referenceTitle,
                    referenceCompany,
                    ReferencePhone
                }
            ]
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_REFERENCE_SUBMIT_POST, bodyReq, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_INIT_STATE_REFERENCE_PAHSE })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            let data = {
                applicantId: ApplicantId,
                applicationId: ApplicationId
            }
            yield call(fetchDetail, data)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDetail(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let bodyMaster = {
            MasterData: [
                {
                    ObjectName: 'Degree'
                },
                {
                    ObjectName: 'InstituteUniversity'
                },
                {
                    ObjectName: 'Major'
                },
                {
                    ObjectName: 'JobTitle'
                },
                {
                    ObjectName: 'Company'
                },
                {
                    ObjectName: 'Branch'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, bodyMaster, {
            headers: Header()
        })

        if (resMasterData.Acknowledge === 1) {
            let dataMaster = {
                Degree: resMasterData.DegreeList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Institute: resMasterData.InstituteList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Major: resMasterData.MajorList.map(x => ({ id: x.Id, name: x.Name })),
                JobTitle: resMasterData.JobTitleList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Company: resMasterData.CompanyList.map(x => ({
                    id: x.CompanyId,
                    name: x.CompanyName
                })),
                Branch: resMasterData.BranchList.map(x => ({
                    id: x.BranchId,
                    name: x.BranchName
                }))
            }

            yield put({
                type: types.RECRUITMENT_PR_MASTER_DATA_SUCCESS_PAHSE,
                data: dataMaster
            })

            let body = {
                applicantId: param.applicantId,
                applicationId: param.applicationId
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_DETAIL_POST, body, {
                headers: Header()
            })

            if (response.Acknowledge === 1) {
                let isReference = response.hasOwnProperty('Reference')
                let isFlk = response.hasOwnProperty('FLK')
                let isJobExperience = response.hasOwnProperty('JobExperienceList')
                let isOnlineTest = response.hasOwnProperty('OnlineTest')
                let isPsycologicalTest = response.hasOwnProperty('PsycologicalTest')
                let isFgd = response.hasOwnProperty('Fgd')
                let isInterview = response.hasOwnProperty('Interview')
                let data = {
                    PersonalData: response.PersonalData,
                    Reference: isReference ? response.Reference : [],
                    Flk: {
                        ...(isFlk && MappingViewFLK(response.FLK))
                    },
                    OnlineTest: {
                        ...(isOnlineTest && {
                            ...response.OnlineTest
                        })
                    },
                    PsycologicalTest: {
                        ...(isPsycologicalTest && {
                            ...response.PsycologicalTest
                        })
                    },
                    Fgd: {
                        ...(isFgd && {
                            ...response.Fgd
                        })
                    },
                    Interview: {
                        ...(isInterview && {
                            ...response.Interview
                        })
                    }
                }
                // yield call(fetchViewFormFLK, { ApplicantId: response.PersonalData.ApplicantId })
                yield put({
                    type: types.RECRUITMENT_PR_FETCH_DETAIL_PAHSE_SUCCESS,
                    data
                })
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_PHASE,
                    property: 'visible',
                    value: true
                })

                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                if (isInterview) {
                    yield put({
                        type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                        property: 'dataCompanyList',
                        value: data.Interview.CompanyList
                    })
                    yield put({
                        type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                        property: 'interviewType',
                        subProperty: 'interviewType',
                        value: data.Interview.IsInterviewMT ? 'INTERVIEW MT' : 'INTERVIEW NON - MT'
                    })
                }
            } else {
                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDetailsOffering(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            applicantId: param.applicantId,
            applicationId: param.applicationId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_OFFERING_ADDEDIT_DETAILS_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                ApplicantId: response.ApplicantId,
                ApplicationId: response.ApplicationId,
                uploadFileName: response.FileOfferingName,
                urlPdf: response.FileOfferingUrl
                // "https://dsohsosharedstorage.blob.core.windows.net/astracareerfiles/2021/09/22/2ab242c4-24de-4c58-b1f2-9026a9e0a537-cvTest2.pdf?sv=2015-12-11&sr=b&sig=N6%2BjelYer5x6srplQk%2F%2Bdxtqyc3wmnHbNKGq4Ssyjek%3D&se=2021-09-24T01%3A34%3A19Z&sp=r",
            }

            yield put({
                type: types.RECRUITMENT_PR_FETCH_DETAILS_OFFERING_SUCCESS,
                data: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            if (response.FileOfferingUrl !== '' && response.Acknowledge == 0) {
                messages('Error', response.Message, 'error', false)
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDeleteReference(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { ApplicantId, ApplicationId } = stateRecruitmentPhase.modal.PersonalData

        const response = yield call(
            DELETE,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_REFERENCE_DELETE_POST + `?id=${param.id}`,
            {},
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            let data = {
                applicantId: ApplicantId,
                applicationId: ApplicationId
            }
            yield call(fetchDetail, data)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchAction(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { subject, body, signature } = stateRecruitmentPhase.modalEmail

        let bodyRequest = {
            actionName: stateRecruitmentPhase.modalAction.actionName,
            applicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    applicantId: x.ApplicantId,
                    applicationId: x.ApplicationId
                })),
            atsPhaseId: parseInt(param.atsPhaseId),
            vacancyId: parseInt(param.vacancyId),
            sendEmail: false
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_ACTION_POST, bodyRequest, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            if (stateRecruitmentPhase.modalCancelCandidate.isHire) {
                let paramHire = {
                    atsPhaseId: parseInt(param.atsPhaseId),
                    vacancyId: parseInt(param.vacancyId)
                }
                yield call(fetchHireCandidate, paramHire)
            } else {
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
                    property: 'visible',
                    value: false
                })
                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                messages('Info', response.Message, 'info', false)
            }

            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId,
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId
                }
            }
            yield call(fetchList, dataParam)
        } else {
            // let dataParam = {
            //   data: {
            //     pageNo: stateRecruitmentPhase.pageNo,
            //     pageSize: stateRecruitmentPhase.pageSize,
            //     totalRows: stateRecruitmentPhase.totalRows,
            //     VacancyId: stateRecruitmentPhase.formList.vacancyId,//parseInt(param.vacancyId),
            //     PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
            //   }
            // }
            // yield call(fetchList, dataParam)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchCandidatePool() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let applicantChecked = stateRecruitmentPhase.formList.listData.filter(x => x.checked === true)
        let atLeastOneCandidatePool = applicantChecked.filter(x => x.IsCandidatePool === true)
        let body
        if (atLeastOneCandidatePool.length > 0) {
            messages(
                'Candidate Pool',
                'Tidak dapat memasukan kandidat ke dalam Candidate Pool karena ada beberapa kandidat yang sudah menjadi bagian Candidate Pool, silakan uncheck kandidat tersebut terlebih dahulu',
                'info',
                false
            )
        } else {
            body = {
                candidatePoolDate: moment(stateRecruitmentPhase.modalPool.date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
                applicantList: stateRecruitmentPhase.formList.listData
                    .filter(x => x.checked === true)
                    .map(x => ({ applicantId: x.ApplicantId }))
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_POOL_POST, body, {
                headers: Header()
            })

            if (response.Acknowledge === 1) {
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_POOL_PAHSE,
                    property: 'visible',
                    value: false
                })
                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                messages('Info', response.Message, 'info', false)
                let dataParam = {
                    data: {
                        pageNo: stateRecruitmentPhase.pageNo,
                        pageSize: stateRecruitmentPhase.pageSize,
                        totalRows: stateRecruitmentPhase.totalRows,
                        SearchCriteria: '',
                        VacancyId: stateRecruitmentPhase.formList.vacancyId,
                        PhaseId: stateRecruitmentPhase.formList.atsPhaseId
                    }
                }
                yield call(fetchList, dataParam)
            } else {
                yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchOnlineTest() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let {
            ApplicationId,
            ApplicantID,
            tglTest,
            hasilTest,
            notesOnline,
            uploadFile,
            testTool,
            cutOffCode,
            cutOffName
        } = stateRecruitmentPhase.modalOnlineTest
        let formData = new FormData()

        let body = {
            ApplicationId: ApplicationId,
            ApplicantID: ApplicantID,
            OnlineTestDate: moment(tglTest, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            OnlineTestResult: hasilTest,
            OnlineTestNotes: notesOnline,
            testTool: testTool,
            cutOffCode: cutOffCode,
            cutOffName: cutOffName
        }

        formData.append('Model', JSON.stringify(body))
        if (uploadFile !== '') {
            formData.append('UploadFile', uploadFile)
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_ONLINE_TEST_POST, formData, {
            headers: HeaderMultipartFile()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_OL_TEST_PAHSE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchMasterData() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let bodyMaster = {
            MasterData: [
                {
                    ObjectName: 'Degree'
                },
                {
                    ObjectName: 'InstituteUniversity'
                },
                {
                    ObjectName: 'Major'
                },
                {
                    ObjectName: 'JobTitle'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, bodyMaster, {
            headers: Header()
        })

        if (resMasterData.Acknowledge === 1) {
            let dataMaster = {
                JobTitle: resMasterData.JobTitleList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Degree: resMasterData.DegreeList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Institute: resMasterData.InstituteList.map(x => ({
                    id: x.Id,
                    name: x.Name
                })),
                Major: resMasterData.MajorList.map(x => ({ id: x.Id, name: x.Name }))
            }
            yield put({
                type: types.RECRUITMENT_PR_MASTER_DATA_SUCCESS_PAHSE,
                data: dataMaster
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchFlkSubmit(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let dataFLK = stateRecruitmentPhase.FLK
        let tokenFLK = Cookie.getWithoutExpired('ahs_id')
        let ApplicantId = Cookie.getWithoutExpired('ApplicantId')
        let ExperienceCategory = Cookie.getWithoutExpired('ExperienceCategory')
        let body = {
            personalData: {
                applicantID: ApplicantId,
                fullName: dataFLK.namaLengkap,
                birthPlaceId: dataFLK.tempatLahir,
                birthDate:
                    dataFLK.tanggalLahir !== '' ? moment(dataFLK.tanggalLahir, 'MM/DD/YYYY').format('DD/MM/YYYY') : '',
                nationalityName: dataFLK.kewarganegaraan,
                nationalityOther: dataFLK.kewarganegaraanOthers,
                domicileAddress: dataFLK.alamatLengkap,
                phone1: dataFLK.noHP1,
                phone2: dataFLK.noHP2,
                addressPhone: dataFLK.telpRumah,
                email: dataFLK.email,
                profilePicUrl: dataFLK.Photo ? '' : dataFLK.photoUrl,
                gender: dataFLK.gender,
                workExperienceCategory: ExperienceCategory,
                photo: dataFLK.Photo,
                salaryId: dataFLK.salary
            },
            Pendidikan: {
                EducationList: dataFLK.tablePendidikan.map(x => ({
                    DegreeId: x.TingkatId,
                    Degree: x.Tingkat,
                    InstituteUniversityId: x.NamaInstitutionId,
                    InstituteUniversity: x.NamaInstitution,
                    InstituteUniversityOther: x.NamaInstitusiOthers,
                    CityId: x.KotaID,
                    CityOther: x.KotaOthers,
                    MajorId: x.JurusanID,
                    Major: x.Jurusan,
                    MajorOther: x.JurusanOthers,
                    StartYear: x.TahunMasuk,
                    GraduatedYear: x.TahunLulus,
                    GPA: x.GpaNem, //float
                    StudyProgram: x.ProgramStudi,
                    EducationDetailsId: x.EducationDetailsId //int
                })),
                PublikasiType: dataFLK.publikasi,
                PublikasiTitle: dataFLK.judulPublikasi,
                PublikasiLink: dataFLK.tautanPublikasi,
                StudyProgramList: dataFLK.tablePelatihan.map(x => ({
                    FLKNonFormalEducationId: x.FLKNonFormalEducationId,
                    TrainingName: x.NamaProgram,
                    TrainingOrganizer: x.Penyelenggara,
                    TrainingDate: x.Tahun,
                    TrainDesc: x.Keterangan
                }))
            },
            family: {
                MartialStatus: dataFLK.statusPernikahan,
                MartialDate:
                    dataFLK.statusPernikahan === 'lajang'
                        ? ''
                        : moment(dataFLK.sejakTahun, 'DD/MM/YYYY').format('DD/MM/YYYY'),
                FamilyStatusList: dataFLK.tableFamily.map(x => ({
                    FLKFamilyStatusId: x.FLKFamilyStatusId,
                    FamilyStatusId: x.keluargaId,
                    FamilyStatusAge: parseInt(x.usia),
                    FamilyOccupation: x.pekerjaan,
                    FamilyStatusLastEducation: x.pendidikanTerakhir,
                    FamilyOccupationId: x.pekerjaanId,
                    isAlmh: x.status,
                    FamilyTitleId: '',
                    FamilyTitle: ''
                }))
            },
            pengalaman: {
                experienceList: dataFLK.tableJobExperience.map(x => ({
                    TitleId: x.jabatanId,
                    CompanyName: x.namaInstitusi,
                    Position: x.posisi,
                    PositionTypeId: x.tipePosisiId,
                    FunctionId1: x.bidangKerja1Id,
                    FunctionId2: x.bidangKerja2Id,
                    FunctionId3: x.bidangKerja3Id,
                    IndustryId: x.industriId,
                    IndustryOther: x.industriDesc,
                    MonthlySalary: x.gajiTerakhir, //float
                    MainJob1: x.descPekerjaan1,
                    MainJob2: x.descPekerjaan2,
                    MainJob3: x.descPekerjaan3,
                    Function: x.bidangKerja1,
                    StartDate: x.tahunMulai,
                    EndDate: x.tahunSelesai,
                    Improvement: x.improvement,
                    WorkExperienceId: x.WorkExperienceId,

                    TitleName: x.jabatan,
                    PositionTypeName: x.tipePosisi,
                    Function2Name: x.bidangKerja2,
                    Function3Name: x.bidangKerja3,
                    IndustryName: x.indutri,
                    JumlahBawahan: parseInt(x.jumlahBawahan)
                })),
                FLKApplicantProblemId: '', //Ga ada di UI
                ProblemSituasi: dataFLK.problemSituasi,
                ProblemTindakan: dataFLK.problemTindakan,
                ProblemHasil: dataFLK.problemHasil,
                ProblemTugas: dataFLK.problemTugas,
                FLKApplicantObstacleId: '', //Ga ada di UI
                ObstacleSituasi: dataFLK.obstacleSituasi,
                ObstacleTugas: dataFLK.obstacleTugas,
                ObstacleTindakan: dataFLK.obstacleTindakan,
                ObstacleHasil: dataFLK.obstacleHasil
            },
            socialActivityList: ReqSosialActivity(dataFLK),
            WorkInterest: {
                DateAvailable:
                    dataFLK.dateAvailable !== ''
                        ? moment(dataFLK.dateAvailable, 'DD/MM/YYYY').format('DD/MM/YYYY')
                        : '',
                PlacementAvailability: dataFLK.placementAvailibility === 'Bersedia' ? true : false,
                CityList: dataFLK.placementAvailibility === 'Bersedia' ? ReqCity(dataFLK) : []
            },
            facilityList: ReqFacility(dataFLK),
            referenceList: dataFLK.tableReference.map(x => ({
                FLKReferenceId: x.FLKReferenceId,
                ReferenceName: x.referenceName,
                ReferenceCompanyId: x.referenceCompanyId,
                ReferencePositionTitleId: x.referenceTitleId,
                ReferencePhone: x.referencePhone,
                ReferenceEmail: x.referenceEmail,
                ReferenceRelation: x.referenceRelation
            }))
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.FLK_PROFESSIONAL_SUBMIT_POST, body, {
            headers: HeaderToken()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', true)
            localStorage.removeItem('ahs_id')
            localStorage.removeItem('ExperienceCategory')
            localStorage.removeItem('ApplicantId')
            document.cookie = 'ahs_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie = 'ExperienceCategory=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie = 'ApplicantId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        } else {
            if (response.Message === 'Invalid Token' || response.Message === 'Token Expired') {
                messageTokenExpired()
            } else {
                messages('Error', response.Message, 'error', false)
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitEmailFlk() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmailDate

        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'flk',
            ScheduleDate: moment(stateRecruitmentPhase.formList.date, 'MM/DD/YYYY').format('DD/MM/YYYY'),
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    ApplicantId: x.ApplicantId,
                    ApplicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FLK_SEND_EMAIL_POST, bodyReq, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
                property: 'visible',
                value: false
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchSubmitEmailOffering() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmailDate

        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'offering',
            ScheduleDate: moment(stateRecruitmentPhase.formList.date, 'MM/DD/YYYY').format('DD/MM/YYYY'),
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    ApplicantId: x.ApplicantId,
                    ApplicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_OFFERING_SEND_EMAIL_POST,
            bodyReq,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
                property: 'visible',
                value: false
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsyholog() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let {
            ApplicationId,
            tglTest,
            hasilTest,
            notesOnline,
            uploadFile,
            cutOffCode,
            cutOffName,
            testTool
        } = stateRecruitmentPhase.modalPsychological
        let formData = new FormData()
        let body = {
            ApplicationId: ApplicationId,
            PsychologicalTestDate: moment(tglTest, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            PsychologicalTestResult: hasilTest,
            PsychologicalTestNotes: notesOnline,
            PsychologicalTestUploaded: '',
            testTool: testTool,
            cutOffCode: cutOffCode,
            cutOffName: cutOffName
        }

        formData.append('Model', JSON.stringify(body))
        if (uploadFile !== '') {
            formData.append('UploadFile', uploadFile)
        }

        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PSYCHOLOGICAL_SUBMIT_POST,
            formData,
            { headers: HeaderMultipartFile() }
        )

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)

            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_PSYCHOLOGICAL_PAHSE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitEmailPsycolog() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmailDate

        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'Psycological Test',
            ScheduleDate: moment(stateRecruitmentPhase.formList.date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    ApplicantId: x.ApplicantId,
                    ApplicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }

        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_PSYCHOLOGICAL_SUBMIT_POST,
            bodyReq,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchFGDResult() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { ApplicationId, tglTest, hasilTest, notesOnline, uploadFile } = stateRecruitmentPhase.modalFGD

        let formData = new FormData()
        let body = {
            ApplicationId: ApplicationId,
            FGDTestDate: moment(tglTest, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            FGDTestResult: hasilTest,
            FGDTestNotes: notesOnline,
            FGDTestUploaded: ''
        }

        formData.append('Model', JSON.stringify(body))
        if (uploadFile !== '') {
            formData.append('UploadFile', uploadFile)
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FGD_RESULT_POST, formData, {
            headers: HeaderMultipartFile()
        })

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_FGD_PHASE,
                property: 'visible',
                value: false
            })
            yield put({ type: types.RESET_MODAL_FGD, property: 'modalFGD' })

            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchHireCandidate(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { date } = stateRecruitmentPhase.modalCancelCandidate
        let body = {
            hireDate: moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            applicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({ applicantId: x.ApplicantId })),
            atsPhaseId: param.atsPhaseId === undefined ? param.param.atsPhaseId : param.atsPhaseId,
            vacacnyId: param.vacancyId === undefined ? param.param.vacancyId : param.vacancyId
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_HIRE_CANDIDATE_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_CANCEL_PAHSE,
                property: 'isHire',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
                property: 'checked',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_CANCEL_PAHSE,
                property: 'isHire',
                value: false
            })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDownFlk(param) {
    yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
    let name = ''
    let email = ''
    try {
        let body = {
            applicantId: param.ApplicantId
        }
        const responseDetail = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_DETAIL_POST, body, {
            headers: Header()
        })

        if (responseDetail.Acknowledge === 1) {
            email = responseDetail.PersonalData.Email
            name = responseDetail.PersonalData.ApplicantName
            const response = yield call(
                GETBLOB,
                Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FLK_DOWNLOAD_POST + `?applicantId=${param.ApplicantId}`,
                { headers: Header() }
            )
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            var blob = new Blob([response], { type: 'application/pdf;charset=utf-8' })

            saveAs(blob, createFLKFormFileName(name, email))
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDeleteTableInterview(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        const response = yield call(
            DELETE,
            Config.BASE_URL + Endpoint.RECRUITMENT_DELETE_DATA_INTERVIEW + param.applicantId,
            {},
            { headers: Header() }
        )
        if (response.Acknowledge === 1) {
            messages('Info', response.Message, 'info', false)
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalCustomAction',
                subProperty: 'visible',
                value: false
            })
            let senData = {
                applicantId: stateRecruitmentPhase.modal.PersonalData.ApplicantId,
                applicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId
            }
            // yield call(fetchDetail, senData)
            yield call(fetchGetDataCompanyList)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchAddTableInterview(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            InterviewType: stateRecruitmentPhase.interviewType.interviewType === 'INTERVIEW MT' ? 1 : 2,
            ApplicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId,
            BranchId: param.status ? undefined : stateRecruitmentPhase.modal.Interview.interviewCompanyId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_ADD_DATA_INTERVIEW, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            if (stateRecruitmentPhase.interviewType.interviewType === 'INTERVIEW MT') {
                messages('Info', response.Message, 'info', false)
            }
            let senData = {
                applicantId: stateRecruitmentPhase.modal.PersonalData.ApplicantId,
                applicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId
            }
            yield call(fetchGetDataCompanyList)
            // yield call(fetchDetail, senData)
        } else {
            if (stateRecruitmentPhase.interviewType.interviewType === 'INTERVIEW MT') {
                messages('Error', response.Message, 'error', false)
            }
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDataTableInterviewSchedule(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            ApplicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId, //23321,
            companyId: stateRecruitmentPhase.modal.Interview.interviewCompanyId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_DATA_INTERVIEW_SCHEDULE, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                dataInterviewScheduleList: response.InterviewerList,
                isResultSubmitted: response.IsResultSubmitted
            }
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                property: 'dataInterviewSchedule',
                value: data
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchAddScheduleInterviewer(param) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            atsPhaseId: param.phase,
            applicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId,
            interviewCompanyId: param.companyId,
            interviewer: param.interviewer,
            interviewerJobPosition: param.jobPosition,
            interviewDate: moment(param.date, 'DD/MM/YYYY').format('DD/MM/YYYY')
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_ADD_SCHEDULE_INTERVIEWER, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            messages('Info', response.Message, 'info', false)
            yield call(fetchDataTableInterviewSchedule)

            // yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL, property: 'dataScheduleIntervi', value: InterviewerList })
            // InterviewerList
            yield
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitEmailFGD() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmailDate

        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: 'FGD',
            ScheduleDate: moment(stateRecruitmentPhase.formList.date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    ApplicantId: x.ApplicantId,
                    ApplicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FGD_SEND_EMAIL_POST, bodyReq, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitEmailInterviewHr() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmail
        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: stateRecruitmentPhase.isUser ? 'InterviewUser' : 'InterviewHR',
            // ScheduleDate: moment(stateRecruitmentPhase.formList.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
            ApplicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    ApplicantId: x.ApplicantId,
                    ApplicationId: x.ApplicationId
                })),
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_INTERVIEW_HR_SEND_EMAIL_POST,
            bodyReq,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
                property: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchUploadResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let {
            uploadFile,
            kompetensiTeknikalInter,
            kompetensiNonTeknikalInter,
            kompetensiTeknikalArea,
            kompetensiNonTeknikalArea,
            kesimpulan,
            golonganApl,
            golonganNum,
            notes,
            interviewDate,
            interviewCompanyId
        } = stateRecruitmentPhase.modal.Interview
        let formData = new FormData()

        let body = {
            applicationInterviewId: stateRecruitmentPhase.modalEditInterview.id,
            interviewDate: moment(interviewDate).format('DD/MM/YYYY'),
            kompetensiTeknikal: kompetensiTeknikalInter,
            kompetensiNonTeknikal: kompetensiNonTeknikalInter,
            kompetensiTeknikalAP: kompetensiTeknikalArea,
            kompetensiNonTeknikalAP: kompetensiNonTeknikalArea,
            interviewResultNotes: notes,
            interviewResultKesimpulan: kesimpulan,
            interviewResultGolNumeric: golonganNum,
            interviewResultGolAlphabet: golonganApl
        }

        formData.append('Model', JSON.stringify(body))
        if (uploadFile !== undefined) {
            formData.append('UploadFile', uploadFile)
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_UPLOAD_RESULT, formData, {
            headers: HeaderMultipartFile()
        })

        if (response.Acknowledge === 1) {
            // yield put({ type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE, property: 'visible', value: false })
            const changeStep = {
                step: 3,
                interviewType: stateRecruitmentPhase.interviewType.interviewType,
                company: interviewCompanyId
            }
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                property: 'interviewType',
                value: changeStep
            })
            messages('Info', response.Message, 'info', false)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDelInterviewer(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        const response = yield call(
            DELETE,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_DELETE_INTERVIEWER + param.id,
            {},
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalCustomAction',
                subProperty: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
            yield call(fetchDataTableInterviewSchedule, param.applicantId)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchResendEmailInterviewHr(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalInvitationInterview
        let bodyReq = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            PhaseName: stateRecruitmentPhase.isUser ? 'InterviewUser' : 'InterviewHR',
            ScheduleDate: moment(stateRecruitmentPhase.dataInterviewer.ScheduleDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            ApplicationInterviewId: stateRecruitmentPhase.dataInterviewer.ApplicationInterviewId,
            ApplicantList: [
                {
                    ApplicantId: stateRecruitmentPhase.modal.PersonalData.ApplicantId,
                    ApplicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId
                }
            ],
            EmailTemplate: {
                EmailDetailsId: EmailConfigId,
                Subject: subject,
                Body: body,
                Signature: signature
            }
        }
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_INTERVIEW_HR_SEND_EMAIL_POST,
            bodyReq,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalInvitationInterview',
                subProperty: 'visible',
                value: false
            })
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        console.log(err)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchEditInterviewHr(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { interviewerJobPosition, interviewer, id } = stateRecruitmentPhase.modalEditInterview
        let bodyReq = {
            interviewerJobPosition: interviewerJobPosition,
            interviewer: interviewer
        }
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_UPDATE_INTERVIEWER + id,
            bodyReq,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalEditInterview',
                subProperty: 'visible',
                value: false
            })
            yield call(fetchDataTableInterviewSchedule)
            messages('Info', response.Message, 'info', false)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchGetDataCompanyList(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let bodyReq = {
            InterviewType: stateRecruitmentPhase.interviewType.interviewType === 'INTERVIEW MT' ? 1 : 2,
            ApplicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_GET_COMPANY_LIST, bodyReq, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                property: 'dataCompanyList',
                value: response.CompanyList
            })
            if (stateRecruitmentPhase.interviewType.interviewType !== 'INTERVIEW MT') {
                let paramAddCompany = {
                    status: 'nonmt'
                }
                yield call(fetchAddTableInterview, paramAddCompany)
            }
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchSubmitResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        if (stateRecruitmentPhase.dataInterviewSchedule.length === 0) {
            messages('Error', 'Data schedule interview tidak ada', 'error', false)
        } else if (
            stateRecruitmentPhase.modal.Interview.result === '' ||
            stateRecruitmentPhase.modal.Interview.result === undefined
        ) {
            messages('Info', 'Mohon mengisi result', 'info', false)
        } else {
            let bodyReq = {
                interviewCompanyId: stateRecruitmentPhase.interviewType.company, //stateRecruitmentPhase.dataInterviewSchedule.length > 0 ? stateRecruitmentPhase.dataInterviewSchedule[0].ApplicationInterviewId : 0,
                applicationId: stateRecruitmentPhase.modal.PersonalData.ApplicationId,
                result: stateRecruitmentPhase.modal.Interview.result
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_SUBMIT_RESULT, bodyReq, {
                headers: Header()
            })
            if (response.Acknowledge === 1) {
                messages('Info', response.Message, 'info', false)
                const changeStep = {
                    step: 2,
                    interviewType: stateRecruitmentPhase.interviewType.interviewType
                }
                yield put({
                    type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                    property: 'modalCustomAction',
                    subProperty: 'visibleSubmit',
                    value: false
                })
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                    property: 'interviewType',
                    value: changeStep
                })
            } else {
                messages('Error', response.Message, 'error', false)
            }
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchViewResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { ApplicantId, ApplicationId } = stateRecruitmentPhase.modal.PersonalData
        let { interviewCompanyId } = stateRecruitmentPhase.modal.Interview
        let bodyReq = {
            ApplicationId: ApplicationId,
            ApplicantId: ApplicantId,
            CompanyId: interviewCompanyId,
            InterviewDate: moment(stateRecruitmentPhase.tanggalSearch).format('DD/MM/YYYY')
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_VIEW_RESULT, bodyReq, {
            headers: Header()
        })
        // if (response.Acknowledge === 1) {
        // messages("Info", response.Message, "info", false);
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
            property: 'dataViewResult',
            value: response.InterviewResult
        })
        // } else {
        //   messages("Error", response.Message, "error", false);
        // }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* sendFailedCandidate(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
            property: 'isFailedCandidate',
            value: false
        })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { EmailConfigId, subject, body, signature } = stateRecruitmentPhase.modalEmail
        let bodyReq
        if (!stateRecruitmentPhase.modalEmail.visible) {
            bodyReq = {
                ApplicantId: stateRecruitmentPhase.modalFailed1.ApplicantId,
                ApplicationId: stateRecruitmentPhase.modalFailed1.ApplicationId,
                ATSPhaseId: parseInt(stateRecruitmentPhase.phaseId),
                FailedCausesId: stateRecruitmentPhase.modalFailed1.feedbackId,
                FailedCausesDetailId: stateRecruitmentPhase.modalFailed1.feedbackId1,
                PersonalReasonDetail: stateRecruitmentPhase.modalFailed1.personalReason,
                sendEmail: false
            }
        } else {
            bodyReq = {
                ApplicantId: stateRecruitmentPhase.modalFailed1.ApplicantId,
                ApplicationId: stateRecruitmentPhase.modalFailed1.ApplicationId,
                ATSPhaseId: parseInt(stateRecruitmentPhase.phaseId),
                FailedCausesId: stateRecruitmentPhase.modalFailed1.feedbackId,
                FailedCausesDetailId: stateRecruitmentPhase.modalFailed1.feedbackId1,
                PersonalReasonDetail: stateRecruitmentPhase.modalFailed1.personalReason,
                sendEmail: true,
                EmailTemplate: {
                    EmailDetailsId: EmailConfigId,
                    Subject: subject,
                    Body: body,
                    Signature: signature
                }
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FAILED_INTERVIEW, bodyReq, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId,
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId
                }
            }
            yield call(fetchList, dataParam)
            messages('Info', response.Message, 'info', false)
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalFailed1',
                subProperty: 'visible',
                value: false
            })
            yield put({ type: types.RESET_MODAL_FAILED1 })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        yield put({
            type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
            property: 'clearFlagModalFailedInterview',
            value: true
        })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchEmailRedactionalInterview(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        const body = {
            Activity:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.activity
                    : '',
            Action:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.action
                    : '',
            EmailDetailsId: stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({
                type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE_INTERVIEW_SUCCESS,
                data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchEmailRedactionalHiringManager(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        const body = {
            Activity:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.activity
                    : '',
            Action:
                stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId !== null
                    ? stateRecruitmentPhase.modalSelectEmailTemplate.action
                    : '',
            EmailDetailsId: stateRecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({ type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV_SUCCESS, data })
            yield call(hitTriggerMasterData)
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchFGDTestResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let id = param.id
        const response = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FGD_TEST_RESULT_GET + id, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                ApplicationId: response.ApplicationID,
                tglTest: moment(response.FGDTestDate, 'DD/MM/YYYY'),
                hasilTest: response.FGDTestResult ? 1 : 0,
                notesOnline: response.FGDTestNotes === undefined ? '' : response.FGDTestNotes,
                file: response.FGDTestUploaded === undefined ? '' : response.FGDTestUploaded
            }
            yield put({
                type: types.RECRUITMENT_PR_GET_FGD_TEST_RESULT_SUCCESS,
                payload: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychoTestResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let id = param.id
        const response = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PSYCHO_TEST_RESULT_GET + id, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                ApplicationId: response.ApplicationID,
                tglTest: moment(response.PsychologicalTestDate, 'DD/MM/YYYY'),
                hasilTest: response.PsychologicalTestResult ? 1 : 0,
                notesOnline: response.PsychologicalTestNotes === undefined ? '' : response.PsychologicalTestNotes,
                file: response.PsychologicalTestUploaded === undefined ? '' : response.PsychologicalTestUploaded,
                cutOffCode: response.CutOffCode,
                cutOffName: response.CutOffName,
                testTool: response.TestTool
            }

            yield put({
                type: types.RECRUITMENT_PR_GET_PSYCHO_TEST_RESULT_SUCCESS,
                payload: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchOTTestResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let id = param.id
        const response = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_OT_TEST_RESULT_GET + id, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                ApplicationId: response.ApplicationID,
                tglTest: moment(response.OnlineTestDate, 'DD/MM/YYYY'),
                hasilTest: response.OnlineTestResult ? 1 : 0,
                testTool: response.TestTool,
                cutOffCode: response.CutOffCode,
                cutOffName: response.CutOffName,
                notesOnline: response.OnlineTestNotes === undefined ? '' : response.OnlineTestNotes,
                file: response.OnlineTestUploaded === undefined ? '' : response.OnlineTestUploaded
            }
            yield put({
                type: types.RECRUITMENT_PR_GET_OT_TEST_RESULT_SUCCESS,
                payload: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchInterviewViewResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            appInterviewId: param.interviewId
        }
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_INTERVIEW_VIEW_RESULT_GET + param.interviewId,
            body,
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            if (response.InterviewResult.length != 0) {
                let idx = response.InterviewResult.length - 1 //Untuk dapet last data
                let data = {
                    ApplicationId: response.InterviewResult[idx].ApplicationId,
                    uploadFile: response.InterviewResult[idx].UploadedInterviewForm,
                    uploadFileName: response.InterviewResult[idx].UploadFileName,
                    kompetensiTeknikalInter: response.InterviewResult[idx].KompetensiTeknikal,
                    kompetensiNonTeknikalInter: response.InterviewResult[idx].KompetensiNonTeknikal,
                    kompetensiTeknikalArea: response.InterviewResult[idx].KompetensiTeknikalAP,
                    kompetensiNonTeknikalArea: response.InterviewResult[idx].KompetensiNonTeknikalAP,
                    notes: response.InterviewResult[idx].InterviewResultNotes,
                    kesimpulan: response.InterviewResult[idx].InterviewResultKesimpulan,
                    golonganApl: response.InterviewResult[idx].InterviewResultGolAlphabet
                    // golonganNum: '', //Belum di kasih return nya
                }
                yield put({
                    type: types.RECRUITMENT_PR_GET_INTERVIEW_VIEW_RESULT_SUCCESS,
                    payload: data
                })
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDownloadTemplate() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        let body = {
            VacancyId: stateRecruitmentPhase.formList.vacancyId
        }
        const response = yield call(
            POSTBLOB_HEADER,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_DOWN_TEMPLATE_POST,
            body,
            { headers: Header() }
        )
        var dataFile = response.data
        let fileName
        const disposition = response.headers['content-disposition']
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        var matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '')
        }

        var blob = new Blob([dataFile], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, fileName)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychologicalCBT(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        // let id = param.id
        // const response = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_OT_TEST_RESULT_GET + id, { headers: Header() });

        // if (response.Acknowledge === 1) {
        //   let data = {
        //     ApplicationId: response.ApplicationID,
        //     tglTest: moment(response.OnlineTestDate, 'DD/MM/YYYY'),
        //     hasilTest: response.OnlineTestResult ? 1 : 0,
        //     notesOnline: response.OnlineTestNotes === undefined ? '' : response.OnlineTestNotes,
        //     uploadFile: response.OnlineTestUploaded === undefined ? '' : response.OnlineTestUploaded,
        //   }
        //   yield put({ type: types.RECRUITMENT_PR_GET_OT_TEST_RESULT_SUCCESS, payload: data })
        //   yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        // } else {
        //   yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        //   messages("Error", response.Message, "error", false);
        // }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchUploadOffering({ vacancyId, PhaseId }) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let formData = new FormData()
        const request = {
            applicantId: stateRecruitmentPhase.modalOfferingResult.ApplicantId,
            applicationId: stateRecruitmentPhase.modalOfferingResult.ApplicationId
        }
        formData.append('Model', JSON.stringify(request))
        formData.append('offeringurl', stateRecruitmentPhase.modalOfferingResult.uploadFile)
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUTIMENT_OFFERING_ADDEDIT_UPLOAD_FILE,
            formData,
            { headers: Header() }
        )
        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            yield call(fetchMount, { vacancyId, PhaseId })
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchUploadTest() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let formData = new FormData()

        formData.append('Request', stateRecruitmentPhase.modalUploadTestResult.file)
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_UPLOAD_TEST_POST, formData, {
            headers: HeaderMultipartFile()
        })

        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'sourceTable',
                value: []
            })
            messages('Info', response.Message, 'info', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            let data = response.ErrorResults.map((x, i) => ({
                no: i + 1,
                CandidateEmail: x.CandidateEmail,
                Column: x.Column,
                Row: x.Row,
                Error: x.Error
            }))
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'sourceTable',
                value: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychoCBTDownloadTemplate() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let checkCbt = window.location.pathname.includes('psychologicalTestCBT')
        let body = {
            vacancyId: stateRecruitmentPhase.formList.vacancyId,
            CBTType: checkCbt ? 'CBT' : 'Non-CBT'
        }

        const response = yield call(
            POSTBLOB_HEADER,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PT_CBT_DOWNLOAD_TEMPLATE_POST,
            body,
            { headers: Header() }
        )
        var dataFile = response.data
        let fileName
        const disposition = response.headers['content-disposition']
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        var matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '')
        }

        var _blob = new Blob([dataFile], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        var anchor = document.createElement('a')
        anchor.href = window.URL.createObjectURL(_blob)
        anchor.download = fileName
        anchor.click()
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychoCBTDownloadApplication() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            VacancyId: stateRecruitmentPhase.formList.vacancyId,
            PhaseId: parseInt(stateRecruitmentPhase.phaseId)
        }
        const response = yield call(
            POSTBLOB,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PT_CBT_DOWNLOAD_APPLICANT_POST,
            body,
            { headers: Header() }
        )
        var data = response
        var _blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        var anchor = document.createElement('a')
        anchor.href = window.URL.createObjectURL(_blob)
        anchor.download = 'CandidateList.xlsx'
        anchor.click()
        let dataParam = {
            data: {
                pageNo: stateRecruitmentPhase.pageNo,
                pageSize: stateRecruitmentPhase.pageSize,
                totalRows: stateRecruitmentPhase.totalRows,
                SearchCriteria: '',
                VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
            }
        }
        yield call(fetchList, dataParam)
        // yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychoCBTUploadTestResult() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let { uploadFile } = stateRecruitmentPhase.modalPsychologicalCBT
        var formData = new FormData()
        if (uploadFile !== '') {
            formData.append('UploadFile', uploadFile)
        }

        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PT_CBT_UPLOAD_TEMPLATE_POST,
            formData,
            { headers: Header() }
        )
        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
            messages('Success', response.Message, 'success', false)
        } else {
            let data = response.ErrorResults.map((x, i) => ({
                No: i + 1,
                Column: x.Column,
                Row: x.Row,
                Error: x.Error,
                CandidateEmail: x.CandidateEmail
            }))
            yield put({
                type: types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_UPLOAD_TEST_RESULT_SUCCESS,
                payload: data
            })
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchPsychoCBTSwitch() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let isCBT = location.pathname.includes('psychologicalTestCBT')
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            applicantList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked === true)
                .map(x => ({
                    applicantId: x.ApplicantId,
                    applicationId: x.ApplicationId
                })),
            psychologicalTestType: isCBT ? 'Non-CBT' : 'CBT'
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_PT_CBT_SWITCH_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId,
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId
                }
            }
            yield call(fetchList, dataParam)
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalSwitch',
                subProperty: 'visible',
                value: false
            })
            messages('Success', response.Message, 'success', false)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDownloadTemplateFGD() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            VacancyId: stateRecruitmentPhase.formList.vacancyId
        }
        const response = yield call(
            POSTBLOB_HEADER,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FGD_DOWN_TEMPLATE_POST,
            body,
            { headers: Header() }
        )
        var dataFile = response.data
        let fileName
        const disposition = response.headers['content-disposition']
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        var matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '')
        }
        var blob = new Blob([dataFile], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, fileName)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchFLKAuth(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            username: param.data.username,
            password: param.data.password
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.FLK_LOGIN_POST, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            localStorage.setItem('ahs_id', response.Token)
            localStorage.setItem('ApplicantId', response.ApplicantId)
            localStorage.setItem('ExperienceCategory', response.ExperienceCategory)
            document.cookie = `ahs_id=${response.Token};expires=${response.Expire_in}; path=/;`
            document.cookie = `ApplicantId=${response.ApplicantId};expires=${response.Expire_in}; path=/;`
            document.cookie = `ExperienceCategory=${response.ExperienceCategory};expires=${response.Expire_in}; path=/;`
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'FLK',
                subProperty: 'visible',
                value: false
            })
            messages('Success', response.Message, 'success', false)
            yield call(fetchViewFormFLK, { ApplicantId: response.ApplicantId })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchUploadTestFGD() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let formData = new FormData()

        formData.append('Request', stateRecruitmentPhase.modalUploadTestResult.file)
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FGD_UPLOAD_TEST_POST, formData, {
            headers: HeaderMultipartFile()
        })

        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'visible',
                value: false
            })
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'sourceTable',
                value: []
            })
            messages('Info', response.Message, 'info', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            let data = response.ErrorResults.map((x, i) => ({
                no: i + 1,
                CandidateEmail: x.CandidateEmail,
                Column: x.Column,
                Row: x.Row,
                Error: x.Error
            }))
            yield put({
                type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
                property: 'sourceTable',
                value: data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* sendExtend(getData) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            applicantList: [
                {
                    applicantId: stateRecruitmentPhase.modalExtend.ApplicantId,
                    vacancyCode: stateRecruitmentPhase.modalExtend.VacancyId
                }
            ]
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_EXTEND, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
                property: 'modalExtend',
                subProperty: 'visible',
                value: false
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchViewFormFLK(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        const resMasterData = yield call(GET, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_MASTER_DATA_FLK, {
            headers: HeaderNonToken()
        })
        if (resMasterData.Acknowledge == 1) {
            let data
            data = {
                Branch: resMasterData.BranchList.map(x => ({
                    ...x,
                    id: x.BranchId,
                    name: x.BranchName
                })),
                Domicile: resMasterData.DomicileList.map(x => ({
                    ...x,
                    id: x.DistrictId,
                    name: x.DistrictName
                })), //done
                PlaceOfBirth: resMasterData.PlaceOfBirthList.map(x => ({
                    ...x,
                    id: x.DistrictId,
                    name: x.DistrictName
                })),
                City: resMasterData.CityList.map(x => ({
                    ...x,
                    id: x.CityId,
                    name: x.CityName
                })),
                Degree: resMasterData.DegreeList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })), //done
                Major: resMasterData.MajorList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                Institute: resMasterData.InstituteList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                Function: resMasterData.FunctionsList.map(x => ({
                    ...x,
                    id: x.FunctionId,
                    name: x.FunctionName
                })),
                OrganizationScope: resMasterData.OrganizationScopeList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                OrganizationTitle: resMasterData.OrganizationTitleList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                PositionTitle: resMasterData.PositionTitleList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                PositionType: resMasterData.PositionTypeList.map(x => ({
                    ...x,
                    id: x.PositionTypeId,
                    name: x.PositionTypeName
                })),
                Industry: resMasterData.IndustryList.map(x => ({
                    ...x,
                    id: x.IndustryId,
                    name: x.IndustryName
                })),
                Salary: resMasterData.SalaryList.map(x => ({
                    ...x,
                    id: x.SalaryId,
                    name: x.SalaryRange
                })),
                JobFunction: resMasterData.JobFunctionList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                FamilyStructure: resMasterData.FamilyStructureList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                FamilyStatus: resMasterData.FamilyStatusList.map(x => ({
                    ...x,
                    id: x.Id,
                    name: x.Name
                })),
                FamilyTitle: resMasterData.FamilyTitleList.map(x => ({
                    ...x,
                    id: x.FamilyTitleId,
                    name: x.FamilyTitle
                })),
                Occupation: resMasterData.OccupationList.map(x => ({
                    ...x,
                    id: x.OccupationId,
                    name: x.OccupationName
                }))
            }
            yield put({
                type: types.RECRUITMENT_PR_MASTER_DATA_SUCCESS_PAHSE,
                data: data
            })

            let ApplicantId = param.ApplicantId ? param.ApplicantId : Cookie.getWithoutExpired('ApplicantId')
            let body = {
                applicantId: parseInt(ApplicantId)
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.FLK_VIEW_POST, body, {
                headers: HeaderToken()
            })
            if (response.Acknowledge === 1) {
                let dataParam = MappingViewFLK(response)
                yield put({ type: types.FLK_POST_VIEW_SUCCESS, payload: dataParam })
            } else {
                if (response.Message === 'Invalid Token' || response.Message === 'Token Expired') {
                    messageTokenExpired()
                } else {
                    messageInternalErrorFLK('Error', response.Message, 'error', false)
                }
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        } else {
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchFlkFreshGradSubmit(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let dataFLK = stateRecruitmentPhase.FLK
        let source = stateRecruitmentPhase.source
        let tokenFLK = Cookie.getWithoutExpired('ahs_id')
        let ApplicantId = Cookie.getWithoutExpired('ApplicantId')
        let ExperienceCategory = Cookie.getWithoutExpired('ExperienceCategory')
        let birthDateId = source.PlaceOfBirth.find(e => e.name === dataFLK.tempatLahir)
        let body = {
            personalData: {
                applicantID: ApplicantId,
                fullName: dataFLK.namaLengkap,
                birthPlaceId: birthDateId ? birthDateId.id : dataFLK.tempatLahir,
                birthDate:
                    dataFLK.tanggalLahir !== '' ? moment(dataFLK.tanggalLahir, 'MM/DD/YYYY').format('DD/MM/YYYY') : '',
                nationalityName: dataFLK.kewarganegaraan,
                NationalityOther: dataFLK.kewarganegaraanOthers,
                domicileAddress: dataFLK.alamatLengkap,
                phone1: dataFLK.noHP1,
                phone2: dataFLK.noHP2,
                addressPhone: dataFLK.telpRumah,
                email: dataFLK.email,
                profilePicUrl: '',
                gender: dataFLK.gender,
                workExperienceCategory: ExperienceCategory,
                photo: dataFLK.Photo,
                salaryId: dataFLK.salary
            },
            Pendidikan: {
                EducationList: dataFLK.tablePendidikan.map(x => ({
                    DegreeId: x.TingkatId,
                    Degree: x.Tingkat,
                    InstituteUniversityId: x.NamaInstitutionId,
                    InstituteUniversity: x.NamaInstitution,
                    InstituteUniversityOther: x.NamaInstitusiOthers,
                    CityId: x.KotaID,
                    CityOther: x.KotaOthers,
                    MajorId: x.JurusanID,
                    Major: x.Jurusan,
                    StartYear: x.TahunMasuk,
                    GraduatedYear: x.TahunLulus,
                    GPA: x.GpaNem, //float
                    StudyProgram: x.ProgramStudi,
                    EducationDetailsId: x.EducationDetailsId, //int
                    MajorOther: x.JurusanOthers
                })),
                SkripsiTitle: dataFLK.judulSkripsi,
                SkripsiLink: dataFLK.tautanSkripsi,
                PublikasiType: dataFLK.publikasi,
                PublikasiTitle: dataFLK.judulPublikasi,
                PublikasiLink: dataFLK.tautanPublikasi,
                StudyProgramList: dataFLK.tablePelatihan.map(x => ({
                    FLKNonFormalEducationId: x.FLKNonFormalEducationId, //int
                    TrainingName: x.NamaProgram,
                    TrainingOrganizer: x.Penyelenggara,
                    TrainingDate: x.Tahun,
                    TrainDesc: x.Keterangan
                })),
                OrganizationList: dataFLK.tableOrganisasi.map(x => ({
                    OrganizationalExperienceId: x.OrganizationalExperienceId,
                    OrganizationName: x.NamaOrganisasi,
                    OrganizationScopeId: x.LingkupId,
                    OrganizationTitleId: x.JabatanId
                }))
            },
            family: {
                MartialStatus: dataFLK.statusPernikahan,
                MartialDate:
                    dataFLK.statusPernikahan.toLowerCase() === 'lajang'
                        ? ''
                        : moment(dataFLK.sejakTahun, 'DD/MM/YYYY').format('DD/MM/YYYY'),
                FatherFamilyTitleId: dataFLK.titleAyah,
                FatherFamilyTitle:
                    source.FamilyTitle.find(x => x.id === dataFLK.titleAyah) !== undefined
                        ? source.FamilyTitle.find(x => x.id === dataFLK.titleAyah).name
                        : '',
                FatherOccuPationId: dataFLK.pekerjaanAyah,
                FatherName: dataFLK.namaAyah,
                FatherAge: dataFLK.usiaAyah,
                FatherOccupation:
                    source.Occupation.find(x => x.id === dataFLK.pekerjaanAyah) !== undefined
                        ? source.Occupation.find(x => x.id === dataFLK.pekerjaanAyah).name
                        : '',
                MotherFamilyTitleId: dataFLK.titleIbu,
                MotherFamilyTitle:
                    source.FamilyTitle.find(x => x.id === dataFLK.titleIbu) !== undefined
                        ? source.FamilyTitle.find(x => x.id === dataFLK.titleIbu).name
                        : '',
                MotherOccuPationId: dataFLK.pekerjaanIbu,
                MotherName: dataFLK.namaIbu,
                MotherAge: dataFLK.usiaIbu,
                MotherOccuPation:
                    source.Occupation.find(x => x.id === dataFLK.pekerjaanIbu) !== undefined
                        ? source.Occupation.find(x => x.id === dataFLK.pekerjaanIbu).Name
                        : '',
                FatherLastEducationId: dataFLK.pendidikanTerakhirAyah,
                MotherLastEducationId: dataFLK.pendidikanTerakhirIbu,
                FatherLasteducation:
                    source.Degree.find(x => x.Id === dataFLK.pendidikanTerakhirAyah) !== undefined
                        ? source.Degree.find(x => x.Id === dataFLK.pendidikanTerakhirAyah).Name
                        : '',
                MotherLastEdcation:
                    source.Degree.find(x => x.Id === dataFLK.pendidikanTerakhirIbu) !== undefined
                        ? source.Degree.find(x => x.Id === dataFLK.pendidikanTerakhirIbu).Name
                        : '',
                Anakke: dataFLK.anakKe,
                JumlahSaudara: dataFLK.jumlahSaudara
            },
            pengalaman: {
                internshipList: dataFLK.tableMagang.map(x => ({
                    FLKInternShiptId: x.FLKInternShiptId,
                    InternshipInstituteName: x.InternInstitutionName,
                    InternshipStartDate: x.InternStartDate,
                    InternshipEndDate: x.InternEndDate,
                    InternshipJobDesc: x.InternDesc,
                    InternshipVacancyDepartmentId: x.InternshipVacancyDepartmentId,
                    InternshipCompanyIndustryId: x.InternshipCompanyIndustryId,
                    InternshipVacancyDepartmentName: x.InternshipVacancyDepartmentName,
                    InternshipCompanyIndustryName: x.InternshipCompanyIndustryName,
                    InternshipCompanyIndustryNameOther: x.InternshipCompanyIndustryNameOther
                })),
                experienceList: dataFLK.tableJobExperience.map(x => ({
                    TitleId: x.jabatanId,
                    CompanyName: x.namaInstitusi,
                    Position: x.posisi,
                    PositionTypeId: x.tipePosisiId,
                    FunctionId1: x.bidangKerja1Id,
                    FunctionId2: x.bidangKerja2Id,
                    FunctionId3: x.bidangKerja3Id,
                    IndustryId: x.industriId,
                    IndustryOther: x.industriDesc,
                    MonthlySalary: x.gajiTerakhir, //float
                    MainJob1: x.descPekerjaan1,
                    MainJob2: x.descPekerjaan2,
                    MainJob3: x.descPekerjaan3,
                    Function: x.bidangKerja1,
                    StartDate: x.tahunMulai,
                    EndDate: x.tahunSelesai,
                    WorkExperienceId: x.WorkExperienceId,
                    Improvement: '', //Tidak di pakai
                    TitleName: x.jabatan,
                    PositionTypeName: x.tipePosisi,
                    Function2Name: x.bidangKerja2,
                    Function3Name: x.bidangKerja3,
                    IndustryName: x.indutri
                })),
                FLKApplicantProblemId: '', //Ga ada di UI
                ProblemSituasi: dataFLK.problemSituasi,
                ProblemTindakan: dataFLK.problemTindakan,
                ProblemHasil: dataFLK.problemHasil,
                ProblemTugas: dataFLK.problemTugas,
                FLKApplicantObstacleId: '', //Ga ada di UI
                ObstacleSituasi: dataFLK.obstacleSituasi,
                ObstacleTugas: dataFLK.obstacleTugas,
                ObstacleTindakan: dataFLK.obstacleTindakan,
                ObstacleHasil: dataFLK.obstacleHasil
            },
            hobbyList: ReqHobby(dataFLK),
            socialActivityList: ReqSosialActivity(dataFLK),
            WorkInterest: {
                DateAvailable:
                    dataFLK.dateAvailable !== ''
                        ? moment(dataFLK.dateAvailable, 'DD/MM/YYYY').format('DD/MM/YYYY')
                        : '',
                PlacementAvailability: dataFLK.placementAvailibility === 'Bersedia' ? true : false,
                CityList: dataFLK.placementAvailibility === 'Bersedia' ? ReqCity(dataFLK) : [],
                AcitivityPriorityList: dataFLK.tableActivityPriority,
                JobPriorityList: ReqJobPriority(dataFLK)
            },
            psychotestList: dataFLK.tablePsychotest.map(x => ({
                PsychotestExperienceId: x.PsychotestExperienceId,
                PsychoTestDate: x.psychotestDate,
                PsychoTestOrganizer: x.psychotestOrganizer,
                PsychoTestPurpose: x.psychotestPurpose
            }))
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.FLK_FRESH_GRADUATION_SUBMIT_POST, body, {
            headers: HeaderToken()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', true)
            localStorage.removeItem('ahs_id')
            localStorage.removeItem('ExperienceCategory')
            localStorage.removeItem('ApplicantId')
            document.cookie = 'ahs_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie = 'ExperienceCategory=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie = 'ApplicantId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        } else {
            if (response.Message === 'Invalid Token' || response.Message === 'Token Expired') {
                messageTokenExpired()
            } else {
                messageInternalErrorFLK('Error', response.Message, 'error', false)
            }
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchInterviewResultView(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        // let id = param.id;
        let applicantId = param.applicantId
        let applicationId = param.applicationId
        let body = {
            applicantId: applicantId,
            applicationId: applicationId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_INTERVIEW_RESULT_VIEW, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = response.ApplicantViewInterview.map(x => ({
                applicantId,
                applicationId,
                InterviewResultId: x.InterviewResultId,
                UrlDownloadFile: x.UrlDownloadFile,
                FileNameDownload: x.FileNameDownload,
                ApplicantName: x.Name,
                Position: x.PositionName,
                Department: x.CompanyName,
                Interviewer: x.Interviewer,
                InterviewResultKesimpulan: x.InterviewResultKesimpulan,
                InterviewResultGolNumeric: x.InterviewResultGolNumeric,
                InterviewResultGolAlphabet: x.InterviewResultGolAlphabet,
                InterviewDate: x.InterviewDate,
                kompetensiTeknikalInter: x.PenilaianPersonal.KompetensiTeknikal,
                kompetensiNonTeknikalInter: x.PenilaianPersonal.KompetensiNonTeknikal,
                kompetensiTeknikalArea: x.PenilaianPersonal.KompetensiTeknikalAP,
                kompetensiNonTeknikalArea: x.PenilaianPersonal.KompetensiNonTeknikalAP,
                notes: x.PenilaianPersonal.InterviewResultNotes,
                kesimpulan: x.InterviewResultKesimpulan,
                golonganApl: x.InterviewResultGolAlphabet
            }))
            yield put({
                type: types.INTERVIEW_RESULT_REVIEW_VIEW_SUCCESS,
                payload: data
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchListFailedby() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = ''
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_OFFERING_LIST_FAILEDBY, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            yield put({
                type: types.RECRUITMENT_PR_FETCH_LIST_FAILEDBY_SUCCESS,
                payload: response.FailedByList
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchListFeedbackOffering(action) {
    try {
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let body = {
            applicantId: stateRecruitmentPhase.modalFailed1.ApplicationId,
            applicationId: stateRecruitmentPhase.modalFailed1.ApplicantId,
            offeringFailedByID: action.offeringFailedByID
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_OFFERING_LIST_FEEDBACK, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            const FailedFeedbackList = response.FailedFeedbackList.map(item => {
                let container = {}
                container['value'] = item.OfferingFeedbackID
                container['label'] = item.OfferingFeedbackName
                container['disabled'] = false
                return container
            })

            yield put({
                type: types.RECRUITMENT_PR_FETCH_LIST_FEEDBACK_OFFERING_SUCCESS,
                payload: FailedFeedbackList
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* submitFeedbackOffering(data) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        let dt = data.reqBody == undefined ? stateRecruitmentPhase.modalFailedOffering.reqBody : data.reqBody
        dt['vacancyId'] = stateRecruitmentPhase.formList.vacancyId
        dt['atsPhaseId'] = stateRecruitmentPhase.formList.atsPhaseId
        dt['sendEmail'] = stateRecruitmentPhase.modalAction.checked
        dt['EmailTemplate'] = stateRecruitmentPhase.modalAction.checked
            ? {
                  EmailDetailsId: stateRecruitmentPhase.modalEmail.EmailConfigId,
                  Subject: stateRecruitmentPhase.modalEmail.subject,
                  Body: stateRecruitmentPhase.modalEmail.body,
                  Signature: stateRecruitmentPhase.modalEmail.signature
              }
            : ''
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_OFFERING_LIST_FEEDBACK_SUBMIT, dt, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'success', false)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}
export function* fetchInterviewResultDownload(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        // let id = param.id;
        let {
            modalUploadTestResult: { vacancyTitle }
        } = yield select(getStateRecruitmentPhase)
        let applicantId = param.applicantId
        let applicationId = param.applicationId
        let interviewResultId = param.InterviewResultId
        let ApplicantName = param.ApplicantName

        const response = yield call(
            GET,
            Config.BASE_URL +
                Endpoint.RECRUITMENT_PHASE_INTERVIEW_RESULT_DOWNLOAD_PDF +
                '?ApplicationId=' +
                applicationId +
                '&ApplicantId=' +
                applicantId +
                '&InterviewResultId=' +
                interviewResultId,
            { headers: Header(), responseType: 'blob' }
        )
        saveAs(response, `Interview_${vacancyTitle}_${ApplicantName}.pdf`)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDownloadFLKBetch() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            VacancyName: stateRecruitmentPhase.formList.vacancyName,
            CompanyName: stateRecruitmentPhase.formList.CompanyName,
            applicantIdList: stateRecruitmentPhase.formList.listData
                .filter(x => x.checked == true)
                .map(y => {
                    let container = {}
                    container['ApplicantId'] = y.ApplicantId
                    return container
                })
        }

        const response = yield call(
            POSTBLOB,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_INTERVIEW_RESULT_DOWNLOAD_FLKBATCH,
            body,
            { headers: HeaderFLKBatch() }
        )

        const blob = new Blob([response], { type: 'application/zip' })
        saveAs(
            blob,
            `FLK-${stateRecruitmentPhase.formList.vacancyName}-${stateRecruitmentPhase.formList.CompanyName}.zip`
        )
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchNotifHiring() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let reqBody = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            VacancyId: stateRecruitmentPhase.formList.vacancyId,
            DueDate:
                moment(stateRecruitmentPhase.modalEmailHiringManager.date, 'DD/MM/YYYY').format('MM/DD/YYYY') +
                ' 00:00:00',
            emailTemplate: {
                EmailDetailsId: stateRecruitmentPhase.modalEmailHiringManager.EmailConfigId,
                Signature: stateRecruitmentPhase.modalEmailHiringManager.signature,
                Subject: stateRecruitmentPhase.modalEmailHiringManager.subject,
                Body: stateRecruitmentPhase.modalEmailHiringManager.body
            }
        }

        const resHiringManager = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_CVREVIEW_POST,
            reqBody,
            { headers: Header() }
        )
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        if (resHiringManager.Acknowledge === 1) {
            messages('Info', resHiringManager.Message, 'info', false)
            yield put({ type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV_SUCCESS, data: { visible: false } })
        } else {
            messages('Error', resHiringManager.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchNotifHiringInterviewRiview() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let reqBody = {
            PhaseId: stateRecruitmentPhase.formList.atsPhaseId,
            VacancyId: stateRecruitmentPhase.formList.vacancyId,
            DueDate:
                moment(stateRecruitmentPhase.modalEmailHiringManager.date, 'DD/MM/YYYY').format('MM/DD/YYYY') +
                ' 00:00:00',
            emailTemplate: {
                EmailDetailsId: stateRecruitmentPhase.modalEmailHiringManager.EmailConfigId,
                Signature: stateRecruitmentPhase.modalEmailHiringManager.signature,
                Subject: stateRecruitmentPhase.modalEmailHiringManager.subject,
                Body: stateRecruitmentPhase.modalEmailHiringManager.body
            }
        }

        const resHiringManager = yield call(
            POST,
            Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_INT_REVIEW_POST,
            reqBody,
            { headers: Header() }
        )
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        if (resHiringManager.Acknowledge === 1) {
            messages('Info', resHiringManager.Message, 'info', false)
            yield put({ type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV_SUCCESS, data: { visible: false } })
        } else {
            messages('Error', resHiringManager.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* getListEmailTemplate() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        const body = {
            Activity: stateRecruitmentPhase.modalSelectEmailTemplate.activity,
            Action: stateRecruitmentPhase.modalSelectEmailTemplate.action,
            EmailDetailsId: 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_EMAIL_TEMPLATE, body, { headers: Header() })
        if (response.Acknowledge == 1) {
            if (response.EmailDetails.length > 0) {
                yield put({
                    type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
                    property: 'selectedEmailTemplateId',
                    value: response.EmailDetails[0].EmailDetailsId
                })
            }
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
                property: 'emailTemplateList',
                value: response.EmailDetails
            })
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
                property: 'emailTemplateTotalRows',
                value: response.EmailDetails.length
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* requestReonlineTest() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        let applicantList = stateRecruitmentPhase.formList.listData
            .filter(x => x.checked === true)
            .map(x => x.ApplicantId)
        let body = {
            applicantList: applicantList,
            vacancyId: stateRecruitmentPhase.formList.vacancyId
        }
        debugger
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_REQUEST_REONLINETEST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'success', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitTriggerMasterData() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)

        let body = {
            EmailActivityId: stateRecruitmentPhase.activityList.find(
                x => x.ActivityName === stateRecruitmentPhase.modalSelectEmailTemplate.activity
            ).EmailActivityId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({
                type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
                property: 'triggerList',
                value: response.Data.map(x => ({ id: x.EmailTriggerId, triggerName: x.Remarks, value: x.TriggerName }))
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* requestRecheckResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            vacancyId: stateRecruitmentPhase.formList.vacancyId
            //OnlineTestTypeId: 1
            // applicantList: stateRecruitmentPhase.formList.listData
            //     .filter(x => x.checked == true)
            //     .map(y => {
            //         // let container = {}
            //         // container['ApplicantId'] = y.ApplicantId
            //         return y.ApplicantId
            //     })
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_REQUEST_RECHECK_RESULT, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'success', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* fetchEmailRedactionalInvited(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })

        let body = {
            Activity: param.Activity,
            Action: param.Action
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUTIMENT_PHASE_EMAIL_REDACTION_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({
                type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE_SUCCESS,
                data
            })
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            yield call(hitTriggerMasterData)
        } else {
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* fetchDownloadAttachmentInterviewResult(params) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        const response = yield call(axios.get, params.url, {
            responseType: 'arraybuffer' /** <-- responseType should be set to arraybuffer */
        })
        if (response.status === 200) {
            const blob = new Blob([response.data])
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = params.fileName
            link.click()
            yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        }
    } catch (e) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
        console.log('REASON', e)
    }
}

export function* requestRegenerateResult(param) {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            vacancyId: stateRecruitmentPhase.formList.vacancyId
            // applicantList: stateRecruitmentPhase.formList.listData
            //     .filter(x => x.checked == true)
            //     .map(y => {
            //         // let container = {}
            //         // container['ApplicantId'] = y.ApplicantId
            //         return y.ApplicantId
            //     })
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.RECRUITMENT_REQUEST_REGENERATE_OLRESULT, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'success', false)
            let dataParam = {
                data: {
                    pageNo: stateRecruitmentPhase.pageNo,
                    pageSize: stateRecruitmentPhase.pageSize,
                    totalRows: stateRecruitmentPhase.totalRows,
                    SearchCriteria: '',
                    VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                    PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
                }
            }
            yield call(fetchList, dataParam)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export function* requestDownloadOLResult() {
    try {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: true })
        let stateRecruitmentPhase = yield select(getStateRecruitmentPhase)
        let body = {
            vacancyId: stateRecruitmentPhase.formList.vacancyId
            // applicantIdList: stateRecruitmentPhase.formList.listData
            //     .filter(x => x.checked == true)
            //     .map(y => {
            //         return y.ApplicantId
            //     })
        }
        console.log('🚀 ~ file: saga.js ~ line 3657 ~ function*requestDownloadOLResult ~ body', body)
        debugger
        const url = Config.BASE_URL + Endpoint.RECRUITMENT_REQUEST_DOWNLOAD_OLRESULT
        console.log('🚀 ~ file: saga.js ~ line 3660 ~ function*requestDownloadOLResult ~ url', url)
        const response = yield call(POSTBLOB_HEADER, url, body, { headers: Header() })
        console.log('🚀 ~ file: saga.js ~ line 3661 ~ function*requestDownloadOLResult ~ response', response)
        debugger
        const dispositionContent = response.headers['content-disposition']
        let filename
        let filenameregex = /filename[^:=\n]*=((['"]).?\Z|[^:\n]*)/
        let matches = filenameregex.exec(dispositionContent)
        if (matches !== null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '')
        }
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, filename)
        let dataParam = {
            data: {
                pageNo: stateRecruitmentPhase.pageNo,
                pageSize: stateRecruitmentPhase.pageSize,
                totalRows: stateRecruitmentPhase.totalRows,
                SearchCriteria: '',
                VacancyId: stateRecruitmentPhase.formList.vacancyId, //parseInt(param.vacancyId),
                PhaseId: stateRecruitmentPhase.formList.atsPhaseId //parseInt(param.atsPhaseId)
            }
        }
        yield call(fetchList, dataParam)
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.RECRUITMENT_PR_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.RECRUITMENT_PR_FETCH_FILTER_PHASE, fetchFilter),
        takeLatest(types.RECRUITMENT_PR_FETCH_LIST, fetchList),
        takeLatest(types.RECRUITMENT_PR_FETCH_MOUNT_PHASE, fetchMount),
        takeLatest(types.RECRUITMENT_PR_FETCH_RESET_FILTER_PHASE, fetchResetFilter),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE, fetchEmailRedactional),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_DATE_PAHSE, fetchEmailRedactionalDate),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_PAHSE, fetchSubmitEmail),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_INVITED_PAHSE, fecthSubmitEmailInvited),
        takeLatest(types.RECRUITMENT_PR_FETCH_REFERENCE_SUBMIT_PAHSE, fetchSubmitReference),
        takeLatest(types.RECRUITMENT_PR_FETCH_REFERENCE_DELETE_PAHSE, fetchDeleteReference),
        takeLatest(types.RECRUITMENT_PR_FETCH_DETAIL_PAHSE, fetchDetail),
        takeLatest(types.RECRUITMENT_PR_FETCH_ACTION_PAHSE, fetchAction),
        takeLatest(types.RECRUITMENT_PR_FETCH_CANDIDATE_POOL_PAHSE, fetchCandidatePool),
        takeLatest(types.RECRUITMENT_PR_FETCH_ONLINE_TEST_PAHSE, fetchOnlineTest),
        takeLatest(types.RECRUITMENT_PR_FETCH_MASTER_DATA_PAHSE, fetchMasterData),
        takeLatest(types.RECRUITMENT_PR_FETCH_SUBMIT_FLK_PAHSE, fetchFlkSubmit),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_FLK_PAHSE, fetchSubmitEmailFlk),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_OFFERING_PAHSE, fetchSubmitEmailOffering),
        takeLatest(types.RECRUITMENT_PR_FETCH_SUBMIT_PSYCHOLOGICAL_PAHSE, fetchPsyholog),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_PSYCOLOG_PAHSE, fetchSubmitEmailPsycolog),
        takeLatest(types.RECRUITMENT_PR_FETCH_FGD_RESULT_PAHSE, fetchFGDResult),
        takeLatest(types.RECRUITMENT_PR_FETCH_DOWNLOAD_FLK_PAHSE, fetchDownFlk),
        takeLatest(types.RECRUITMENT_PR_DELETE_DATA_TABLE_INTERVIEW, fetchDeleteTableInterview),
        takeLatest(types.RECRUITMENT_PR_ADD_DATA_TABLE_INTERVIEW, fetchAddTableInterview),
        takeLatest(types.RECRUITMENT_PR_GET_DATA_INTERVIEW_SCHEDULE, fetchDataTableInterviewSchedule),
        takeLatest(types.RECRUITMENT_PR_ADD_SCHEDULE_INTERVIEWER, fetchAddScheduleInterviewer),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_FGD_PAHSE, fetchSubmitEmailFGD),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_INTERVIEW_HR_PAHSE, fetchSubmitEmailInterviewHr),
        takeLatest(types.RECRUITMENT_PR_UPLOAD_RESULT, fetchUploadResult),
        takeLatest(types.RECRUITMENT_PR_DELETE_INTERVIEWER, fetchDelInterviewer),
        takeLatest(types.RECRUITMENT_PR_EMAIL_RESEND_INTERVIEW_HR_PAHSE, fetchResendEmailInterviewHr),
        takeLatest(types.RECRUITMENT_PR_EDIT_INTERVIEW_HR_PAHSE, fetchEditInterviewHr),
        takeLatest(types.RECRUITMENT_PR_GET_COMPANY_LIST, fetchGetDataCompanyList),
        takeLatest(types.RECRUITMENT_PR_SUBMIT_RESULT, fetchSubmitResult),
        takeLatest(types.RECRUITMENT_PR_VIEW_RESULT, fetchViewResult),
        takeLatest(types.RECRUITMENT_PR_SEND_FAILED_CANDIDATE, sendFailedCandidate),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_INTERVIEW, fetchEmailRedactionalInterview),
        takeLatest(types.RECRUITMENT_PR_SEND_HIRE_CANDIDDATE, fetchHireCandidate),
        takeLatest(types.RECRUITMENT_PR_GET_FGD_TEST_RESULT, fetchFGDTestResult),
        takeLatest(types.RECRUITMENT_PR_GET_PSYCHO_TEST_RESULT, fetchPsychoTestResult),
        takeLatest(types.RECRUITMENT_PR_GET_OT_TEST_RESULT, fetchOTTestResult),
        takeLatest(types.RECRUITMENT_PR_GET_INTERVIEW_VIEW_RESULT, fetchInterviewViewResult),
        takeLatest(types.RECRUITMENT_PR_FETCH_DOWNLOAD_TEMPLATE, fetchDownloadTemplate),
        takeLatest(types.RECRUITMENT_PR_FETCH_UPLOAD_TEST, fetchUploadTest),
        takeLatest(types.RECRUITMENT_PR_FETCH_SUBMIT_PSYCHOLOGICAL_CBT, fetchPsychologicalCBT),
        takeLatest(types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_DOWNLOAD_TEMPLATE, fetchPsychoCBTDownloadTemplate),
        takeLatest(types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_DOWNLOAD_APPLICATION, fetchPsychoCBTDownloadApplication),
        takeLatest(types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_UPLOAD_TEST_RESULT, fetchPsychoCBTUploadTestResult),
        takeLatest(types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_SWITCH, fetchPsychoCBTSwitch),
        takeLatest(types.RECRUITMENT_PR_FETCH_UPLOAD_TEST_FGD, fetchUploadTestFGD),
        takeLatest(types.RECRUITMENT_PR_FETCH_DOWNLOAD_TEMPLATE_FGD, fetchDownloadTemplateFGD),
        takeLatest(types.FLK_POST_AUTH, fetchFLKAuth),
        takeLatest(types.RECRUITMENT_PR_SEND_EXTEND, sendExtend),
        takeLatest(types.FLK_POST_VIEW, fetchViewFormFLK),
        takeLatest(types.RECRUITMENT_PR_FETCH_SUBMIT_FLK_PAHSE_FRESHGRAG, fetchFlkFreshGradSubmit),

        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV, fetchEmailRedactionalHiringManager),

        takeLatest(types.INTERVIEW_RESULT_REVIEW_VIEW, fetchInterviewResultView),
        takeLatest(types.INTERVIEW_RESULT_REVIEW_VIEW_DOWNLOAD, fetchInterviewResultDownload),
        takeLatest(types.RECRUITMENT_PR_FETCH_DETAILS_OFFERING, fetchDetailsOffering),
        takeLatest(types.RECRUITMENT_PR_FETCH_UPLOAD_OFFERING, fetchUploadOffering),
        takeLatest(types.RECRUITMENT_PR_FETCH_LIST_FAILEDBY, fetchListFailedby),
        takeLatest(types.RECRUITMENT_PR_FETCH_LIST_FEEDBACK_OFFERING, fetchListFeedbackOffering),
        takeLatest(types.RECRUITMENT_PR_FETCH_LIST_SUBMIT_FEEDBACK_OFFERING, submitFeedbackOffering),
        takeLatest(types.RECRUITMENT_PR_FETCH_DOWNLOAD_FLK_BATCH, fetchDownloadFLKBetch),
        takeLatest(types.RECRUITMENT_PR_FETCH_NOTIF_HIRING, fetchNotifHiring),
        takeLatest(types.RECRUITMENT_PR_FETCH_NOTIF_HIRING_INT_REVIEW, fetchNotifHiringInterviewRiview),
        takeLatest(types.RECRUITMENT_PR_GET_LIST_EMAIL_TEMPLATE, getListEmailTemplate),
        takeLatest(types.RECRUITMENT_PR_GET_TRIGGER_MASTER_DATA, hitTriggerMasterData),
        takeLatest(types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_INVITED, fetchEmailRedactionalInvited),
        takeLatest(types.RECRUITMENT_PR_FETCH_DOWNLOAD_ATTACHMENT_INTERVIEW, fetchDownloadAttachmentInterviewResult),
        takeLatest(types.RECHECK_RESULT, requestRecheckResult),
        takeLatest(types.REGENERATE_RESULT, requestRegenerateResult),
        takeLatest(types.DOWNLOAD_OL_RESULT, requestDownloadOLResult),
        takeLatest(types.REONLINE_TEST, requestReonlineTest)
    ])
}
