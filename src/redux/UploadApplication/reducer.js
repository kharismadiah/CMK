import * as types from "../types";

const initState = {
    isLoading: false,
    isDisabled: false,
    fromPage: "",

    pageNo: 1,
    pageSize: 10,
    totalRows: 0,
    totalRowsMaster: 0,
    statusCallback: "1",

    groupEventList: [],
    groupEventListAffco: [],
    eventList: [],
    eventListByGroupEvent: [],
    groupEvent: '',
    event: '',
    upload: '',
    uploadRaw: [],
    listOfResult: [],
    
    isShowSelectEmailTemplate: {
        nonRegistered: false,
        nonRegisteredQueue: false,
        // registeredQueue: false,
        registered: false
    },
    emailTemplateList:[],
    emailTemplateTotalRows:0,
    emailTemplateCurrentPage:1,
    selectedEmailTemplateId: null,
    emailActivity: "",
    modalEmail: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: ''
    },
    listApplicantNonRegis: [],
    listApplicantRegis: [],
    vacancyCodeToBeRetrieved: null,
    triggerList:[],
    activityList:[],
    currentSendEmail:""
}

export default function UploadApplicationReducer(state = initState, action) {
    switch (action.type) {
        case types.SET_UPLOADAPP_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.SET_UPLOADAPP_MASTERDATA:{
            return{
                ...state,
                groupEventList: action.value.groupEventList,
                groupEventListAffco: action.value.groupEventListAffco,
                eventList: action.value.eventList
            }
        }
        case types.INIT_FORM_UPLOADAPP: {
            return {
                ...state,
                groupEvent: '',
                event: '',
                upload: '',
                uploadRaw: [],
                listOfResult: [],
            }
        }
        case types.HANDLE_STATE_UPLOADAPP: {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        case types.UPLOAD_UPLOADAPP_SUCCESS: {
            return{
                ...state,
                [action.field]: action.value
            }
        }
        case types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY: {
            return {
                ...state,
                isShowSelectEmailTemplate: {
                    ...state.isShowSelectEmailTemplate,
                    [action.property]: action.value
                }
            }
        }
        case types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.UPLOAD_APPLICATION_RESET_EMAIL_TEMPLATE_STATE : {
            return {
                ...state,
                emailTemplateList: initState.emailTemplateList,
                emailTemplateTotalRows: initState.emailTemplateTotalRows,
                emailTemplateCurrentPage: initState.emailTemplateCurrentPage,
                // selectedEmailTemplateId: initState.selectedEmailTemplateId
            }
        }
        case types.UPLOAD_APPLICATION_HANDLE_STATE_MODAL_EMAIL: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.UPLOAD_APPLICATION_FETCH_EMAIL_TEMPLATE_SUCCESS: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    ...action.payload,
                    subject: action.payload.subject.replace(/(\r\n|\n|\r)/gm,"")
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}