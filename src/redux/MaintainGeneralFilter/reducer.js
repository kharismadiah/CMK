import { DROPDOWN_GENDER } from '../../constants/dropdown'
import * as types from '../types'

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        generalFilterCode: '',
        generalFilterName: '',
        generalFilterDesc: ''
    },
    sourceTable: [],
    form: {
        generalFilterCode: '',
        generalFilterName: '',
        generalFilterDesc: '',
        gender: [],
        age: '',
        ageTo: '',
        domicile: [],
        domicileExclude: false,
        expectedSalary: [],
        expectedSalaryExclude: false,
        degree: [],
        degreeExclude: false,
        intitute: [],
        intituteExclude: false,
        major: [],
        majorExclude: false,
        gpa: '',
        gpaTo: '',
        startYear: '',
        startYearTo: '',
        startDateInternship: '',
        startDateToInternship: '',
        endDateInternship: '',
        endDateToInternship: '',
        graduaationYear: '',
        graduaationYearTo: '',
        scope: [],
        scopeExclude: false,
        title: [],
        titleExclude: false,
        titleJob: [],
        titleJobExclude: false,
        function: [],
        functionExclude: false,
        yearOfExperience: '',
        yearOfExperienceTo: '',
        positionType: [],
        positionTypeExclude: false,
        functionInternship: [],
        functionExcludeInternship: false,
        industryInternship: [],
        industryExcludeInternship: false,
        industry: [],
        industryExclude: false,
        yeoYearFrom: '',
        yeoMonthFrom: '',
        yeoYearTo: '',
        yeoMonthTo: ''
    },
    source: {
        gender: DROPDOWN_GENDER,
        age: [],
        ageTo: [],
        domicile: [],
        expectedSalary: [],
        degree: [],
        intitute: [],
        major: [],
        gpa: [],
        gpaTo: [],
        startYear: [],
        startYearTo: [],
        graduaationYear: [],
        graduaationYearTo: [],
        scope: [],
        title: [],
        titleJob: [],
        yearOfExperience: [],
        yearOfExperienceTo: [],
        industry: [],
        function: [],
        industryInternship: [],
        functionInternship: [],
        positionType: []
    }
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.GN_FILTER_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.GN_FILTER_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.GN_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }
        case types.GN_FILTER_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.GN_FILTER_HANDLE_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        }
        case types.GN_FILTER_INIT_STATE_FORM: {
            return {
                ...state,
                form: {
                    ...initState.form
                }
            }
        }
        case types.GN_FILTER_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.GN_FILTER_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.GeneralFilterList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.GN_FILTER_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.data
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}
