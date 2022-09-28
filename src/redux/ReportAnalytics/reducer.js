import * as types from '../types'
// import { reportDummyTableData } from './dummy-data'

export const dropDownReportTypes = [
    { id: 'ApplicationData', name: 'Application Data (.xlsx)' },
    { id: 'FLKExcel', name: 'Formulir Lamaran Kerja (.xlsx)' },
    { id: 'FLKPdf', name: 'Formulir Lamaran Kerja (.pdf)' },
    { id: 'RecruitmentProcessExcel', name: 'Recruitment Process (.xlsx)' },
    { id: 'InterviewExcel', name: 'Interview (.xlsx)' },
    { id: 'InterviewPdf', name: 'Interview (.pdf)' }
]
const dropdownDownloadTypes = [{ id: 'Event', name: 'Event' }, { id: 'Period', name: 'Period' }]

const dropdownAll = {
    id: 'All',
    name: 'All'
}

const initState = {
    isLoading: false,
    exportReexportSuccess: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    search: {
        downloadType: null,
        reportType: null,
        groupEventId: null,
        eventId: null,
        positionId: null,
        vacancyId: null,
        branchId: null,
        atsPhaseId: null,
        periodDate: null,
        periodStarDate: null,
        periodEndDate: null
    },
    source: {
        downloadTypeList: dropdownDownloadTypes,
        reportTypeList: dropDownReportTypes,
        groupEventList: [],
        eventList: [],
        branchList: [],
        positionList: [],
        vacancyList: [],
        atsPhaseList: [],
        tempVacancyList: []
    },
    filteredSource: {
        eventList: [],
        branchList: [],
        positionList: [],
        vacancyList: [],
        atsPhaseList: []
    },
    tableList: [],
    // sourceFilter:[],
    sourceFilter: {
        downloadType: [],
        reportType: [],
        pic: [],
        exportDate: [],
        platform: [],
        sourcingChannel: [],
        company: [],
        position: [],
        vacancy: [],
        atsPhase: [],
        status: []
    },
    filterValue: {
        downloadType: 'All',
        reportType: 'All',
        pic: 'All',
        exportDate: 'All',
        platform: 'All',
        sourcingChannel: 'All',
        company: 'All',
        position: 'All',
        vacancy: 'All',
        atsPhase: 'All',
        status: 'All'
    },
    isLoadingHistoryTable: false,
    objFileNames: {
        EventName: '',
        EventDesc: '',
        PositionName: '',
        StartDate: '',
        EndDate: '',
        CandidateName: '',
        CandidateEmail: '',
        HRUser: ''
    }
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.REPORT_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.REPORT_FETCH_EXPORT_SUCCESS:
            return {
                ...state,
                exportReexportSuccess: action.value
            }
        case types.REPORT_HANDLE_STATE: {
            // debugger
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.REPORT_MATER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.payload
                }
            }
        }
        case types.REPORT_CLEAR_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.REPORT_FETCH_FORM_HISTORY_SUCCESS: {
            return {
                ...state,
                totalRows: action.data.totalRecords,
                sourceFilter: {
                    ...state.sourceFilter,
                    downloadType: [dropdownAll, ...action.data.sourceFilter.downloadType],
                    reportType: [dropdownAll, ...action.data.sourceFilter.reportType],
                    pic: [dropdownAll, ...action.data.sourceFilter.pic],
                    exportDate: [dropdownAll, ...action.data.sourceFilter.exportDate],
                    platform: [dropdownAll, ...action.data.sourceFilter.platform],
                    sourcingChannel: [dropdownAll, ...action.data.sourceFilter.sourcingChannel],
                    company: [dropdownAll, ...action.data.sourceFilter.company],
                    position: [dropdownAll, ...action.data.sourceFilter.position],
                    vacancy: [dropdownAll, ...action.data.sourceFilter.vacancy],
                    atsPhase: [dropdownAll, ...action.data.sourceFilter.atsPhase],
                    status: [dropdownAll, ...action.data.sourceFilter.status]
                },
                tableList: action.data.tableList
            }
        }
        case types.REPORT_SET_HISTORY_TABLE_LOADER: {
            return {
                ...state,
                isLoadingHistoryTable: action.value
            }
        }

        case types.SET_FILTERED_SOURCE_REPORT_ANALYTICS:
            return {
                ...state,
                filteredSource: {
                    ...state.filteredSource,
                    [action.property]: action.values
                }
            }
        case types.SET_OBJECT_FILE_NAMES_REPORT_ANALYTICS:
            return {
                ...state,
                objFileNames: {
                    ...state.objFileNames,
                    [action.property]: action.value
                }
            }
        case types.REPORT_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo ? action.pageNo : state.pageNo,
                pageSize: action.pageSize ? action.pageSize : state.pageSize
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
