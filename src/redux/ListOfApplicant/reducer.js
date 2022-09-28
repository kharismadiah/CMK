import * as types from '../types'
import moment from 'moment'
import { DROPDOWN_GENDER } from '../../constants/dropdown'

let dropdownAll = {
    id: 'All',
    name: 'All'
}

const initState = {
    isLoading: false,
    isShowInvite: false,
    pageNo: 1,
    pageSize: 25,
    totalRows: 25,
    categoryList: [
        { id: 1, value: 'Fresh Graduation', name: 'Fresh Graduation' },
        { id: 2, value: 'Professional', name: 'Professional' },
        { id: 3, value: 'All', name: 'All' }
    ],
    serach: {
        age: '',
        ageTo: '',
        candidateName: null,
        yearOfExperiences: null,
        yearOfExperiencesTo: null,
        gender: [],
        activeSeekingOportunities: null,
        degree: [],
        organizationalExperienceScope: [],
        institution: [],
        organizationalExperienceTitle: [],
        major: [],
        jobExperienceTitle: [],
        graduationYear: null,
        graduationYearTo: null,
        jobExperienceFunction: [],
        gpaNem: null,
        gpaNemTo: null,
        seekingJobStatus: [],
        seekingJobStatusName: []
    },
    source: {
        gender: DROPDOWN_GENDER,
        degree: [],
        organizationalExperienceScope: [],
        institution: [],
        organizationalExperienceTitle: [],
        major: [],
        jobExperienceTitle: [],
        jobExperienceFunction: [],
        Domicile: [],
        YearsOfExperience: [],
        SeekingJobStatusList: [],
        YearsOfExperienceList: []
    },
    listTable: [],
    selectedRowTable: [],
    serachVacancy: {
        eventName: '',
        company: '',
        category: '',
        function: '',
        vacancyTitle: ''
    },
    listTableVacancy: [],
    activeVacancyDetails: {
        VacancyId: '',
        VacancyStatusId: '',
        VacancyCode: '',
        EventId: '',
        PublishDate: '',
        EndDate: '',
        CompanyId: '',
        Category: '',
        JobSpecializationId: '',
        GeneralFilterId: '',
        JobRequirement: '',
        JobDescription: '',
        CompetenceDescription: '',
        NotesHistory: '',
        PositionId: '',
        VacancyTitle: '',
        VacancyType: '',
        FunctionId: '',
        TotalNeeds: '',
        TotalFulfilled: '',
        CandidateType: '',
        Candidates: 0,
        CreateDate: '',
        ATSPhaseTypeId: 0,
        Phases: [
            // {
            //     "PhaseName": "General Filter",
            //     "PhaseTitle": "General Filter"
            // }
        ]
    },
    selectedRowTableVacancy: [],
    selectedRowTableRadioVacancy: {},

    PersonalData: {
        ApplicantId: null,
        FullName: null,
        Email: null,
        DateOfBirth: null,
        Gender: null,
        Domicile: null,
        DomicileOther: null,
        PhoneNumber: null,
        YearsOfExperience: null,
        ActivelySeekingOpportunities: null,
        PhotoURL: null,
        CvURL: null
    },
    EducationList: [],
    OrganizationList: [],
    JobExperienceList: [],
    InvitationHistoryList: [],
    tempInvitationHistoryList: [],
    ApplicationHistoryList: [],
    tempApplicationHistoryList: [],
    formEmail: {
        subject: null,
        body: null,
        signature: null
    },
    isShowSelectEmailTemplate: false,
    emailTemplateList:[],
    emailTemplateTotalRows:0,
    emailTemplateCurrentPage:1,
    selectedEmailTemplateId: 0,

    applicationFilter: {
        groupEvent: 'All',
        eventCode: 'All',
        event: 'All',
        eventDesc: 'All',
        company: 'All',
        vacancyCode: 'All',
        vacancyTitle: 'All',
        atsPhase: 'All',
        status: 'All',
        date: 'All',
        file: 'All',
    },
    invitationFilter: {
        invitedDate: 'All',
        invitedBy: 'All',
        company: 'All',
        vacancyCode: 'All',
        vacancyTitle: 'All',
        confirmation: 'All',
        confirmationDate: 'All',
        source: 'All'
    },
    sourceApplication: {
        groupEvent: [],
        eventCode: [],
        event: [],
        eventDes: [],
        company: [],
        vacancyCode: [],
        vacancyTitle: [],
        atsPhase: [],
        status: [],
        date: [],
        file: [],
    },
    sourceInvitation: {
        invitedDate: [],
        invitedBy: [],
        company: [],
        vacancyCode: [],
        vacancyTitle: [],
        confirmation: [],
        confirmationDate: [],
        source: []
    },
    searchApplication : '',
    searchInvitation: '',
    checkInviteToJoinCandidate: [],
    inviteToJoinCheckResponse: {
        waitingApplicants: [],
        acceptedApplicants: [],
        declinedApplicants: [],
        expiredApplicants: [],
        extendedApplicants: []
    },
    filteredSelectedRowTableCandidate: [],
    inviteToJoinStatus: {
        popUpDeclined: false,
        popUpWaiting: false,
        popUpAllAccepted: false,
        popUpFewAccepted: false,
        popUpMaxExtended: false
    },
    isShowPopUp: false,
    triggerList: [],
    activityList: [],
    showFewAcceptedModal: false,
    resetCheckBoxMainTableFlag:false
}

