import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET, DELETE, PUT } from '../../service/api'
import { messages } from '../../components/messageBox'
import { Header } from '../../service/header'
import moment from 'moment'

const getStateMaintainGeneralFilter = state => state.MaintainGeneralFilter

export function* getMasterData() {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })
        let body = {
            MasterData: [
                {
                    ObjectName: 'Domicile'
                },
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
                    ObjectName: 'AgeRange'
                },
                {
                    ObjectName: 'GPARange'
                },
                {
                    ObjectName: 'GraduationYearRange'
                },
                {
                    ObjectName: 'EducationYearRange'
                },
                {
                    ObjectName: 'YearsOfExperience'
                },
                { ObjectName: 'Salary' },
                { ObjectName: 'PositionType' },
                { ObjectName: 'Industry' }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })

        if (resMasterData.Acknowledge === 1) {
            let data = {
                age: resMasterData.AgeRangeList.map(x => ({ id: x.Id, name: x.Name })),
                domicile: resMasterData.DomicileList.map(x => ({ id: x.DistrictId, name: x.DistrictName })),
                degree: resMasterData.DegreeList.map(x => ({ id: x.Id, name: x.Name })),
                intitute: resMasterData.InstituteList.map(x => ({ id: x.Id, name: x.Name })),
                major: resMasterData.MajorList.map(x => ({ id: x.Id, name: x.Name })),
                gpa: resMasterData.GPARangeList.map(x => ({ id: x.Id, name: x.Name })),
                startYear: resMasterData.EducationYearRangeList.map(x => ({ id: x.Id, name: x.Name })),
                graduaationYear: resMasterData.GraduationYearRangeList.map(x => ({ id: x.Id, name: x.Name })),
                scope: resMasterData.OrgScopeList.map(x => ({ id: x.Id, name: x.Name })),
                title: resMasterData.OrgTitleList.map(x => ({ id: x.Id, name: x.Name })),
                titleJob: resMasterData.JobTitleList.map(x => ({ id: x.Id, name: x.Name })),
                function: resMasterData.JobFunctionList.map(x => ({ id: x.Id, name: x.Name })),
                yearOfExperience: resMasterData.YearsOfExperienceList.map(x => ({ id: x.Id, name: x.Name })),
                expectedSalary: resMasterData.SalaryList.map(x => ({ ...x, id: x.SalaryId, name: x.SalaryRange })),
                industry: resMasterData.IndustryList.map(x => ({ ...x, id: x.IndustryId, name: x.IndustryName })),
                positionType: resMasterData.PositionTypeList.map(x => ({
                    ...x,
                    id: x.PositionTypeId,
                    name: x.PositionTypeName
                }))
            }
            yield put({ type: types.GN_FILTER_MASTER_DATA_SUCCESS, data: data })
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export function* fetchSearch(param) {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })

        let stateMaintainGeneralFilter = yield select(getStateMaintainGeneralFilter)
        let { generalFilterCode, generalFilterName, generalFilterDesc } = stateMaintainGeneralFilter.search
        yield put({
            type: types.GN_HANDLE_STATE_PAGINATION,
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            totalRows: param.data.totalRows
        })
        let body = {
            pageNo: param.data.pageNo,
            pageSize: param.data.pageSize,
            GeneralFilterCode: generalFilterCode,
            GeneralFilterName: generalFilterName,
            GeneralFilterDescription: generalFilterDesc
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GN_FILTER_LIST_POST, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            yield put({ type: types.GN_FILTER_FETCH_SEARCH_SUCCESS, data: response })
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export function* fetchDelete(param) {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })

        let stateMaintainGeneralFilter = yield select(getStateMaintainGeneralFilter)
        let { pageNo, pageSize, totalRows } = stateMaintainGeneralFilter

        const response = yield call(
            DELETE,
            Config.BASE_URL + Endpoint.GN_FILTER_DELETE_DEL + `?id=${param.id}`,
            {},
            { headers: Header() }
        )

        if (response.Acknowledge === 1) {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)

            let data = {
                data: {
                    pageNo,
                    pageSize,
                    totalRows
                }
            }
            yield call(fetchSearch, data)
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export function* fetchDetail(param) {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })

        let body = {
            MasterData: [
                {
                    ObjectName: 'Domicile'
                },
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
                    ObjectName: 'AgeRange'
                },
                {
                    ObjectName: 'GPARange'
                },
                {
                    ObjectName: 'GraduationYearRange'
                },
                {
                    ObjectName: 'EducationYearRange'
                },
                {
                    ObjectName: 'YearsOfExperience'
                },
                { ObjectName: 'Salary' },
                { ObjectName: 'PositionType' },
                { ObjectName: 'Industry' }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })
        //
        if (resMasterData.Acknowledge === 1) {
            let data = {
                age: resMasterData.AgeRangeList.map(x => ({ id: x.Id, name: x.Name })),
                domicile: resMasterData.DomicileList.map(x => ({ id: x.DistrictId, name: x.DistrictName })),
                degree: resMasterData.DegreeList.map(x => ({ id: x.Id, name: x.Name })),
                intitute: resMasterData.InstituteList.map(x => ({ id: x.Id, name: x.Name })),
                major: resMasterData.MajorList.map(x => ({ id: x.Id, name: x.Name })),
                gpa: resMasterData.GPARangeList.map(x => ({ id: x.Id, name: x.Name })),
                startYear: resMasterData.EducationYearRangeList.map(x => ({ id: x.Id, name: x.Name })),
                graduaationYear: resMasterData.GraduationYearRangeList.map(x => ({ id: x.Id, name: x.Name })),
                scope: resMasterData.OrgScopeList.map(x => ({ id: x.Id, name: x.Name })),
                title: resMasterData.OrgTitleList.map(x => ({ id: x.Id, name: x.Name })),
                titleJob: resMasterData.JobTitleList.map(x => ({ id: x.Id, name: x.Name })),
                function: resMasterData.JobFunctionList.map(x => ({ id: x.Id, name: x.Name })),
                yearOfExperience: resMasterData.YearsOfExperienceList.map(x => ({ id: x.Id, name: x.Name })),
                expectedSalary: resMasterData.SalaryList.map(x => ({ ...x, id: x.SalaryId, name: x.SalaryRange })),
                industry: resMasterData.IndustryList.map(x => ({ ...x, id: x.IndustryId, name: x.IndustryName })),
                positionType: resMasterData.PositionTypeList.map(x => ({
                    ...x,
                    id: x.PositionTypeId,
                    name: x.PositionTypeName
                }))
            }
            yield put({ type: types.GN_FILTER_MASTER_DATA_SUCCESS, data: data })

            const response = yield call(GET, Config.BASE_URL + Endpoint.GN_FILTER_DETAIL_GET + `?id=${param.id}`, {
                headers: Header()
            })

            if (response.Acknowledge === 1) {
                const monthFrom =
                    response.YearsOfExperienceMonthFrom < 10
                        ? `0${response.YearsOfExperienceMonthFrom}`
                        : response.YearsOfExperienceMonthFrom
                const monthTo =
                    response.YearsOfExperienceMonthTo < 10
                        ? `0${response.YearsOfExperienceMonthTo}`
                        : response.YearsOfExperienceMonthTo
                let data = {
                    generalFilterCode: response.GeneralFilterCode,
                    generalFilterName: response.GeneralFilterName,
                    generalFilterDesc: response.GeneralFilterDescription,
                    gender: response.Gender !== '' ? response.Gender.split(',') : [],
                    age: response.AgeFrom,
                    ageTo: response.AgeTo,
                    domicile: response.Domicile !== '' ? response.Domicile.split(',').map(x => parseInt(x)) : [],
                    domicileExclude: response.DomicileExclude === 0 ? false : true,
                    degree: response.Degree !== '' ? response.Degree.split(',').map(x => parseInt(x)) : [],
                    degreeExclude: response.DegreeExclude === 0 ? false : true,
                    intitute: response.Institute !== '' ? response.Institute.split(',').map(x => parseInt(x)) : [],
                    intituteExclude: response.InstituteExclude === 0 ? false : true,
                    major: response.Major !== '' ? response.Major.split(',').map(x => parseInt(x)) : [],
                    majorExclude: response.MajorExclude === 0 ? false : true,
                    gpa: response.GPAFrom,
                    gpaTo: response.GPATo,
                    startYear: response.EducationStartYearFrom,
                    startYearTo: response.EducationStartYearTo,
                    graduaationYear: response.EducationGraduationYearFrom,
                    graduaationYearTo: response.EducationGraduationYearTo,
                    scope:
                        response.OrganizationScope !== ''
                            ? response.OrganizationScope.split(',').map(x => parseInt(x))
                            : [],
                    scopeExclude: response.OrganizationScopeExclude === 0 ? false : true,
                    title:
                        response.OrganizationTitle !== ''
                            ? response.OrganizationTitle.split(',').map(x => parseInt(x))
                            : [],
                    titleExclude: response.OrganizationTitleExclude === 0 ? false : true,
                    titleJob:
                        response.JobExperienceTitle !== ''
                            ? response.JobExperienceTitle.split(',').map(x => parseInt(x))
                            : [],
                    titleJobExclude: response.JobExperienceTitleExclude === 0 ? false : true,
                    function: response.JobFunction !== '' ? response.JobFunction.split(',').map(x => parseInt(x)) : [],
                    functionExclude: response.JobFunctionExclude === 0 ? false : true,
                    yeoYearFrom: response.YearsOfExperienceYearFrom,
                    yeoMonthFrom: response.YearsOfExperienceMonthFrom,
                    yeoYearTo: response.YearsOfExperienceYearTo,
                    yeoMonthTo: response.YearsOfExperienceMonthTo,
                    expectedSalary:
                        response.ExpectedSalary !== '' ? response.ExpectedSalary.split(',').map(x => parseInt(x)) : [],
                    expectedSalaryExclude:
                        response.ExpectedSalaryExclude === 0 || response.ExpectedSalaryExclude === false ? false : true,
                    industry: response.Industry !== '' ? response.Industry.split(',').map(x => parseInt(x)) : [],
                    industryExclude:
                        response.IndustryExclude === 0 || response.IndustryExclude === false ? false : true,
                    positionType:
                        response.PositionType !== '' ? response.PositionType.split(',').map(x => parseInt(x)) : [],
                    positionTypeExclude:
                        response.PositionTypeExclude === 0 || response.PositionTypeExclude === false ? false : true,
                    functionInternship: response.InternFunction
                        ? response.InternFunction !== ''
                            ? response.InternFunction.split(',').map(x => parseInt(x))
                            : []
                        : [],
                    functionExcludeInternship: response.InternFunctionExclude
                        ? response.InternFunctionExclude === 0 || response.InternFunctionExclude === false
                            ? false
                            : true
                        : false,
                    industryInternship: response.InternIndustry
                        ? response.InternIndustry !== ''
                            ? response.InternIndustry.split(',').map(x => parseInt(x))
                            : []
                        : [],
                    industryExcludeInternship: response.InternIndustryExclude
                        ? response.InternIndustryExclude === 0 || response.InternIndustryExclude === false
                            ? false
                            : true
                        : false,
                    startDateInternship: response.InternStartDateFrom !== undefined ? moment(response.InternStartDateFrom) : '',
                    startDateToInternship: response.InternStartDateTo !== undefined ? moment(response.InternStartDateTo) : '',
                    endDateInternship: response.InternEndDateFrom !== undefined ? moment(response.InternEndDateFrom) : '',
                    endDateToInternship: response.InternEndDateTo !== undefined ? moment(response.InternEndDateTo) : ''
                }
                //
                yield put({ type: types.GN_FILTER_FETCH_DETAIL_SUCCESS, data })
                yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            } else {
                yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
                messages('Error', response.Message, 'error', false)
            }
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', resMasterData.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export function* fetchEdit(param) {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })

        let stateMaintainGeneralFilter = yield select(getStateMaintainGeneralFilter)

        let body = {
            GeneralFilterId: param.id,
            GeneralFilterCode: stateMaintainGeneralFilter.form.generalFilterCode,
            GeneralFilterName: stateMaintainGeneralFilter.form.generalFilterName,
            GeneralFilterDescription: stateMaintainGeneralFilter.form.generalFilterDesc,
            Gender: stateMaintainGeneralFilter.form.gender.join(','),
            AgeFrom: stateMaintainGeneralFilter.form.age,
            AgeTo: stateMaintainGeneralFilter.form.ageTo,

            YearsOfExperienceYearFrom: typeof stateMaintainGeneralFilter.form.yeoYearFrom === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoYearFrom, 10)
                : stateMaintainGeneralFilter.form.yeoYearFrom,
            YearsOfExperienceMonthFrom: typeof  stateMaintainGeneralFilter.form.yeoMonthFrom === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoMonthFrom, 10)
                : stateMaintainGeneralFilter.form.yeoMonthFrom,
            YearsOfExperienceYearTo: typeof stateMaintainGeneralFilter.form.yeoYearTo === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoYearTo, 10)
                : stateMaintainGeneralFilter.form.yeoYearTo,
            YearsOfExperienceMonthTo: typeof stateMaintainGeneralFilter.form.yeoMonthTo === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoMonthTo, 10)
                : stateMaintainGeneralFilter.form.yeoMonthTo,

            Domicile: stateMaintainGeneralFilter.form.domicile.join(','),
            DomicileExclude: stateMaintainGeneralFilter.form.domicileExclude === true ? 1 : 0,
            Degree: stateMaintainGeneralFilter.form.degree.join(','),
            DegreeExclude: stateMaintainGeneralFilter.form.degreeExclude === true ? 1 : 0,
            Institute: stateMaintainGeneralFilter.form.intitute.join(','),
            InstituteExclude: stateMaintainGeneralFilter.form.intituteExclude === true ? 1 : 0,
            Major: stateMaintainGeneralFilter.form.major.join(','),
            MajorExclude: stateMaintainGeneralFilter.form.majorExclude === true ? 1 : 0,
            GPAFrom: stateMaintainGeneralFilter.form.gpa,
            GPATo: stateMaintainGeneralFilter.form.gpaTo,
            EducationStartYearFrom: stateMaintainGeneralFilter.form.startYear,
            EducationStartYearTo: stateMaintainGeneralFilter.form.startYearTo,
            EducationGraduationYearFrom: stateMaintainGeneralFilter.form.graduaationYear,
            EducationGraduationYearTo: stateMaintainGeneralFilter.form.graduaationYearTo,
            OrganizationScope: stateMaintainGeneralFilter.form.scope.join(','),
            OrganizationScopeExclude: stateMaintainGeneralFilter.form.scopeExclude === true ? 1 : 0,
            OrganizationTitle: stateMaintainGeneralFilter.form.title.join(','),
            OrganizationTitleExclude: stateMaintainGeneralFilter.form.titleExclude === true ? 1 : 0,
            JobExperienceTitle: stateMaintainGeneralFilter.form.titleJob.join(','),
            JobExperienceTitleExclude: stateMaintainGeneralFilter.form.titleJobExclude === true ? 1 : 0,
            JobFunction: stateMaintainGeneralFilter.form.function.join(','),
            JobFunctionExclude: stateMaintainGeneralFilter.form.functionExclude === true ? 1 : 0,
            ExpectedSalary: stateMaintainGeneralFilter.form.expectedSalary.join(','),
            ExpectedSalaryExclude: stateMaintainGeneralFilter.form.expectedSalaryExclude === true ? 1 : 0,
            PositionType: stateMaintainGeneralFilter.form.positionType.join(','),
            PositionTypeExclude: stateMaintainGeneralFilter.form.positionTypeExclude === true ? 1 : 0,
            Industry: stateMaintainGeneralFilter.form.industry.join(','),
            IndustryExclude: stateMaintainGeneralFilter.form.industryExclude === true ? 1 : 0,
            InternIndustry: stateMaintainGeneralFilter.form.industryInternship.join(','),
            InternFunction: stateMaintainGeneralFilter.form.functionInternship.join(','),
            InternFunctionExclude: stateMaintainGeneralFilter.form.functionExcludeInternship === true ? 1 : 0,
            InternIndustryExclude: stateMaintainGeneralFilter.form.industryExcludeInternship, // harus boolean di kirim ke server
            InternStartDateFrom:
                stateMaintainGeneralFilter.form.startDateInternship == ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.startDateInternship).format('MM-YYYY'),
            InternStartDateTo:
                stateMaintainGeneralFilter.form.startDateToInternship == ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.startDateToInternship).format('MM-YYYY'),
            InternEndDateFrom:
                stateMaintainGeneralFilter.form.endDateInternship == ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.endDateInternship).format('MM-YYYY'),
            InternEndDateTo:
                stateMaintainGeneralFilter.form.endDateToInternship == ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.endDateToInternship).format('MM-YYYY')
        }

        const response = yield call(PUT, Config.BASE_URL + Endpoint.GN_FILTER_UPDATE_PUT, body, { headers: Header() })

        if (response.Acknowledge === 1) {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            param.history.goBack()
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export function* fetchSubmit(param) {
    try {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: true })
        //
        let stateMaintainGeneralFilter = yield select(getStateMaintainGeneralFilter)
        let body = {
            GeneralFilterName: stateMaintainGeneralFilter.form.generalFilterName,
            GeneralFilterDescription: stateMaintainGeneralFilter.form.generalFilterDesc,
            Gender: stateMaintainGeneralFilter.form.gender.join(','),
            AgeFrom: stateMaintainGeneralFilter.form.age,
            AgeTo: stateMaintainGeneralFilter.form.ageTo,
            YearsOfExperienceYearFrom: typeof stateMaintainGeneralFilter.form.yeoYearFrom === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoYearFrom, 10)
                : stateMaintainGeneralFilter.form.yeoYearFrom,
            YearsOfExperienceMonthFrom: typeof stateMaintainGeneralFilter.form.yeoMonthFrom === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoMonthFrom, 10)
                : stateMaintainGeneralFilter.form.yeoMonthFrom,
            YearsOfExperienceYearTo: typeof stateMaintainGeneralFilter.form.yeoYearTo === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoYearTo, 10)
                : stateMaintainGeneralFilter.form.yeoYearTo,
            YearsOfExperienceMonthTo: typeof stateMaintainGeneralFilter.form.yeoMonthTo === 'string'
                ? parseInt(stateMaintainGeneralFilter.form.yeoMonthTo, 10)
                : stateMaintainGeneralFilter.form.yeoMonthTo,
            Domicile: stateMaintainGeneralFilter.form.domicile.join(','),
            DomicileExclude: stateMaintainGeneralFilter.form.domicileExclude === true ? 1 : 0,
            Degree: stateMaintainGeneralFilter.form.degree.join(','),
            DegreeExclude: stateMaintainGeneralFilter.form.degreeExclude === true ? 1 : 0,
            Institute: stateMaintainGeneralFilter.form.intitute.join(','),
            InstituteExclude: stateMaintainGeneralFilter.form.intituteExclude === true ? 1 : 0,
            Major: stateMaintainGeneralFilter.form.major.join(','),
            MajorExclude: stateMaintainGeneralFilter.form.majorExclude === true ? 1 : 0,
            GPAFrom: stateMaintainGeneralFilter.form.gpa,
            GPATo: stateMaintainGeneralFilter.form.gpaTo,
            EducationStartYearFrom: stateMaintainGeneralFilter.form.startYear,
            EducationStartYearTo: stateMaintainGeneralFilter.form.startYearTo,
            EducationGraduationYearFrom: stateMaintainGeneralFilter.form.graduaationYear,
            EducationGraduationYearTo: stateMaintainGeneralFilter.form.graduaationYearTo,
            OrganizationScope: stateMaintainGeneralFilter.form.scope.join(','),
            OrganizationScopeExclude: stateMaintainGeneralFilter.form.scopeExclude === true ? 1 : 0,
            OrganizationTitle: stateMaintainGeneralFilter.form.title.join(','),
            OrganizationTitleExclude: stateMaintainGeneralFilter.form.titleExclude === true ? 1 : 0,
            JobExperienceTitle: stateMaintainGeneralFilter.form.titleJob.join(','),
            JobExperienceTitleExclude: stateMaintainGeneralFilter.form.titleJobExclude === true ? 1 : 0,
            JobFunction: stateMaintainGeneralFilter.form.function.join(','),
            JobFunctionExclude: stateMaintainGeneralFilter.form.functionExclude == true ? 1 : 0,
            ExpectedSalary:
                stateMaintainGeneralFilter.form.expectedSalary.length == 0
                    ? ''
                    : stateMaintainGeneralFilter.form.expectedSalary.join(','),
            ExpectedSalaryExclude: stateMaintainGeneralFilter.form.expectedSalaryExclude === true ? 1 : 0,
            PositionType:
                stateMaintainGeneralFilter.form.positionType.length == 0
                    ? ''
                    : stateMaintainGeneralFilter.form.positionType.join(','),
            PositionTypeExclude: stateMaintainGeneralFilter.form.positionTypeExclude === true ? 1 : 0,
            Industry: stateMaintainGeneralFilter.form.industry.join(','),
            IndustryExclude: stateMaintainGeneralFilter.form.industryExclude === true ? 1 : 0,
            InternIndustry: stateMaintainGeneralFilter.form.industryInternship.join(','),
            InternFunction: stateMaintainGeneralFilter.form.functionInternship.join(','),
            InternFunctionExclude: stateMaintainGeneralFilter.form.functionExcludeInternship === true ? 1 : 0,
            InternIndustryExclude: stateMaintainGeneralFilter.form.industryExcludeInternship, // harus boolean di kirim ke server
            InternStartDateFrom:
                stateMaintainGeneralFilter.form.startDateInternship === ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.startDateInternship).format('MM-YYYY'),
            InternStartDateTo:
                stateMaintainGeneralFilter.form.startDateToInternship === ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.startDateToInternship).format('MM-YYYY'),
            InternEndDateFrom:
                stateMaintainGeneralFilter.form.endDateInternship === ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.endDateInternship).format('MM-YYYY'),
            InternEndDateTo:
                stateMaintainGeneralFilter.form.endDateToInternship === ''
                    ? ''
                    : moment(stateMaintainGeneralFilter.form.endDateToInternship).format('MM-YYYY')
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.GN_FILTER_SUBMIT_POST, body, { headers: Header() })
        if (response.Acknowledge === 1) {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Info', response.Message, 'info', false)
            param.history.goBack()
        } else {
            yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
            messages('Error', response.Message, 'error', false)
        }
    } catch (err) {
        yield put({ type: types.GN_FILTER_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.GN_FILTER_FETCH_MASTER_DATA, getMasterData),
        takeLatest(types.GN_FILTER_FETCH_SEARCH, fetchSearch),
        takeLatest(types.GN_FILTER_FETCH_DELETE, fetchDelete),
        takeLatest(types.GN_FILTER_FETCH_DETAIL, fetchDetail),
        takeLatest(types.GN_FILTER_FETCH_EDIT, fetchEdit),
        takeLatest(types.GN_FILTER_FETCH_SUBMIT, fetchSubmit)
    ])
}
