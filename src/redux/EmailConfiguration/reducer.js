import * as types from '../types'
import { emailConfigurationList } from './saga'

const initState = {
    isLoading: false,
    isDisabled: false,
    fromPage: '',

    pageNo: 1,
    pageSize: 10,
    totalRows: 0,
    totalRowsMaster: 0,
    statusCallback: '1',

    company: '',
    activity: '',
    channel: '',
    action: '',
    subject: '',
    body: '',

    channelList: [], //groupEventList
    companyList: [], //BranchList
    companyListInSearch: [],
    companyListMaster: [],
    activityList: [],
    toList: [], //assigneetype
    ccList: [], //assigneetype
    subjectBodySigTriggerRemark: [], //assigneetype

    emailConfigId: 0,
    formEmailConfiguration: {
        activity: '',
        action: '',
        additionalLogic: '',
        description: '',
        channel: '',
        company: '',
        senderEmail: '',
        to: '',
        cc: '',
        subject: '',
        body: '',
        signature: '',
        // status: 1,
        status: 0,
        activityName: ''
    },
    emailConfigurationList: [],
    selectedCompanyId: 0,
    triggerList: [],
    idForChangeStatus: null,
    displayStatusForChangeStatus: null,
    showMultipleEmailTemplateModal2: false,
    popUpType: ''
}

export default function EmailConfigurationReducer(state = initState, action) {
    switch (action.type) {
        case types.SET_LOADER: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case types.INIT_FORM_SEARCH_EMAIL: {
            return {
                ...state,
                company: '',
                activity: '',
                channel: '',
                action: '',
                subject: '',
                body: '',
                selectedCompanyId: 0
            }
        }
        case types.INIT_FORM_EMAIL: {
            return {
                ...state,
                formEmailConfiguration: {
                    activity: '',
                    action: '',
                    additionalLogic: '',
                    description: '',
                    channel: '',
                    company: '',
                    senderEmail: '',
                    to: '',
                    cc: '',
                    subject: '',
                    body: '',
                    signature: '',
                    status: 0
                }
            }
        }
        case types.INIT_PAGING_EMAIL: {
            return {
                ...state,
                pageNo: 1,
                pageSize: 10,
                totalRows: 0
            }
        }
        case types.HANDLE_STATE_EMAIL: {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        case types.HANDLE_STATE_EMAIL_FORM: {
            return {
                ...state,
                formEmailConfiguration: {
                    ...state.formEmailConfiguration,
                    [action.field]: action.value
                }
            }
        }
        case types.HANDLE_STATE_EMAIL_MASTERDATA: {
            let field = action.field
            let list = action.value
            let data = []
            if (field == 'companyList') {
                list.map(obj => {
                    let value = {}
                    value = { id: obj.CompanyId, value: obj.CompanyName, name: obj.CompanyName }
                    data.push(value)
                })
                state.companyList = data
            }

            return {
                ...state
            }
        }
        case types.SET_EMAIL_MASTERDATA: {
            return {
                ...state,
                activityList: action.payload.activityList,
                channelList: action.payload.channelList,
                companyList: action.payload.companyList,
                toList: action.payload.to,
                ccList: action.payload.cc
                // subjectBodySigTriggerRemark: action.payload.triggerRemark,
            }
        }
        case types.SET_READMORE: {
            return {
                ...state,
                
                emailConfigurationList: state.emailConfigurationList.map(
                    (x, i) => {
                        return x.Id == action.id
                            ? {
                                  ...state.emailConfigurationList[i],
                                  Subject: emailConfigurationList[i].subject,
                                  readMore: action.value
                              }
                            : { ...state.emailConfigurationList[i] }
                    })

                    // x.Id == action.id ? {
                    //     ...state.emailConfigurationList[i], readMore: action.value
                    // } : { ...state.emailConfigurationList }
                
            }
        }
        case types.SET_COMPANY_MASTERDATA_IN_SEARCH: {
            return {
                ...state,
                companyListInSearch: action.payload
            }
        }
        case types.SET_EMAIL_TRIGGER: {
            return {
                ...state,
                triggerList: action.triggerList
            }
        }
        default:
            return {
                ...state
            }
    }
}
