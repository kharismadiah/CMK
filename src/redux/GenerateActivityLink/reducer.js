import * as types from '../types'

const initState = {
    isLoading: false,
    fromPage: '',

    pageNo: 1,
    pageSize: 10,
    totalRows: 0,
    totalRowsMaster: 0,
    statusCallback: '1',
    indexIsEdit: 0,

    form: {
        eventId: '',
        groupEventId: '',
        Company: '',
        vacancyId: '',
        activityPLatformId: '',
        isQRCode: false
    },
    masterData: {
        GroupEventList: [],
        EventList: [],
        VacancyList: [],
        CompanyList: [],
        MediaList: []
    },

    // Filter berdasarkan parent
    filteredMasterData: {
        GroupEventList: [],
        EventList: [],
        VacancyList: [],
        TempVacancyList: [], // THIS IS TEMPORARY DATA FOR VACANCIES
        CompanyList: []
    },
    fileName: {
        event: '',
        groupEvent: '',
        vacancy: '',
        platform: ''
    }
}

export default function GenerateActivityLinkReducer(state = initState, action) {
    switch (action.type) {
        case types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }

        case types.SET_GENERATE_ACTIVITY_LINK_MASTER_DATA:
            return {
                ...state,
                masterData: action.value
            }
        case types.SET_FILTER_GENERATE_ACTIVITY_LINK_MASTER_DATA:
            return {
                ...state,
                filteredMasterData: {
                    ...state.filteredMasterData,
                    [action.property]: action.values
                }
            }

        case types.SET_FORM_INPUT_GENERATE_ACTIVITY_LINK:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.property]: action.value
                }
            }
        case types.RESET_INPUT_GENERATE_ACTIVITY_LINK:
            return {
                ...state,
                form: initState.form
            }
        case types.SET_FILENAME_GENERATE_ACTIVITY_LINK:
            return {
                ...state,
                fileName: {
                    ...state.fileName,
                    [action.fieldName]: action.value
                }
            }

        default:
            return {
                ...state
            }
    }
}
