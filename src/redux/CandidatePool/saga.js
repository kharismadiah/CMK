import { all, takeLatest, call, fork, put, select, take } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GETBLOB, POST_CONFIRM } from '../../service/api'
import { Header, HeaderMultipartFile, HeaderToken } from '../../service/header'
import { messages } from '../../components/messageBox'
import _ from 'lodash'
import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'
import { message } from 'antd'

const getStateCandidatePool = state => state.CandidatePool

export function* getMasterData() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let body = {
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
                    ObjectName: 'OrganizationScope'
                },
                {
                    ObjectName: 'OrganizationTitle'
                },
                {
                    ObjectName: 'JobTitle'
                },
                {
                    ObjectName: 'JobFunction'
                },
                {
                    ObjectName: 'JobTitle'
                },
                {
                    ObjectName: 'ApplicantPhaseStatus'
                },
                {
                    ObjectName: 'SeekingJobStatus'
                },
                {
                    ObjectName: 'CPTestType'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

        if (resMasterData.Acknowledge === 1) {
            let data = {
                degree: resMasterData.DegreeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationalExperienceScope: resMasterData.OrgScopeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                institution: resMasterData.InstituteList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationalExperienceTitle: resMasterData.OrgTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                major: resMasterData.MajorList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobExperienceTitle: resMasterData.JobTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobExperienceFunction: resMasterData.JobFunctionList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                latestApplicantPhaseStatus: resMasterData.ApplicantPhaseStatusList.map(x => ({
                    ...x,
                    id: x.ApplicantPhaseStatusId,
                    name: x.ApplicantPhaseStatusName
                })),
                SeekingJobStatusList: resMasterData.SeekingJobStatusList.map(x => ({
                    ...x,
                    id: x.SeekingJobStatusId,
                    name: x.SeekingJobStatusName
                })),
                cbtTestType: resMasterData.CPTestTypeList.map(x => ({ ...x, id: x.TestTypeId, name: x.TestTypeName }))
            }
            yield put({ type: types.CANDIDATE_POOL_FETCH_MASTER_DATA_SUCCESS, payload: data })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* getDataListCandidate(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        yield put({
            type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let stateCandidatePool = yield select(getStateCandidatePool)

        let body = {
          category: stateCandidatePool.search.category,
          gpaMin: stateCandidatePool.search.gpaNem,
          gpaMax: stateCandidatePool.search.gpaNemTo,
          candidateName: stateCandidatePool.search.candidateName,
          ApplicantId: stateCandidatePool.search.applicantId,
          graduationFromYear: stateCandidatePool.search.graduationYear,
          graduationToYear: stateCandidatePool.search.graduationYearTo,
          gender: stateCandidatePool.search.gender,
          seekingOpportunities: stateCandidatePool.search.seekingJobStatus,
          degree: stateCandidatePool.search.degree,
          organizationExperienceScope: stateCandidatePool.search.organizationalExperienceScope,
          institute: stateCandidatePool.search.institution,
          organizationExperienceTitle: stateCandidatePool.search.organizationalExperienceTitle,
          major: stateCandidatePool.search.major,
          jobExperienceTitle: stateCandidatePool.search.jobExperienceTitle,
          ageFrom: stateCandidatePool.search.age,
          ageTo: stateCandidatePool.search.ageTo,
          jobExperienceFunction: stateCandidatePool.search.jobExperienceFunction,
          pageNo: param.data.pageNo,
          pageSize: param.data.pageSize,
          seekingjobstatus: stateCandidatePool.search.seekingJobStatusName,
          yoeFrom: stateCandidatePool.search.yeoMonthFrom === undefined ? "" : parseInt(stateCandidatePool.search.yeoMonthFrom) + (parseInt(stateCandidatePool.search.yeoYearFrom) * 12),
          yoeTo: stateCandidatePool.search.yeoMonthTo === undefined ? "" : parseInt(stateCandidatePool.search.yeoMonthTo) + (parseInt(stateCandidatePool.search.yeoYearTo) * 12),
          // yearsOfExperienceTo:  stateCandidatePool.search.yearsOfExpTo
        };
        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_LIST, body, { headers: Header() });
        // console.log("list candidate pool")
        // console.log(response)
        if (response.Acknowledge === 1) {
            yield put({ type: types.CANDIDATE_POOL_FETCH_LIST_SUCCESS, data: response })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* getDetail(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let body = {
            MasterData: [
                {
                    ObjectName: 'Domicile'
                },
                {
                    ObjectName: 'YearsOfExperience'
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

        if (resMasterData.Acknowledge === 1) {
            let dataMaster = {
                Domicile: resMasterData.DomicileList.map(x => ({ ...x, id: x.DistrictId, name: x.DistrictName })),
                YearsOfExperience: resMasterData.YearsOfExperienceList.map(x => ({ id: x.Id, name: x.Name }))
            }
            yield put({ type: types.CANDIDATE_POOL_MATER_DATA_DETAIL_SUCCESS, payload: dataMaster })

            let body = {
                applicantId: parseInt(param.id)
            }

            const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_RESUME_DETAIL, body, {
                headers: Header()
            })

            if (response.Acknowledge === 1) {
                let data = {
                    PersonalData: {
                        ...response.PersonalData,
                        ActivelySeekingOpportunities:
                            response.PersonalData.ActivelySeekingOpportunities === 0 ? false : true,
                        Domicile: response.PersonalData.Domicile,
                        YearsOfExperience: response.PersonalData.YearsOfExperience
                    },
                    sourceEducation: {
                        degree: _.uniqBy(response.EducationList, 'Degree').map(x => ({ id: x.Degree, name: x.Degree })),
                        institution: _.uniqBy(response.EducationList, 'Institution').map(x => ({
                            id: x.Institution,
                            name: x.Institution
                        })),
                        major: _.uniqBy(response.EducationList, 'Major').map(x => ({ id: x.Major, name: x.Major })),
                        startYear: _.uniqBy(response.EducationList, 'StartYear').map(x => ({
                            id: x.StartYear,
                            name: x.StartYear
                        })),
                        graduationYear: _.uniqBy(response.EducationList, 'GraduatedYear').map(x => ({
                            id: x.GraduatedYear,
                            name: x.GraduatedYear
                        })),
                        gpaNem: _.uniqBy(response.EducationList, 'GPA').map(x => ({ id: x.GPA, name: x.GPA }))
                    },
                    sourceOrganization: {
                        organizationName: _.uniqBy(response.OrganizationList, 'OrganizationName').map(x => ({
                            id: x.OrganizationName,
                            name: x.OrganizationName
                        })),
                        scope: _.uniqBy(response.OrganizationList, 'OrganizationalScope').map(x => ({
                            id: x.OrganizationalScope,
                            name: x.OrganizationalScope
                        })),
                        title: _.uniqBy(response.OrganizationList, 'OrganizationalRole').map(x => ({
                            id: x.OrganizationalRole,
                            name: x.OrganizationalRole
                        }))
                    },
                    sourceJob: {
                        companyName: _.uniqBy(response.JobExperienceList, 'CompanyName').map(x => ({
                            id: x.CompanyName,
                            name: x.CompanyName
                        })),
                        title: _.uniqBy(response.JobExperienceList, 'JobTitle').map(x => ({
                            id: x.JobTitle,
                            name: x.JobTitle
                        })),
                        position: _.uniqBy(response.JobExperienceList, 'Position').map(x => ({
                            id: x.Position,
                            name: x.Position
                        })),
                        function: _.uniqBy(response.JobExperienceList, 'Jobfunction').map(x => ({
                            id: x.Jobfunction,
                            name: x.Jobfunction
                        })),
                        startDate: _.uniqBy(response.JobExperienceList, 'StartDate').map(x => ({
                            id: x.StartDate,
                            name: x.StartDate
                        })),
                        endDate: _.uniqBy(response.JobExperienceList, 'EndDate').map(x => ({
                            id: x.EndDate,
                            name: x.EndDate
                        }))
                    },
                    sourceInvitation: {
                        invitedDate: _.uniqBy(response.InvitationHistoryList, 'InviteDate').map(x => ({
                            id: x.InviteDate,
                            name: x.InviteDate
                        })),

                        invitedBy: _.uniqBy(response.InvitationHistoryList, 'InvitedBy').map(x => ({
                            id: x.InvitedBy,
                            name: x.InvitedBy
                        })),

                        company: _.uniqBy(response.InvitationHistoryList, 'CompanyName').map(x => ({
                            id: x.CompanyName,
                            name: x.CompanyName
                        })),
                        vacancyCode: _.uniqBy(response.InvitationHistoryList, 'VacancyCode').map(x => ({
                            id: x.VacancyCode,
                            name: x.VacancyCode
                        })),

                        vacancyTitle: _.uniqBy(response.InvitationHistoryList, 'VacancyTitle').map(x => ({
                            id: x.VacancyTitle,
                            name: x.VacancyTitle
                        })),

                        confirmation: _.uniqBy(response.InvitationHistoryList, 'Confirmation').map(x => ({
                            id: x.Confirmation,
                            name: x.Confirmation
                        })),
                        confirmationDate: _.uniqBy(response.InvitationHistoryList, 'ConfirmationDate').map(x => ({
                            id: x.ConfirmationDate,
                            name: x.ConfirmationDate
                        })),
                        source: _.uniqBy(response.InvitationHistoryList, 'Source').map(x => ({
                            id: x.Source,
                            name: x.Source
                        }))
                    },
                    sourceApplication: {
                        groupEvent: _.uniqBy(response.ApplicationHistoryList, 'GroupEvent').map(x => ({
                            id: x.GroupEvent,
                            name: x.GroupEvent
                        })),
                        event: _.uniqBy(response.ApplicationHistoryList, 'Event').map(x => ({
                            id: x.Event,
                            name: x.Event
                        })),
                        eventCode: _.uniqBy(response.ApplicationHistoryList, 'Event').map(x => ({
                            id: x.Event,
                            name: x.Event
                        })),
                        eventDesc: _.uniqBy(response.ApplicationHistoryList, 'EventDesc').map(x => ({
                            id: x.EventDesc,
                            name: x.EventDesc
                        })),
                        company: _.uniqBy(response.ApplicationHistoryList, 'CompanyName').map(x => ({
                            id: x.CompanyName,
                            name: x.CompanyName
                        })),
                        vacancyCode: _.uniqBy(response.ApplicationHistoryList, 'VacancyCode').map(x => ({
                            id: x.VacancyCode,
                            name: x.VacancyCode
                        })),
                        vacancyTitle: _.uniqBy(response.ApplicationHistoryList, 'VacancyTitle').map(x => ({
                            id: x.VacancyTitle,
                            name: x.VacancyTitle
                        })),
                        atsPhase: _.uniqBy(response.ApplicationHistoryList, 'ATSPhase').map(x => ({
                            id: x.ATSPhase,
                            name: x.ATSPhase
                        })),
                        status: _.uniqBy(response.ApplicationHistoryList, 'ApplicationStatus').map(x => ({
                            id: x.ApplicationStatus,
                            name: x.ApplicationStatus
                        })),
                        date: _.uniqBy(response.ApplicationHistoryList, 'LastUpdatedDate').map(x => ({
                            id: x.LastUpdatedDate,
                            name: x.LastUpdatedDate
                        })),
                        file: _.uniqBy(response.ApplicationHistoryList, 'FilesList').map(x => ({
                            id: x.FilesList,
                            name: x.FilesList
                        }))
                    },
                    EducationList: response.EducationList,
                    OrganizationList: response.OrganizationList,
                    JobExperienceList: response.JobExperienceList,
                    InvitationHistoryList: response.InvitationHistoryList,
                    ApplicationHistoryList: response.ApplicationHistoryList
                }
                //console.log(data.InvitationHistoryList)
                yield put({ type: types.CANDIDATE_POOL_FETCH_GET_DETAIL_SUCCESS, data: data })
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            } else {
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* getDataActiveVacancy(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let stateCandidatePool = yield select(getStateCandidatePool)

        yield put({
            type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_VACANCY,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let body = {
            EventName: stateCandidatePool.serachVacancy.eventName,
            Company: stateCandidatePool.serachVacancy.company,
            Category: stateCandidatePool.serachVacancy.category,
            Function: stateCandidatePool.serachVacancy.function,
            VacancyTitle: stateCandidatePool.serachVacancy.vacancyTitle,
            PageNo: param.data.pageNo,
            PageSize: 10
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_ACTIVE_VACANCY_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.CANDIDATE_POOL_FETCH_GET_ACTIVE_VACANCY_SUCCESS, data: response })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* getDetailActiveVacancy(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let body = {
            vacancyId: param.id
        }
        const resLoadVacancy = yield call(POST, Config.BASE_URL + Endpoint.LOAD_VACANCY, body, { headers: Header() })
        if (resLoadVacancy.Acknowledge == 1) {
            const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_DETAIL_ACTIVE_VACANCY_POST, body, {
                headers: Header()
            })
            if (response.Acknowledge === 1) {
                let dataName = {
                    event: resLoadVacancy.EventList.find(obj => obj.EventId == response.Vacancy.EventId),
                    vacancyStatus: resLoadVacancy.VacancyStatusList.find(
                        obj => obj.VacancyStatusId == response.Vacancy.VacancyStatusId
                    ),
                    position: resLoadVacancy.PositionList.find(obj => obj.PositionId == response.Vacancy.PositionId),
                    company: resLoadVacancy.CompanyList.find(obj => obj.CompanyId == response.Vacancy.CompanyId),
                    function: resLoadVacancy.FunctionList.find(
                        obj => obj.VacancyDepartmentId == response.Vacancy.FunctionId
                    ),
                    jobSpecialization: resLoadVacancy.JobSpecializationList.find(
                        obj => obj.JobSpecializationId == response.Vacancy.JobSpecializationId
                    ),
                    generalFilter: resLoadVacancy.GeneralFilteringList.find(
                        obj => obj.GeneralFilteringId == response.Vacancy.GeneralFilterId
                    ),
                    phaseType: resLoadVacancy.ATSPhaseTypeList.find(
                        obj => obj.ATSTypeId == response.Vacancy.ATSPhaseTypeId
                    )
                }

                let data = {
                    VacancyStatusId:
                        dataName.vacancyStatus != undefined ? dataName.vacancyStatus.VacancyStatusName : '',
                    VacancyCode: response.Vacancy.VacancyCode,
                    EventId: dataName.event != undefined ? dataName.event.EventName : '',
                    PublishDate: response.Vacancy.PublishDate,
                    EndDate: response.Vacancy.EndDate,
                    CompanyId: dataName.company != undefined ? dataName.company.CompanyName : '',
                    Category: parseInt(response.Vacancy.Category),
                    JobSpecializationId:
                        dataName.jobSpecialization != undefined ? dataName.jobSpecialization.JobSpecializationName : '',
                    GeneralFilterId:
                        dataName.generalFilter != undefined ? dataName.generalFilter.GeneralFilteringName : '',
                    JobRequirement: response.Vacancy.JobRequirement,
                    JobDescription: response.Vacancy.JobDescription,
                    CompetenceDescription: response.Vacancy.CompetenceDescription,
                    NotesHistory: response.Vacancy.NotesHistory,
                    PositionId: dataName.position != undefined ? dataName.position.PositionName : '',
                    VacancyTitle: response.Vacancy.VacancyTitle,
                    VacancyType: response.Vacancy.VacancyType,
                    FunctionId: dataName.function != undefined ? dataName.function.VacancyDepartmentTitle : '',
                    TotalNeeds: response.Vacancy.TotalNeeds,
                    TotalFulfilled: '',
                    CreateDate: response.Vacancy.CreateDate,
                    ATSPhaseTypeId: dataName.phaseType != undefined ? dataName.phaseType.ATSPhaseTypeDescription : '',
                    Phases: response.Vacancy.Phases
                }

                yield put({ type: types.CANDIDATE_POOL_FETCH_DETAILS_ACTIVE_VACANCY_SUCCESS, payload: data })
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            } else {
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            messages('Error', resLoadVacancy.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* postDataEmailRedactional() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)

        const body = {
            Activity: 'Sourcing - Invite to Join Recruitment',
            Action: 'Invite to Join Recruitment',
            EmailDetailsId: stateCandidatePool.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            let data = {
                EmailConfigId: response.EmailConfigId,
                Subject: response.Subject,
                Body: response.Body,
                Signature: response.Signature,
                SenderFrom: response.SenderEmail
            }
            yield call(hitTriggerMasterData)
            yield put({ type: types.CANDIDATE_POOL_FETCH_EMAIL_REDACTIONAL_SUCCESS, payload: data })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}
export function* getTestTypeList(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        
        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_DROPDOWN_TESTTYPE_LIST, {}, {
            headers: Header()
        })

        const responseGrade = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_DROPDOWN_GRADE_LIST, {}, {
            headers: Header()
        })

        if (response.Acknowledge === 1 && responseGrade.Acknowledge === 1) {
            let data = {
                isVisible: true,
                payloadTestType: response.Data.map(x => ({ ...x, id: x.PoolRequestTestTypeId, name: x.PoolRequestTestTypeName })),
                payloadGrade: responseGrade.Data.map(x => ({ ...x, id: x.GradeId, name: x.GradeName }))
                // MasterDropdown: {
                //     TestType: response.Data,
                //     Grade: responseGrade.Data
                // }
            }
            yield put({ type: types.CANDIDATE_POOL_REQUEST_TESTTYPE_LIST_SUCCESS, data })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}
export function* getTestToolList() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)

        let body = {
            GradeId: stateCandidatePool.selectGradeModal
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_DROPDOWN_TESTTOOL_LIST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            const payload = response.Data.map((item, idx) => {
                const container = {}
                container['value'] = item.TestToolId
                container['label'] = item.TestToolName
                return container
            })
            let data = {
                isVisible: true,
                payloadTestTool: payload
            }
            yield put({ type: types.CANDIDATE_POOL_FETCH_LIST_TESTTOOL_SUCCESS, data })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        messages('Error', response.Message, 'error', false)
    }
}

export function* postSendInvitationEmail() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let stateCandidatePool = yield select(getStateCandidatePool)
        let applicantList = stateCandidatePool.filteredSelectedRowTableCandidate.map(x => ({ applicantId: x }))
        // let applicantList = stateCandidatePool.selectedRowTableCandidate.map(x => ({ applicantId: x.ApplicantId }))
        let body = {
            vacancyCode: stateCandidatePool.selectedRowTableRadioVacancy.vacancyCode,
            applicantList: applicantList,
            emailTemplate: stateCandidatePool.formEmail
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_INVITE_JOINT, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            //messages("Info", response.Message, "info", false);
            let data = {
                data: {
                    pageNo: stateCandidatePool.pageNo,
                    pageSize: stateCandidatePool.pageSize,
                    totalRows: stateCandidatePool.totalRows
                }
            }
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isShowSelectVacancy', value: false })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'selectedRowTableCandidate',
                value: []
            })
            if (stateCandidatePool.inviteToJoinStatus.popUpFewAccepted) {
                yield put({
                    type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                    property: 'showFewAcceptedModal',
                    value: true
                })
            } else messages('Info', response.Message, 'info', false)
            yield call(getDataListCandidate, data)
        } else {
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isShowSelectVacancy', value: false })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property:"resetCheckBoxMainTableFlag", value: true })
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

// export function* fetchTabInvited(param) {
//     try {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

//         let stateCandidatePool = yield select(getStateCandidatePool)

//         yield put({
//             type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_INVITED,
//             pageNo: param.data.pageNo,
//             pageSize: param.data.pageSize,
//             totalRows: param.data.totalRows
//         })

//         let body = {
//             applicantName: stateCandidatePool.searchInvited,
//             pageNo: param.data.pageNo,
//             pageSize: param.data.pageSize
//         }

//          const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_INVITED_LIST, body, { headers: Header() });
//         if (response.Acknowledge === 1) {
//             let data = {
//                 sourceInvited: {
//                     applicantId: _.uniqBy(response.ApplicantList, 'ApplicantId').map(x => ({ id: x.ApplicantId, name: x.ApplicantId })),
//                     name: _.uniqBy(response.ApplicantList, 'Name').map(x => ({ id: x.Name, name: x.Name })),
//                     gender: _.uniqBy(response.ApplicantList, 'Gender').map(x => ({ id: x.Gender, name: x.Gender })),
//                     degree: _.uniqBy(response.ApplicantList, 'Degree').map(x => ({ id: x.Degree, name: x.Degree })),
//                     institution: _.uniqBy(response.ApplicantList, 'Institution').map(x => ({ id: x.Institution, name: x.Institution })),
//                     major: _.uniqBy(response.ApplicantList, 'Major').map(x => ({ id: x.Major, name: x.Major })),
//                     invitedDate: _.uniqBy(response.ApplicantList, 'InvitedDate').map(x => ({ id: x.InvitedDate, name: x.InvitedDate })),
//                     invitedBy: _.uniqBy(response.ApplicantList, 'InvitedBy').map(x => ({ id: x.InvitedBy, name: x.InvitedBy })),
//                     company: _.uniqBy(response.ApplicantList, 'Company').map(x => ({ id: x.Company, name: x.Company })),
//                     vacancyCode: _.uniqBy(response.ApplicantList, 'VacancyCode').map(x => ({ id: x.VacancyCode, name: x.VacancyCode })),
//                     vacancyTitle: _.uniqBy(response.ApplicantList, 'VacancyTitle').map(x => ({ id: x.VacancyTitle, name: x.VacancyTitle })),

//                     confirmationStatus: _.uniqBy(response.ApplicantList, 'ConfirmationStatus').map(x => ({ id: x.ConfirmationStatus, name: x.ConfirmationStatus })),
//                     //isFailedCancelFinal: _.uniqBy(response.ApplicantList, 'isFailedCancelFinal').map(x => ({ id: x.isFailedCancelFinal, name: x.isFailedCancelFinal })),

//                     confirmationDate: _.uniqBy(response.ApplicantList, 'ConfirmationDate').map(x => ({ id: x.ConfirmationDate, name: x.ConfirmationDate })),
//                     expiredDate: _.uniqBy(response.ApplicantList, 'ExpiredDate').map(x => ({ id: x.ExpiredDate, name: x.ExpiredDate })),
//                     totalInvited: _.uniqBy(response.ApplicantList, 'totalInvited').map(x => ({ id: x.TotalInvited, name: x.TotalInvited })),
//                     totalExtended: _.uniqBy(response.ApplicantList, 'InvitedBy').map(x => ({ id: x.TotalExtended, name: x.TotalExtended }))
//                 },
//                 listInvited: response.ApplicantList,
//                 temListInvited: response.ApplicantList,
//                 TotalRecords: response.TotalRecords
//             }
//             yield put({ type: types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS, data })
//             yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//         } else {
//             yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//             messages("Error", response.Message, "error", false);
//         }

//     } catch (error) {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//     }
// }

export function* fetchTabInvited(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let stateCandidatePool = yield select(getStateCandidatePool)

        yield put({
            type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_INVITED,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })
        switch (stateCandidatePool.selectedSubTabFromInvitedTab) {
            case '1':
                var tabStatus = '0'
                var endpoint = Endpoint.CANDIDATE_POOL_INVITED_LIST_FILTERED_WAITING_DECLINED_EXPIRED
                break
            case '2':
                var tabStatus = '1'
                var endpoint = Endpoint.CANDIDATE_POOL_INVITED_LIST_FILTERED_ACCEPTED_ON_PROGRESS
                break
            case '3':
                var tabStatus = '2'
                var endpoint = Endpoint.CANDIDATE_POOL_INVITED_LIST_FILTERED_ACCEPTED_FAILED
                break
            case '4':
                var tabStatus = '2'
                var endpoint = Endpoint.CANDIDATE_POOL_INVITED_LIST_FILTERED_WAITING_DECLINED_EXPIRED
                break
            case '5':
                var tabStatus = '3'
                var endpoint = Endpoint.CANDIDATE_POOL_INVITED_LIST_FILTERED_WAITING_DECLINED_EXPIRED
                break
            default:
                var tabStatus = ''
                var endpoint = ''
        }

        let body = {
            ApplicantId: '',
            ApplicantName: stateCandidatePool.searchInvited,
            Institution: '',
            Company: '',
            Gender: '',
            VacancyCode: '',
            Degree: '',
            InvitedDate: '',
            ExpiredDate: '',
            Major: '',
            TabStatus: tabStatus,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize
        }

        const response = yield call(POST, Config.BASE_URL + endpoint, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            var data = {
                sourceInvited: {
                    applicantId: _.uniqBy(response.Data, 'ApplicantId').map(x => ({
                        id: x.ApplicantId,
                        name: x.ApplicantId
                    })),
                    name: _.uniqBy(response.Data, 'Name').map(x => ({ id: x.Name, name: x.Name })),
                    institution: _.uniqBy(response.Data, 'Institution').map(x => ({
                        id: x.Institution,
                        name: x.Institution
                    })),
                    company: _.uniqBy(response.Data, 'Company').map(x => ({ id: x.Company, name: x.Company })),
                    gender: _.uniqBy(response.Data, 'Gender').map(x => ({ id: x.Gender, name: x.Gender })),
                    major: _.uniqBy(response.Data, 'Major').map(x => ({ id: x.Major, name: x.Major })),
                    vacancyCode: _.uniqBy(response.Data, 'VacancyCode').map(x => ({
                        id: x.VacancyCode,
                        name: x.VacancyCode
                    })),
                    vacancyTitle: _.uniqBy(response.Data, 'VacancyTitle').map(x => ({
                        id: x.VacancyTitle,
                        name: x.VacancyTitle
                    })),
                    degree: _.uniqBy(response.Data, 'Degree').map(x => ({ id: x.Degree, name: x.Degree })),
                    invitedDate: _.uniqBy(response.Data, 'InvitedDate').map(x => ({
                        id: x.InvitedDate,
                        name: x.InvitedDate
                    })),
                    invitedBy: _.uniqBy(response.Data, 'InvitedBy').map(x => ({ id: x.InvitedBy, name: x.InvitedBy }))
                }
            }

            if (
                stateCandidatePool.selectedSubTabFromInvitedTab === '1' ||
                stateCandidatePool.selectedSubTabFromInvitedTab === '4' ||
                stateCandidatePool.selectedSubTabFromInvitedTab === '5'
            ) {
                data = {
                    sourceInvited: {
                        ...data.sourceInvited,
                        expiredDate: _.uniqBy(response.Data, 'ExpiredDate').map(x => ({
                            id: x.ExpiredDate,
                            name: x.ExpiredDate
                        }))
                    }
                }
            } else {
                data = {
                    sourceInvited: {
                        // untuk filter
                        ...data.sourceInvited,
                        latestAtsPhase: _.uniqBy(response.Data, 'LatestATSPhase').map(x => ({
                            id: x.LatestATSPhase,
                            name: x.LatestATSPhase
                        })),
                        latestAtsStatus: _.uniqBy(response.Data, 'LatestATSStatus').map(x => ({
                            id: x.LatestATSStatus,
                            name: x.LatestATSStatus
                        })),
                        processDate: _.uniqBy(response.Data, 'ProcessDate').map(x => ({
                            id: x.ProcessDate,
                            name: x.ProcessDate
                        })),
                        expiredProcess: _.uniqBy(response.Data, 'ExpiredProcess').map(x => ({
                            id: x.ExpiredProcess,
                            name: x.ExpiredProcess
                        }))
                    }
                }
            }
            data = {
                ...data,
                listInvited: response.Data,
                temListInvited: response.Data,
                TotalRecords: response.TotalRecords
            }

            if (
                stateCandidatePool.selectedSubTabFromInvitedTab === '1' ||
                stateCandidatePool.selectedSubTabFromInvitedTab === '4' ||
                stateCandidatePool.selectedSubTabFromInvitedTab === '5'
            ) {
                yield put({ type: types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS_TAB_1_4_5, data })
            } else yield put({ type: types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS_TAB_2_3, data })

            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchExtendInvited() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            applicantList: stateCandidatePool.selectedRowTableInvited.map(x => ({
                applicantId: x.ApplicantId,
                vacancyCode: x.VacancyCode
            }))
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_EXTEND, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            messages('Info', response.Message, 'info', false)
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'selectedRowTableInvited',
                value: []
            })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'selectedKeyRowTableInvited',
                value: []
            })

            let data = {
                data: {
                    pageNo: stateCandidatePool.pageNoInvited,
                    pageSize: stateCandidatePool.pageSizeInvited,
                    totalRows: stateCandidatePool.totalRowsInvited
                }
            }

            yield call(fetchTabInvited, data)
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchDownFlk(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        const response = yield call(
            GETBLOB,
            Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FLK_DOWNLOAD_POST + `?applicantId=${param.applicantId}`,
            { headers: Header() }
        )

        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        var blob = new Blob([response], { type: 'application/pdf;charset=utf-8' })
        saveAs(blob)
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

export function* fetchRequest(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            applicantId: parseInt(stateCandidatePool.applicantId),
            testTypeId: parseInt(stateCandidatePool.testType)
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_REQUEST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            messages('Info', response.Message, 'info', false)
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isVisibleSelectType', value: false })
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'testType', value: '' })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_FETCH_REQUEST_LIST_SUCCESS, data })
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}
export function* approveRequest() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            CandidatePoolRequestId: stateCandidatePool.formAcceptance.CandidatePoolRequestId,
            isAccepted: stateCandidatePool.formAcceptance.isAccepted
        }
        let endpoint = ""
        if (stateCandidatePool.formAcceptance.isAccepted) {
            endpoint = Endpoint.CANDIDATE_POOL_ACCEPT_REQUEST
            body = {...body, ViewDuration: stateCandidatePool.modalDuration === '' ? '': parseInt(stateCandidatePool.modalDuration), RejectNotes: ""}
        }
        else {
            endpoint = Endpoint.CANDIDATE_POOL_REJECT_REQUEST
            body = {...body, ViewDuration: 0, RejectNotes: stateCandidatePool.formAcceptance.RejectNotes}
        }

        const response = yield call(POST, Config.BASE_URL + endpoint, body, {
            headers: Header()
        })

        let dataParam = {
            data: {
                pageNo: stateCandidatePool.pageNoRequestList,
                pageSize: stateCandidatePool.pageSizeRequestList,
                type: stateCandidatePool.buttonType
            }
        }

        if (response.Acknowledge === 1) {
            if (response.OLReportTotalScoreIds !== undefined) {
                if (response.OLReportTotalScoreIds.length > 0) {
                    const body2 = {
                        OLReportTotalScoreIds: response.OLReportTotalScoreIds,
                        CandidatePoolRequestId: body.CandidatePoolRequestId,
                        ViewDuration: body.ViewDuration
                    }
                    const response2 = yield call(
                        POST_CONFIRM, Config.BASE_URL + Endpoint.CANDIDATE_POOL_CONFIRM_NORMHO, body2,
                        { headers: Header() }, 'Norm HO', response.Message,'info'
                    )
                    yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
                    if(response2) {
                        if (response2.Acknowledge === 1) {
                            messages("Request Accepted", 
                                    response2.Message !== "" ? response2.Message:
                                    "Successfully accepted request."
                                    , 'success', false)
                            yield call(fetchRequestAndGenerateList, dataParam)    
                        } else {
                            messages('Info', response2.Message, 'info', false)
                        }
                    }   
                }

            } else {
                let title = "", message = ""
                if (body.isAccepted) {
                    title = "Request Accepted"
                    message = response.Message !== "" ? response.Message :
                                "Successfully accepted request."
                }
                else {
                    title = "Request Rejected"
                    message = response.Message !== "" ? response.Message : 
                                "Successfully rejected request"
                }
                messages(title, message, 'success', false)
                yield call(fetchRequestAndGenerateList, dataParam)
            }
        } else {
            let title = ""
            if (response.Message.startsWith("Please maintain norm")) title = "Failed Generate Result"
            else title = 'Info'
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages(title, response.Message, 'info', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}
export function* submitRequestCandidate(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        
        if (stateCandidatePool.applicantId !== '' 
            && stateCandidatePool.selectedRowTableCandidate.findIndex(x=>x.ApplicantId === stateCandidatePool.applicantId) < 0) 
                var selectedAppId = [stateCandidatePool.applicantId]
        else var selectedAppId = []
        stateCandidatePool.selectedRowTableCandidate.map(x => selectedAppId.push(x.ApplicantId))

        let testTypeName = stateCandidatePool.source.requestCandidateTestType.find(x=>x.id === stateCandidatePool.testType).name

        let requestType = 0
        if (testTypeName === 'Online Test Non-Astra') requestType = 1
        else if (testTypeName === 'Psikotest') requestType = 2
        else if (testTypeName === 'Interview') requestType = 3
        else if (testTypeName === 'Online Test Astra') requestType = 4

        let body = {
            RequestType: requestType,
            TestType: stateCandidatePool.testType,
            ApplicantIds: selectedAppId,
            GradeId: stateCandidatePool.selectGradeModal,
            TestToolId: stateCandidatePool.selectedTestTool
        }
        //console.log("=>>>>> cek disini body request", body)
        const response = yield call(
            POST,
            Config.BASE_URL + Endpoint.CANDIDATE_POOL_GENERATE_REQUEST,
            body,
            {
                headers: Header()
            }
        )
        if (response.Acknowledge === 1) {
            messages('Request Sent', response.Message, 'success', false)
        } else {
            //console.log('🚀 ~ file: saga.js ~ line 801 ~ function*submitRequestCandidate ~ response', response)
            messages('Failed Sent Request', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property:"resetCheckBoxMainTableFlag", value: true })
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (err) {
        //console.log('🚀 ~ file: saga.js ~ line 811 ~ function*submitRequestCandidate ~ err', err)
        messages('Error', err, 'error', false)
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}

// export function* fetchRequestList(param) {
//     try {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

//         let stateCandidatePool = yield select(getStateCandidatePool)

//         yield put({
//             type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_REQUEST_LIST,
//             pageNo: param.data.pageNo,
//             pageSize: param.data.pageSize,
//             totalRows: param.data.totalRows
//         })
//         let body = {
//             Category: stateCandidatePool.search.category,
//             gpaMin: stateCandidatePool.search.gpaNem,
//             gpaMax: stateCandidatePool.search.gpaNemTo,
//             CandidateName: stateCandidatePool.search.candidateName,
//             GraduationFromYear: stateCandidatePool.search.graduationYear,
//             GraduationToYear: stateCandidatePool.search.graduationYearTo,
//             Gender: stateCandidatePool.search.gender,
//             SeekingOpportunities: stateCandidatePool.search.seekingJobStatus,
//             Degree: stateCandidatePool.search.degree,
//             OrganizationExperienceScope: stateCandidatePool.search.organizationalExperienceScope,
//             Institute: stateCandidatePool.search.institution,
//             OrganizationExperienceTitle: stateCandidatePool.search.organizationalExperienceTitle,
//             Major: stateCandidatePool.search.major,
//             JobExperienceTitle: stateCandidatePool.search.jobExperienceTitle,
//             ageFrom: stateCandidatePool.search.age,
//             ageTo: stateCandidatePool.search.ageTo,
//             JobExperienceFunction: stateCandidatePool.search.jobExperienceFunction,
//             // yearsOfExperienceFrom:  stateCandidatePool.search.yearsOfExp,
//             // yearsOfExperienceTo:  stateCandidatePool.search.yearsOfExpTo,
//             PageNo: param.data.pageNo,
//             PageSize: param.data.pageSize
//         }

//         const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_REQUEST_LIST, body, {
//             headers: Header()
//         })

//         if (response.Acknowledge === 1) {
//             let data = {
//                 isVisible: true,
//                 sourceTable: response.CPRequestList.map((x, idx) => ({
//                     No: idx + 1,
//                     candidatePoolTestRequestId: x.CandidatePoolTestRequestId,
//                     applicantId: x.ApplicantId,
//                     applicantName: x.ApplicantName,
//                     RequestedResult: x.RequestedResult,
//                     companyName: x.CompanyName,
//                     status: x.Status,
//                     testResultFileUrl: x.TestResultFileUrl,
//                     duration: x.Duration,
//                     file: x.TestResultFileName,
//                     tempFile: '',
//                     canViewResult: x.CanViewResult
//                 }))
//             }
//             yield put({ type: types.CANDIDATE_POOL_FETCH_REQUEST_LIST_SUCCESS, data })
//             yield put({
//                 type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
//                 property: 'totalRowsRequestList',
//                 value: response.TotalRecords
//             })
//             yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//         } else {
//             yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//             messages('Error', response.Message, 'error', false)
//         }

//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//     } catch (err) {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//     }
// }

export function* fetchRequestAndGenerateList(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST, value: true })
        if (param.data.needOpenModal === undefined) {
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isVisibleGridRequestAffco', value: true})
        }    
        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            PageNo: param.data.pageNo,
            PageSize: param.data.pageSize,
            KeyWord: stateCandidatePool.searchRequestList
        }
        let endpoint = ""
        if (param.data.type === 'Generate Data List')  endpoint = Endpoint.CANDIDATE_POOL_GENERATE_DATA_LIST
        else if (param.data.type === 'View AFFCO Data Request') endpoint = Endpoint.CANDIDATE_POOL_VIEW_AFFCO_DATA_REQUEST

        const response = yield call(POST, Config.BASE_URL + endpoint, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            let data = {
                // isVisible: true,
                sourceTable: response.Data.map((x, idx) => ({

                    // start for interview columns
                    key: idx + 1,
                    requestId: x.RequestId,
                    applicantId: x.ApplicantId,
                    applicantName: x.Name,
                    requestedResult: x.TestType,
                    companyName: x.Company,
                    requester: x.RequestedBy,
                    status: x.Status,
                    canViewResult: x.View,
                    duration: x.ViewDuration,
                    //end for invterview columns

                    // start for addition online test columns
                    testTool: x.TestTools,
                    grade: x.Grade, 
                    requestDate: x.RequestDateString,
                    confirmedBy: x.ConfirmedBy,
                    confirmationDate: x.ConfirmedDateString,
                    testResultFileUrl: x.RequestedFile,
                    attachmentFile: x.AttachmentFile,
                    attachmentFileName: x.AttachmentFileName
                }))
            }
            yield put({ type: types.CANDIDATE_POOL_FETCH_REQUEST_AND_GENERATE_LIST_SUCCESS, data })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_REQUEST_LIST,
                pageNo: param.data.pageNo,
                pageSize: param.data.pageSize,
                totalRows: response.TotalRecords
            })
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'fetchHistoryListTimer', value:0})
            yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'buttonType', value:param.data.type})
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST, value: false })
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST, value: false })
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST, value: false })
    }
}

