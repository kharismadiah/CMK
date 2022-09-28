import { all, takeLatest, call, fork, put, select, take } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET, GETBLOB } from '../../service/api'
import { Header } from '../../service/header'
import { messages } from '../../components/messageBox'

const getStateListOfApplicant = state => state.ListOfApplicant

export function* getMasterData() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
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
                    ObjectName: 'YearsOfExperience'
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
                YearsOfExperienceList: resMasterData.YearsOfExperienceList.map(x => ({
                    ...x,
                    id: x.Name,
                    name: x.Name + ' - ' + x.Category
                }))
            }
            yield put({ type: types.APPLICANT_MATER_DATA_SUCCESS, payload: data })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.EVENT_SET_LOADER, value: false })
    }
}

export function* getDataListOfApplicant(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        yield put({
            type: types.APPLICANT_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let stateListOfApplicant = yield select(getStateListOfApplicant)
        let body = {
            candidateName: stateListOfApplicant.serach.candidateName,
            yearOfExperience: stateListOfApplicant.serach.yearOfExperiences,
            // fromYearOfExperience: stateListOfApplicant.serach.yearOfExperiences,
            // toYearOfExperience: stateListOfApplicant.serach.yearOfExperiencesTo,
            gender: stateListOfApplicant.serach.gender,
            seekingOpportunity: stateListOfApplicant.serach.seekingJobStatus,
            degreeId: stateListOfApplicant.serach.degree,
            organizationScopeId: stateListOfApplicant.serach.organizationalExperienceScope,
            institutionId: stateListOfApplicant.serach.institution,
            organizationExperienceId: stateListOfApplicant.serach.organizationalExperienceTitle,
            majorId: stateListOfApplicant.serach.major,
            jobExperienceTitleId: stateListOfApplicant.serach.jobExperienceTitle,
            graduatedFromYear: stateListOfApplicant.serach.graduationYear,
            graduatedToYear: stateListOfApplicant.serach.graduationYearTo,
            jobFunctionId: stateListOfApplicant.serach.jobExperienceFunction,
            gpaFrom: stateListOfApplicant.serach.gpaNem,
            gpaTo: stateListOfApplicant.serach.gpaNemTo,
            // applicantPhaseStatusId: stateListOfApplicant.serach.latestApplicantPhaseStatus,
            pageNo: stateListOfApplicant.pageNo,
            pageSize: stateListOfApplicant.pageSize,
            // seekingJobStatus: stateListOfApplicant.serach.seekingJobStatusName,
            ageFrom: stateListOfApplicant.serach.age,
            ageTo: stateListOfApplicant.serach.ageTo,


            yoeFrom: parseInt(stateListOfApplicant.serach.yeoMonthFrom, 10) + parseInt(stateListOfApplicant.serach.yeoYearFrom, 10) * 12,
            yoeTo: parseInt(stateListOfApplicant.serach.yeoMonthTo, 10) + parseInt(stateListOfApplicant.serach.yeoYearTo, 10) * 12
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_LIST_POST, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            yield put({ type: types.APPLICANT_SUCCESS_GET_LIST, data: response })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* getDetail(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

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
            yield put({ type: types.APPLICANT_MATER_DATA_DETAIL_SUCCESS, payload: dataMaster })

            const response = yield call(GET, Config.BASE_URL + Endpoint.APPLICANT_DETAIL_GET + '?id=' + param.id, {
                headers: Header()
            })
            console.log(response)
            if (response.Acknowledge === 1) {
                let data = {
                    PersonalData: {
                        ...response.PersonalData
                        // ActivelySeekingOpportunities: response.PersonalData.ActivelySeekingOpportunities === 0 ? false : true,
                        // Domicile: parseInt(response.PersonalData.Domicile),
                        // YearsOfExperience: parseInt(response.PersonalData.YearsOfExperience)
                    },
                    sourceInvitation: {
                        invitedDate: _.uniqBy(response.InvitationHistoryList, 'InviteDate').map(x => ({ id: x.InviteDate, name: x.InviteDate })),

                        invitedBy: _.uniqBy(response.InvitationHistoryList, 'InvitedBy').map(x => ({ id: x.InvitedBy, name: x.InvitedBy })),
                        
                        company: _.uniqBy(response.InvitationHistoryList, 'CompanyName').map(x => ({ id: x.CompanyName, name: x.CompanyName })),
                        vacancyCode: _.uniqBy(response.InvitationHistoryList, 'VacancyCode').map(x => ({ id: x.VacancyCode, name: x.VacancyCode })),

                        vacancyTitle: _.uniqBy(response.InvitationHistoryList, 'VacancyTitle').map(x => ({ id: x.VacancyTitle, name: x.VacancyTitle })),
                        
                        confirmation: _.uniqBy(response.InvitationHistoryList, 'ConfirmationStatus').map(x => ({ id: x.ConfirmationStatus, name: x.ConfirmationStatus })),
                        confirmationDate: _.uniqBy(response.InvitationHistoryList, 'ConfirmationDate').map(x => ({ id: x.ConfirmationDate, name: x.ConfirmationDate })),
                        source: _.uniqBy(response.InvitationHistoryList, 'Source').map(x => ({ id: x.Source, name: x.Source })),
                    },
                    sourceApplication: {
                        groupEvent: _.uniqBy(response.ApplicationHistoryList, 'GroupEvent').map(x => ({ id: x.GroupEvent, name: x.GroupEvent })),
                        event: _.uniqBy(response.ApplicationHistoryList, 'Event').map(x => ({ id: x.Event, name: x.Event })),
                        eventCode: _.uniqBy(response.ApplicationHistoryList, 'EventCode').map(x => ({ id: x.EventCode, name: x.EventCode })),
                        eventDesc: _.uniqBy(response.ApplicationHistoryList, 'EventDesc').map(x => ({ id: x.EventDesc, name: x.EventDesc })),
                        company: _.uniqBy(response.ApplicationHistoryList, 'Company').map(x => ({ id: x.Company, name: x.Company })),
                        vacancyCode: _.uniqBy(response.ApplicationHistoryList, 'VacancyCode').map(x => ({ id: x.VacancyCode, name: x.VacancyCode })),
                        vacancyTitle: _.uniqBy(response.ApplicationHistoryList, 'VacancyTitle').map(x => ({ id: x.VacancyTitle, name: x.VacancyTitle })),
                        atsPhase: _.uniqBy(response.ApplicationHistoryList, 'ATSPhase').map(x => ({ id: x.ATSPhase, name: x.ATSPhase })),
                        status: _.uniqBy(response.ApplicationHistoryList, 'ApplicationStatus').map(x => ({ id: x.ApplicationStatus, name: x.ApplicationStatus })),
                        date: _.uniqBy(response.ApplicationHistoryList, 'SubmitDate').map(x => ({ id: x.SubmitDate, name: x.SubmitDate })),
                        file: _.uniqBy(response.ApplicationHistoryList, 'FilesList').map(x => ({ id: x.FilesList, name: x.FilesList })),
                    },
                    EducationList: response.EducationList,
                    OrganizationList: response.OrganizationList,
                    JobExperienceList: response.JobExperienceList,
                    InvitationHistoryList: response.InvitationHistoryList,
                    ApplicationHistoryList: response.ApplicationHistoryList
                }
                // console.log("ini adalah data dari saga")
                // console.log(data)
                yield put({ type: types.APPLICANT_FETCH_DETAIL_SUCCESS, data: data })
                yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            } else {
                yield put({ type: types.APPLICANT_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* postDataTag() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        let stateListOfApplicant = yield select(getStateListOfApplicant)
        let body = {
            applicantList: stateListOfApplicant.selectedRowTable.map(x => ({ applicantId: x.ApplicantId }))
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_TAG_POST, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'listTable', value: [] })
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'selectedRowTable', value: [] })
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property:"resetCheckBoxMainTableFlag", value: true })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            let data = {
                data: {
                    pageNo: stateListOfApplicant.pageNo,
                    pageSize: stateListOfApplicant.pageSize,
                    totalRows: stateListOfApplicant.totalRows
                }
            }
            yield call(getDataListOfApplicant, data)
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* postDataRelease() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        let stateListOfApplicant = yield select(getStateListOfApplicant)
        let body = {
            applicantList: stateListOfApplicant.selectedRowTable.map(x => ({ applicantId: x.ApplicantId }))
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_RELEASE_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'listTable', value: [] })
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'selectedRowTable', value: [] })
            yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property:"resetCheckBoxMainTableFlag", value: true })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            let data = {
                data: {
                    pageNo: stateListOfApplicant.pageNo,
                    pageSize: stateListOfApplicant.pageSize,
                    totalRows: stateListOfApplicant.totalRows
                }
            }
            yield call(getDataListOfApplicant, data)
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* getDataActiveVacancy(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        let stateListOfApplicant = yield select(getStateListOfApplicant)

        yield put({
            type: types.APPLICANT_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })

        let body = {
            EventName: stateListOfApplicant.serachVacancy.eventName,
            Company: stateListOfApplicant.serachVacancy.company,
            Category: stateListOfApplicant.serachVacancy.category,
            Function: stateListOfApplicant.serachVacancy.function,
            VacancyTitle: stateListOfApplicant.serachVacancy.vacancyTitle,
            PageNo: param.data.pageNo,
            PageSize: 10
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_ACTIVE_VACANCY_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            yield put({ type: types.APPLICANT_FETCH_ACTIVE_VACANCY_SUCCESS, data: response })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* getDetailActiveVacancy(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
        let stateListOfApplicant = yield select(getStateListOfApplicant)

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
                    VacancyStatusId: dataName.vacancyStatus.VacancyStatusName,
                    VacancyCode: response.Vacancy.VacancyCode,
                    EventId: dataName.event.EventName,
                    PublishDate: response.Vacancy.PublishDate,
                    EndDate: response.Vacancy.EndDate,
                    CompanyId: dataName.company.CompanyName,
                    Category: parseInt(response.Vacancy.Category),
                    JobSpecializationId: dataName.jobSpecialization.JobSpecializationName,
                    GeneralFilterId: dataName.generalFilter ? dataName.generalFilter.GeneralFilteringName : '',
                    JobRequirement: response.Vacancy.JobRequirement,
                    JobDescription: response.Vacancy.JobDescription,
                    CompetenceDescription: response.Vacancy.CompetenceDescription,
                    NotesHistory: response.Vacancy.NotesHistory,
                    PositionId: dataName.position.PositionName,
                    VacancyTitle: response.Vacancy.VacancyTitle,
                    VacancyType: response.Vacancy.VacancyType,
                    FunctionId: dataName.function.VacancyDepartmentTitle,
                    TotalNeeds: response.Vacancy.TotalNeeds,
                    TotalFulfilled: '',
                    // Candidates: response.Vacancy,
                    CreateDate: response.Vacancy.CreateDate,
                    ATSPhaseTypeId: dataName.phaseType.ATSPhaseTypeDescription,
                    Phases: response.Vacancy.Phases
                }
                yield put({ type: types.APPLICANT_FETCH_DETAILS_ACTIVE_VACANCY_SUCCESS, payload: data })
                yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            } else {
                yield put({ type: types.APPLICANT_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* postDataEmailRedactional(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
        let stateListOfApplicant = yield select(getStateListOfApplicant)
        const body = {
            "Activity":"Sourcing - Invite to Join Recruitment",
            "Action": "Invite to Join Recruitment",
            "EmailDetailsId": stateListOfApplicant.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE , body, { headers: Header() });
        if (response.Acknowledge === 1) {
            let data = {
                EmailConfigId: response.EmailConfigId,
                Subject: response.Subject,
                Body: response.Body,
                Signature: response.Signature,
                SenderFrom: response.SenderEmail
            }
            yield call (hitTriggerMasterData)
            yield put({ type: types.APPLICANT_FETCH_EMAIL_REDACTIONAL_SUCCESS, payload: data })
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* postSendInvitationEmail() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        let stateListOfApplicant = yield select(getStateListOfApplicant)
        let applicantList = stateListOfApplicant.filteredSelectedRowTableCandidate.map(x => ({ applicantId: x }))
        // let applicantList = stateListOfApplicant.selectedRowTable.map(x => ({ applicantId: x.ApplicantId }))
        let body = {
            vacancyCode: stateListOfApplicant.selectedRowTableRadioVacancy.vacancyCode,
            applicantList: applicantList,
            emailTemplate: stateListOfApplicant.formEmail
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.APPLICANT_SEND_INVITATION_EMAIL_POST, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            // messages('Info', response.Message, 'info', false)
            let data = {
                data: {
                    pageNo: stateListOfApplicant.pageNo,
                    pageSize: stateListOfApplicant.pageSize,
                    totalRows: stateListOfApplicant.totalRows
                }
            }
            // yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'isShowSelectVacancy', value: false })
            // yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'selectedRowTable', value: [] })
            if (stateListOfApplicant.inviteToJoinStatus.popUpFewAccepted) {
                yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: 'showFewAcceptedModal', value: true})
            } else messages("Info", response.Message, "info", false);

            yield call(getDataListOfApplicant, data)
        } else {
            yield put({ type: types.APPLICANT_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property:"resetCheckBoxMainTableFlag", value: true })
    } catch (error) {
        console.log(error)
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}
export function* getListEmailTemplate() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
         const body = {
            "Activity":"Sourcing - Invite to Join Recruitment",
            "Action": "Invite to Join Recruitment",
            "EmailDetailsId":0
          }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_EMAIL_TEMPLATE, body, { headers: Header() });
        if (response.Acknowledge == 1) {
            if (response.EmailDetails.length>0) yield put({ type: types.APPLICANT_HANDLE_EMAIL_TEMPLATE, property: 'selectedEmailTemplateId', value: response.EmailDetails[0].EmailDetailsId});
          yield put({ type: types.APPLICANT_HANDLE_EMAIL_TEMPLATE, property: 'emailTemplateList', value: response.EmailDetails});
          yield put({ type: types.APPLICANT_HANDLE_EMAIL_TEMPLATE, property: 'emailTemplateTotalRows', value: response.EmailDetails.length });
          yield call (getActivityList)
        }
        else {
          messages("Error", response.Message, "error", false);
        }
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
      } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        messages("Info", "Oops, something wrong !", "info", false);
      }
}

