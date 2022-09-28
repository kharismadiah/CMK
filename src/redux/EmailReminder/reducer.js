import * as types from "../types";

const initState = {
    isLoading: false,
    isDisabled: false,
    isEdit: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,

    formSearch: {
        activity:'',
        description:'',
        company:'',
        subject:'',
        status:true
    },
    formEmailReminder: {
        activity:'',
        description:'',
        companyId:'',
        senderEmail:'',
        firstReminder:'',
        secondReminder:'',
        thirdReminder:'',
        condition:'',
        to:'',
        cc:'',
        subject:'',
        body:'',
        signature:'',
        status: true,
    },
    sourceTable:[],
    source:{
        Channel:[],
        Company:[],
        To:[],
        Cc:[]
    }
};

export default function EmailReminderReducer(state = initState, action) {
    switch (action.type) {
        case types.EMAIL_REMINDER_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.EMAIL_REMINDER_MATER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.payload
                }
            }
        }
        case types.EMAIL_REMINDER_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                formSearch: {
                    ...state.formSearch,
                    [action.property]: action.value
                }
            }
        }
        case types.EMAIL_REMINDER_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.EMAIL_REMINDER_CLEAR_FORM_SEARCH: {
            return {
                ...state,
                formSearch: {
                    ...initState.formSearch
                }
            }
        }
        case types.EMAIL_REMINDER_HANDLE_STATE_FORM: {
            return {
                ...state,
                formEmailReminder: {
                    ...state.formEmailReminder,
                    [action.property]: action.value
                }
            }
        }
        case types.EMAIL_REMINDER_CLEAR_FORM: {
            return {
                ...state,
                formEmailReminder: {
                    activity: '',
                    description: '',
                    companyId: '',
                    senderEmail: '',
                    firstReminder: '',
                    secondReminder: '',
                    thirdReminder: '',
                    condition: '',
                    to: '',
                    cc: '',
                    subject: '',
                    body: '',
                    signature: '',
                    status: '',
                },
            }
        }
        case types.EMAIL_REMINDER_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formEmailReminder: {
                    ...action.payload
                }
            }
        }
        case types.EMAIL_REMINDER_HANDLE_STATE: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.EMAIL_REMINDER_FETCH_SEARCH_SUCCESS: {
            return {
                ...state,
                sourceTable: action.value.EmailReminderList,
                totalRows: action.value.TotalRecords
            }
        }
        default:
            return {
                ...state
            }
    }
}