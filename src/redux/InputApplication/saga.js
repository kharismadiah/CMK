import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { messages, success } from '../../components/messageBox'
import appAction from './actions'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET } from '../../service/api'
import { HeaderToken, Header, HeaderClient, HeaderMultipartFile } from '../../service/header'
import { takeLatest } from 'redux-saga'
import * as types from '../types'
import moment from 'moment'

const getStateInputApplication = state => state.InputApplication
const getStateLogin = state => state.Auth
const { setLoader } = appAction

export function* hitInputappMasterData() {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let body = {
            MasterData: [
                // { ObjectName: 'YearsOfExperience' }, // DEPRECATED DON'T USE IT AGAIN!!
                { ObjectName: 'Domicile' },
                { ObjectName: 'YearsOfExperienceNew' },
                { ObjectName: 'Degree' },
                { ObjectName: 'InstituteUniversity' },
                { ObjectName: 'OrganizationScope' },
                { ObjectName: 'OrganizationTitle' },
                { ObjectName: 'Major' },
                { ObjectName: 'JobTitle' },
                { ObjectName: 'JobFunction' },
                { ObjectName: 'Vacancy' },
                { ObjectName: 'Emailsuggestionperiod' },
                { ObjectName: 'Salary' },
                { ObjectName: 'PositionType' },
                { ObjectName: 'Industry' },
                { ObjectName: 'Position' },
                { ObjectName: 'Media' }
            ]
        }

        const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, body, { headers: Header() })
        if (resMasterData.Acknowledge == 1) {
            let data = {
                domicileList: resMasterData.DomicileList.map(x => ({ ...x, id: x.DistrictId, name: x.DistrictName })),
                // yearOfExpList: resMasterData.YearsOfExperienceList.map(x => ({ ...x, id: x.Id, name: x.Name })), // DEPRECATED!!
                yearOfExpList: resMasterData.YoeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                degreeList: resMasterData.DegreeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                institutionList: resMasterData.InstituteList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                majorList: resMasterData.MajorList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobTitleList: resMasterData.JobTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobFunctionList: resMasterData.JobFunctionList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationScopeList: resMasterData.OrgScopeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationTitleList: resMasterData.OrgTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                vacancyCodeList: resMasterData.VacancyList.map(x => ({ ...x, id: x.VacancyId, name: x.VacancyCode })),
                emailSuggestionList: resMasterData.EmailSuggestionPeriodList.map(x => ({
                    ...x,
                    id: x.EmailSuggestionPeriodId,
                    name: x.PeriodName
                })),
                salaryList: resMasterData.SalaryList.map(x => ({ ...x, id: x.SalaryId, name: x.SalaryRange })),
                positionTypeList: resMasterData.PositionTypeList.map(x => ({
                    ...x,
                    id: x.PositionTypeId,
                    name: x.PositionTypeName
                })),
                industryList: resMasterData.IndustryList.map(x => ({ ...x, id: x.IndustryId, name: x.IndustryName })),
                positionList: resMasterData.PositionList.map(x => ({ ...x, id: x.PositionId, name: x.PositionName })),
                // mediaList: resMasterData.MediaList.map(x => ({ ...x, id: x.MediaId, name: x.MediaName })), // USE MediaCode intead id (request be)
                mediaList: resMasterData.MediaList.map(x => ({ ...x, id: x.MediaCode, name: x.MediaName }))
            }
            yield put({ type: types.SET_INPUTAPP_MASTERDATA, value: data })
        } else {
            messages('Error', resMasterData.Message, 'error', false)
        }
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitgetInputappList(data) {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let value = data.data
        let field = data.field
        let body = {}
        if (field === 'search') {
            body = {
                vacancyCode: inputApplication.vacancyCodeSearch,
                candidateId: inputApplication.candidateId,
                candidateName: inputApplication.candidateName,
                gender: inputApplication.Gender,
                pageNo: value,
                pageSize: 10
            }
        } else {
            body = {
                vacancyCode: '',
                candidateId: '',
                candidateName: '',
                gender: '',
                pageNo: inputApplication.pageNo,
                pageSize: 10
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.APP_LIST, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({ type: types.SET_INPUTAPP_LIST, value: response.applicationList })
            yield put({ type: types.HANDLE_STATE_INPUTAPP, field: 'totalRows', value: response.TotalRecords })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitCreateApplication(data) {
    try {
        //
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let history = data.data
        let from = data.field
        let formData = new FormData()
        let dataModel = {}
        let link = ''
        let vacancyCode,
            domicile,
            yoeYear,
            yoeMonth,
            personalData,
            educationList,
            organizationList,
            jobExperienceList,
            InternshipList
        if (from == 'create') {
            link = Endpoint.APP_CREATE
            vacancyCode = inputApplication.vacancyCodeList.find(obj => obj.id == inputApplication.vacancyCode)
            domicile =
                inputApplication.personalData.Domicile !== ''
                    ? inputApplication.domicileList.find(obj => obj.id === inputApplication.personalData.Domicile)
                    : ''
        }
        if (from == 'update') {
            //update
            link = Endpoint.APP_UPDATE
            vacancyCode = inputApplication.vacancyCodeList.find(obj => obj.id == inputApplication.vacancyCode)
            domicile =
                inputApplication.personalData.Domicile != ''
                    ? inputApplication.domicileList.find(obj => obj.id == inputApplication.personalData.Domicile)
                    : ''
        }
        InternshipList = inputApplication.internshipList.map(x => ({
            InstitutionName: x.CompanyName,
            StartDate: moment(x.startDateString).format('MM-YYYY'),
            EndDate: x.IsPresent ? '01-9999' : moment(x.endDateString).format('MM-YYYY'),
            JobDesc: x.JobDesc,
            InternFuction: x.Function,
            InternIndustry: x.Industry,
            InternIndustryOther: x.IndustryOther == undefined ? '' : x.IndustryOther
        }))
        personalData = {
            FullName: inputApplication.personalData.FullName,
            Email: inputApplication.personalData.Email,
            DateOfBirth:
                inputApplication.personalData.DateOfBirth == ''
                    ? ''
                    : moment(inputApplication.personalData.DateOfBirth, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            Gender: inputApplication.personalData.Gender == 1 ? 'Male' : 'Female',
            Domicile: domicile.name,
            DomicileOther: inputApplication.personalData.DomicileOther,
            PhoneNumber: inputApplication.personalData.PhoneNumber,
            YoeYear: inputApplication.personalData.YoeYear,
            YoeMonth: inputApplication.personalData.YoeMonth,
            SalaryId: inputApplication.personalData.ExpectedSalary,
            SeekingOpportunity: inputApplication.personalData.SeekingOpportunity
        }

        educationList = inputApplication.educationList.map(obj => ({
            DegreeId: obj.DegreeId,
            InstituteUniversityId: obj.InstituteUniversityId,
            Institution: obj.Institution,
            InstitutionOther: obj.InstitutionOther,
            MajorId: obj.MajorId,
            Major: obj.Major,
            MajorOther: obj.MajorOther,
            StartYear: obj.StartYear,
            GraduatedYear: obj.GraduatedYear,
            GPA: parseFloat(obj.GPA),
            GPAMax: parseFloat(obj.GPAMax),
            IsPresent: obj.IsPresent
        }))

        organizationList = inputApplication.organizationList.map(x => ({
            // ...x,
            OrganizationName: x.OrganizationName,
            Scope: x.Scope,
            Title: x.Title
        }))

        jobExperienceList = inputApplication.jobExperienceList.map(x => ({
            // ...x,
            CompanyName: x.CompanyName,
            Position: x.Position,
            jobTitleId: x.Title,
            JobFunctionId: x.Function,
            JobFunctionId2: x.Function2,
            JobFunctionName2: x.Function2Name,
            JobFunctionId3: x.Function3,
            JobFunctionName3: x.Function3Name,
            IndustryId: x.Industry,
            IndustryOther: x.IndustryOther,
            StartDate: moment(x.internStartDate).format('MM-YYYY'),
            EndDate: moment(x.internEndDate).format('MM-YYYY'),
            // "Present": x.Present ? 1 : 0,
            Main_Job_1: x.Main_Job_1,
            Main_Job_2: x.Main_Job_2,
            Main_Job_3: x.Main_Job_3,
            PositionTypeId: x.PositionType
        }))

        const isProHire = () => {
            let yoeFromPro = inputApplication.yearOfExpList.filter(x => x.YoeCategoryName.includes('Professional'))[0]
                .YoeFrom
            let totalMonth =
                parseInt(inputApplication.personalData.YoeYear, 10) * 12 +
                parseInt(inputApplication.personalData.YoeMonth, 10)
            let isProHire = totalMonth >= yoeFromPro ? true : false
            return isProHire
        }

        // Candidate is PRO
        // let jonExpInMonth = (parseInt(inputApplication.personalData.YoeYear, 10) / 12);
        // let isPro = jonExpInMonth ? (parseInt(jonExpInMonth, 10) > 3 ? true : false) : false
        // let category = ''

        if (inputApplication.vacancyCode === '' || inputApplication.vacancyCode === null) {
            messages('Info', 'Please input the Vacancy Code', 'info', false)
        }

        if (educationList.length === 0) {
            messages('Info', 'Please input Education', 'info', false)
        }

        // let jobExp = inputApplication.personalData.YoeYear > 3 ? true : false
        if (isProHire() && jobExperienceList.length === 0) {
            //   category = inputApplication.yearOfExpList.find(x => x.id === inputApplication.personalData.YearsOfExperience).Category
            //   if(category === "Fresh Graduate/Student") {jobExp = false}
            messages('Info', 'Please input the Job Experience', 'info', false)
        } else {
            dataModel = {
                VacancyCode: vacancyCode.VacancyCode,
                VacancyId: inputApplication.vacancyCode,
                SeekingJobStatusId: inputApplication.personalData.SeekingOpportunity,
                EmailSuggestionPeriodId:
                    inputApplication.personalData.PeriodEmailSuggest === ''
                        ? null
                        : inputApplication.personalData.PeriodEmailSuggest,
                PersonalData: personalData,
                activity: inputApplication.personalData.activity,
                EducationList: educationList,
                OrganizationList: organizationList,
                JobExperienceList: jobExperienceList,
                InternshipList: InternshipList
            }
            formData.append('Model', JSON.stringify(dataModel))
            formData.append('CVUrl', inputApplication.personalData.cvRaw)
            formData.append('ProfilePicUrl', inputApplication.personalData.profilePictureRaw)
            const response = yield call(POST, Config.BASE_URL + link, formData, { headers: HeaderMultipartFile() })

            if (response.Acknowledge == 1) {
                messages('Success', response.Message, 'success', false)
                yield put({ type: types.INPUT_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, value: true })
                if (from == 'create') {
                    if (response.ListNonRegistered.length > 0) {
                        let data = response.ListNonRegistered.map(x => ({ applicantId: x.ApplicantId }))
                        yield put({
                            type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                            property: 'listApplicantNonRegis',
                            value: data
                        })
                        yield put({
                            type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                            property: 'applicantRegisStatus',
                            value: 'non regis'
                        })
                    } else if (response.ListRegistered.length > 0) {
                        let data = response.ListRegistered.map(x => ({ applicantId: x.ApplicantId }))
                        yield put({
                            type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                            property: 'listApplicantRegis',
                            value: data
                        })
                        yield put({
                            type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                            property: 'applicantRegisStatus',
                            value: 'regis'
                        })
                    }
                    yield call(getListEmailTemplate)
                } else history.goBack()
            } else {
                messages('Info', response.Message, 'info', false)
            }
        }

        // else if (jobExp && jobExperienceList.length === 0) {
        //     messages('Info', 'Please input the Job Experience', 'info', false)
        // }

        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* hitGetInputappDetails(data) {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let id = data.data
        let body = {}
        let bodyMaster = {
            MasterData: [
                { ObjectName: 'Domicile' },
                { ObjectName: 'YearsOfExperience' },
                { ObjectName: 'Degree' },
                { ObjectName: 'InstituteUniversity' },
                { ObjectName: 'OrganizationScope' },
                { ObjectName: 'OrganizationTitle' },
                { ObjectName: 'Major' },
                { ObjectName: 'JobTitle' },
                { ObjectName: 'JobFunction' },
                { ObjectName: 'Vacancy' },
                { ObjectName: 'Emailsuggestionperiod' },
                { ObjectName: 'Salary' },
                { ObjectName: 'PositionType' },
                { ObjectName: 'Industry' },
                { ObjectName: 'Position' }
            ]
        }

        const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, bodyMaster, {
            headers: Header()
        })
        if (resMasterData.Acknowledge == 1) {
            data = {
                domicileList: resMasterData.DomicileList.map(x => ({ ...x, id: x.DistrictId, name: x.DistrictName })),
                yearOfExpList: resMasterData.YearsOfExperienceList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                degreeList: resMasterData.DegreeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                institutionList: resMasterData.InstituteList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                majorList: resMasterData.MajorList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobTitleList: resMasterData.JobTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                jobFunctionList: resMasterData.JobFunctionList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationScopeList: resMasterData.OrgScopeList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                organizationTitleList: resMasterData.OrgTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
                vacancyCodeList: resMasterData.VacancyList.map(x => ({ ...x, id: x.VacancyId, name: x.VacancyCode })),
                emailSuggestionList: resMasterData.EmailSuggestionPeriodList.map(x => ({
                    ...x,
                    id: x.EmailSuggestionPeriodId,
                    name: x.PeriodName
                })),
                salaryList: resMasterData.SalaryList.map(x => ({ ...x, id: x.SalaryId, name: x.SalaryRange })),
                positionTypeList: resMasterData.PositionTypeList.map(x => ({
                    ...x,
                    id: x.PositionTypeId,
                    name: x.PositionTypeName
                })),
                industryList: resMasterData.IndustryList.map(x => ({ ...x, id: x.IndustryId, name: x.IndustryName })),
                positionList: resMasterData.PositionList.map(x => ({ ...x, id: x.PositionId, name: x.PositionName }))
            }
            yield put({ type: types.SET_INPUTAPP_MASTERDATA, value: data })

            const response = yield call(GET, Config.BASE_URL + Endpoint.APP_DETAILS + id, { headers: Header() })
            if (response.Acknowledge == 1) {
                yield put({ type: types.SET_INPUTAPP_DETAILS, value: response })
            } else {
                messages('Error', response.Message, 'error', false)
            }
        } else {
            messages('Error', resMasterData.Message, 'error', false)
        }

        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* getListEmailTemplate() {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        const body = {
            Activity:
                inputApplication.applicantRegisStatus === 'non regis'
                    ? 'Input Application - Not Registered User'
                    : 'Input Application - Registered',
            Action: 'Submit',
            EmailDetailsId: 0
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_EMAIL_TEMPLATE, body, { headers: Header() })
        if (response.Acknowledge == 1) {
            if (response.EmailDetails.length > 0)
                yield put({
                    type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                    property: 'selectedEmailTemplateId',
                    value: response.EmailDetails[0].EmailDetailsId
                })
            yield put({
                type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                property: 'emailTemplateList',
                value: response.EmailDetails
            })
            yield put({
                type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                property: 'emailTemplateTotalRows',
                value: response.EmailDetails.length
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* getEmailTemplate() {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        const body = {
            Activity:
                inputApplication.selectedEmailTemplateId !== null
                    ? inputApplication.applicantRegisStatus === 'non regis'
                        ? 'Input Application - Not Registered User'
                        : 'Input Application - Registered'
                    : '',
            Action: inputApplication.selectedEmailTemplateId !== null ? 'Submit' : '',
            EmailDetailsId: inputApplication.selectedEmailTemplateId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE, body, { headers: Header() })
        const response2 = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() })
        if (response.Acknowledge === 1 && response2.Acknowledge === 1) {
            let data = {
                visible: true,
                EmailConfigId: response.EmailConfigId,
                subject: response.Subject,
                body: response.Body,
                signature: response.Signature
            }
            yield put({
                type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                property: 'activityList',
                value: response2.Data.map(x => ({ ...x, id: x.EmailActivityId, name: x.ActivityName }))
            })

            yield put({ type: types.INPUT_APPLICATION_FETCH_EMAIL_TEMPLATE_SUCCESS, payload: data })
            yield put({ type: types.SET_INPUTAPP_LOADER, value: false })

            yield call(hitTriggerMasterData)
        } else {
            yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Error', response.Message, 'error', false)
    }
}

export function* sendEmailNotification(data) {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let history = data.data
        let body = {
            vacancyCode: inputApplication.vacancyCodeList.find(obj => obj.id == inputApplication.vacancyCode)
                .VacancyCode,
            applicantList:
                inputApplication.listApplicantNonRegis.length > 0
                    ? inputApplication.listApplicantNonRegis
                    : inputApplication.listApplicantRegis,
            emailTemplate: {
                subject: inputApplication.modalEmail.subject,
                body: inputApplication.modalEmail.body,
                signature: inputApplication.modalEmail.signature
            },
            source: "Input"
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.INPUT_UPLOAD_APP_SEND_EMAIL, body, {
            headers: Header()
        })

        if (response.Acknowledge === 1) {
            messages('Info', response.Message, 'info', false)
            yield put({ type: types.INPUT_APPLICATION_HANDLE_STATE_MODAL_EMAIL, property: 'visible', value: false })
            setTimeout(() => {
                history.goBack()
            }, 1500)
        } else {
            yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    }
}

export function* hitTriggerMasterData() {
    try {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: true })
        const inputApplication = yield select(getStateInputApplication)
        let activity =
            inputApplication.applicantRegisStatus === 'non regis'
                ? 'Input Application - Not Registered User'
                : 'Input Application - Registered'
        let body = {
            EmailActivityId: inputApplication.activityList.find(x => x.ActivityName === activity).EmailActivityId
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() })

        if (response.Acknowledge == 1) {
            yield put({
                type: types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL,
                property: 'triggerList',
                value: response.Data.map(x => ({ id: x.EmailTriggerId, triggerName: x.Remarks, value: x.TriggerName }))
            })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUTAPP_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.GET_INPUTAPP_LIST, hitgetInputappList),
        takeLatest(types.GET_INPUTAPP_MASTERDATA, hitInputappMasterData),
        takeLatest(types.CREATE_APPLICATION, hitCreateApplication),
        takeLatest(types.GET_INPUTAPP_DETAILS, hitGetInputappDetails),
        takeLatest(types.INPUT_APPLICATION_GET_LIST_EMAIL_TEMPLATE, getListEmailTemplate),
        takeLatest(types.INPUT_APPLICATION_GET_EMAIL_TEMPLATE, getEmailTemplate),
        takeLatest(types.INPUT_APPLCIATION_SEND_EMAIL_NOTIFICATION, sendEmailNotification),
        takeLatest(types.INPUT_APPLICATION_GET_TRIGGER_MASTER_DATA, hitTriggerMasterData)
    ])
}