export default function (state = initState, action) {
    switch (action.type) {
        case types.APPLICANT_MATER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    gender: DROPDOWN_GENDER,
                    degree: action.payload.degree,
                    organizationalExperienceScope: action.payload.organizationalExperienceScope,
                    institution: action.payload.institution,
                    organizationalExperienceTitle: action.payload.organizationalExperienceTitle,
                    major: action.payload.major,
                    jobExperienceTitle: action.payload.jobExperienceTitle,
                    jobExperienceFunction: action.payload.jobExperienceFunction,
                    latestApplicantPhaseStatus: action.payload.latestApplicantPhaseStatus,
                    SeekingJobStatusList: action.payload.SeekingJobStatusList,
                    YearsOfExperienceList: action.payload.YearsOfExperienceList
                }
            }
        }
        case types.APPLICANT_MATER_DATA_DETAIL_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    Domicile: action.payload.Domicile,
                    YearsOfExperience: action.payload.YearsOfExperience
                }
            }
        }
        case types.APPLICANT_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.APPLICANT_HANDLE_STATE: {
            return {
                ...state,
                serach: {
                    ...state.serach,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_SUCCESS_GET_LIST: {
            return {
                ...state,
                listTable: action.data.ApplicantList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.APPLICANT_CLEAR_SEARCH: {
            return {
                ...state,
                serach: {
                    ...initState.serach
                }
            }
        }
        case types.APPLICANT_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }
        case types.APPLICANT_FETCH_DETAIL_SUCCESS: {
            return {
                ...state,
                sourceInvitation: {
                    invitedDate: [
                        dropdownAll,
                        ...action.data.sourceInvitation.invitedDate
                    ],
                    invitedBy: [
                        dropdownAll,
                        ...action.data.sourceInvitation.invitedBy
                    ],
                    company: [
                        dropdownAll,
                        ...action.data.sourceInvitation.company
                    ],
                    vacancyCode: [
                        dropdownAll,
                        ...action.data.sourceInvitation.vacancyCode
                    ],
                    vacancyTitle: [
                        dropdownAll,
                        ...action.data.sourceInvitation.vacancyTitle
                    ],
                    confirmation: [
                        dropdownAll,
                        ...action.data.sourceInvitation.confirmation
                    ],
                    confirmationDate: [
                        dropdownAll,
                        ...action.data.sourceInvitation.confirmationDate
                    ],
                    source: [
                        dropdownAll,
                        ...action.data.sourceInvitation.source
                    ]
                },
                sourceApplication: {
                    groupEvent: [
                        dropdownAll,
                        ...action.data.sourceApplication.groupEvent
                    ],
                    eventCode: [
                        dropdownAll,
                        ...action.data.sourceApplication.eventCode
                    ],
                    event: [
                        dropdownAll,
                        ...action.data.sourceApplication.event
                    ],
                    eventDesc: [
                        dropdownAll,
                        ...action.data.sourceApplication.eventDesc
                    ],
                    company: [
                        dropdownAll,
                        ...action.data.sourceApplication.company
                    ],
                    vacancyCode: [
                        dropdownAll,
                        ...action.data.sourceApplication.vacancyCode
                    ],
                    vacancyTitle: [
                        dropdownAll,
                        ...action.data.sourceApplication.vacancyTitle
                    ],
                    atsPhase: [
                        dropdownAll,
                        ...action.data.sourceApplication.atsPhase
                    ],
                    status: [
                        dropdownAll,
                        ...action.data.sourceApplication.status
                    ],
                    date: [
                        dropdownAll,
                        ...action.data.sourceApplication.date
                    ],
                    file: [
                        dropdownAll,
                        ...action.data.sourceApplication.file
                    ],
                },
                PersonalData: action.data.PersonalData,
                EducationList: action.data.EducationList,
                OrganizationList: action.data.OrganizationList,
                JobExperienceList: action.data.JobExperienceList,

                InvitationHistoryList: action.data.InvitationHistoryList,
                tempInvitationHistoryList : action.data.InvitationHistoryList,
                
                ApplicationHistoryList: action.data.ApplicationHistoryList,
                tempApplicationHistoryList: action.data.ApplicationHistoryList
            }
        }
        case types.APPLICANT_CLEAR_STATE_DETAIL_RESUME: {
            return {
                ...state,
                PersonalData: initState.PersonalData,
                EducationList: [],
                OrganizationList: [],
                JobExperienceList: [],
                InvitationHistoryList: [],
                ApplicationHistoryList: [],
                tempApplicationHistoryList: [],
                tempInvitationHistoryList: []
            }
        }
        case types.APPLICANT_HANDLE_STATE_GLOBAL: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.APPLICANT_HANDLE_STATE_SERACH: {
            return {
                ...state,
                serachVacancy: {
                    ...state.serachVacancy,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_FETCH_ACTIVE_VACANCY_SUCCESS: {
            return {
                ...state,
                listTableVacancy: action.data.VacancyList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.APPLICANT_CLEAR_ACTIVE_VACANCY: {
            return {
                ...state,
                serachVacancy: {
                    ...initState.serachVacancy
                }
            }
        }
        case types.APPLICANT_HANDLE_STATE_EMAIL: {
            return {
                ...state,
                formEmail: {
                    ...state.formEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.APPLICANT_FETCH_EMAIL_REDACTIONAL_SUCCESS: {
            return {
                ...state,
                formEmail: {
                    ...state.formEmail,
                    subject: action.payload.Subject.replace(/(\r\n|\n|\r)/gm,""),
                    body: action.payload.Body,
                    signature: action.payload.Signature
                }
            }
        }
        case types.APPLICANT_FETCH_DETAILS_ACTIVE_VACANCY_SUCCESS: {
            return {
                ...state,
                activeVacancyDetails: action.payload
            }
        }
        case types.APPLICANT_HANDLE_EMAIL_TEMPLATE : {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.APPLICANT_RESET_EMAIL_TEMPLATE_STATE : {
            return {
                ...state,
                emailTemplateList: initState.emailTemplateList,
                emailTemplateTotalRows: initState.emailTemplateTotalRows,
                emailTemplateCurrentPage: initState.emailTemplateCurrentPage,
                // selectedEmailTemplateId: initState.selectedEmailTemplateId
            }
        }
        case types.APPLICANT_HANDLE_STATE_APP_FILTER: {
            return {
                ...state,
                applicationFilter: {
                    ...state.applicationFilter,
                    [action.property] : action.value
                }
            }
        }
        case types.APPLICANT_HANDLE_STATE_INV_FILTER: {
            return {
                ...state,
                invitationFilter: {
                    ...state.invitationFilter,
                    [action.property] : action.value
                }
            }
        }
        case types.APPLICANT_RESET_FILTER_INV: {
            return {
                ...state,
                invitationFilter: {
                    ...initState.invitationFilter
                }
            }
        }
        case types.APPLICANT_RESET_FILTER_APP: {
            return {
                ...state,
                applicationFilter: {
                    ...initState.applicationFilter
                }
            }
        }
        case types.APPLICANT_RESET_STATE_EMAIL_MODAL: {
            return {
                ...state,
                inviteToJoinCheckResponse: {
                    ...state.inviteToJoinCheckResponse,
                    waitingApplicants: initState.inviteToJoinCheckResponse.waitingApplicants,
                    acceptedApplicants: initState.inviteToJoinCheckResponse.acceptedApplicants,
                    declinedApplicants: initState.inviteToJoinCheckResponse.declinedApplicants,
                    expiredApplicants: initState.inviteToJoinCheckResponse.expiredApplicants
                },
                inviteToJoinStatus: {
                    ...state.inviteToJoinStatus,
                    popUpDeclined: initState.inviteToJoinStatus.popUpDeclined,
                    popUpWaiting: initState.inviteToJoinStatus.popUpWaiting,
                    popUpAllAccepted: initState.inviteToJoinStatus.popUpAllAccepted,
                    popUpFewAccepted: initState.inviteToJoinStatus.popUpFewAccepted
                },
                isShowPopUp: initState.isShowPopUp
            }
        }
        default:
            return {
                ...state
            }
    }
}
