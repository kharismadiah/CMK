import * as types from "../types";
import moment from 'moment';

const initState = {
    isLoading: false,
    isDisabled: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    isEdit: false,
    search:{
        groupEvent: '',
        media: '',
        eventName: '',
        startDate: '',
        endDate: '',
        description: ''
    },
    sourceTable:[],
    eventNameGenerateCode:{
        groupEventCode:'',
        mediaCode:'',
        startDate:'',
    },
    formEvent:{
        groupNameEvent: '',
        mediaName: '',
        eventName: '',
        eventDescription: '',
        startDate: '',
        endDate: '',
        maxVacancyApplied: '',
        startDateApply: ''
    },
    sourceGroupEvent:[],
    sourceGroupEventAffco:[],
    sourceMedia:[]
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.EVENT_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.EVENT_HANDLE_STATE: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.EVENT_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.EVENT_INIT_CLEAR_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search,
                }
            }
        }
        case types.EVENT_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.EVENT_HANDLE_STATE_AUTO_GENERATE:{
            return{
                ...state,
                eventNameGenerateCode:{
                    ...state.eventNameGenerateCode,
                    [action.property]: action.value
                }
            }
        }
        case types.EVENT_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.data.EventList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.EVENT_MATER_DATA_SUCCESS: {
            return {
                ...state,
                sourceGroupEvent: action.payload.sourceGroupEvent,
                sourceGroupEventAffco: action.payload.sourceGroupEventAffco,
                sourceMedia: action.payload.sourceMedia
            }
        }
        case types.EVENT_HANDLE_STATE_FORM: {
            return {
                ...state,
                formEvent: {
                    ...state.formEvent,
                    [action.property]: action.value
                }
            }
        }
        case types.EVENT_INIT_CLEAR_FORM: {
            return {
                ...state,
                formEvent: {
                    ...initState.formEvent,
                },
                eventNameGenerateCode:{
                    ...initState.eventNameGenerateCode,
                }
            }
        }
        case types.EVENT_FETCH_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formEvent:{
                    groupNameEvent: action.data.GroupEventId,
                    mediaName: action.data.MediaId,
                    eventName: action.data.EventName,
                    eventDescription: action.data.EventDescription,
                    startDate: moment(action.data.StartDate, "DD/MM/YYYY"),
                    endDate: moment(action.data.EndDate, "DD/MM/YYYY"),
                    maxVacancyApplied: action.data.MaxApplyLimit,
                    startDateApply: moment(action.data.ApplyActiveDate, "DD/MM/YYYY")
                },
            }
        }
        default:
            return {
                ...state
            }
    }
}  