export function* hitTriggerMasterData() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
        let stateListOfApplicant = yield select(getStateListOfApplicant)
      let body = {
        "EmailActivityId": stateListOfApplicant.activityList.find(x=>x.ActivityName === "Sourcing - Invite to Join Recruitment").EmailActivityId
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() });
  
      if (response.Acknowledge == 1) {
        yield put({ type: types.APPLICANT_HANDLE_STATE_GLOBAL, property :'triggerList', value: response.Data.map(x => ({id: x.EmailTriggerId, triggerName: x.Remarks, value: x.TriggerName })) });
      }
      else {
        messages("Error", response.Message, "error", false);
      }
      yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
      messages("Info", "Oops, something wrong !", "info", false);
    }
  }


export function* checkInviteToJoin() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
        let stateListOfApplicant = yield select(getStateListOfApplicant)
        let body = {
                "VacancyCode": stateListOfApplicant.selectedRowTableRadioVacancy.vacancyCode,
                "ApplicantList": stateListOfApplicant.checkInviteToJoinCandidate,
                "EmailTemplate": {
                    "Subject": "TestCheckInvite",
                    "Body": "Test",
                    "Signature": "Test"
                }
        }

        let statusDeclined = false, statusWaiting = false, statusAllAccepted = false, statusFewAccepted = false, statusMaxExtended = false
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_INVITE_TO_JOIN_APPLICANT, body, { headers: Header() });
        if (response.Data.DeclinedApplicants.length>0) statusDeclined = true     //1 
        if (response.Data.WaitingApplicants.length>0) statusWaiting = true      //2
        if (response.Data.AcceptedApplicants.length===stateListOfApplicant.checkInviteToJoinCandidate.length) statusAllAccepted = true //3
        else if (response.Data.AcceptedApplicants.length>0 ) statusFewAccepted = true //4
        if (response.Data.MaxExtendApplicants.length>0) statusMaxExtended = true
        if (response.Acknowledge === 1) {
            if (statusDeclined || statusWaiting || statusAllAccepted || statusFewAccepted || statusMaxExtended) 
                yield put ({type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: "isShowPopUp", value:true})
            else yield put ({type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: "isShowPopUp", value:false})
            yield put ({type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: "inviteToJoinStatus", 
                        value: {
                                popUpDeclined: statusDeclined,
                                popUpWaiting: statusWaiting,
                                popUpAllAccepted: statusAllAccepted,
                                popUpFewAccepted: statusFewAccepted,
                                popUpMaxExtended: statusMaxExtended
                        }})
            yield put ({type: types.APPLICANT_HANDLE_STATE_GLOBAL, property: "inviteToJoinCheckResponse", 
                        value: {
                                waitingApplicants: response.Data.WaitingApplicants,
                                acceptedApplicants: response.Data.AcceptedApplicants,
                                declinedApplicants: response.Data.DeclinedApplicants,
                                expiredApplicants: response.Data.expiredApplicants,
                                extendedApplicants: response.Data.MaxExtendApplicants
                        }})        
        } else {
            messages("Error", response.Message, "error", false);
        }
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })

    } catch (err) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export function* getActivityList() {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() });
  
      if (response.Acknowledge == 1) {
        yield put({ type: types.APPLICANT_HANDLE_EMAIL_TEMPLATE, property: 'activityList', value: response.Data })
      }
      else {
        messages("Error", response.Message, "error", false);
      }
      yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
      messages("Info", "Oops, something wrong !", "info", false);
    }
  }

  export function* fetchDownFlk(param) {
    try {
        yield put({ type: types.APPLICANT_SET_LOADER, value: true })

        const response = yield call(GETBLOB, Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FLK_DOWNLOAD_POST + `?applicantId=${param.applicantId}`, { headers: Header() });

        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
        var blob = new Blob([response], { type: "application/pdf;charset=utf-8" });
        saveAs(blob);

    } catch (err) {
        yield put({ type: types.APPLICANT_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.APPLICANT_FETCH_MATER_DATA, getMasterData),
        takeLatest(types.APPLICANT_FETCH_GET_LIST, getDataListOfApplicant),
        takeLatest(types.APPLICANT_FETCH_GET_DETAIL, getDetail),
        takeLatest(types.APPLICANT_FETCH_TAG, postDataTag),
        takeLatest(types.APPLICANT_FETCH_RELEASE, postDataRelease),
        takeLatest(types.APPLICANT_FETCH_GET_ACTIVE_VACANCY, getDataActiveVacancy),
        takeLatest(types.APPLICANT_FETCH_EMAIL_REDACTIONAL, postDataEmailRedactional),
        takeLatest(types.APPLICANT_FETCH_SEND_INVITATION_EMAIL, postSendInvitationEmail),
        takeLatest(types.APPLICANT_FETCH_DETAILS_ACTIVE_VACANCY, getDetailActiveVacancy),
        takeLatest(types.APPLICANT_CHECK_INVITE_TO_JOIN, checkInviteToJoin),
        takeLatest(types.APPLICANT_GET_LIST_EMAIL_TEMPLATE, getListEmailTemplate),
        takeLatest(types.APPLICANT_GET_TRIGGER_MASTER_DATA, hitTriggerMasterData),
        takeLatest(types.APPLICANT_GET_ACTIVITY_LIST, getActivityList),
        takeLatest(types.APPLICANT_FETCH_DOWNLOAD_FLK, fetchDownFlk)
    ])
}