// export function* fetchUploadResult() {
//     try {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
//         let stateCandidatePool = yield select(getStateCandidatePool)
//         let formData = new FormData()
//         let dataRequestList = stateCandidatePool.modalRequestList.sourceTable.find(
//             x => x.candidatePoolTestRequestId === stateCandidatePool.candidatePoolTestRequestId
//         )
//         let body = {
//             applicantId: parseInt(stateCandidatePool.applicantId),
//             candidatePoolTestRequestId: parseInt(stateCandidatePool.candidatePoolTestRequestId),
//             duration: parseInt(stateCandidatePool.duration)
//         }
//         formData.append('model', JSON.stringify(body))
//         if (dataRequestList.tempFile !== '') {
//             formData.append('file', dataRequestList.tempFile)

//             const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_REQUEST_RESULT, formData, {
//                 headers: HeaderMultipartFile()
//             })
//             if (response.Acknowledge === 1) {
//                 yield put({
//                     type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
//                     property: 'isVisibleUploadResult',
//                     value: false
//                 })
//                 yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'duration', value: '' })
//                 yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//                 messages('Success', response.Message, 'success', false)
//                 let dataParam = {
//                     data: {
//                         pageNo: stateCandidatePool.pageNoRequestList,
//                         pageSize: stateCandidatePool.pageSizeRequestList,
//                         totalRows: stateCandidatePool.totalRowsRequestList
//                     }
//                 }
//                 yield call(fetchRequestList, dataParam)
//             } else {
//                 yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//                 messages('Error', response.Message, 'error', false)
//             }
//         } else {
//             messages('Info', 'Please choose the file first', 'info', false)
//         }
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//     } catch (err) {
//         yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
//     }
// }

export function* getHistoryList(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })

        let stateCandidatePool = yield select(getStateCandidatePool)

        let body = {
            PageNo: param.data.pageNo,
            PageSize: param.data.pageSize,
            RequestId: stateCandidatePool.searchHistory.requestIdHistory,
            ApplicantId: stateCandidatePool.searchHistory.applicantIdHistory,
            TestType: stateCandidatePool.searchHistory.requestTypeHistory,
            Status: stateCandidatePool.searchHistory.requestStatusHistory,
            RequestedBy: stateCandidatePool.searchHistory.requestByHistory,
            RequestDateStart: stateCandidatePool.searchHistory.requestDateStartHistory,
            RequestDateEnd: stateCandidatePool.searchHistory.requestDateEndHistory,
            ConfirmedBy: stateCandidatePool.searchHistory.confirmByHistory,
            ConfirmationDateStart: stateCandidatePool.searchHistory.confirmDateStartHistory,
            ConfirmationDateEnd: stateCandidatePool.searchHistory.confirmDateEndHistory,
            FailedInformation: stateCandidatePool.searchHistory.failedInformationHistory
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_HISTORY_LIST, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            const data = response.Data.map((x)=>(
                {
                    requestId: x.RequestId,
                    applicantId: x.ApplicantId,
                    name: x.Name,
                    email: x.Email,
                    requestType: x.TestType,
                    requestStatus: x.Status,
                    requestBy: x.RequestedBy,
                    requestDate: x.RequestDate === undefined? '' : moment(x.RequestDate).format("DD-MM-YYYY"),
                    confirmBy: x.ConfirmedBy,
                    confirmDate: x.ConfirmedDate === undefined? '' : moment(x.ConfirmedDate).format("DD-MM-YYYY"),
                    rejectNotes: x.RejectNotes,
                    failedInformation: x.FailedInformation
                })
            )
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_HISTORY_PAGINATION,
                pageNo: param.data.pageNo,
                pageSize: param.data.pageSize,
                totalRows: response.TotalRecords
            })
            yield put({ type: types.CANDIDATE_POOL_FETCH_HISTORY_LIST_SUCCESS, data: data })
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        } else {
            yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}


export function* uploadPdfResult(param){
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        let formData = new FormData()
        let body = {
            applicantId: param.data.applicantId,
            candidatePoolTestRequestId: param.data.requestId
        }
        formData.append('model', JSON.stringify(body))
        if (stateCandidatePool.uploadRawPdfResult[`fileRequest${param.data.requestId}`] !== '' &&
            stateCandidatePool.uploadRawPdfResult[`fileRequest${param.data.requestId}`] !== undefined &&
            stateCandidatePool.uploadRawPdfResult[`fileRequest${param.data.requestId}`] !== null) {
            formData.append('file', stateCandidatePool.uploadRawPdfResult[`fileRequest${param.data.requestId}`])
            
            const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_REQUEST_RESULT, formData, {
                headers: HeaderMultipartFile()
            })
            if (response.Acknowledge === 1) {
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
                messages('Success', response.Message, 'success', false)
                let dataParam = {
                    data: {
                        pageNo: stateCandidatePool.pageNoRequestList,
                        pageSize: stateCandidatePool.pageSizeRequestList,
                        type: stateCandidatePool.buttonType
                    }
                }
                yield call(fetchRequestAndGenerateList, dataParam)
            } else {
                yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            messages('Info', 'Please choose the file first', 'info', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
  }


export function* checkInviteToJoin() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            VacancyCode: stateCandidatePool.selectedRowTableRadioVacancy.vacancyCode,
            ApplicantList: stateCandidatePool.checkInviteToJoinCandidate,
            EmailTemplate: {
                Subject: 'TestCheckInvite',
                Body: 'Test',
                Signature: 'Test'
            }
        }

        let statusDeclined = false,
            statusWaiting = false,
            statusAllAccepted = false,
            statusFewAccepted = false,
            statusMaxExtended = false

        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_INVITE_TO_JOIN_APPLICANT, body, {
            headers: Header()
        })

        if (response.Data.DeclinedApplicants.length > 0) statusDeclined = true //1
        if (response.Data.WaitingApplicants.length > 0) statusWaiting = true //2

        if (response.Data.AcceptedApplicants.length === stateCandidatePool.checkInviteToJoinCandidate.length)
            statusAllAccepted = true
        //3
        else if (response.Data.AcceptedApplicants.length > 0) statusFewAccepted = true //4

        if (response.Data.MaxExtendApplicants.length > 0) statusMaxExtended = true
        if (response.Acknowledge === 1) {
            if (statusDeclined || statusWaiting || statusAllAccepted || statusFewAccepted || statusMaxExtended)
                yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isShowPopUp', value: true })
            else yield put({ type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL, property: 'isShowPopUp', value: false })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'inviteToJoinStatus',
                value: {
                    popUpDeclined: statusDeclined,
                    popUpWaiting: statusWaiting,
                    popUpAllAccepted: statusAllAccepted,
                    popUpFewAccepted: statusFewAccepted,
                    popUpMaxExtended: statusMaxExtended
                }
            })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'inviteToJoinCheckResponse',
                value: {
                    waitingApplicants: response.Data.WaitingApplicants,
                    acceptedApplicants: response.Data.AcceptedApplicants,
                    declinedApplicants: response.Data.DeclinedApplicants,
                    expiredApplicants: response.Data.expiredApplicants,
                    extendedApplicants: response.Data.MaxExtendApplicants
                }
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (err) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    }
}
export function* getListEmailTemplate() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        const body = {
            Activity: 'Sourcing - Invite to Join Recruitment',
            Action: 'Invite to Join Recruitment',
            EmailDetailsId: 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_EMAIL_TEMPLATE, body, { headers: Header() })
        if (response.Acknowledge == 1) {
            if (response.EmailDetails.length > 0)
                yield put({
                    type: types.CANDIDATE_POOL_HANDLE_EMAIL_TEMPLATE,
                    property: 'selectedEmailTemplateId',
                    value: response.EmailDetails[0].EmailDetailsId
                })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_EMAIL_TEMPLATE,
                property: 'emailTemplateList',
                value: response.EmailDetails
            })
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_EMAIL_TEMPLATE,
                property: 'emailTemplateTotalRows',
                value: response.EmailDetails.length
            })
            yield call(getActivityList)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitTriggerMasterData() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        let body = {
            EmailActivityId: stateCandidatePool.activityList.find(
                x => x.ActivityName === 'Sourcing - Invite to Join Recruitment'
            ).EmailActivityId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL,
                property: 'triggerList',
                value: response.Data.map(x => ({ id: x.EmailTriggerId, triggerName: x.Remarks, value: x.TriggerName }))
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* getActivityList() {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({
                type: types.CANDIDATE_POOL_HANDLE_EMAIL_TEMPLATE,
                property: 'activityList',
                value: response.Data
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* regenerateRequest(param) {
    try {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: true })
        let stateCandidatePool = yield select(getStateCandidatePool)
        const body = {
            candidatePoolRequestId: param.requestId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CANDIDATE_POOL_REGENERATE_REQUEST, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            messages('Success', response.Message, 'success', false)
            let dataParam = {
                data: {
                    pageNo: stateCandidatePool.pageNoRequestList,
                    pageSize: stateCandidatePool.pageSizeRequestList,
                    type: stateCandidatePool.buttonType
                }
            }
            yield call(fetchRequestAndGenerateList, dataParam)
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.CANDIDATE_POOL_SET_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.CANDIDATE_POOL_FETCH_MASTER_DATA, getMasterData),
        takeLatest(types.CANDIDATE_POOL_FETCH_LIST, getDataListCandidate),
        takeLatest(types.CANDIDATE_POOL_FETCH_GET_DETAIL, getDetail),
        takeLatest(types.CANDIDATE_POOL_FETCH_GET_ACTIVE_VACANCY, getDataActiveVacancy),
        takeLatest(types.CANDIDATE_POOL_FETCH_DETAILS_ACTIVE_VACANCY, getDetailActiveVacancy),
        takeLatest(types.CANDIDATE_POOL_FETCH_EMAIL_REDACTIONAL, postDataEmailRedactional),
        takeLatest(types.CANDIDATE_POOL_FETCH_SEND_INVITATION_EMAIL, postSendInvitationEmail),
        takeLatest(types.CANDIDATE_POOL_FETCH_TAB_INVITED, fetchTabInvited),
        takeLatest(types.CANDIDATE_POOL_FETCH_EXTEND_INVITED, fetchExtendInvited),
        takeLatest(types.CANDIDATE_POOL_FETCH_DOWNLOAD_FLK, fetchDownFlk),
        takeLatest(types.CANDIDATE_POOL_FETCH_REQUEST, fetchRequest),

        // old or deprecated
        //takeLatest(types.CANDIDATE_POOL_FETCH_REQUEST_LIST, fetchRequestList), // used as reference
        //takeLatest(types.CANDIDATE_POOL_FETCH_UPLOAD_RESULT, fetchUploadResult), // used as reference
        // end of old

        takeLatest(types.CANDIDATE_POOL_CHECK_INVITE_TO_JOIN, checkInviteToJoin),
        takeLatest(types.CANDIDATE_POOL_GET_LIST_EMAIL_TEMPLATE, getListEmailTemplate),
        takeLatest(types.CANDIDATE_POOL_GET_TRIGGER_MASTER_DATA, hitTriggerMasterData),
        takeLatest(types.CANDIDATE_POOL_GET_ACTIVITY_LIST, getActivityList),
        takeLatest(types.CANDIDATE_POOL_FETCH_REQUEST_AND_GENERATE_LIST, fetchRequestAndGenerateList),
        takeLatest(types.CANDIDATE_POOL_FETCH_LIST_TESTTYPE, getTestTypeList),
        takeLatest(types.CANDIDATE_POOL_FETCH_LIST_TESTTOOL, getTestToolList),
        takeLatest(types.CANDIDATE_POOL_REQUEST_APPROVAL, approveRequest),
        takeLatest(types.CANDIDATE_POOL_SUBMIT_REQUEST_CANDIDATE, submitRequestCandidate),

        takeLatest(types.CANDIDATE_POOL_FETCH_HISTORY_lIST, getHistoryList),
        takeLatest(types.CANDIDATE_POOL_UPLOAD_PDF_RESULT, uploadPdfResult),
        takeLatest(types.CANDIDATE_POOL_REGENERATE_REQUEST, regenerateRequest),
    ])
}
